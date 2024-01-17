package dbrepo

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"time"

	"github.com/ME/Byte-Books/internal/models"
	"golang.org/x/crypto/bcrypt"
)

// AddUser: adds the user entity to the database
func (d *postgresDBRepo) AddUser(user *models.User) (uint, error) {

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var id uint

	stmt := `INSERT INTO users (username, email, password, phone, address, access_level, created_at, updated_at)
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`

	err := d.DB.QueryRowContext(ctx, stmt,
		user.Username,
		user.Email,
		user.Password,
		user.Phone,
		user.Address,
		user.AccessLevel,
		time.Now(),
		time.Now(),
	).Scan(&id)

	if err != nil {
		return 0, err
	}

	query := `SELECT * FROM users WHERE id = $1`
	row := d.DB.QueryRow(query, id)
	err = row.Scan(&user.ID, &user.Username, &user.Email, &user.Password, &user.Phone, &user.Address, &user.AccessLevel, &user.Created_at, &user.Updated_at)

	if err != nil {
		return 0, err
	}

	return id, nil
}

// Getuser: get the user from the database by the email
func (d *postgresDBRepo) Getuser(email string) (models.User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	user := models.User{}
	stmt := `SELECT * FROM users WHERE email = $1`
	row := d.DB.QueryRowContext(ctx, stmt, email)
	err := row.Scan(&user.ID, &user.Username, &user.Email, &user.Password, &user.Phone, &user.Address, &user.AccessLevel, &user.Created_at, &user.Updated_at)

	switch {
	case err == sql.ErrNoRows:
		return models.User{}, fmt.Errorf("user not found")
	case err != nil:
		return models.User{}, err
	default:
		return user, nil
	}
}

func (d *postgresDBRepo) Authenticate(email, password string) (uint, string, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var id uint
	var hash string

	stmt := `SELECT id, password FROM users WHERE email = $1`
	row := d.DB.QueryRowContext(ctx, stmt, email)
	err := row.Scan(&id, &hash)
	if err != nil {
		return id, "", err
	}

	err = bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	if err == bcrypt.ErrMismatchedHashAndPassword {
		return 0, "", errors.New("incorrect password")
	} else if err != nil {
		return 0, "", err
	}

	return id, hash, nil
}

func (d *postgresDBRepo) InsertProduct(product *models.Product) error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var id uint
	stmt := `INSERT INTO products (name, description, image, auther, price, quantity, created_at, updated_at)
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`

	err := d.DB.QueryRowContext(ctx, stmt,
		product.Name,
		product.Description,
		product.Image,
		product.Auther,
		product.Price,
		product.Quantity,
		time.Now(),
		time.Now(),
	).Scan(&id)

	if err != nil {
		return err
	}

	query := `SELECT * FROM products WHERE id = $1`
	row := d.DB.QueryRow(query, id)
	err = row.Scan(&product.ID, &product.Name, &product.Description, &product.Image, &product.Auther, &product.Price, &product.Quantity, &product.Created_at, &product.Updated_at)

	if err != nil {
		return err
	}

	return nil
}
