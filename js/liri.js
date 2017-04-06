var Twitter = require("twitter");
var client = new Twitter(require("./keys.js").TwitterKeys);
var fs = require("fs");
var spotify = require("spotify");
var request = require("request");
var params = {screen_name: 'nodejs', count: 20};
var runner = {status: process.argv[3]};
var findIt = {screen_name: 'nodejs'};
var stream = client.stream('statuses/filter', {track: 'javascript'});

//Twitter use
switch(process.argv[2]) {
	case "my-tweets":
		fetchTweets();
		break;
	case "spotify-this-song":
		spotifySearch();
		break;
	case "movie-this": 
		findMyMovie();
		break;
	case "do-what-it-says":

		break;
	case "post-tweet":
		twitterPost();
		break;
}



function twitterPost() {
	client.post('statuses/update', runner, function(error, tweets, response) {
	  if (error) {
	    console.log(error);
	  } else {
	  	console.log(tweets);
	  }
	});
}


function fetchTweets() {	
	client.get('statuses/user_timeline', params, function(error, tweets, response){
		if(error) {
			console.log(error)
		} else {
			console.log(tweets)
		}
	})
}

function spotifySearch() {
//Spotify use 

	if (process.argv.length === 3) {

		spotify.search({ type: 'track', query: "The Sign" }, function(err, data) {
		console.log("Artists: " + data.tracks.items[2].artists[0].name);
		console.log("Song's name: " + data.tracks.items[2].name);
		console.log("Want to preview this song? Go to: " + data.tracks.items[2].preview_url);
		console.log("Album's name: " + data.tracks.items[2].album.name);
		});
	} else {

		spotify.search({ type: 'track', query: process.argv[3] }, function(err, data) {
		    if ( err ) {
		        console.log('Error occurred: ' + err);
		        return;
		    } 

		console.log("Artists: " + data.tracks.items[0].artists[0].name);
		console.log("Song's name: " + data.tracks.items[0].name);
		console.log("Want to preview this song? Go to: " + data.tracks.items[0].preview_url);
		console.log("Album's name: " + data.tracks.items[0].album.name);
		console.log("__________________________________")
		console.log("Artists: " + data.tracks.items[1].artists[0].name);
		console.log("Song's name: " + data.tracks.items[1].name);
		console.log("Want to preview this song? Go to: " + data.tracks.items[1].preview_url);
		console.log("Album's name: " + data.tracks.items[1].album.name);
		console.log("__________________________________")
		console.log("Artists: " + data.tracks.items[2].artists[0].name);
		console.log("Song's name: " + data.tracks.items[2].name);
		console.log("Want to preview this song? Go to: " + data.tracks.items[2].preview_url);
		console.log("Album's name: " + data.tracks.items[2].album.name);
		})

	}

}

function findMyMovie() {
        var movie ;

        if (process.argv.length === 3) {
        	movie = "Mr. Nobody";
        	var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json";

        	request(queryURL, function (error, response, body) {
        		if (error){
        			console.log("Error: " + error);
        		} else {
        			var weird = JSON.parse(body);

        			var title = weird.Title;
		       		var year = weird.Year;
		        	var rating = weird.imdbRating;
		        	var country = weird.Country;
		        	var language = weird.Language;
		        	var plot = weird.Plot;
		        	var actors = weird.Actors;
		        	var rotenRating = weird.Ratings[1].Value;

        			console.log("Movie Title: " + title + 
        				"\nRealease Date: " + year + 
        				"\nIMDB Rating: " + rating + 
        				"\nCountry who made it: " + country +
        				"\nLanguage: " + language +
        				"\nPlot: " + plot +
        				"\nActors: " + actors + 
        				"\nRotten Tomatoes Rating: " + rotenRating +
        				"\nRotten Tomatoes URL: Unknown....");
        		}
			});
        } else {
        	//if they actually put in a movie this will run. 
        	movie = process.argv[3];
        	var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json";

        	request(queryURL, function (error, response, body) {
        		if (error){
        			console.log("Error: " + error);
        		} else {
        			//make the body data dot notable. 
        			var weird = JSON.parse(body);

        			//vars for the different requirements. 
        			var title = weird.Title;
		       		var year = weird.Year;
		        	var rating = weird.imdbRating;
		        	var country = weird.Country;
		        	var language = weird.Language;
		        	var plot = weird.Plot;
		        	var actors = weird.Actors;
		        	var rotenRating = weird.Ratings[1].Value;

		        	//print to the screen info about the movie. 
        			console.log("Movie Title: " + title + 
        				"\nRealease Date: " + year + 
        				"\nIMDB Rating: " + rating + 
        				"\nCountry who made it: " + country +
        				"\nLanguage: " + language +
        				"\nPlot: " + plot +
        				"\nActors: " + actors + 
        				"\nRotten Tomatoes Rating: " + rotenRating +
        				"\nRotten Tomatoes URL: Not there...");
	        	}
	        })
	    }
        
}



