package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"time"

	firebase "firebase.google.com/go"
	"firebase.google.com/go/db"
	"github.com/gorilla/mux"
	"github.com/tarm/serial"
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

	//set refrences to the actual
	ref := client.NewRef("owlbot/owlbot")

	//create a varible to be able ot save data
	var data int

	if err := ref.Get(ctx, &data); err != nil {
		log.Fatalln("Error reading from database:", err)
	}

	fmt.Println(data)

	//time to spin up the server
	StartServer()

}

func StartServer() {
	router := mux.NewRouter()

	router.HandleFunc("/", test)

	err := http.ListenAndServe(":8080", router)
	if err != nil {
		log.Fatalln("There's an error with the server,", err)
	}
}

func test(writer http.ResponseWriter, request *http.Request) {

}

func WriteToOwlBot(value int) {

	//The serial port for the arduino does not immeditly start reading, the delay is there in an attempts to prevent this.
	arduinoDelay := time.Second * 2
	time.Sleep(arduinoDelay)

	//port config for the arduino,
	portConfig := &serial.Config{Name: "COM5", Baud: 115200}
	s, err := serial.OpenPort(portConfig)
	if err != nil {
		log.Fatal(err)
	}

	//writes interger value as a string, as the function takes an array of bytes, which an int can not be converted to
	s.Write([]byte(strconv.Itoa(value)))

	println(value)

}
