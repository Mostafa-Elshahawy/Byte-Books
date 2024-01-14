package dbrepo

import (
	"context"
	"time"

	"github.com/ME/Byte-Books/internal/models"
)

// AddUser: adds the user entity to the database
func (d *postgresDBRepo) AddUser(user *models.User) error {

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	stmt := `INSERT INTO users (username, email, password, phone, address, access_level, created_at, updated_at)
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`

	_, err := d.DB.ExecContext(ctx, stmt,
		user.Username,
		user.Email,
		user.Password,
		user.Phone,
		user.Address,
		user.AccessLevel,
		time.Now(),
		time.Now(),
	)

	if err != nil {
		return err
	}

	return nil
}
