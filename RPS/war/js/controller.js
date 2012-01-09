(function($){
	
  $(function() {
	  new SigninView();

	  var ListView = Backbone.View.extend({
	    el: $('body'), // el attaches to existing element

	    events: {
	      'click .rpsButton': 'addItem'
	    },
	    initialize: function(){
	      _.bindAll(this, 'render', 'addItem', 'pingAlive'); // every function that uses 'this' as the current object should be in here
	      
	      this.counter = 0; // total number of items added thus far
	      this.render();
	      this.pingAlive();
	    },

	    render: function(){
	     function countDown(counter) {
	      $('#counter').text(counter);
	     }
	     _(countDown).delay(1000, 3);
	     _(countDown).delay(2000, 2);
	     _(countDown).delay(3000, 1);
	     _(countDown).delay(4000, 'GO!');
	    },
	    
	    addItem: function(e){
	      $('#yourChoice').append('<li>'+$(e.target).text()+'</li>');
	    },
	    
	    pingAlive: function() {
	    	if ((typeof users != 'undefined') && (users.url.indexOf('userId=') != -1)) {
	    		$.ajax({
	        		url: '/rps',
	        		type: 'GET',
	        		data: {'pingAlive': 'true',
	        			   'userId': thisUser.user_id}
	        	});
	    	}
	    	_(this.pingAlive).delay(5000);
	    }
	  });
	  
	  new ListView();
  });
	
})(jQuery);