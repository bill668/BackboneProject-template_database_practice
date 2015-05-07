// declare namespace
var QuiltApp = window.QuiltApp || {};

QuiltApp.AppView = Backbone.View.extend({
	// container element for entire Backbone app
	el:$('#quilt-app'),

	// event handlers
	events: {
		'click #create-tile': 'createTile'
	},	


	initialize: function(){
		// variable to reference list, our new tile will append to this
		this.$tileList = $('#tile-list');

		// tile Form section
		this.$tileForm = $('#tile-form');
		this.$source = $('#source');
		this.$caption = $('#caption');
		this.$featured = $('#featured');
		this.$order = $('#order');

		// quilt stats section
		this.$stats = $('#quilt-stats');
		this.$countFeatured = $('#count-featured');
		this.$countRemaining = $('#count-remaining');

		this.listenTo(QuiltApp.Quilts, 'all', this.render);
		this.listenTo(QuiltApp.Quilts, 'add', this.addOne);
		this.listenTo(QuiltApp.Quilts, 'remove', this.removeOne);

		// pull up data from localStorage to our from
		QuiltApp.Quilts.fetch();
	},


	render: function(){
		//retrieve values
		var featuredCount = QuiltApp.Quilts.feature().length;
		var remainCount = 6 - QuiltApp.Quilts.length;

		//display values
		this.$countFeatured.text(featuredCount);
		this.$countRemaining.text(remainCount);
	},

	addOne: function(Quilts) {
		// create a new view for the todo
		var view = new QuiltApp.QuiltView({ model: Quilts });

		// put the new view on the page
		this.$tileList.append(view.render().el);

		// check if tiles amount touch the limit, if so sildeUp the from to prevent user keep puting new tile
		var remainCount = 6 - QuiltApp.Quilts.length;
		if (remainCount == 0){
			this.$tileForm.slideUp();
		}
	},

	removeOne: function(){
		// if tiles amount under limit, show the input box
		var remainCount = 6 - QuiltApp.Quilts.length;
		if (remainCount !== 0){
			this.$tileForm.slideDown();
		}
	},

	createTile: function(e){
		e.preventDefault();

		// store values from the form
		var tileValues = {
            source: this.$source.val(),
			caption:this.$caption.val(),
			feature:this.$featured.is(':checked'),
			order:this.$order.val()
        };

        // tell our collection to create a new quilt
        QuiltApp.Quilts.create(tileValues);

        this.$tileForm[0].reset();

	}
});

// initialize our application
QuiltAppView = new QuiltApp.AppView();