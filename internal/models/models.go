package models

import "time"

type User struct {
	ID         uint      `json:"id"`
	Username   string    `json:"username"`
	Email      string    `json:"email"`
	Password   string    `json:"pasword"`
	Phone      string    `json:"phone"`
	Address    string    `json:"address"`
	IsAdmin    bool      `json:"is_admin"`
	Created_at time.Time `json:"created_at"`
	Updated_at time.Time `json:"updated_at"`
}

type Product struct {
	ID          uint      `json:"id"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	Image       string    `json:"image"`
	Auther      string    `json:"auther"`
	Price       float64   `json:"price"`
	Quantity    int       `json:"quantity"`
	Created_at  time.Time `json:"created_at"`
	Updated_at  time.Time `json:"updated_at"`
}

type Category struct {
	ID           uint      `json:"id"`
	CategoryName string    `json:"category_name"`
	Created_at   time.Time `json:"created_at"`
	Updated_at   time.Time `json:"updated_at"`
}

type ProductCategory struct {
	ProductID  uint `json:"product_id"`
	CategoryID uint `json:"category_id"`
	Product    Product
	Category   Category
}

type Cart struct {
	ID        uint    `json:"id"`
	UserID    uint    `json:"user_id"`
	ProductID uint    `json:"product_id"`
	Quantity  float64 `json:"quantity"`
	User      User
	Product   []Product
}

type Order struct {
	ID         uint    `json:"id"`
	UserID     uint    `json:"user_id"`
	TotalPrice float64 `json:"total_price"`
	Status     string  `json:"status"`
	User       User
	Created_at time.Time `json:"created_at"`
	Updated_at time.Time `json:"updated_at"`
}

type OrderItem struct {
	ProductID uint    `json:"product_id"`
	OrderID   uint    `json:"order_id"`
	Price     float64 `json:"price"`
	Quantity  int     `json:"quantity"`
	Product   Product
	Order     Order
}
