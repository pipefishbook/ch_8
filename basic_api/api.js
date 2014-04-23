var restify = require('restify');
var _ = require('underscore');


var DS = require('./DS');

var server = restify.createServer({ name: 'api' })

server
  .use(restify.fullResponse())
  .use(restify.bodyParser())

var ds = new DS();

// The main API route for movies
server.get('/api/movies', function (req, res, next) {
  return DS.allMovies()
    .then(function(m) { res.send(m); })
    .catch(function(err) { res.send(500, err) });
});

server.get("/api/movies/:key", function(req, res, next) {
    return ds.find(req.params.key)
             .then(function(m) { res.send(m); })
             .error(function (e) {
               res.send(400, {err: e.message});
             })
            .catch(function(err) { res.send(500, err) });
});

server.put("/api/movies/:key", function(req, res, next) {
    return ds.voteMovie(req.params.key, req.body.vote)
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
