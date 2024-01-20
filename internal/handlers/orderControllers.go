package handlers

import (
	"net/http"

	"github.com/ME/Byte-Books/internal/auth"
	"github.com/ME/Byte-Books/internal/models"
	"github.com/labstack/echo/v4"
)

func (r *Repository) Checkout(c echo.Context) error {
	session, err := auth.Store.Get(c.Request(), "session_id")
	if err != nil {
		return c.JSON(echo.ErrInternalServerError.Code, "could not get session")
	}
	userID := session.Values["user_id"]

	// Retrieve items from the user's cart
	userCart, err := r.DB.GetUserCart(userID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to fetch user cart"})
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
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to add items to order"})
	}

	// Optionally, you can clear the user's cart after the order is placed
	err = r.DB.ClearUserCart(userID)
	if err != nil {
		return c.JSON(echo.ErrInternalServerError.Code, echo.Map{
			"error": "could not clear user cart",
		})
	}

	return c.JSON(http.StatusOK, echo.Map{
		"message": "order placed successfully",
		"order":   orderDetails,
	})
}
