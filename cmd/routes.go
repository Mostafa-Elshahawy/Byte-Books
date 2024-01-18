package main

import (
	"github.com/ME/Byte-Books/internal/auth"
	"github.com/ME/Byte-Books/internal/handlers"
	"github.com/labstack/echo/v4"
)

func Routers(mux *echo.Echo) {
	mux.POST("/signup", handlers.Repo.Signup)
	mux.POST("/login", handlers.Repo.Login)
	mux.POST("/logout", handlers.Repo.Logout, Auth)
	mux.GET("/products/all", handlers.Repo.ShowAllProducts)
	mux.POST("/products/create", handlers.Repo.CreateProduct, Auth)
	mux.PATCH("/products/update/:id", handlers.Repo.UpdateItem, Auth)
	mux.DELETE("/products/delete/:id", handlers.Repo.DeleteItem, Auth)
	mux.GET("/auth/google/callback", auth.GetAuthCallback)

}
