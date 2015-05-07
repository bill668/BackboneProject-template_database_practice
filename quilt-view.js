// declare namespace
var QuiltApp = window.QuiltApp || {};

QuiltApp.QuiltView = Backbone.View.extend({
    // define the container element for each model
    tagName: 'li',
    // define default class(es) to apply to the container elmeent
    className: 'tile',
    // reference & pre-render our template
    template: _.template($('#tile-template').html()),

    events: {
        'click .feature': 'addFeature',
        'click .view': 'viewPicture',
        'click .delete': 'deleteQuilt'
    },

    addFeature: function(e) {
        e.preventDefault();

        // toggle feature class to it. Depend on if it already has featured class or not.
        if(this.model.get('feature')){
            this.model.set('feature', false);
            this.$el.removeClass('featured');
        }else{
            this.model.set('feature', true);
            this.$el.addClass('featured');
        }

        // save the change to local sotrage
        this.model.save();
        
    },

    viewPicture: function(e) {
        e.preventDefault();
        this.$el.toggleClass('expanded');        
    },

    deleteQuilt: function(e) {
        e.preventDefault();
        if ( confirm('Are you sure you want to delete this tile?')) {
            this.model.destroy();

            // this slideUp is unnecessary, but it won't hurt
            this.$el.slideUp('fast', function() {
                this.remove();
            });
        }       
    },    

    render: function() {
        // build the new HTML using an underscore template        
        this.$el.html(this.template(this.model.toJSON()));

        // check if it set as featured and set a class if so
        if (this.model.get('feature')) {
            this.$el.addClass('featured');
        }

        // return the view for chaining
        return this;        
    }
});