var view_rentee_profile_id = ""
var paths = []



var public_rentee_profile = {
  showprofile: function() {
    var that = this;

    $.ajax({
        url: '/api/rentees/'+ view_rentee_profile_id,
      method: 'get',
      success: function (rentee) {
        console.log("show profile")

        console.log(rentee)
        $('.public-rentee-profileimage').html(
          '<img class= "profile-image" src="'+ rentee.avatar +'" width="200" height="200">'
        );
        $('.public-rentee-info').html(
          '<h1>'+ rentee.name +'</h1>' +
          '<h4>'+ rentee.description +'</h4>'
        );
        $('.public-rentee-contact').html(
          '<h4>'+ rentee.business_type +'</h4>'+
          '<h5>'+ rentee.location + '</h5>'
        );

        var i = 0;
        var html = ""
       for(i = 0; i < rentee.galleries.length; i++) {
        html = html + '<img class="gallery-image" src="'+ rentee.location_picture[i].location_picture +'" width="200" height="200">'  ;

        };
        console.log(html)
       $('.public-rentee-gallery').append(html);

      }
    });

  },
  init1: function() {
    this.showprofile();

  }
}

  var get_id_from_path_for_rentee = function (){

    var ourLocation = document.URL;
    console.log("Currently at " + ourLocation);
    path = ourLocation.split("/")
    console.log(path)

    if (path[4] === "rentee_profile") {
      console.log( "Currently on id " + path[5] )
      view_rentee_profile_id = path[5]
      public_rentee_profile.init1();
    } else { }

}

$(document).ready(function() {

get_id_from_path_for_rentee();

});

