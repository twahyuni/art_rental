$(document).ready(function() {
  var gallery_upload = {
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
      init: function () {
        this.bindUploadButton();
      }
    }
    gallery_upload.init();
});
