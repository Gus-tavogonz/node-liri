require("dotenv").config();

//Switch and operators

//var spotify = require("spotify");

var snooper = require("reddit-snooper");

var print = console.log;

var request = require("request");

var fs = require("fs");

var fileName = "./log.txt";

var log = require("simple-node-logger").createSimpleFileLogger( fileName );

log.setLevel("all")

///SWITCHES AND OPERATORS

var action = process.argv [2];

var argument = "";

getMeThis(action, argument);

function getMeThis(action, argument){

    //pushing argument into an array
    argument = getArgument();

    switch(action){

        case "my-reddit":
        getMyReddit();
        break;

        ////////////

        case "movie-this":

        var movieName = argument;

        if (movieName === ""){
            getMovies("Mr. Nobody");
        } else {
            getMovies(movieName)
        }
        break;
    }
}

function getArgument(){
    argumentArray = process.argv;

    for (var i = 3; i < argumentArray.length; i++) {
        argument += argumentArray[i];
    }return argument;
}


///// MOVIES FIRST!

function getMovies(movieName){

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

request(queryUrl, function(error, response, body){

    if (!error && response.statusCode === 200) {
        var movie = JSON.parse(body);
        print("Movie Title: " + movie.Title);
        console.log("Release Year: " + movie.Year);
        console.log("IMDB Rating: " + movie.imdbRating);
        console.log("Rotten Tomatoes Rating: " + movie.Ratings[2].Value);
        console.log("Country: " + movie.Country);
        console.log("Language: " + movie.Language);
        console.log("Plot: " + movie.Plot);
        console.log("Actors: " + movie.Actors);

    };
});

};


//REDDIT GET!!


function getMyReddit(){
snooper.watcher.getCommentWatcher()
.on("comment", function(comment){
    console.log("/u/" + comment.data.author + "posted a comment: " + comment.data.body )
});
}





//function outputLog(logText){
 //   log.info(logtext);
   // console.log(logText);
//}