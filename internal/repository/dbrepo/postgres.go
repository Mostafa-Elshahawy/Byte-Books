package dbrepo

import (
	"context"
	"time"

	"github.com/ME/Byte-Books/internal/models"
)

func (d *postgresDBRepo) CreateUser(user models.User) error {

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
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
