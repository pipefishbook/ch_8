var restify = require('restify');
var _ = require('underscore');


var DB = require('./mockDB');

var server = restify.createServer({ name: 'api' })

server
  .use(restify.fullResponse())
  .use(restify.bodyParser())


// The main API route for movies
server.get('/api/movies', function (req, res, next) {
  return DB.allMovies()
    .then(function(m) { res.send(m); })
    .catch(function(err) { res.send(500, err) });
});

server.get("/api/movies/:key", function(req, res, next) {
    return DB.showMovie(req.params.key)
             .then(function(m) { res.send(m); })
             .error(function (e) {
               res.send(400, e.message);
             })
            .catch(function(err) { res.send(500, err) });
});

server.put("/api/movies/:key", function(req, res, next) {
    return DB.voteMovie(req.params.key, req.body.vote)
             .then(function(m) { res.send(m); })
             .error(function (e) {
               res.send(400, e.message);
             })
            .catch(function(err) { res.send(500, err) });
});


// The API route to extract a genres of movies
server.get('/api/genres', function (req, res, next) {
  var genres = _.chain(movies)
                .map(function(movie) { 
                   return movie.genres 
                 })
                 .flatten()
                 .uniq().value();
    res.send(genres);
});

var port = process.env.PORT || 5001;
server.listen(port, function () {
  console.log('%s listening at %s', server.name, server.url)
})
