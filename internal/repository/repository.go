package repository

import "github.com/ME/Byte-Books/internal/models"

type DatabaseRepo interface {
	CreateUser(user models.User) error
}
