# Local_Mechatronics_Server

## What?

This project is simply proof of concept of having a webhost control a network of arduinos, this project is not fully fleshed out, but just proves that it infact can work. It is a WIP and will be done soon?

## Why?

I created this project as I have a large passion for Arduino based projects, revolving under the title mechatronics, as they are both mechnical, eletrictal, and computational. This is both a passion project and something that I will eventually use in my day to day life

## How?

This project has a folder containing a frontend and backend. The frontend is a very bare-bones react based app that checks that inputs are correct, and then writes them to my firebase database. Next, the backend reads that same database, observing that there is a change. After this change has occured it used, it writes these changes out to the serial port that an ESP32 is connected to, which then sends out all the messages to the small arduino projects in the house.

## What is to come?
1. Firstly I want to rewrite that nodejs backend into Go. Not only for performance reasons but for a project like this having a strong type system so you dont accidently write the wrong kind of data to an arduino and end up breaking the project. I am also personally not a fan on weakly typed langauges, making the switch an improvment for me as well.
2. Pretty React App. I have put off making it look nice and using the tools inside the framework for awhile. That will be a project that comes up soon
3. DOCKER CONTAINER!!! the end goal for this project is to make it into a docker container, that way it can run on a computer and require little to no maintenance

> You may notice the APIkey is public, however it has since expired and there is a new one, so please do not worry about my API keys saftey!
