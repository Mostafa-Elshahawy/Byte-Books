package main

import (
	"log"
	"os"

	"github.com/ME/Byte-Books/internal/auth"
	"github.com/ME/Byte-Books/internal/driver"
	"github.com/ME/Byte-Books/internal/handlers"
	"github.com/joho/godotenv"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

}

func main() {
	DB, err := driver.ConnectSQL(os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatal(err)
	}
	defer DB.SQL.Close()

	repo := handlers.NewRepo(DB)
	handlers.NewHandlers(repo)
	auth.GoogleAuth()
	mux := echo.New()
	mux.Use(middleware.Logger())
	mux.Use(middleware.Recover())
	mux.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{echo.GET, echo.PUT, echo.POST, echo.DELETE, echo.PATCH, echo.PUT},
		AllowHeaders:     []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
		AllowCredentials: true,
	}))
	mux.Use(session.MiddlewareWithConfig(session.Config{
		Store: auth.Store,
	}))
	Routers(mux)
	log.Fatal(mux.Start(":8000"))
}
