package repository

import "github.com/ME/Byte-Books/internal/models"

type DatabaseRepo interface {
	AddUser(user *models.User) error
	Getuser(email string) (models.User, error)
}
