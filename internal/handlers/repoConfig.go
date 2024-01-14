package handlers

import (
	"log"

	"github.com/ME/Byte-Books/internal/driver"
	"github.com/ME/Byte-Books/internal/repository"
	"github.com/ME/Byte-Books/internal/repository/dbrepo"
)

// Repo the repository used by the handlers
var Repo *Repository

// Repository is the repository type
type Repository struct {
	DB repository.DatabaseRepo
}

// NewRepo creates a new repository
func NewRepo(db *driver.DB) *Repository {
	if db.SQL == nil {
		log.Fatal("Database connection is nil.")
	}
	return &Repository{
		DB: dbrepo.NewPostgresRepo(db.SQL),
	}
}

// NewHandlers sets the repository for the handlers
func NewHandlers(r *Repository) {
	Repo = r
}
