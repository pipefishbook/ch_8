var Backbone = require('backbone');
Backbone.Obscura = require('backbone.obscura');

var _ = require('underscore');

var $ = Backbone.$;

var MoviesList = require('views/moviesList');
var DetailsView = require('views/details');
var ChoseView = require('views/chose');
var Controls = require('views/controls');
var Info = require('views/info');

var Layout = Backbone.View.extend({

  template: _.template('           \
             <header>   \
             <a href="#">Home</a>  \
               <nav id="controls"> \
                 <p>Sort:</p> \
                 <button id="prev">Previous</button> \
                 <button id="next">Next</button> \
                 <p>Sort:</p> \
                 <button id="by_title">By Title</button>  \
                 <button id="by_rating">By Rating</button>\
                 <button id="by_showtime">By Showtime</button> \
                 <p>Filter</p> \
                   <input type="checkbox" name="genres" value="Drama"> \
                     Drama \
                   </input> \
                   <input type="checkbox" name="genres" value="Action"> \
                     Action \
                   </input> \
               </nav> \
               <span id="info">  \
               </span>               \
             </header>            \
             <div id="overview">  \
             </div>               \
             <div id="details">   \
             </div>'),

    render: function() {
      this.$el.html(this.template());
      this.currentDetails.setElement(this.$('#details')).render();
      this.overview.setElement(this.$('#overview')).render();
      this.controls.setElement(this.$('#controls')).render();
      this.info.setElement(this.$('#info')).render();

      return this;
    },

    setDetails: function(movie) {
      if (this.currentDetails) this.currentDetails.remove();
      this.currentDetails = new DetailsView({model: movie});
      this.render();
    },

    setChose: function() {
      if (this.currentDetails) this.currentDetails.remove();
      this.currentDetails = new ChoseView();
      this.render();
    },

    initialize: function(options) {
      this.proxy = new Backbone.Obscura(options.router.movies); 
      this.proxy.setPerPage(4);
      this.currentDetails = new ChoseView();
      this.overview = new MoviesList({
        collection: this.proxy,
        router: options.router
      });
      this.controls = new Controls({ proxy: this.proxy });
      this.info = new Info({proxy: this.proxy });
    }

});

var instance;
Layout.getInstance = function(options) {
  if (!instance) {
    instance = new Layout({
      el: options.el,
      router: options.router,
      collection: options.router.movies
    });
  }
  return instance;
}
module.exports = Layout;
