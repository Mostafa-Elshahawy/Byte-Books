package main

import (
	"log"
	"os"

	"github.com/ME/Byte-Books/internal/auth"
	"github.com/ME/Byte-Books/internal/driver"
	"github.com/ME/Byte-Books/internal/handlers"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
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

	Routers(mux)
	mux.Logger.Fatal(mux.Start(":8000"))
}
