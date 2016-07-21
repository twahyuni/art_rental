var artwork_id_owner = ""
var edit_artwork_id = ""

$(document).ready(function() {
  manage_artwork.init1();
  manage_artwork.init3();

  $(document).on('click', '.edit-artwork-button', function(e) {

    e.preventDefault();
    console.log('click')

    artwork_id_owner = $(this).parent('div').find('.artwork_id_owner_access').html();
    console.log(artwork_id_owner);
    manage_artwork.init2();

    console.log("modal open")
    $('#update-artwork-Modal').modal('show');

  });

});

var manage_artwork = {
  uploadArtwork: function () {
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
  get_artworks: function() {
    var that = this;

    $.ajax({
      url: '/api/artist/artworks',
      method: 'get',
      success: function (artworks) {
        console.log(artworks)
        $('#artist-artwork-container').html('');

        artworks.forEach(function (artwork) {
          html = '<div>' + '<div class="row">'+ '<div class="col-xs-4">'+
                '<img src="'+ artwork.artwork_image +'" width="200" height="200">' + '</div>' + '<div class="col-xs-6">'+'</h4>'+
                '<h4>'+ artwork.title+'</h4>' +'<h4>'+ artwork.description + '</h4>'+'<h6>'+ artwork.size+ '</h6>' + '<h6 class= "artwork_id_owner_access">' + artwork.id +'</h6>'+ '<button class= "edit-artwork-button btn btn-default"> EDIT </button>'
                '</div>' +  '</div>' +
              '</div>' + '<hr>' ;
          $('#artist-artwork-container').append(html);
        });
      }
    });
  },
  search_one_artwork_id: function() {
    var that = this;

    $.ajax({
      url: '/api/artworks/' + artwork_id_owner,
      method: 'get',
      success: function (artwork) {
        console.log(artwork)

        html = '<div class="row" data-id="'+ artwork.id + '" data-owner-id="'+ artwork.artist_id + '">' +
                  '<div class= "col-xs-7">' +
                    '<img src="'+ artwork.artwork_image +' " width="300" height="300">' +
                  '</div>' +
                  '<div class= "col-xs-5">' +
                    '<h4 class= "edit-art-work-id">' + artwork.id +'</h4>' +
                    '<input type="text" id="edit-artwork-title"name= "title" value= "'+ artwork.title +'">' +
                    '<input type="text" id="edit-artwork-description" name= "description" value = "'+ artwork.description + '">' +
                    '<input id="edit-artwork-size"type="text" name= "size" value = "'+ artwork.size + '">' +
                    '<button  class="update-artwork-button btn btn-default"> SAVE </button>' +
                  '</div>' +
                '</div>'

        $('.update-artworks-details-container').html(html);

      }
    });
  },
  init1: function () {
    this.get_artworks();
  },
  init2: function () {
    this.search_one_artwork_id();
  },
  init3: function () {
    this.uploadArtwork();
  }
}

$(document).on('click', '.update-artwork-button', function(e) {
  console.log("update")

  edit_artwork_id = $(this).parent('div').find('.edit-art-work-id').html();
  console.log(edit_artwork_id);

  var data = {
    title:  $('#edit-artwork-title').val(),
    description:  $('#edit-artwork-description').val(),
    size:  $('#edit-artwork-size').val()
  };

  var formData = new FormData();
  for (var key in data) {
    formData.append(key, data[key]);
  }

  $.ajax({
    url: '/api/artworks/'+ edit_artwork_id,
    method: 'put',
    data: formData,
    processData: false,  // tell jQuery not to process the data
    contentType: false,  // tell jQuery not to set contentType
    success: function (resp) {
      console.log(resp)
      console.log("modal close")

      $('#update-artwork-Modal').modal('hide');
      manage_artwork.init1();
    }
  })
});



