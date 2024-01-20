package dbrepo

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/ME/Byte-Books/internal/models"
	"golang.org/x/crypto/bcrypt"
)

// AddUser: adds the user entity to the database
func (d *postgresDBRepo) AddUser(user *models.User) (uint, error) {

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var id uint

	stmt := `INSERT INTO users (username, email, password, phone, address, is_admin, created_at, updated_at)
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`

	err := d.DB.QueryRowContext(ctx, stmt,
		user.Username,
		user.Email,
		user.Password,
		user.Phone,
		user.Address,
		user.IsAdmin,
		time.Now(),
		time.Now(),
	).Scan(&id)

	if err != nil {
		return 0, err
	}

	query := `SELECT * FROM users WHERE id = $1`
	row := d.DB.QueryRow(query, id)
	err = row.Scan(&user.ID, &user.Username, &user.Email, &user.Password, &user.Phone, &user.Address, &user.IsAdmin, &user.Created_at, &user.Updated_at)

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
	err := row.Scan(&user.ID, &user.Username, &user.Email, &user.Password, &user.Phone, &user.Address, &user.IsAdmin, &user.Created_at, &user.Updated_at)

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

func (d *postgresDBRepo) UpdateProduct(product *models.Product) (*models.Product, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	stmt := `UPDATE products set name = $1, description =$2, image = $3, auther = $4, price = $5, quantity =$6, updated_at = $7`

	_, err := d.DB.ExecContext(ctx, stmt,
		product.Name,
		product.Description,
		product.Image,
		product.Auther,
		product.Price,
		product.Quantity,
		time.Now(),
	)

	if err != nil {
		return product, err
	}

	return product, nil
}

func (d *postgresDBRepo) GetAllProducts() ([]models.Product, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var products []models.Product
	stmt := `SELECT * FROM products`
	rows, err := d.DB.QueryContext(ctx, stmt)
	if err != nil {
		return products, err
	}
	defer rows.Close()

	for rows.Next() {
		var product models.Product
		if err := rows.Scan(&product.ID, &product.Name, &product.Description, &product.Image, &product.Auther, &product.Price, &product.Quantity, &product.Created_at, &product.Updated_at); err != nil {
			return products, err
		}
		products = append(products, product)
	}

	return products, err
}

func (d *postgresDBRepo) DeleteProduct(id int) error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var exists bool
	err := d.DB.QueryRow("SELECT EXISTS (SELECT 1 FROM products WHERE id=$1)", id).Scan(&exists)
	if err != nil {
		log.Println(err)
	}

	if !exists {
		return errors.New("product doesn't exist")
	}

	stmt := `DELETE FROM products WHERE id = $1`
	_, err = d.DB.ExecContext(ctx, stmt, id)
	if err != nil {
		return err
	}
	return nil
}

func (d *postgresDBRepo) GetProdByID(id int) (models.Product, error) {
	var product models.Product
	stmt := `SELECT * FROM products WHERE id =$1`
	err := d.DB.QueryRow(stmt, id).Scan(&product.ID, &product.Name, &product.Description, &product.Image, &product.Auther, &product.Price, &product.Quantity, &product.Created_at, &product.Updated_at)
	if err != nil {
		return product, err
	}
	return product, nil

}

func (d *postgresDBRepo) GetUserCart(userID interface{}) ([]models.Cart, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	//var cart models.Cart
	//stmt := `SELECT * FROM cart WHERE user_id = $1`
	stmt := `SELECT c.id, c.user_id, c.product_id, c.quantity, c.created_at, c.updated_at,
	u.id, u.username, u.email, u.password, u.phone, u.address, u.is_admin, u.created_at, u.updated_at,
	p.id, p.name, p.description, p.image, p.auther, p.price, p.quantity, p.created_at, p.updated_at
	FROM cart c
	JOIN users u ON c.user_id = u.id
	JOIN products p ON c.product_id = p.id
	WHERE c.user_id = $1`
	// err := d.DB.QueryRowContext(ctx, stmt, userID).Scan(&cart.ID, &cart.UserID, &cart.ProductID, &cart.Quantity, &cart.Created_at, &cart.Updated_at)
	// if err != nil {
	// 	log.Println(err)
	// 	return cart, err
	// }
	// return cart, nil
	rows, err := d.DB.QueryContext(ctx, stmt, userID)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Query failed: %v\n", err)
		//return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to fetch user cart"})
	}
	defer rows.Close()

	var userCart []models.Cart

	for rows.Next() {
		var cart models.Cart
		var user models.User
		var product models.Product

		err := rows.Scan(
			&cart.ID, &cart.UserID, &cart.ProductID, &cart.Quantity, &cart.Created_at, &cart.Updated_at,
			&user.ID, &user.Username, &user.Email, &user.Password, &user.Phone, &user.Address, &user.IsAdmin, &user.Created_at, &user.Updated_at,
			&product.ID, &product.Name, &product.Description, &product.Image, &product.Auther, &product.Price, &product.Quantity, &product.Created_at, &product.Updated_at,
		)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error scanning row: %v\n", err)
			//return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to fetch user cart"})
		}

		cart.User = user
		cart.Product = append(cart.Product, product)
		userCart = append(userCart, cart)
	}
	return userCart, nil
}

func (d *postgresDBRepo) AddToCart(userID interface{}, productID int, quantity int) error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	query := `
		INSERT INTO cart (user_id, product_id, quantity, created_at, updated_at)
		VALUES ($1, $2, $3, $4, $5)
	`

	_, err := d.DB.ExecContext(ctx, query, userID, productID, quantity, time.Now(), time.Now())
	fmt.Println(err)
	if err != nil {
		return fmt.Errorf("failed to add item to cart: %v", err)
	}

	return nil
}

func (d *postgresDBRepo) DeleteFromCart(userID interface{}, productID int) error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	query := `DELETE FROM cart WHERE user_id =$1 AND product_id =$2`

	_, err := d.DB.ExecContext(ctx, query, userID, productID)
	if err != nil {
		return err
	}

	return nil
}
