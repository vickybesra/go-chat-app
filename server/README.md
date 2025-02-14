<h1 align="center">GoChatApp's Backend</h1>
<br/>

## Technologies used
* Golang (Fiber)
* Postgres SQL
* Websocket
* Docker

## Installation

> GoChatApp requires [Golang](https://go.dev) and [Docker](https://docs.docker.com/get-docker) installed on your system.

Run postgres in docker and create db.

```sh
cd server
make postgresinit #start docker container running postgres
make createdb #create a db 
make migrateup #apply migration file to db
```

Install the dependencies and start the server.

```sh
cd server
go mod download #download dependencies
go mod tidy
go run cmd/main.go #start server
```
> Change .env file according to your preference.
