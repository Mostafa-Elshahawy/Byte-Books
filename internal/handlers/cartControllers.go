package handlers

import (
	"net/http"

	"github.com/ME/Byte-Books/internal/auth"
	"github.com/labstack/echo/v4"
)

// func (r *Repository) AddToCart(c echo.Context) error {

// }
// func (r *Repository) RemoveFromCart(c echo.Context) error {

// }
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
