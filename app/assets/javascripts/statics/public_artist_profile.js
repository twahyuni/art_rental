var view_artist_profile_id = ""
var paths = []



var public_artist_profile = {
  showprofile: function() {
    var that = this;

    $.ajax({
        url: '/api/artists/'+ view_artist_profile_id,
      method: 'get',
      success: function (artist) {
        console.log("show profile")

        console.log(artist)
        $('.public-artist-profileimage').html(
          '<img class= "profile-image" src="'+ artist.avatar +'" width="200" height="200">'
        );
        $('.public-artist-info').html(
          '<h1>'+ artist.name +'</h1>' +
          '<h4>'+ artist.website +'</h4>'
        );
        $('.public-artist-contact').html(
          '<h4>'+ artist.contact +'</h4>'
        );

          var i = 0;
          var html = ""
         for(i = 0; i < artist.artworks.length; i++) {
    html = html + '<div class="artwork-box" >' + '<div class="row">'+ '<div class="col-xs-4">'+
                '<img  src="'+ artist.artwork_image[i].artwork_image +'" width="200" height="200">' + '</div>' + '<div class="col-xs-6">'+'</h4>'+
                '<h4>'+ artist.artworks[i].title+'</h4>' +'<h4>'+ artist.artworks[i].description + '</h4>'+'<h6>'+ artist.artworks[i].size+ '</h6>' +
                '</div>' +  '</div>' +
              '</div>'  ;

        };
        console.log(html)
       $('.public-artist-artwork').append(html);

      }
    });

  },
  init1: function() {
    this.showprofile();

  }
}

  var get_id_from_path = function (){

    var ourLocation = document.URL;
    console.log("Currently at " + ourLocation);
    path = ourLocation.split("/")
    console.log(path)

    if (path[4] == "artist_profile") {
      console.log( "Currently on id " + path[5] )
      view_artist_profile_id = path[5]
      public_artist_profile.init1();
    }

}

$(document).ready(function() {

get_id_from_path();

});

