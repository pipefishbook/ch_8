var Backbone = require("backbone");

var Movie = Backbone.Model.extend({
  defaults: {
    title: "default",
    year: 0,
    rating: 0,
    description: "empty",
    selected: false
  },

  idAttribute: '_key',

  urlRoot: '/api/movies',

  voteMovie: function(stars) {
    var that = this;
    this.save({ type: "PUT", 
             url: "/movies/" + this.id, 
             contentType: 'application/json',
             data: JSON.stringify({vote: stars})
    })
    .then(function(movie) {
      that.set({rating: stars, score: movie.score, rank: movie.rank});
    })
    .fail(function(err) {
      console.log(err);
    });
  }
});
module.exports = Movie;
