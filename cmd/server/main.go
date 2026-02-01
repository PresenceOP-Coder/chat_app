package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"

	"github.com/PresenceOP-Coder/go-chat-server/internal/database"
	"github.com/PresenceOP-Coder/go-chat-server/internal/ws"
	"github.com/joho/godotenv"
)

func handleHistory(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	messages, err := database.GetMessages()
	if err != nil {
		http.Error(w, "could not get messages", http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(messages)
}

func main() {
	// Load .env file
	godotenv.Load()

	mongoURI := os.Getenv("MONGODB_URI")
	if mongoURI == "" {
		log.Fatal("MONGODB_URI environment variable not set")
	}
	//databse init
	database.InitMongoDB(mongoURI, "chat_app")

	// init the websocket hub
	hub := ws.Newhub()

	go hub.Run()

	// webscoket route

	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		username := r.URL.Query().Get("username")
		if username == "" {
			username = "Anonymous"
		}
		ws.ServeWs(hub, w, r, username)
	})
	http.HandleFunc("/history", handleHistory)
	http.HandleFunc("/register", handleRegister)
	http.HandleFunc("/login", handleLogin)

	// Serve React build as the landing page
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path == "/" {
			http.ServeFile(w, r, "./frontend/dist/index.html")
			return
		}
		// Serve other static files from dist
		http.FileServer(http.Dir("./frontend/dist")).ServeHTTP(w, r)
	})
	// start the server
	log.Println("Server starting on : 8080")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal("Listen and serve:", err)
	}

}
