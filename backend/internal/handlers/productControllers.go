package handlers

import (
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strconv"

	"github.com/ME/Byte-Books/internal/models"
	"github.com/labstack/echo/v4"
)

func (r *Repository) CreateProduct(c echo.Context) error {
	product := new(models.Product)
	if err := c.Bind(product); err != nil {
		return c.JSON(echo.ErrBadRequest.Code, echo.Map{
			"error": err,
		})
	}

	newProduct := &models.Product{
		Name:        product.Name,
		Description: product.Description,
		Image:       product.Image,
		Author:      product.Author,
		Price:       product.Price,
		Quantity:    product.Quantity,
	}

	err := r.DB.InsertProduct(newProduct)
	if err != nil {
		return c.JSON(echo.ErrBadRequest.Code, echo.Map{
			"error": err,
		})
	}

	return c.JSON(http.StatusCreated, newProduct)

}

func (r *Repository) UpdateItem(c echo.Context) error {
	itemID, _ := strconv.Atoi(c.Param("id"))
	var product models.Product
	if err := c.Bind(&product); err != nil {
		return c.JSON(echo.ErrBadRequest.Code, err)
	}

	err := r.DB.UpdateProduct(itemID, &product)
	if err != nil {
		return c.JSON(echo.ErrInternalServerError.Code, echo.Map{
			"error": err,
		})
	}
	prod, err := r.DB.GetProdByID(itemID)
	if err != nil {
		return c.JSON(echo.ErrInternalServerError.Code, "could not get item")
	}

	return c.JSON(http.StatusOK, prod)
}

func (r *Repository) ShowAllProducts(c echo.Context) error {
	products, err := r.DB.GetAllProducts()
	if err != nil {
		return c.JSON(echo.ErrInternalServerError.Code, "could not load products")
	}

	return c.JSON(http.StatusOK, products)

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

func (r *Repository) UploadImage(c echo.Context) error {
	image, err := c.FormFile("image")
	if err != nil {
		return c.JSON(echo.ErrBadRequest.Code, echo.Map{
			"error": "failed to upload image",
		})
	}

	src, err := image.Open()
	if err != nil {
		return err
	}
	defer src.Close()
	dstPath := filepath.Join("./../byte-books-frontend/public/images", image.Filename)

	dst, err := os.Create(dstPath)
	if err != nil {
		return err
	}
	defer dst.Close()

	if _, err = io.Copy(dst, src); err != nil {
		return err
	}
	return c.JSON(http.StatusOK, echo.Map{
		"image":   image.Filename,
		"message": "image uploaded successfully",
	})
}

func (r *Repository) GetProductById(c echo.Context) error {
	var prod models.Product
	prodId, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(echo.ErrInternalServerError.Code, "could not get the product id")
	}
	prod, err = r.DB.GetProdByID(prodId)
	if err != nil {
		return c.JSON(echo.ErrNotFound.Code, "product not found")
	}
	return c.JSON(http.StatusOK, prod)
}
