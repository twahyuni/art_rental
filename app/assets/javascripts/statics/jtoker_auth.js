$(document).ready(function() {
  $('#signup_button').hide();
  $('#login_button').hide();

  // RENTEE AUTH SIGNUP
  $('#rentee-signup-form').on('submit', function(e){
    e.preventDefault();

    $.auth.emailSignUp({
      email: $('#rentee-signup-form input[name="email"]').val(),
      password: $('#rentee-signup-form input[name="password"]').val(),
      password_confirmation: $('#rentee-signup-form input[name="password_confirmation"]').val(),
      config: 'rentee'
    }).then(function(resp){
      console.log(resp);
       $('#signup-renteeModal').modal('hide');
       document.location.href="/rentee_profile";


    }).fail(function(resp){
      console.log(resp);
    });
  });

  // ARTIST AUTH SIGNUP
  $('#artist-signup-form').on('submit', function(e){
    e.preventDefault();

    $.auth.emailSignUp({
      email: $('#artist-signup-form input[name="email"]').val(),
      password: $('#artist-signup-form input[name="password"]').val(),
      password_confirmation: $('#artist-signup-form input[name="password_confirmation"]').val(),
    }).then(function(resp){
      console.log(resp);
      $('#signup-artistModal').modal('hide');
      document.location.href="/artist_profile";
    }).fail(function(resp){
      console.log(resp);
    });
  });

  // ARTIST AUTH LOGIN
  $('#artist-login-form').on('submit', function(e){
    e.preventDefault();

    var artist_params = {
      email: $('#artist-login-form input[name="email"]').val(),
      password: $('#artist-login-form input[name="password"]').val()
    }

    $.auth.emailSignIn(artist_params).then(function(resp){
      console.log(resp);
      document.location.href="/artist_profile";
      $('#rentee_profile').hide();
    }).fail(function(resp){
      console.log(resp);
    });
  });

  // RENTEE AUTH LOGIN
  $('#rentee-login-form').on('submit', function(e){
    e.preventDefault();

    var rentee_params = {
      email: $('#rentee-login-form input[name="email"]').val(),
      password: $('#rentee-login-form input[name="password"]').val(),
      config: 'rentee'
    }

    $.auth.emailSignIn(rentee_params).then(function(resp){
      console.log(resp);
      $('#artist_profile').hide();
      location.href = "/rentee_profile";
    }).fail(function(resp){
      console.log(resp);
    })
  });

  // AUTH LOGOUT
  $('#logout-button').on('click', function(){
    $.auth.signOut();
    document.location.href="/";
  });

  // WITHIN MODALS
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

  $('#login-artist').click(function(){
    console.log("show artistlogin ")
    $('#logintypeModal').modal('hide');
    $('#login-artistModal').modal('show');
 })

  $('#login-rentee').click(function(){
    console.log("show renteelogin ")
    $('#logintypeModal').modal('hide');
    $('#login-renteeModal').modal('show');
  })

  $('.show_signup_type_modal').click(function(){
    console.log("show type")
    $('#login-artistModal').modal('hide');
    $('#login-renteeModal').modal('hide');
    $('#logintypeModal').modal('hide');
    $('#show-signuptypeModal').modal('show');
  })

  $('#signup-artist').click(function(){
    console.log("artist-signup ")
    $('#login-artistModal').modal('hide');
    $('#login-renteeModal').modal('hide');
    $('#logintypeModal').modal('hide');
    $('#show-signuptypeModal').modal('hide');
    $('#signup-artistModal').modal('show');
   })

  $('#signup-rentee').click(function(){
    console.log("rentee-signup ")
    $('#login-artistModal').modal('hide');
    $('#login-renteeModal').modal('hide');
    $('#logintypeModal').modal('hide');
    $('#show-signuptypeModal').modal('hide');
    $('#signup-renteeModal').modal('show');
   })

  $('.show_login_type').click(function(){
    console.log("show artistlogin ")
    $('#signup-artistModal').modal('hide');
    $('#signup-renteeModal').modal('hide');
    $('#logintypeModal').modal('show');
   })

});