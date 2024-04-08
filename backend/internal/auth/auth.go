package auth

import (
	"context"
	"encoding/json"
	"net/http"
	"os"

	"github.com/gorilla/sessions"
	"github.com/labstack/echo/v4"
	"github.com/markbates/goth/providers/google"
	"golang.org/x/oauth2"
)

var Store = sessions.NewCookieStore([]byte("super secret key"))

var (
	OauthConfig *oauth2.Config
	OauthState  string = "randomString"
)

func GoogleAuth() {
	Store.MaxAge(86400 * 7)
	Store.Options.HttpOnly = true
	Store.Options.Secure = false

	OauthConfig = &oauth2.Config{
		ClientID:     os.Getenv("GOOGLE_CLIENT_ID"),
		ClientSecret: os.Getenv("GOOGLE_CLIENT_SECRET"),
		RedirectURL:  "http://localhost:8000/auth/google/callback",
		Scopes:       []string{"profile", "email", "openid"},
		Endpoint:     google.Endpoint,
	}
}

func RedirectToGoogle(c echo.Context) error {
	url := OauthConfig.AuthCodeURL(OauthState)
	return c.Redirect(http.StatusTemporaryRedirect, url)
}

func GetUserInfo(accessToken string) (map[string]interface{}, error) {
	userInfo := make(map[string]interface{})

	// Create HTTP client with OAuth token
	client := OauthConfig.Client(context.Background(), &oauth2.Token{AccessToken: accessToken})

	// Fetch user information from Google API
	resp, err := client.Get("https://www.googleapis.com/oauth2/v2/userinfo")
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	// Parse JSON response
	decoder := json.NewDecoder(resp.Body)
	if err := decoder.Decode(&userInfo); err != nil {
		return nil, err
	}
	return userInfo, nil
}
