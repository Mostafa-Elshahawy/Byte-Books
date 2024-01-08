package main

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func Routers(mux *echo.Echo) {
	mux.POST("/echo", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
	})
}
