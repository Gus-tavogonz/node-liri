require("dotenv").config();

//Switch and operators

var spotify = require("spotify");

var request = require("request");

var fs = require("fs");

var fileName = "./log.txt";

var log = require("simple-node-logger").createSimpleFileLogger ( fileName);


///SWITCHES AND OPERATORS

var action = process.argv [2];

var argument = "";

getMeThis(action, argument);

function getMeThis(action, argument){

    switch(action){

        case ""
    }
}




///// MOVIES FIRST!

function movieThis(movieName){
var movieName = process.argv[2]
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";


console.log(queryUrl);

}