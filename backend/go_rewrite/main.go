package main

import (
	"context"
	"fmt"
	"log"
	"net/http"

	firebase "firebase.google.com/go"
	"github.com/gorilla/mux"
	"google.golang.org/api/option"
)

func main() {
	//Mux for routing stuff
	router := mux.NewRouter()

	//All the funny little firebase stuff
	// Initialize Firebase
	ctx := context.Background()
	conf := &firebase.Config{
		DatabaseURL: "https://arduino-i-o-default-rtdb.firebaseio.com/",
	}
	// Fetch the service account key JSON file contents
	opt := option.WithCredentialsFile("arduino-i-o-firebase-adminsdk-zto4f-33eae2b7d3.json")

	// Initialize the app with a service account, granting admin privileges
	app, err := firebase.NewApp(ctx, conf, opt)
	if err != nil {
		log.Fatalln("Error initializing app:", err)
	}

	client, err := app.Database(ctx)
	if err != nil {
		log.Fatalln("Error initializing database client:", err)
	}

	// As an admin, the app has access to read and write all data, regradless of Security Rules
	ref := client.NewRef("owlbot")
	var data map[string]interface{}
	if err := ref.Get(ctx, &data); err != nil {
		log.Fatalln("Error reading from database:", err)
	}
	fmt.Println(data)

	//time to spin up the server
	err = http.ListenAndServe(":8080", router)
	if err != nil {
		log.Fatalln("There's an error with the server,", err)
	}

}
