$(document).ready(function() {
  $('#login-form').on('submit', function(e){
    e.preventDefault();


    var email = $('#login-form input[name="email"]').val();
    var password = $('#login-form input[name="password"]').val();
    var config = 'rentee';

    $.auth.emailSignIn({
      email: email,
      password: password
    }).then(function(resp){
      console.log(resp);
      document.location.href="/secret";
    }).fail(function(resp){
       $.auth.emailSignIn({
          email: email,
          password: password,
          config: config
        }).then(function(resp){
          console.log(resp);
          document.location.href="/secret";
        }).fail(function(resp){
          console.log(resp);
        });
    });
  });
});