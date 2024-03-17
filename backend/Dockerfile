FROM golang:1.21.5-alpine AS builder

WORKDIR /app

COPY . .

ENV GOPATH=/app

RUN go mod tidy

RUN go run cmd/*.go