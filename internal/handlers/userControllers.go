package handlers

import (
	"encoding/gob"
	"net/http"

	"github.com/ME/Byte-Books/internal/auth"
	"github.com/ME/Byte-Books/internal/models"
	"github.com/asaskevich/govalidator"
	"github.com/gorilla/sessions"
	"github.com/labstack/echo/v4"
	"golang.org/x/crypto/bcrypt"
)

func (r *Repository) Signup(c echo.Context) error {
	var data map[string]string
	if err := c.Bind(&data); err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{
			"message": "could not read user data",
		})
	}

	found := govalidator.IsNotNull(data["username"]) && govalidator.IsNotNull(data["email"]) && govalidator.IsNotNull(data["password"])
	if !found {
		return c.JSON(echo.ErrBadRequest.Code, echo.Map{
			"error": "this filed can't be blank",
		})
	}

	if !govalidator.IsExistingEmail(data["email"]) {
		return c.JSON(http.StatusBadRequest, "enter valid email")
	}

	hashedPass, err := bcrypt.GenerateFromPassword([]byte(data["password"]), 12)
	if err != nil {
		return c.JSON(http.StatusBadRequest, "could not hash password")
	}

	user := &models.User{
		Username: data["username"],
		Email:    data["email"],
		Password: string(hashedPass),
		Phone:    data["phone"],
		Address:  data["address"],
	}

	_, dberr := r.DB.AddUser(user)
	if dberr != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{
			"error": dberr,
		})
	}

	return c.JSON(http.StatusCreated, user)
}

func (r *Repository) Login(c echo.Context) error {
	gob.Register(models.User{})
	var data map[string]string
	err := c.Bind(&data)
	if err != nil {
		return c.JSON(echo.ErrInternalServerError.Code, "something went wrong")
	}

	found := govalidator.IsNotNull(data["password"]) && govalidator.IsNotNull(data["email"])
	if !found {
		return c.JSON(echo.ErrBadRequest.Code, "enter your full credentials")
	}

	id, _, err := r.DB.Authenticate(data["email"], data["password"])
	if err != nil {
		return c.JSON(echo.ErrBadRequest.Code, echo.Map{
			"message": "wrong credentials or user not found",
		})
	}

	session, err := auth.Store.Get(c.Request(), "session_id")
	if err != nil {
		return c.JSON(echo.ErrInternalServerError.Code, "could not get session")
	}

	session.Values["user_id"] = id
	session.Values["user_email"] = data["email"]
	session.Values["username"] = data["username"]
	err = sessions.Save(c.Request(), c.Response())
	if err != nil {
		return c.JSON(echo.ErrInternalServerError.Code, echo.Map{
			"message": "something went wrong with session",
		})
	}

	return c.JSON(http.StatusOK, echo.Map{
		"message": "logged in successfully",
	})
}

func (r *Repository) Logout(c echo.Context) error {
	session, _ := auth.Store.Get(c.Request(), "session_id")
	session.Options.MaxAge = -10
	session.Save(c.Request(), c.Response())

	return c.JSON(http.StatusOK, echo.Map{
		"message": "logged out",
	})
}
