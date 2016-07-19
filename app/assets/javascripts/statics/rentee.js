$(document).ready(function() {
  var picture_upload = {
    bindEditButton: function () {
      var that = this;
      $('#edit-rentee-info-form').on("submit", function (e) {
        e.preventDefault();

        var data = {
          avatar:  $('input[name="avatar"]')[0].files[0] ? $('input[name="avatar"]')[0].files[0] : "",
          name:  $('input[name="name"]').val(),
          username:  $('input[name="username"]').val(),
          nickname:  $('input[name="nickname"]').val(),
          website:  $('input[name="website"]').val(),
          contact:  $('input[name="contact"]').val(),
          description:  $('input[name="description"]').val(),
          location:  $('input[name="location"]').val(),
          business_type:  $('input[name="business_type"]').val(),
        };

        var formData = new FormData();
        for (var key in data) {
          formData.append(key, data[key]);
        }

        $.ajax({
          url: '/api/rentees/update_profile',
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
  picture_upload.init();
});
