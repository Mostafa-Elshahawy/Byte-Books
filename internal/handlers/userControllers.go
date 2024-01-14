package handlers

import (
	"encoding/gob"
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

	if !govalidator.IsNotNull(user.Username) || !govalidator.IsNotNull(user.Email) || !govalidator.IsNotNull(user.Password) {
		return c.JSON(echo.ErrBadRequest.Code, "this filed can't be blank")
	}

	userErr := r.DB.AddUser(user)
	if userErr != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{
			"error": "user already exists",
		})
	}
	return c.JSON(http.StatusOK, user)
}

func (r *Repository) Login(c echo.Context) error {
	gob.Register(models.User{})
	var userReq models.User
	usererr := c.Bind(&userReq)
	if usererr != nil {
		return c.JSON(echo.ErrInternalServerError.Code, "something went wrong")
	}

	user, err := r.DB.Getuser(userReq.Email)
	if err != nil {
		c.JSON(echo.ErrInternalServerError.Code, echo.Map{
			"message": "could not get user",
		})
	}

	if user.ID == 0 {
		c.JSON(echo.ErrBadRequest.Code, echo.Map{
			"message": "user doesn't exist",
		})
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(userReq.Password))
	if err != nil {
		c.JSON(echo.ErrBadRequest.Code, echo.Map{
			"error": "incorrect password",
		})
	}

	if err == nil {
		session, _ := Store.Get(c.Request(), "session_id")

		session.Options = &sessions.Options{
			MaxAge:   86400 * 7,
			HttpOnly: true,
			Secure:   false,
		}

		session.Values["user"] = user
		err = sessions.Save(c.Request(), c.Response())
		if err != nil {
			c.JSON(echo.ErrInternalServerError.Code, echo.Map{
				"message": "something went wrong with session",
			})
		}
	}

	return c.JSON(http.StatusOK, echo.Map{
		"message": "logged in successfully as " + user.Username,
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
