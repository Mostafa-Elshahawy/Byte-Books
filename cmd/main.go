package main

import (
	"log"
	"os"

	"github.com/ME/Byte-Books/internal/database"
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
	DB, err := database.ConnectSQL(os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatal(err)
	}
	defer DB.SQL.Close()

	mux := echo.New()
	Routers(mux)
	mux.Logger.Fatal(mux.Start(":8000"))
}
