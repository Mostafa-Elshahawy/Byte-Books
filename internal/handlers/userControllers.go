package handlers

import (
	"net/http"

	"github.com/ME/Byte-Books/internal/models"
	"github.com/asaskevich/govalidator"
	"github.com/gorilla/sessions"
	"github.com/labstack/echo/v4"
	"golang.org/x/crypto/bcrypt"
)

var Store = sessions.NewCookieStore([]byte("super secret key"))

func (r *Repository) Signup(c echo.Context) error {
	user := new(models.User)
	if err := c.Bind(user); err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{
			"message": "could not read user data",
		})
	}

	hashedPass, err := bcrypt.GenerateFromPassword([]byte(user.Password), 12)
	if err != nil {
		return c.JSON(http.StatusBadRequest, "could not hash password")
	}

	user = &models.User{Username: user.Username, Email: user.Email, Password: string(hashedPass), Phone: user.Phone, Address: user.Address}

	if !govalidator.IsExistingEmail(user.Email) {
		return c.JSON(http.StatusBadRequest, "enter valid email")
	}

	found := govalidator.IsNotNull(user.Username) && govalidator.IsNotNull(user.Email) && govalidator.IsNotNull(user.Password)
	if !found {
		return c.JSON(echo.ErrBadRequest.Code, echo.Map{
			"error": "this filed can't be blank",
		})
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

	userData := new(models.User)
	err := c.Bind(&userData)
	if err != nil {
		return c.JSON(echo.ErrInternalServerError.Code, "something went wrong")
	}

	id, _, err := r.DB.Authenticate(userData.Email, userData.Password)
	if err != nil {
		return c.JSON(echo.ErrInternalServerError.Code, echo.Map{
			"message": "user doesn't exist",
		})
	}

	session, _ := Store.Get(c.Request(), "session_id")

	session.Options = &sessions.Options{
		MaxAge:   86400 * 7,
		HttpOnly: true,
		Secure:   false,
	}

	session.Values["user_id"] = id
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
	session, _ := Store.Get(c.Request(), "session_id")
	session.Options.MaxAge = -10
	session.Save(c.Request(), c.Response())

	return c.JSON(http.StatusOK, echo.Map{
		"message": "logged out",
	})
}
