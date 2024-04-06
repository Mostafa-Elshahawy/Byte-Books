package handlers

import (
	"bytes"
	"fmt"
	"html/template"
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/ME/Byte-Books/internal/auth"
	"github.com/ME/Byte-Books/internal/models"
	"github.com/labstack/echo/v4"
	"github.com/stripe/stripe-go/v72"
	"github.com/stripe/stripe-go/v72/paymentintent"
	"gopkg.in/gomail.v2"
)

func (r *Repository) Checkout(c echo.Context) error {
	UserSession, err := auth.Store.Get(c.Request(), "session_id")
	if err != nil {
		return c.JSON(echo.ErrInternalServerError.Code, "could not get session")
	}
	userID := UserSession.Values["user_id"]
	userEmail := fmt.Sprint(UserSession.Values["user_email"])
	userName := fmt.Sprint(UserSession.Values["username"])

	// Retrieve items from the user's cart
	userCart, err := r.DB.GetUserCart(userID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to fetch user cart"})
	}

	if len(userCart) == 0 {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "User's cart is empty"})
	}

	// Calculate total price
	var totalPrice float64
	for _, item := range userCart {
		totalPrice += item.Product[0].Price * float64(item.Quantity)
	}

	// Create an order
	order_id, err := r.DB.CreateOrder(userID, totalPrice)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to create order"})
	}

	// Prepare order items
	var orderItems []models.OrderItem
	for _, item := range userCart {
		orderItem := models.OrderItem{
			ProductID: item.Product[0].ID,
			Price:     item.Product[0].Price,
			Quantity:  item.Quantity,
		}
		orderItems = append(orderItems, orderItem)
	}

	// Add items to the order
	orderDetails, err := r.DB.AddItemsToOrder(order_id, orderItems)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"error": err,
		})
	}

	// payment using stribe
	stripe.Key = os.Getenv("STRIPE_KEY")
	params := &stripe.PaymentIntentParams{
		Amount:   stripe.Int64(int64(totalPrice)),
		Currency: stripe.String("USD"),
		AutomaticPaymentMethods: &stripe.PaymentIntentAutomaticPaymentMethodsParams{
			Enabled: stripe.Bool(true),
		},
	}

	pi, err := paymentintent.New(params)
	if err != nil {
		if stripeErr, ok := err.(*stripe.Error); ok {
			fmt.Printf("Other Stripe error occurred: %v\n", stripeErr.Error())
			return c.JSON(400, stripeErr.Error())
		} else {
			fmt.Printf("Other error occurred: %v\n", err.Error())
			return c.JSON(500, "Unknown server error")
		}
	}

	fmt.Println(pi)

	// clear the user's cart after the order is placed
	// err = r.DB.ClearUserCart(userID)
	// if err != nil {
	// 	return c.JSON(echo.ErrInternalServerError.Code, echo.Map{
	// 		"error": "could not clear user cart",
	// 	})
	// }

	err = SendOrderEmail(userEmail, userName)
	if err != nil {
		return c.JSON(echo.ErrInternalServerError.Code, "could not send email")
	}

	return c.JSON(http.StatusOK, echo.Map{
		"message": "order placed successfully",
		"order":   orderDetails,
	})
}

func (r *Repository) GetUserOrders(c echo.Context) error {
	session, err := auth.Store.Get(c.Request(), "session_id")
	if err != nil {
		return c.JSON(echo.ErrInternalServerError.Code, "could not get session")
	}
	userID := session.Values["user_id"]

	orders, err := r.DB.GetOrders(userID)
	if err != nil {
		return c.JSON(echo.ErrInternalServerError.Code, echo.Map{
			"error": "could not get user's orders",
		})
	}
	return c.JSON(http.StatusOK, echo.Map{
		"orders": orders,
	})
}

func SendOrderEmail(userEmail string, username string) error {
	var emailBody bytes.Buffer
	templatePath := filepath.Join("./../byte-books-frontend/public", "emailTemplate.html")
	t, err := template.ParseFiles(templatePath)
	if err != nil {
		log.Println(err)
	}
	t.Execute(&emailBody, struct{ Name string }{Name: username})

	msg := gomail.NewMessage()
	msg.SetHeader("From", "mostafaelshahawy009@gmail.com")
	msg.SetHeader("To", userEmail)
	msg.SetHeader("Subject", "Byte-Books Order")
	msg.SetBody("text/html", emailBody.String())

	d := gomail.NewDialer("smtp.gmail.com", 587, "mostafaelshahawy009@gmail.com", "apdp gtab eyxc mdug")

	if err := d.DialAndSend(msg); err != nil {
		panic(err)
	}
	return nil
}
