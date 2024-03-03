# Byte Books

A fully functioning model for an online book store (E-commerce website).

- Written in Go 1.21 for backend and React, Material UI for frontend
- Uses repository pattern for isolating web handlers and database functions
- Back-end packages: [Echo framework](https://github.com/labstack/echo) for routing and APIs
- [PGX](https://github.com/jackc/pgx)  postgres database driver
- [Gorilla sessions](https://github.com/gorilla/sessions), [Goth](https://github.com/markbates/goth) for authenticating users and google login
- [Gomail](https://github.com/go-gomail/gomail) for sending emails to the user's Google account

## Features
- Complete authentication and authorization validation for users and admin using sessions
- Admin dashboard for adding, updating, and removing products
- Ability to log in using a Google account
- Very appealing and easy to deal with interface
- Sending emails to users on checking out an order for confirmation
