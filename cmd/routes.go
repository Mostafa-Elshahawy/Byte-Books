package main

import (
	"github.com/ME/Byte-Books/internal/handlers"
	"github.com/labstack/echo/v4"
)

func Routers(mux *echo.Echo) {
	mux.POST("/signup", handlers.Repo.Signup)
}
