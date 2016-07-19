$(document).ready(function() {
  var image_upload = {
    artist_avatar_upload: function () {
      var that = this;

    $('#fileupload').fileupload({
        url: '/artists',
        metod: 'put',
        add: function (e, data) {
            data.context = $('<button/>').text('Upload')
                .appendTo(document.body)
                .click(function () {
                    data.context = $('<p/>').text('Uploading...').replaceAll($(this));
                    data.submit();
                });
        },
        done: function (e, data) {
            data.context.text('Upload finished.');
        }
    });


    },
    init: function () {
      this.artist_avatar_upload();
    }
  }
  image_upload.init();
});