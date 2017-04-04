var twitter = require("./keys.js").twitterKeys;
var spotify = require("spotify");
var request = require("request");
var inquirer = require("inquirer");

//Twitter use
var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});



//inquirer to gain input.
inquirer.prompt([

  {
    type: "input",
    message: "Put in name of place you wish you know the weather:",
    name: "name"
  },

  {
    type: "confirm",
    message: "Are you sure:",
    name: "confirm",
    default: true

  }

  

]).then(function(user) {

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


