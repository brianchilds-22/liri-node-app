# liri-node-app

## Liri is a command line node app that takes in parameters and gives you back data. ##
* It searches for songs on Spotify,
* concerts with Bands in Town and 
* OMDB for movies. It also will run a command with the file "random.txt" and it logs the info in the "log.txt" file. The first step was to npm init in the bash terminal then I installed the needed npms (axios, moment, fx, dotenv, spotify). After the init, the package.json file was created with the npm info, I double checked this to make sure all needed npms were installed. I then created the ".gitignore" file and pasted my spotify-id and secret in the "keys.js" file.
I used all of that info in my "liri.js" file. I then used many require functions to help gather data and then pushed data to the log.txt file. The first command is concert-this with an artist name the terminal will log the venue name and city then the date. The second command is spotify-this-song with a song name then the terminal will log the artist, song name, a previw link from Spotify and the album that the song is on. The third command is movie-this with a move title. The terminal will log the Title, year,imdb rating, metascore, country, language,plot and actors.
