
$(document).ready(function() {
  var manage_artwork = {
    // EDIT ARTWORK
    bindEditButton: function () {
      var that = this;

      $('#upload-artwork-form').on("submit", function (e) {
        e.preventDefault();

        var data = {
          artwork_image:  $('input[name="artwork"]')[0].files[0] ? $('input[name="artwork"]')[0].files[0] : "",
          title:  $('input[name="title"]').val(),
          category:  $('input[name="category"]').val(),
          description:  $('input[name="description"]').val(),
          size:  $('input[name="size"]').val(),
          medium:  $('input[name="medium"]').val()
        };

        var formData = new FormData();

        for (var key in data) {
          formData.append(key, data[key]);
        }

        $.ajax({
          url: '/api/artists/create_artwork',
          method: 'post',
          data: formData,
          processData: false,  // tell jQuery not to process the data
          contentType: false,  // tell jQuery not to set contentType
          success: function (resp) {
           console.log(resp)
          }
        })
      });
    },
    // INDEX ARTWORKS
    get_artwork: function() {
      var that = this;

      $.ajax({
        url: '/api/artist/artworks',
        method: 'get',
        success: function (artworks) {
          console.log(artworks)

          $('#artist-artwork-container').html('');

          artworks.forEach(function (artwork) {
            html =  '<div>' + '<div class="row">'+ '<div class="col-xs-4">'+
                      '<img src="'+ artwork.artwork_image +'" width="200" height="200">' +
                    '</div>' + '<div class="col-xs-7">'+
                      '<h4>'+ artwork.title+'</h4>' +'<h4>'+ artwork.description + '</h4>'+'<h6>'+ artwork.size+ '</h6>'
                    '</div>' + '</div>' + '</div>' + '<hr>' ;
            $('#artist-artwork-container').append(html);
          });
        }
      });
    },

    init: function () {
      this.bindEditButton();
      this.get_artwork();
    }
  }

 manage_artwork.init();

});