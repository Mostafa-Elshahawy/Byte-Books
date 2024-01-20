package repository

import "github.com/ME/Byte-Books/internal/models"

type DatabaseRepo interface {
	AddUser(user *models.User) (uint, error)
	Getuser(email string) (models.User, error)
	Authenticate(email, password string) (uint, string, error)
	InsertProduct(product *models.Product) error
	UpdateProduct(product *models.Product) (*models.Product, error)
	GetAllProducts() ([]models.Product, error)
	DeleteProduct(id int) error
	GetProdByID(id int) (models.Product, error)
	GetUserCart(userID interface{}) ([]models.Cart, error)
	AddToCart(userID interface{}, productID int, quantity int) error
	DeleteFromCart(userID interface{}, productID int) error
}
