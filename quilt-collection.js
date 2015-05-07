// declare namespace
var QuiltApp = window.QuiltApp || {};

// create a new collection
QuiltApp.QuiltCollection = Backbone.Collection.extend({
	// specify the name of the model to be stored in this collection
	model: QuiltApp.QuiltModel,
	// store quilts in local storage
	localStorage: new Backbone.LocalStorage('quiltApp'),

	comparator: 'order',

	// return array of quilts have feature:true
	feature: function(){
		return this.where({ feature:true});
	}

});

// create an instance of quilt collection
QuiltApp.Quilts = new QuiltApp.QuiltCollection();