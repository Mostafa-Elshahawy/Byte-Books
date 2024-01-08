package main

import (
	"github.com/labstack/echo/v4"
)

func main() {
	mux := echo.New()
	Routers(mux)
	mux.Logger.Fatal(mux.Start(":8000"))
}
