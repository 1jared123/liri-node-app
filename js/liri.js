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

}
//Spotify use 
spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
 
    // Do something with 'data' 
});



lookup: function({ type: 'artist OR album OR track', id: 'Spotify ID Hash' }, hollaback)

search: function({ type: 'artist OR album OR track', query: 'My search query' }, hollaback)


get: function(query, hollaback) -- See http://developer.spotify.com/en/metadata-api/overview/ 


})


