// We require the filesystem library first
var fs = require('fs');
var fileName = "./movies.json";
var sha1 = require('sha1');

// Next, we require the Promise library
var Promise = require('bluebird');

// We need to wrap the methods from the filesystem with:
Promise.promisifyAll(fs);

// Next, we read the file
var movies;

// We will later export this to a module
var MoviesReader = {
  allMovies: function() {

  // Bluebird adds an Async version to the methods from fs
  var readData = fs.readFileAsync(fileName, "utf8")
   .then(function(f) {
     return JSON.parse(f);
   })
   .map(function(movie) {
     return {
       id: movie.id,
       title: movie.title
       _key: sha1(movie.title),
     };
   })
   .catch(function(err) {
     console.log(err);
   });
   return readData;
 }
}

// Last, we export the MoviesReader as module
module.exports = MoviesReader;

