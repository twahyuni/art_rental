$(document).ready(function() {
  var image_upload = {
    artist_avatar_upload: function () {
      var that = this;

    $('#fileupload').fileupload({
    url: 'php/index.php',
    done: function (e, data) {
        $.each(data.result, function (index, file) {
            $('<p/>').text(file.name).appendTo('body');
        });
      }
    });


    },
    init: function () {
      this.artist_avatar_upload();
    }
  }
  image_upload.init();
});