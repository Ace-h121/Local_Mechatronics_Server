
const  fs  = require('fs')
const http = require('http')
const serverPort = 3000

const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')
const LocalStorge = require('node-localstorage')
const arduinoConnectDelay = 2000;



let app = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile('index.html', function(error, data){
        if(error){
            res.writeHead(404)
            res.write('error: file not found')
        } else {
            res.write(data)
        }
    })
  }).listen(8080);

let io = require("socket.io")(app);

io.on('connection', function(data){
    console.log("node.js is listening");
})

  const port = new SerialPort({ path: 'COM8', baudRate: 9600,})
  const parser = new ReadlineParser()
  
  port.on('open', () => {
      setTimeout(function () {
            port.write("3");
      }, arduinoConnectDelay)
  })
  
  port.pipe(parser)
  
  
  parser.on('data', function(data){
      console.log(data);
  
  });
  
  


