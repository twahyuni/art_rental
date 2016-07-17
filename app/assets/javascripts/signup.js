$(document).ready(function() {
  $('#rentee-signup-form').on('submit', function(e){
    e.preventDefault();


    $.auth.emailSignUp({
      email: $('#rentee-signup-form input[name="email"]').val(),
      password: $('#rentee-signup-form input[name="password"]').val(),
      password_confirmation: $('#rentee-signup-form input[name="password_confirmation"]').val(),
      config: 'rentee'
    }).then(function(resp){
      console.log(resp);
    }).fail(function(resp){
      console.log(resp);
    });
  });

  $('#artist-signup-form').on('submit', function(e){
    e.preventDefault();


    $.auth.emailSignUp({
      email: $('#artist-signup-form input[name="email"]').val(),
      password: $('#artist-signup-form input[name="password"]').val(),
      password_confirmation: $('#artist-signup-form input[name="password_confirmation"]').val(),
    }).then(function(resp){
      console.log(resp);
    }).fail(function(resp){
      console.log(resp);
    });
  });

  $('#signup_button').hide();

  $('#show_signup_modal').click(function(){
    console.log("show signup ")
    $('#loginModal').modal('hide');
    $('#signupModal').modal('show');
  })

  $('#show_login_modal').click(function(){
    console.log("show login")

    $('#signupModal').modal('hide');
    $('#loginModal').modal('show');
  })

});