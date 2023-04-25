import express from "express";
import cors from "cors";

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
  console.log(req.body);
  res.send("got request");
});

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
