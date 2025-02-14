package main

import (
	"log"

	"github.com/milinddethe15/chat-server/db"
	"github.com/milinddethe15/chat-server/internal/user"
	"github.com/milinddethe15/chat-server/internal/ws"
	"github.com/milinddethe15/chat-server/router"
)

func main() {
	dbConn, err := db.NewDatabase()
	if err != nil {
		log.Fatalf("could not initialize database connection: %s", err)
	}

	userRep := user.NewRepository(dbConn.GetDB())
	userSvc := user.NewService(userRep)
	userHandler := user.NewHandler(userSvc)

	hub := ws.NewHub()
	wsHandler := ws.NewHandler(hub)
	go hub.Run()

	router.InitRouter(userHandler, wsHandler)
	router.Start("0.0.0.0:8080")
}
