package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"strconv"

	firebase "firebase.google.com/go"
	"firebase.google.com/go/db"

	"github.com/dsyx/serialport-go"
	"github.com/gorilla/mux"
	"google.golang.org/api/option"
)

var (
	ctx    context.Context
	conf   *firebase.Config
	opt    option.ClientOption
	app    *firebase.App
	client *db.Client
)

func main() {
	//Mux for routing stuff

	//All the funny little firebase stuff
	// Initialize Firebase
	ctx = context.Background()
	conf = &firebase.Config{
		DatabaseURL: "https://arduino-i-o-default-rtdb.firebaseio.com/",
	}
	// Fetch the service account key JSON file contents
	opt = option.WithCredentialsFile("arduino-i-o-firebase-adminsdk-zto4f-40c6b65f35.json")

	// Initialize the app with a service account, granting admin privileges
	app, err := firebase.NewApp(ctx, conf, opt)
	if err != nil {
		log.Fatalln("Error initializing app:", err)
	}

	client, err = app.Database(ctx)
	if err != nil {
		log.Fatalln("Error initializing database client:", err)
	}

	//set refrences to the actual
	ref := client.NewRef("Owlbot/Owlbot")

	//create a varible to be able ot save data
	var data int

	if err := ref.Get(ctx, &data); err != nil {
		log.Fatalln("Error reading from database:", err)
	}

	fmt.Println("cpnnected to server")

	//time to spin up the server
	StartServer()

}

func StartServer() {
	router := mux.NewRouter()

	router.HandleFunc("/owl", handleOwl).Methods("GET")

	err := http.ListenAndServe(":8080", router)
	if err != nil {
		log.Fatalln("There's an error with the server,", err)
	}
}

func handleOwl(writer http.ResponseWriter, request *http.Request) {
	ref := client.NewRef("Owlbot/Owlbot")

	str := request.FormValue("value")

	value, err := strconv.Atoi(str)

	if err != nil {
		return
	}

	ref.Set(ctx, &value)
	WriteToOwlBot(value)
}

func WriteToOwlBot(value int) {

	//The serial port for the arduino does not immeditly start reading, the delay is there in an attempts to prevent this.
	sp, err := serialport.Open("COM6", serialport.DefaultConfig())
	if err != nil {
		log.Fatalln(err)
	}
	defer sp.Close()

	sp.Write([]byte("test"))

	println(value)
}
