$(document).ready(function() {
  $('#logout-button').on('click', function(){
    $.auth.signOut();
    document.location.href="/";
  });
});