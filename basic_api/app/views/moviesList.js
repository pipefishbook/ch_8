var Backbone = require('backbone');
var _ = require('underscore');

var MovieView = require('views/movie');
var MoviesList = Backbone.View.extend({

  tagName: 'section',

  render: function() {
    var that = this;
    var moviesView = this.collection.map(function(movie) {
      return (new MovieView({model : movie, router: that.router})).render().el;
    });
    this.$el.html(moviesView);
    return this;
  },

  initialize: function(options) {
    this.router = options.router;
    this.listenTo(this.collection, 'reset', this.render);
  }
});

module.exports = MoviesList;
