var Backbone = require('backbone');
var _ = require('underscore');
var $ = Backbone.$;

var GenresView = require('views/genresFilter');

var ControlsView = Backbone.View.extend({

  events: {
     'click #by_title': 'sortByTitle',
     'click #by_rating': 'sortByRating',
     'click #by_showtime': 'sortByShowtime',
     'click #next': 'paginateNext',
     'click #prev': 'paginatePrev'
  },

  render: function() {
    this.$el.html("testetstst");
    return this;
  },


  selectGenres: function(ev) {
    var that = this;
    that.proxy.resetFilters();
    var genres = _.map($("input[type=checkbox]:checked"), function(genre) { 
      that.proxy.filterBy(genre.value, function(m) {
        return (_.findWhere(m.get('genres'), genre.value))
      })
    });
  },

  paginateNext: function() {
    this.proxy.nextPage();
  },

  paginatePrev: function() {
    this.proxy.prevPage();
  },

  sortByTitle: function(ev) {
    this.proxy.setSort("title", "asc");
  },
  
  sortByRating: function(ev) {
    this.proxy.setSort("rating", "desc");
  },
  
  sortByShowtime: function(ev) {
    this.proxy.setSort("showtime", "asc");
  },

  initialize: function(options) {
    this.proxy = options.proxy;
  }
});
module.exports = ControlsView;
