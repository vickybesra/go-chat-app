include .env
postgresinit:
	docker run --name postgres-db -e  POSTGRES_USER=$(POSTGRES_USER) -e POSTGRES_PASSWORD=$(POSTGRES_PASSWORD) -p 5432:5432 -d postgres

postgres:
	docker exec -it postgres-db psql

createdb:
	docker exec -it postgres-db createdb --username=$(POSTGRES_USER) --owner=$(POSTGRES_USER) $(DBNAME)

dropdb:
	docker exec -it postgres-db dropdb go-chat

migrateup:
	migrate -path db/migrations -database "postgresql://root:password@localhost:5432/go-chat?sslmode=disable" -verbose up

migratedown:
	migrate -path db/migrations -database "postgresql://$(POSTGRES_USER):$(POSTGRES_PASSWORD)@localhost:5432/go-chat?sslmode=disable" -verbose down

.PHONY: postgresinit postgres createdb dropdb migrateup migratedown