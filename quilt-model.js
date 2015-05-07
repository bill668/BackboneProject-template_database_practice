// declare namespace
var QuiltApp = window.QuiltApp || {};

// create a model standard
QuiltApp.QuiltModel = Backbone.Model.extend({
	defaults:{
		source: '',
		caption:'',
		feature:false,
		order:0
	}
});