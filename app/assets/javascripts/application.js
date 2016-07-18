//= require jquery/dist/jquery
//= require jquery-cookie/jquery.cookie
//= require jquery-deparam/jquery-deparam
//= require pubsub-js/src/pubsub
//= require j-toker/dist/jquery.j-toker
//= require bootstrap-sprockets
//= require_tree .

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
      tokenValidationPath:     '/rentee_auth/validate_token'
    }
  }
]);