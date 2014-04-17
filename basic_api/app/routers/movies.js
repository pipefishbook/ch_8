var Backbone = require('backbone');
var _ = require('underscore');

// data
var Movies = require('collections/movies');
var movies = new Movies();
var deferred = movies.fetch();

// views
var Layout = require('views/layout');

var MoviesRouter = Backbone.Router.extend({

  routes: {
    'movies/:id': 'selectMovie',
    '':           'showMain'
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
    this.layout = Layout.getInstance({
      el: '#movies', router: this
    });
    var that = this;
    deferred.done(function(results) {
      that.movies.reset(results);
      that.layout.render();
    });
  }
});
module.exports = MoviesRouter;
