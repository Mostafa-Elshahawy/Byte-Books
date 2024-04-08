package main

import (
	"github.com/ME/Byte-Books/internal/auth"
	"github.com/ME/Byte-Books/internal/handlers"
	"github.com/labstack/echo/v4"
)

func Routers(mux *echo.Echo) {
	mux.POST("/signup", handlers.Repo.Signup)
	mux.POST("/login", handlers.Repo.Login)
	mux.POST("/logout", handlers.Repo.Logout)
	mux.GET("product/:id", handlers.Repo.GetProductById)
	mux.GET("/products/all", handlers.Repo.ShowAllProducts)
	mux.POST("/products/create", handlers.Repo.CreateProduct, Auth)
	mux.PATCH("/products/update/:id", handlers.Repo.UpdateItem, Auth)
	mux.DELETE("/products/delete/:id", handlers.Repo.DeleteItem, Auth)
	mux.GET("/user/cart", handlers.Repo.ShowCart, Auth)
	mux.POST("/cart/product/:id", handlers.Repo.AddItemToCart, Auth)
	mux.DELETE("/user/cart/product/:id", handlers.Repo.RemoveFromCart, Auth)
	mux.POST("/user/orders/checkout", handlers.Repo.Checkout, Auth)
	mux.GET("/user/orders", handlers.Repo.GetUserOrders, Auth)
	mux.POST("/admin/upload-image", handlers.Repo.UploadImage)
	mux.GET("/auth/google", auth.RedirectToGoogle)
	mux.GET("/auth/google/callback", handlers.Repo.HandleGoogleCallback)
}
