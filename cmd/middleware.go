package main

import (
	"net/http"

	"github.com/ME/Byte-Books/internal/handlers"
	"github.com/gorilla/sessions"
	"github.com/labstack/echo/v4"
)

func Auth(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		session, err := handlers.Store.Get(c.Request(), "session_id")
		if err != nil {
			return c.JSON(http.StatusInternalServerError, "could not get sessoin")
		}

		if !IsAuthenticated(session) {
			return c.JSON(echo.ErrUnauthorized.Code, "unautherized")
		}
		return next(c)
	}
}

func IsAuthenticated(session *sessions.Session) bool {
	userID := session.Values["user_id"]
	return userID != nil
}
