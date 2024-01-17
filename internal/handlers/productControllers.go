package handlers

import (
	"net/http"

	"github.com/ME/Byte-Books/internal/models"
	"github.com/labstack/echo/v4"
)

func (r *Repository) CreateProduct(c echo.Context) error {
	var product models.Product
	if err := c.Bind(&product); err != nil {
		return c.JSON(echo.ErrBadRequest.Code, echo.Map{
			"error": "could not read product info",
		})
	}

	err := r.DB.InsertProduct(&product)
	if err != nil {
		return c.JSON(echo.ErrBadRequest.Code, echo.Map{
			"error": err,
		})
	}

	return c.JSON(http.StatusCreated, product)

}
