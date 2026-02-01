package database

import (
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// this allow our other part of app to access db funcnalities
var MsgCollection *mongo.Collection
var UserCollection *mongo.Collection

func InitMongoDB(uri string, dbName string) {
	//1 set client options
	clientOptions := options.Client().ApplyURI(uri)

	//2 connect to mongodb
	//time out is used for producion level code
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, clientOptions)

	if err != nil {
		log.Fatal("Could not create MongoDB", err)
	}
	//3 ping the database to verify the connection is live ..

	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatal("Could not create MongoDB", err)
	}
	fmt.Println("Connected to MongoDb")

	//4 we will store everything in db chat_db and collection messages
	MsgCollection = client.Database(dbName).Collection("Messages")
	UserCollection = client.Database(dbName).Collection("users")
}

func GetMessages() ([]Message, error) {
	var messages []Message

	///find the last 50 messages , sorted by time
	// bson.D{{}} is an empty filter (get evrything)

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	cursor, err := MsgCollection.Find(ctx, map[string]interface{}{})

	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	//Decode documents int our go slices
	if err = cursor.All(ctx, &messages); err != nil {
		return nil, err
	}
	return messages, nil
}

// Message matches the structure in MongoDB
type Message struct {
	Content  string    `bson:"content" json:"content"`
	Username string    `bson:"username" json:"username"`
	SentAt   time.Time `bson:"sent_at" json:"sent_at"`
}
type User struct {
	Username string `bson:"username" json:"username"`
	Password string `bson:"password" json:"password"` // This will be the HASH, not plain text
}
