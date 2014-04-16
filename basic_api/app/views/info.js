
var Backbone = require('backbone');
var _ = require('underscore');

var Info = Backbone.View.extend({
  template: _.template('Available movies: <%= shown %> (from <%= no %>) - Page <%= page %> / <%= totalPages %>'),
  render: function() {
    var moviesNo = this.proxy.superset().size(); 
    var shown = this.proxy.size(); 
    var currentPage = this.proxy.getPage() + 1; 
    var totalPages = this.proxy.getNumPages();
    this.$el.html(this.template({no: moviesNo, shown: shown, page: currentPage, totalPages: totalPages}));
    return this;
  },
  initialize: function(options) {
    this.proxy = options.proxy;
    this.listenTo(this.proxy, 'reset', this.render);
  }
});
module.exports = Info;
