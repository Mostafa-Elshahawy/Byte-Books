package handlers

import (
	"net/http"
	"strconv"

	"github.com/ME/Byte-Books/internal/auth"
	"github.com/ME/Byte-Books/internal/models"
	"github.com/labstack/echo/v4"
)

func (r *Repository) AddItemToCart(c echo.Context) error {
	session, err := auth.Store.Get(c.Request(), "session_id")
	if err != nil {
		return c.JSON(echo.ErrInternalServerError.Code, "could not get session")
	}
	userID := session.Values["user_id"]
	productID, _ := strconv.Atoi(c.Param("id"))
	var productData models.Product
	err = c.Bind(&productData)
	if err != nil {
		return err
	}

	err = r.DB.AddToCart(userID, productID, productData.Quantity)
	if err != nil {
		return c.JSON(echo.ErrInternalServerError.Code, echo.Map{
			"error": "could not add item to cart",
		})
	}
	return c.JSON(http.StatusOK, "item added to your cart")

}

func (r *Repository) RemoveFromCart(c echo.Context) error {
	session, err := auth.Store.Get(c.Request(), "session_id")
	if err != nil {
		return c.JSON(echo.ErrInternalServerError.Code, "could not get session")
	}
	userID := session.Values["user_id"]
	productID, _ := strconv.Atoi(c.Param("id"))
	err = r.DB.DeleteFromCart(userID, productID)
	if err != nil {
		return c.JSON(echo.ErrInternalServerError.Code, echo.Map{
			"error": "something went wrong when removing item from cart",
		})
	}
	return c.JSON(http.StatusOK, "item removed from cart")
}

func (r *Repository) ShowCart(c echo.Context) error {
	session, err := auth.Store.Get(c.Request(), "session_id")
	if err != nil {
		return err
	}

	userID := session.Values["user_id"]

	cart, err := r.DB.GetUserCart(userID)
	if err != nil {
		return c.JSON(echo.ErrInternalServerError.Code, err)
	}
	return c.JSON(http.StatusOK, cart)
}
