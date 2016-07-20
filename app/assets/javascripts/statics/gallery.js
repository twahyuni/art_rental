$(document).ready(function() {
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
          $('#galleries-index').append('<section class="regular">');

          galleries.forEach(function (gallery) {
            html = '<div>' +
                  '<a class="rentee-toggle-modal" data-id="'+ gallery.id +'">'+
                    '<img src="'+ gallery.location_picture +'" width="200" height="200">' +
                  '</a>' +
                '</div>';
            $('.regular').append(html);
          });

          $('#galleries-index').append('</section>');

        }
      });

    },
    getGallery: function(id, cb) {

      $.ajax({
        url: '/api/galleries/' + id,
        method: 'get',
        success: function (gallery) {
          cb(gallery, "show");
        },
        error: function (resp) {
          console.log(resp);
        }
      });

    },
    updateGallery: function(id, formData, cb) {

      $.ajax({
        url: '/api/galleries/' + id,
        method: 'put',
        data: formData,
        success: function (post) {
          ajaxGallery.getGalleries();
          cb(post, "edit");
        },
        error: function (resp) {
          console.log(resp);
        }
      });

    },
    hideAllInModal: function() {
      var $modal = $('');
      $modal.find('').hide();
      $modal.find('').hide();
      $modal.find('').hide();
    },
    setGallery: function(gallery, mode) {
      ajaxGallery.hideAllInModal();

      var $modal = $('');

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
    init: function () {
      this.bindUploadButton();
      this.getGalleries();
    }
  }

  ajaxGallery.init();
});
