var SigninView = Backbone.View.extend({
	el: 'body',
	
	initialize: function() {
		var signinView = this;
		_.bindAll(this, 'registerUser', 'successfulLogin');
		
		$('#signinDialog').dialog(
	    		{'autoOpen': false,
	    		 'modal': true,
	    		 'title': 'Register',
	    		 'buttons': {
	    			 'Register': function() {$(this).dialog('close'); signinView.registerUser(); return true}
	    		 }
	    		});
		
		$('#signinDialog').dialog('open');
	},

    registerUser: function() {
    	$.ajax({
    		url: '/rps',
    		type: 'POST',
    		data: {'user_name': $('#user_name').val()},
    		success: this.successfulLogin
    	});
    },
	
	successfulLogin: function(userInfoFromServer) {
		thisUser = userInfoFromServer;
		users = new UserCollection();
		users.url += '?userId='+thisUser.user_id; 
		new OpponentsView({'model': users});
	}
});