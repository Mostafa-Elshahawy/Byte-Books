package main

import (
	"net/http"

	"github.com/ME/Byte-Books/internal/auth"
	"github.com/labstack/echo/v4"
)

func Auth(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		session, err := auth.Store.Get(c.Request(), "session_id")
		if err != nil || session.Values["authenticated"] != true {
			return c.JSON(http.StatusUnauthorized, "unautherized")
		}
		return next(c)
	}
}
