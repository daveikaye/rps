var User = Backbone.Model.extend({});
var UserCollection = Backbone.Collection.extend({
	model: User,
	url: '/rps'
});