const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')
const  fs  = require('fs')
const http = require('http')
const serverPort = 3000

http.createServer(function (req, res) {
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


const port = new SerialPort({ path: 'COM8', baudRate: 9600 })
const parser = new ReadlineParser()
port.pipe(parser)

parser.on('data', function(data){
    console.log(data);
});

port.write("9");


