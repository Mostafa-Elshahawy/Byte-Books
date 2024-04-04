FROM golang:1.21.5-alpine AS builder

WORKDIR /app/backend/cmd

COPY . .

COPY .env /app/backend/cmd/.env

RUN go mod tidy

#ENTRYPOINT [ "go","run","*.go" ]


# FROM golang:1.21.5-alpine AS builder

# WORKDIR /app/backend/cmd

# COPY . .

# COPY .env /app/backend/cmd/.env

# RUN  go mod tidy

# RUN CGO_ENABLED=0 GOOS=linux go build -o /backend

# FROM golang:1.21.5-alpine

# COPY --from=builder /backend /backend

# ENTRYPOINT [ "/backend" ]





# syntax=docker/dockerfile:1

# Build the application from source
# FROM golang:1.19 AS build-stage

# WORKDIR /app

# COPY go.mod go.sum ./
# RUN go mod download

# COPY *.go ./

# RUN CGO_ENABLED=0 GOOS=linux go build -o /docker-gs-ping

# # Run the tests in the container
# FROM build-stage AS run-test-stage
# RUN go test -v ./...

# # Deploy the application binary into a lean image
# FROM gcr.io/distroless/base-debian11 AS build-release-stage

# WORKDIR /

# COPY --from=build-stage /docker-gs-ping /docker-gs-ping

# EXPOSE 8080

# USER nonroot:nonroot

# ENTRYPOINT ["/docker-gs-ping"]