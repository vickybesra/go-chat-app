package db

import (
	"database/sql"
	"log"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

func loadEnv() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
}

type Database struct {
	db *sql.DB
}

func NewDatabase() (*Database, error) {
	loadEnv()
	db, err := sql.Open("postgres", "postgresql://"+os.Getenv("POSTGRES_USER")+":"+os.Getenv("POSTGRES_PASSWORD")+"@localhost:"+os.Getenv("DBPORT")+"/"+os.Getenv("POSTGRES_DB")+"?sslmode=disable")
	if err != nil {
		return nil, err
	}

	return &Database{db: db}, nil
}

func (d *Database) Close() {
	d.db.Close()
}

func (d *Database) GetDB() *sql.DB {
	return d.db
}
