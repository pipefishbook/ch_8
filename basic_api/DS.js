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
  .then(JSON.parse);

function _mapAttributes(movie) {
  return {
    id: movie.id,
    title: movie.title,
    _key: sha1(movie.title),
  };
}

function _mapAllAttributes(movie) {
  return {
    title: movie.title,
    description: movie.description,
    showtime: movie.showtime,
    rating: movie.rating,
    genres: movie.genres,
    _key: sha1(movie.title),
  };
}

function _find(movies, key) {
  console.log(key);
  var match = _.find(movies, function(movie) { return movie.id === parseInt(key) });
  if (!match) {
    throw new Promise.RejectionError("ID not found");
  } else {
    return match;
  }
}

function _findBySha(movies, key) {
  var match = _.find(movies, function(movie) { return sha1(movie.title) === key });
  if (!match) {
    throw new Promise.RejectionError("ID not found");
  } else {
    return match;
  }
}


var DS = function() {};

DS.prototype.allMovies = function() {
    return Movies
     .map(_mapAttributes)
     .catch(function(err) {
       console.log(err);
     });
 }

DS.prototype.voteMovie = function(id, vote, voter) {
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
  } 

DS.prototype.voteExists = function(id, voter) {
   console.log("... check for duplicates:  ", id);
 },

DS.prototype.addVote = function(vote, key, user) {
   console.log("... add vote for:  ", key);
   Movies.then(function(movies) {
     var match = _.find(movies, function(movie) { return sha1(movie.title) === key });
     if (!match) {
       throw new Promise.RejectionError("ID not found");
     } else {
       match.rating += 1;
       console.log(match);
       return match;
     }
   });
}

DS.prototype.computeScore = function(key) {
   console.log("... compute score for:  ", key);
}

DS.prototype.updateScore = function(key, score) {
   console.log("... save score for:  ", key);
}

DS.prototype.find = function(key) {
   return Movies.then(function(movies) {
     return _find(movies, key);
   }) 
   .then(_mapAllAttributes);
}



// Last, we export the MoviesReader as module
module.exports = DS;

