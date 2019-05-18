// environmental variables
require("dotenv").config();

// spotify NPM
var Spotify = require('node-spotify-api');

// Spotify API Keys
var keys = require('./keys.js');

// Spotify API client id & Secrect
var spotify = new Spotify(keys.spotify);

// request npm
var request = require("request");

// axios
var axios = require("axios");

// Artist name function
var getArtistNames = function(artist) {
  return artist.name;
};

// Spotify
var getMeSpotify = function(songName) {
    if (songName === undefined) {
      songName = "What's my age again";
    }
  
    spotify.search(
      {
        type: "track",
        query: songName
      },
      function(err, data) {
        if (err) {
          console.log("Error occurred: " + err);
          return;
        }
  
        var songs = data.tracks.items;
  
        for (var i = 0; i < songs.length; i++) {
          console.log(i);
          console.log("artist(s): " + songs[i].artists.map(getArtistNames));
          console.log("song name: " + songs[i].name);
          console.log("preview song: " + songs[i].preview_url);
          console.log("album: " + songs[i].album.name);
          console.log("-----------------------------------");
        }
      }
    );
  };

// OMDB
var movieThis = function() {
var nodeArgs = process.argv;
var movieName = "";
for (var i = 3; i < nodeArgs.length; i++) {
  if (i > 3 && i < nodeArgs.length) {
    movieName = movieName + "+" + nodeArgs[i];
  }
  else {
    movieName += nodeArgs[i];
  }
}
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
// console.log(response);
axios.get(queryUrl).then(
  function(response) {
    // console.log(response);
    console.log("Title: " + response.data.Title);
    console.log("Year: " + response.data.Year)
    console.log("IMDB Rating: " + response.data.imdbRating);
    console.log("Metascore: " + response.data.Metascore);
    console.log("Country: " + response.data.Country);
    console.log("Language: " + response.data.Language);
    console.log("Plot: " + response.data.Plot);
    console.log("Actors: " + response.data.Actors);
  }
);
};

// execute with switch and case 
var pick = function(caseData, functionData) {
    switch(caseData) {
        case 'spotify-this-song':
            getMeSpotify(functionData);
            break;
        case "movie-this":
            movieThis();
            break;
        default:
        console.log('LIRI does not know that');
    }
};

  var runThis = function(argOne, argTwo) {
      pick(argOne, argTwo);
  };

  runThis(process.argv[2], process.argv[3]);