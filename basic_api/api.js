var restify = require('restify');
var _ = require('underscore');

// access to the data store
var DS = require('./DS');
var ds = new DS();

// create server object
var server = restify.createServer({ name: 'api' })

// add middleware
server
  .use(restify.fullResponse())
  .use(restify.bodyParser())


// The main API route for movies
server.get('/api/movies', function (req, res, next) {
  ds.allMovies()
    .then(function(m) { res.send(m); })
    .catch(function(err) { res.send(500, err) });
});

server.get("/api/movies/:key", function(req, res, next) {
    ds.find(req.params.key)
             .then(function(m) { res.send(m); })
             .error(function (e) {
               res.send(400, {err: e.message});
             })
            .catch(function(err) { res.send(500, err) });
});

server.put("/api/movies/:key", function(req, res, next) {
    ds.voteMovie(req.params.key, req.body.vote)
             .then(function(m) { res.send(m); })
             .error(function (e) {
               res.send(400, e.message);
             })
            .catch(function(err) { res.send(500, err) });
});


// The API route to extract a genres of movies
server.get('/api/genres', function (req, res, next) {
  ds.allGenres()
    .then(function(m) { res.send(m); })
    .catch(function(err) { res.send(500, err) });
});

server.port = process.env.PORT || 5001;
server.listen(server.port, function () {
  console.log('%s listening at %s', server.name, server.port)
})
