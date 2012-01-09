var OpponentsView = Backbone.View.extend({
	el:'body',
	
	events: {
        'dblclick #opponents':  'showOpponentRequest'
    },
	
	initialize: function(){
	    _.bindAll(this, 'render', 'refreshOpponents');
	    this.model.bind("reset", this.render, this);
	    this.refreshOpponents();
	    var opponentView = this;
	    $('#opponentsDialog').dialog(
	    		{'autoOpen': false,
	    		 'modal': true,
	    		 'buttons': {
	    			 'Yes': function() {$(this).dialog('close'); opponentView.inviteOpponent(); return true},
	    			 'No': function() {$(this).dialog('close'); return false}
	    		 }
	    		});
	},
	
	refreshOpponents: function() {
		var user = this.model;
		$.get('/opponents.html', function(data) {template=data; user.fetch();});
		_(this.refreshOpponents).delay(5000);
	},
	   
	render: function(){
	    var html = Mustache.to_html(template, this.model.toJSON()[0]);
	    $('#opponents_div').html(html);
	},
	
	showOpponentRequest: function(event) {
		$invitedOpponent = $(event.target);
		$('#opponentsDialog').dialog({ title: 'Confirm Invitation' });
		$('#opponentsDialog').text('Invite '+$invitedOpponent.text()+'?');
		$('#opponentsDialog').dialog('open');
	},
	
	inviteOpponent: function() {
		alert('Inviting '+$invitedOpponent.attr('value')+"...");
	}
});