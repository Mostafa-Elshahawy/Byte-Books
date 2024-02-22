package handlers

import (
	"net/http"
	"strconv"

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

func (r *Repository) UpdateItem(c echo.Context) error {
	itemID, _ := strconv.Atoi(c.Param("id"))
	var product models.Product
	if err := c.Bind(&product); err != nil {
		return c.JSON(echo.ErrBadRequest.Code, err)
	}

	prod, err := r.DB.GetProdByID(itemID)
	if err != nil {
		return c.JSON(echo.ErrInternalServerError.Code, "could not get item")
	}

	item, err := r.DB.UpdateProduct(&prod)
	if err != nil {
		return c.JSON(echo.ErrInternalServerError.Code, echo.Map{
			"error": err,
		})
	}

	return c.JSON(http.StatusOK, echo.Map{
		"message": item,
	})
}

func (r *Repository) ShowAllProducts(c echo.Context) error {
	products, err := r.DB.GetAllProducts()
	if err != nil {
		return c.JSON(echo.ErrInternalServerError.Code, "could not load products")
	}

	return c.JSON(http.StatusOK, echo.Map{
		"message": products,
	})
}

func (r *Repository) DeleteItem(c echo.Context) error {
	itemID, _ := strconv.Atoi(c.Param("id"))
	err := r.DB.DeleteProduct(itemID)
	if err != nil {
		return c.JSON(echo.ErrNotFound.Code, echo.Map{
			"error": "item not found",
		})
	}
	return c.JSON(http.StatusOK, "product deleted successfully")
}