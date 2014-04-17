// We require the filesystem library first
var fs = require('fs');
var fileName = "./movies.json";
var sha1 = require('sha1');
var _ = require('underscore');

// Next, we require the Promise library
var Promise = require('bluebird');

// We need to wrap the methods from the filesystem with:
Promise.promisifyAll(fs);

var Movies;

// prepare Data

var Movies = fs.readFileAsync(fileName, "utf8")
  .then(function(f) {
    return JSON.parse(f);
  })
  .then(function(movies) {
    return Promise.resolve(movies);
  });

// We will later export this to a module
var MoviesReader = {

  allMovies: function() {
   return Movies 
     .map(function(movie) {
       return {
         id: movie.id,
         title: movie.title,
         _key: sha1(movie.title),
       };
     })
     .catch(function(err) {
       console.log(err);
     });
 },

 showMovie: function(key) {
   return Movies.then(function(movies) {
     var match = _.find(movies, function(movie) { return sha1(movie.title) == key });
     if (!match) {
       throw new Promise.RejectionError("ID not found");
     } else {
       return match;
     }
   });
 },


 voteMovie: function(id, vote, voter) {
   var that = this;
   return Movies
     .then(function() {
       return that.voteExists(id, 0)
     })
     .then(function(result) {
       that.addVote(vote, id, voter)
     })
     .then(function() {
        that.computeScore(id)
      })
     .then(function(score) {
        that.updateScore(id, score);
     })
     .then(function() {
       return that.showMovie(id);
     });
  }, 

 voteExists: function(id, voter) {
   console.log("... check for duplicates:  ", id);
 },

 addVote: function(vote, key, user) {
   console.log("... add vote for:  ", key);
   Movies.then(function(movies) {
     var match = _.find(movies, function(movie) { return sha1(movie.title) == key });
     if (!match) {
       throw new Promise.RejectionError("ID not found");
     } else {
       match.rating += 1;
       console.log(match);
       return match;
     }
   });
 },

 computeScore: function(key) {
   console.log("... compute score for:  ", key);
 },

 updateScore: function(key, score) {
   console.log("... save score for:  ", key);
 }
}

// Last, we export the MoviesReader as module
module.exports = MoviesReader;

