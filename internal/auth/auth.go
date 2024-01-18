package auth

import (
	"log"
	"net/http"
	"os"

	"github.com/gorilla/sessions"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/markbates/goth"
	"github.com/markbates/goth/gothic"
	"github.com/markbates/goth/providers/google"
)

var Store = sessions.NewCookieStore([]byte(os.Getenv("SESSION_KEY")))

func GoogleAuth() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("could not get .env vars")
	}

	Store.MaxAge(154 * 5)
	Store.Options.HttpOnly = true
	Store.Options.Secure = false
	googleClientID := os.Getenv("GOOGLE_CLIENT_ID")
	googleClientSecret := os.Getenv("GOOGLE_CLIENT_SECRET")

	gothic.Store = Store
	goth.UseProviders(
		google.New(googleClientID, googleClientSecret, "http://localhost:8000/auth/google/callback"),
	)
}

func GetAuthCallback(c echo.Context) error {
	user, err := gothic.CompleteUserAuth(c.Response().Writer, c.Request())
	if err != nil {
		return err

	}
	return c.JSON(http.StatusOK, user)
}
