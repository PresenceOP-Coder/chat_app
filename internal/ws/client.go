package ws

import (
	"context"
	"log"
	"net/http"
	"time"

	"github.com/PresenceOP-Coder/go-chat-server/internal/database"
	"github.com/gorilla/websocket"
)

const (
	//time allowed to write message to the peer
	writeWait = 10 * time.Second

	// time allowed to read next pong message from the peer
	pongWait = 60 * time.Second

	//send pings to peer with this period , must eb less than pongWait
	pingPeriod = (pongWait * 9) / 10

	//max mesage size allowed fron peer
	maxMessageSize = 512
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	//Important : Allow connections fron any origin
	CheckOrigin: func(r *http.Request) bool {
		return true

	},
}

// middleman betw the websocket connection and the hub
type Client struct {
	Hub *Hub
	// the webscoket connection
	Conn *websocket.Conn
	//buffered channel of outbound messages
	Send     chan []byte
	Username string
}

func (c *Client) WritePump() {
	ticker := time.NewTicker(pingPeriod)
	defer func() {
		ticker.Stop()
		c.Conn.Close()
	}()
	for {
		select {
		case message, ok := <-c.Send:
			c.Conn.SetWriteDeadline(time.Now().Add(writeWait))

			if !ok {
				c.Conn.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}
			w, err := c.Conn.NextWriter(websocket.TextMessage)
			if err != nil {
				return
			}
			w.Write(message)

			if err := w.Close(); err != nil {
				return
			}
		case <-ticker.C:
			c.Conn.SetWriteDeadline(time.Now().Add(writeWait))
			if err := c.Conn.WriteMessage(websocket.PingMessage, nil); err != nil {
				return
			}
		}
	}
}

// mesages from websocket to hub
func (c *Client) ReadPump() {
	defer func() {
		c.Hub.Unregister <- c
		c.Conn.Close()
	}()
	c.Conn.SetReadLimit(maxMessageSize)
	c.Conn.SetReadDeadline(time.Now().Add(pongWait))
	c.Conn.SetPongHandler(func(string) error { c.Conn.SetReadDeadline(time.Now().Add(pongWait)); return nil })
	for {
		_, textBytes, err := c.Conn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("error : %v", err)
			}
			break
		}
		msgObj := Message{
			Content:  string(textBytes),
			Username: c.Username,
			SendAt:   time.Now(),
		}

		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		_, err = database.MsgCollection.InsertOne(ctx, msgObj)
		cancel() //clean context

		if err != nil {
			log.Println("error saving message:", err)
		} else {
			log.Println("Message saved to db")
		}

		// send the message to the hub broadcast to everyone
		c.Hub.Broadcast <- textBytes
	}

}

// / servews handles websocket request from the peer
func ServeWs(hub *Hub, w http.ResponseWriter, r *http.Request, username string) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}
	client := &Client{Hub: hub, Conn: conn, Send: make(chan []byte, 256), Username: username}
	client.Hub.Register <- client
	//allow collection of memory by doing this in a new goroutine
	go client.WritePump()
	go client.ReadPump()
}

type Message struct {
	Content  string    `bson:"content" json:"content"`
	Username string    `bson:"username" json:"username"`
	SendAt   time.Time `bson:"send_at" json:"sencd_at"`
}
