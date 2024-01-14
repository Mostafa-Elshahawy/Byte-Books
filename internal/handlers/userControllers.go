package handlers

import (
	"net/http"

	"github.com/ME/Byte-Books/internal/models"
	"github.com/asaskevich/govalidator"
	"github.com/labstack/echo/v4"
	"golang.org/x/crypto/bcrypt"
)

func (r *Repository) Signup(c echo.Context) error {
	user := new(models.User)
	if err := c.Bind(user); err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{
			"message": "user already exists",
		})
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(user.Password), 12)
	if err != nil {
		return c.JSON(http.StatusBadRequest, "could not hash password")
	}

	user = &models.User{Username: user.Username, Email: user.Email, Password: string(hash), Phone: user.Phone, Address: user.Address}

	if !govalidator.IsExistingEmail(user.Email) {
		return c.JSON(http.StatusBadRequest, "enter valid email")
	}

	if !govalidator.IsNotNull(user.Username) || !govalidator.IsNotNull(user.Email) || !govalidator.IsNotNull(user.Password) {
		return c.JSON(echo.ErrBadRequest.Code, "this filed can't be blank")
	}

	userErr := r.DB.AddUser(user)
	if userErr != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{
			"error": "could not create user",
		})
	}
	return c.JSON(http.StatusOK, user)
}
