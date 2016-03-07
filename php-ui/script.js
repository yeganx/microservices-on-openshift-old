$(function() {

    $('#login-form-link').click(function(e) {
		$("#login-form").delay(100).fadeIn(100);
 		$("#register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
	$('#register-form-link').click(function(e) {
		$("#register-form").delay(100).fadeIn(100);
 		$("#login-form").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});

	$('#register-submit').click(function(e) {
		$.ajax({
		  type: "POST",
		  //url: "http://users-api-microservices.apps.osecloud.com/users",
		  url: $("#hdnTarget").val()+"/users",
		  data: {
		  	name: $("#username").val(),
		  	password: $("#password").val(),
		  	email: $("#email").val()
		  },
		  success: function(resp) {
		  	 console.log(resp);
		  	 alert('Registration complete!');
		  	 $('#login-form-link').click();
		  },
		  dataType: 'json'
		});
		e.preventDefault();
	});
});

