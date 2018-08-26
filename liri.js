require("dotenv").config();

//Switch and operators
var keys = require("./keys.js");



var Spotify = require("node-spotify-api");

var Twitter = require("twitter");

var spotify = new Spotify(keys.spotify);

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
    argument = process.argv.slice(3).join(" ");

    switch(action){

        case"spotify-this-song":
        var songTitle = argument;
        if (songTitle === ""){
            getThatSong();
        }else{ 
        getSpotify(songTitle);
        }
        break

        case "my-tweets":
        getMyTweets();
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


//SPOTIFY SONGS!!!!

function getSpotify(songTitle){
    spotify.search({ type: 'track', query: songTitle }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        
        //console.log(data.tracks); 

        var artistName = data.tracks.items[0].artists[0].name;
        var songName = data.tracks.items[0].name;
        //NOT ALL SONGS HAVE PREVIEW URL!!!!!
        var previewName = data.tracks.items[0].preview_url;
        //var song = console.log()

        var albumName = data.tracks.items[0].album.name;
        
        console.log("This song is played by: " + artistName);
        console.log("The name of this song is: " + songName);
        console.log("You can preview this song by following this link: " + previewName);
        console.log("This song is on the album: " + albumName);

      });
}

function getThatSong(){
    spotify.search({ type: 'track', query: "The Ace Of Base" }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        
        //console.log(data.tracks); 

        var artistName = data.tracks.items[0].artists[0].name;
        var songName = data.tracks.items[0].name;
        //NOT ALL SONGS HAVE PREVIEW URL!!!!!
        var previewName = data.tracks.items[0].preview_url;
        //var song = console.log()

        var albumName = data.tracks.items[0].album.name;
        
        console.log("This song is played by: " + artistName);
        console.log("The name of this song is: " + songName);
        console.log("You can preview this song by following this link: " + previewName);
        console.log("This song is on the album: " + albumName);

      });

}


//Twitter GET!!


function getMyTweets(){
    var client = new Twitter (keys.twitter);

var params = {q: "GTavo3393", count: 20};
client.get("search/tweets", params, function(error, tweets, response) {
    if (!error){ //console.log(response)
        for (var i = 0; i < tweets.statuses.length; i+=1){
            var tweetInfo = tweets.statuses[i].text;
            console.log("TweetInfo: " + tweetInfo);
            var tweetTime = tweets.statuses[i].created_at;
            console.log("This Tweet as created at: " + tweetTime)
       }
    }
})

}

