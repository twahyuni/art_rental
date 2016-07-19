$(document).ready(function() {
  var image_upload = {
    bindEditButton: function () {
      var that = this;
      $('#edit-artist-info-form').on("submit", function (e) {
        e.preventDefault();

        var data = {
          avatar:  $('input[name="avatar"]')[0].files[0] ? $('input[name="avatar"]')[0].files[0] : "",
          name:  $('input[name="name"]').val(),
          username:  $('input[name="username"]').val(),
          website:  $('input[name="website"]').val(),
          contact:  $('input[name="contact"]').val(),
          description:  $('input[name="description"]').val(),
        };

        var formData = new FormData();
        for (var key in data) {
          formData.append(key, data[key]);
        }

        $.ajax({
          url: '/api/artists/update_profile',
          method: 'put',
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
      this.bindEditButton();
    }
  }
  image_upload.init();
});
