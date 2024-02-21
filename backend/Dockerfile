FROM golang:1.21.5-alpine AS builder

WORKDIR /app

COPY . .

RUN go mod tidy
