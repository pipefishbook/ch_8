var Backbone = require('backbone');
var _ = require('underscore');

// data
var Movie = require('models/movie');
var Movies = require('collections/movies');
var movies = new Movies();
var deferred = 1; // movies.fetch();

// views
var Layout = require('views/layout');

var MoviesRouter = Backbone.Router.extend({

  routes: {
    'movies/:id': 'selectMovie',
    'details/:id': 'showDetails',
    '':           'showMain'
  },

  showDetails: function(key) {
    var movie = new Movie({_key: key})
    this.listenTo(movie, 'all', function(ev) { console.log(ev) });
    movie.fetch();
  },

  selectMovie: function(id) {
    var that = this;
    deferred.done(function() {
      movies.resetSelected();
      movies.selectByID(id);
      that.layout.setDetails(that.movies.get(id));
    });
  },

  showMain: function() {
    this.movies.resetSelected();
    this.layout.setChose();
  },

  initialize: function(options) {
    this.movies = movies;
    this.listenTo(this.movies, 'all', function(ev) { console.log(ev) });
    this.layout = Layout.getInstance({
      el: '#movies', router: this
    });
    var that = this;
    // deferred.done(function(results) {
    //   that.movies.reset(results);
    //   that.layout.render();
    // });
  }
});
module.exports = MoviesRouter;
