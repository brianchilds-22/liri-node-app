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
// moment
var moment = require('moment');
// run text file
var fs = require("fs");

// Artist name function
var getArtistNames = function (artist) {
  return artist.name;
};

// Spotify
var getMeSpotify = function (songName) {
  if (songName === undefined) {
    songName = "What's my age again";
  }
  spotify.search({
      type: "track",
      query: songName
    },
    function (err, data) {
      if (err) {
        console.log("Error occurred: " + err);
        return;
      }

      var songs = data.tracks.items;
      var data = [];

      for (var i = 0; i < songs.length; i++) {
        // console.log(i);
        data.push({
          "artist(s): ": songs[i].artists.map(getArtistNames),
          "song name: ": songs[i].name,
          "preview song: ": songs[i].preview_url,
          "album: ": songs[i].album.name
        });
      }
      console.log(data);
      writeToLog(data);
    }
  );
};

// OMDB
var movieThis = function () {
  var nodeArgs = process.argv;
  var movieName = "";
  for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
      movieName = movieName + "+" + nodeArgs[i];
    } else {
      movieName += nodeArgs[i];
    }
  }
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
  axios.get(queryUrl).then(
    function (response) {
      var data = {
        "Title:": response.data.Title,
        "Year:": response.data.Year,
        "IMDB rating:": response.data.imdbRating,
        "Metascore:": response.data.Metascore,
        "Country:": response.data.Country,
        "Language:": response.data.Language,
        "Plot:": response.data.Plot,
        "Actors:": response.data.Actors
      }
      console.log(data);
      writeToLog(data);
    }
  );
};

// Bands in Town 
if (process.argv[2] == 'concert-this') {
  var artist = process.argv.slice(3).join(" ")
  console.log(artist);
  var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
  request(queryURL, function (error, response, body) {
    if (error) console.log(error);
    var result = JSON.parse(body)[0];
    var data = {
      "Venue Name: ": result.venue.name,
      "Venue Location: ": result.venue.city,
      "Date of Event: ": moment(result.datetime).format("MM/DD/YYYY")
    }
    console.log(data);
    writeToLog(data);
  });
}

// do what it says
var doWhatItSays = function () {
  fs.readFile("random.txt", "utf8", function (error, data) {
    console.log(data);
    
    var dataArr = data.split(",");
   
    if (dataArr.length === 2) {
      pick(dataArr[0], dataArr[1]);
    } else if (dataArr.length === 1) {
      pick(dataArr[0]);
    }
  });
};

// log.txt
var writeToLog = function (data) {
  fs.appendFile("log.txt", JSON.stringify(data) + "\n", function (err) {
    if (err) {
      return console.log(err);
    }
     console.log("log.txt was updated!");
  });
}

// execute with switch and case 
var pick = function (caseData, functionData) {
  switch (caseData) {
    case 'spotify-this-song':
      getMeSpotify(functionData);
      break;
    case "movie-this":
      movieThis();
      break;
    case "concert-this":
     break;
    case "do-what-it-says":
      doWhatItSays();
      break;
    default:
      console.log('LIRI does not know that');
  }
};

var runThis = function (argOne, argTwo) {
  pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);