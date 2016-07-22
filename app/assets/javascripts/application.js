//= require jquery/dist/jquery
//= require jquery-cookie/jquery.cookie
//= require jquery-deparam/jquery-deparam
//= require pubsub-js/src/pubsub
//= require j-toker/dist/jquery.j-toker
//= require bootstrap-sprockets

//= require blueimp-file-upload/js/vendor/jquery.ui.widget
//= require blueimp-file-upload/js/jquery.iframe-transport
//= require blueimp-file-upload/js/jquery.fileupload

//= require moment

//= require_tree .

$(document).ready(function(){
  var cookies = document.cookie;

  console.log("a", cookies);
  $.auth.configure([
    {
      default: {
        apiUrl: location.origin,
      }
    }, {
      rentee: {
        apiUrl:                  location.origin,
        signOutUrl:              '/rentee_auth/sign_out',
        emailSignInPath:         '/rentee_auth/sign_in',
        emailRegistrationPath:   '/rentee_auth',
        accountUpdatePath:       '/rentee_auth',
        accountDeletePath:       '/rentee_auth',
        passwordResetPath:       '/rentee_auth/password',
        passwordUpdatePath:      '/rentee_auth/password',
        tokenValidationPath:     '/rentee_auth/validate_token',

        handleLoginResponse: function(resp) {
          return resp.data;
        },

        handleAccountUpdateResponse: function(resp) {
          return resp.data;
        },

        handleTokenValidationResponse: function(resp) {
          return resp.data;
        }
      }
    }
  ]).then(function(resp){

    console.log("Artist is loggedin")
    setupAjax();
    $('.artist-show').show();
    $('#logout-button').show();
  }).fail(function(resp){
    console.log("Artist is not loggedin")
    $('#logintype_button').show();
    document.cookie = cookies;


    $.auth.validateToken({config: "rentee"}).then(function(resp){
      console.log("Rentee is loggedin")


      document.cookie = cookies;
      setupAjax();
      console.log("c", cookies);
      $('.rentee-show').show();
      $('#logintype_button').hide();
      $('#logout-button').show();


    }).fail(function(resp){
      console.log("Rentee is not loggedin")
       $('#logintype_button').show();
      setupAjax();
    })
  });

  function setupAjax () {
    $.ajaxSetup({
      beforeSend: function (xhr) {
        xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
        document.cookie = cookies;
      }
    })
  }
})

