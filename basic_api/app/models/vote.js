var Backbone = require("backbone");
var Vote = Backbone.Model.extend({

  urlRoot: '/api/votes',

  defaults: {
    movie_id: 0,
    vote: 0
  }
});
module.exports = Vote;
