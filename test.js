const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')
const  fs  = require('fs')
const http = require('http')

const port = new SerialPort({ path: 'COM8', baudRate: 9600 })
const parser = new ReadlineParser()
port.pipe(parser)


port.write("Robot go vrrrrr");

parser.on('data', function(data){
    console.log(data);
});


