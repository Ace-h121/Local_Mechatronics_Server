import express from "express";
import cors from "cors";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";


//SETTING UP FIREBASE STUFF
const firebaseConfig = {
  apiKey: "AIzaSyBpVcO6H0G1eSjqtdIT4NnJ-_8reZEZf6w",
  authDomain: "arduino-i-o.firebaseapp.com",
  databaseURL: "https://arduino-i-o-default-rtdb.firebaseio.com",
  projectId: "arduino-i-o",
  storageBucket: "arduino-i-o.appspot.com",
  messagingSenderId: "670585000029",
  appId: "1:670585000029:web:6e1c320b2ca6ba58b6bdb4",
  measurementId: "G-DT4F60MNPQ",
};

const firebaseapp = initializeApp(firebaseConfig);
const database = getDatabase();
const refrence = ref(database, "owlbot");


//EXPRESS INCASE WE NEED GET AND POST REQUESTS
const app = express();
app.use(cors());
app.use(express.json());

const arduinoConnectDelay = 2000;

//tells the server what to connect to, also troubleshooting to see if its connected
app.listen(5000, () => console.log("Backend is connected"));

let botPositions = {
  owlbot: "0",
};

app.get("/api", (req, res) => {
  res.json(botPositions);
});

app.post("/postRequest", (req, res) => {

 
});

onValue(refrence, (snapshot) =>{
  const data =snapshot.val()
  port.write(data.owlbot)
})

// connecting to the arduino serialport
import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";

const port = new SerialPort({ path: "COM8", baudRate: 9600 });

//used so it can read incoming data from arduino
const parser = new ReadlineParser();

//the arduino connect delay is used to compensate for the time it takes the arduino to restart when it is being connected to the new server
port.on("open", () => {
  setTimeout(function () {
    port.write(botPositions.owlbot);
  }, arduinoConnectDelay);
});

port.pipe(parser);

parser.on("data", function (data) {
  console.log(data);
});
