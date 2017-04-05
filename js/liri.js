var Twitter = require("twitter");
var client = new Twitter(require("./keys.js").TwitterKeys);
var spotify = require("spotify");
var request = require("request");
var params = {screen_name: 'nodejs'};
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
	client.stream('statuses/filter', {track: 'javascript'}, function(stream) {
		  stream.on('data', function(event) {
		    console.log(event);
		  });
		 
		  stream.on('error', function(error) {
		    throw error;
		  });
		});
	
	// client.get('statuses/user_timeline', params, function(error, tweets, response){
	// 	if(error) {
	// 		console.log(error)
	// 	} else {
	// 		console.log(tweets)
	// 	}
	// })
}

function spotifySearch() {
//Spotify use 

	if (process.argv[3] === null) {
		spotify.search({ type: 'track', query: "Ace of Base" }, function(err, data) {
		console.log("Artists: " + data.tracks.items[1].artists[1]);
		console.log("Song's name: " + data.tracks.items[1].name);
		console.log("Want to preview this song? Go to: " + data.tracks.items[1].preview_url);
		console.log("Album's name: " + data.tracks.items[1].album.name);
		console.log("Artists: " + data.tracks.items[2].artists[2]);
		console.log("Song's name: " + data.tracks.items[2].name);
		console.log("Want to preview this song? Go to: " + data.tracks.items[2].preview_url);
		console.log("Album's name: " + data.tracks.items[2].album.name);
		console.log("Artists: " + data.tracks.items[3].artists[3]);
		console.log("Song's name: " + data.tracks.items[3].name);
		console.log("Want to preview this song? Go to: " + data.tracks.items[3].preview_url);
		console.log("Album's name: " + data.tracks.items[3].album.name);
		})
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
		})
	}

}




// lookup: function({ type: 'artist OR album OR track', id: 'Spotify ID Hash' }, hollaback)

// search: function({ type: 'artist OR album OR track', query: 'My search query' }, hollaback)


// get: function(query, hollaback) -- See http://developer.spotify.com/en/metadata-api/overview/ 

