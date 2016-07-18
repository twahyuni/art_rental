$(document).ready(function() {
  $('#artist-login-form').on('submit', function(e){
    e.preventDefault();

    $.auth.emailSignIn({
      email: $('#artist-login-form input[name="email"]').val(),
      password: $('#artist-login-form input[name="password"]').val()
    }).then(function(resp){
      console.log(resp);
      document.location.href="/secret";
    }).fail(function(resp){
      console.log(resp);
    });
  });

  $('#rentee-login-form').on('submit', function(e){
    e.preventDefault();

    $.auth.emailSignIn({
      email: $('#rentee-login-form input[name="email"]').val(),
      password: $('#rentee-login-form input[name="password"]').val(),
      config: 'rentee'
    }).then(function(resp){
      console.log(resp);
      document.location.href="/secret";
    }).fail(function(resp){
      console.log(resp);
    });
  });
});