var gallery_id = ""
var edit_gallery_id = ""
var del_gallery_id = ""
var ajaxGallery = {
  // EDIT SETTINGS
  bindUploadButton: function() {
    var that = this;

    $('#upload-picture-form').on("submit", function (e) {
      e.preventDefault();

      var data = {
        location_picture:  $('input[name="location_picture"]')[0].files[0] ? $('input[name="location_picture"]')[0].files[0] : "",
        title:  $('input[name="title"]').val(),
        description:  $('input[name="description"]').val(),
        location:  $('input[name="location"]').val()
      };

      var formData = new FormData();
      for (var key in data) {
        formData.append(key, data[key]);
      }
      // AJAX METHOD FOR CREATE
      $.ajax({
        url: 'api/galleries/create_gallery_picture',
        method: 'post',
        data: formData,
        processData: false,  // tell jQuery not to process the data
        contentType: false,  // tell jQuery not to set contentType
        success: function (resp) {
          console.log(resp)

          $('#upload-picture-Modal').modal('hide');
          ajaxGallery.init1();
        }
      })

    });
  },
  // AJAX METHODS
  getGalleries: function() {
    var that = this;

    $.ajax({
      url: '/api/rentee/galleries',
      method: 'get',
      success: function (galleries) {
        $('#galleries-index').html('');
        $('#galleries-index').append('<div class="regular">');

        galleries.forEach(function (gallery) {
          html = '' +
          '<div class= "gallery-image">' +
            '<img src="'+ gallery.location_picture +'" width="200" height="200">' +
            '<h6 class= "gallery_id_owner_access">'+  gallery.id + '</h6>' +
            '<button  class="edit-gallery-button btn btn-default"> EDIT </button>' +
          '</div>';

          $('.regular').append(html);
        });

        $('#galleries-index').append('</div>');
      }
    });
  },
  search_one_gallery_id: function() {
    var that = this;

    $.ajax({
      url: '/api/galleries/' + gallery_id,
      method: 'get',
      success: function (gallery) {
        console.log(gallery)

        html = '' +
        '<div class="row" data-id="'+ gallery.id + '" data-owner-id="'+ gallery.rentee_id + '">' +
          '<div class= "col-xs-7">' +
            '<img src="'+ gallery.location_picture +' " width="300" height="300">' +
          '</div>' +
          '<div class= "col-xs-5">' +
            '<h4 class= "edit-gallery-id">' + gallery.id +'</h4>' +
            '<input type="text" id="edit-gallery-title"name= "title" value= "'+ gallery.title +'">' +
            '<input type="text" id="edit-gallery-description" name= "description" value = "'+ gallery.description + '">' +
            '<input id="edit-gallery-location"type="text" name= "location" value = "'+ gallery.location + '">' +
            '<button  class="update-gallery-button btn btn-default"> SAVE </button>' + '<button  class="delete-gallery-button btn btn-default"> DELETE </button>'+
          '</div>' +
        '</div>'

        $('.update-gallery-details-container').html(html);

      }
    });
  },
  // BIND AJAX METHOD TO BUTTON
  bindShowClick: function() {
    var that = this;

    $('.rentee-toggle-modal').on('click', function (e) {
      e.preventDefault();

      var id = $(this).data('id');

      that.getGallery(id, that.setGallery);
    });
  },
  //INIT
  init1: function () {
    this.getGalleries();
  },
  init2: function () {
    this.search_one_gallery_id();
  },
  init3: function () {
    this.bindUploadButton();
  }
};

$(document).ready(function() {
  ajaxGallery.init1();
  ajaxGallery.init3();

  $(document).on('click', '.edit-gallery-button', function(e) {
    e.preventDefault();
    console.log('click')

    gallery_id = $(this).parent('div').find('.gallery_id_owner_access').html();
    console.log(gallery_id);
    // manage_artwork.init2();

    console.log("modal open")
    $('#update-gallery-Modal').modal('show');
    ajaxGallery.init2();
  });

  $(document).on('click', '.update-gallery-button', function(e) {
    console.log("update")

    edit_gallery_id = $(this).parent('div').find('.edit-gallery-id').html();
    console.log(edit_gallery_id);

    var data = {
      title:  $('#edit-gallery-title').val(),
      description:  $('#edit-gallery-description').val(),
      location:  $('#edit-gallery-location').val()
    };

    var formData = new FormData();
    for (var key in data) {
      formData.append(key, data[key]);
    };

    $.ajax({
      url: '/api/galleries/'+ edit_gallery_id,
      method: 'put',
      data: formData,
      processData: false,  // tell jQuery not to process the data
      contentType: false,  // tell jQuery not to set contentType
      success: function (resp) {
        console.log(resp)
        console.log("modal close")
        console.log(formData);

        $('#update-gallery-Modal').modal('hide');
      }
    })
  });

  $(document).on('click', '.delete-gallery-button', function(e) {
    console.log("DELETE")

    del_gallery_id = $(this).parent('div').find('.edit-gallery-id').html();
    console.log(edit_gallery_id);

    $.ajax({
      url: '/api/galleries/'+ del_gallery_id,
      method: 'delete',
      processData: false,  // tell jQuery not to process the data
      contentType: false,  // tell jQuery not to set contentType
      success: function (resp) {
        console.log(resp)
        console.log("modal close")
        ajaxGallery.init1();
        $('#update-gallery-Modal').modal('hide');
      }
    })
  });


});
