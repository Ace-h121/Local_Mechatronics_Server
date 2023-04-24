import express from 'express';
import cors from 'cors';

const  app=express();
app.use(cors());

//tells the server what to connect to, also troubleshooting to see if its connected
app.listen(5000, ()=>console.log("Backend is connected"))

app.get("/api",(req,res)=>{
    res.json({"users":["its", "working", "omg"]})
})

// connecting to the arduino serialport
import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';

const arduinoConnectDelay = 2000;


  const port = new SerialPort({ path: 'COM8', baudRate: 9600,})

  //used so it can read incoming data from arduino
  const parser = new ReadlineParser()
  
  //the arduino connect delay is used to compensate for the time it takes the arduino to restart when it is being connected to the new server
  port.on('open', () => {
      setTimeout(function () {
            port.write("3");
      }, arduinoConnectDelay)
  })
  
  port.pipe(parser)
  
  
  parser.on('data', function(data){
      console.log(data);
  
  });
  
  


