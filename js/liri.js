var Twitter = require("twitter");
var client = new Twitter(require("./keys.js").TwitterKeys);
var fs = require("fs");
var spotify = require("spotify");
var request = require("request");
var params = {screen_name: 'nodejs', count: 20};
var runner = {status: process.argv[3]};
var findIt = {screen_name: 'nodejs'};
var stream = client.stream('statuses/filter', {track: 'javascript'});

//switch to determine where we going from the start!
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
		doIt();
		break;
	case "post-tweet":
		twitterPost();
		break;
}


//function to post a tweet!
function twitterPost() {
	client.post('statuses/update', runner, function(error, tweets, response) {
	  if (error) {
	    console.log(error);
	  } else {
	  	console.log(tweets);
	  }
	});
}

//function to get 20 of your tweets.
function fetchTweets() {	
	client.get('statuses/user_timeline', params, function(error, tweets, response){
		if(error) {
			console.log(error)
		} else {
			console.log(tweets)
		}
	})
}

//Spotify search a song
function spotifySearch() {

	//if they don't specify a song, then they get this as default.
	if (process.argv.length === 3) {

		spotify.search({ type: 'track', query: "The Sign" }, function(err, data) {
		console.log("Artists: " + data.tracks.items[2].artists[0].name);
		console.log("Song's name: " + data.tracks.items[2].name);
		console.log("Want to preview this song? Go to: " + data.tracks.items[2].preview_url);
		console.log("Album's name: " + data.tracks.items[2].album.name);
		});
	} else {

		//they specify a song, it'll run this and spit out the first 3 results, since sometimes the song isn't the first one on the list. 
		spotify.search({ type: 'track', query: process.argv[3] }, function(err, data) {
		    if ( err ) {
		        console.log('Error occurred: ' + err);
		        return;
		    } 
		//console log all the info we can!!! >:)
		console.log("Artists: " + data.tracks.items[0].artists[0].name);
		console.log("Song's name: " + data.tracks.items[0].name);
		console.log("Want to preview this song? Go to: " + data.tracks.items[0].preview_url);
		console.log("Album's name: " + data.tracks.items[0].album.name);
		console.log("------------------------------------")
		console.log("Artists: " + data.tracks.items[1].artists[0].name);
		console.log("Song's name: " + data.tracks.items[1].name);
		console.log("Want to preview this song? Go to: " + data.tracks.items[1].preview_url);
		console.log("Album's name: " + data.tracks.items[1].album.name);
		console.log("------------------------------------")
		console.log("Artists: " + data.tracks.items[2].artists[0].name);
		console.log("Song's name: " + data.tracks.items[2].name);
		console.log("Want to preview this song? Go to: " + data.tracks.items[2].preview_url);
		console.log("Album's name: " + data.tracks.items[2].album.name);
		})

	}

}

//find a movie!!!
function findMyMovie() {
        var movie ;

        //if no movie, you going to look at Mr Nobody!
        if (process.argv.length === 3) {
        	movie = "Mr. Nobody";
        	var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json";

        	//request the url and get back data
        	request(queryURL, function (error, response, body) {
        		if (error){
        			console.log("Error: " + error);
        		} else {
        			//parse the data to make it searchable.
        			var weird = JSON.parse(body);

        			//now apply that parse data into vars to display later
        			var title = weird.Title;
		       		var year = weird.Year;
		        	var rating = weird.imdbRating;
		        	var country = weird.Country;
		        	var language = weird.Language;
		        	var plot = weird.Plot;
		        	var actors = weird.Actors;
		        	var rotenRating = weird.Ratings[1].Value;

		        	//display the vars!!
        			console.log("Movie Title: " + title + 
        				"\nRelease Date: " + year + 
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
        				"\nRelease Date: " + year + 
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

//do what the txt file says function
function doIt() {

	//read the file and apply the data to something
	fs.readFile("../random.txt", "utf8", function(error, data) {

		var bummer = data;
		//this case we spotify searching the song in there
		spotify.search({ type: 'track', query: data }, function(err, data) {
		console.log("Artists: " + data.tracks.items[2].artists[0].name);
		console.log("Song's name: " + data.tracks.items[2].name);
		console.log("Want to preview this song? Go to: " + data.tracks.items[2].preview_url);
		console.log("Album's name: " + data.tracks.items[2].album.name);
		});
		

	});
	
}



