$(document).ready(function() {
  var image_upload = {
    artist_avatar_upload: function () {
      var that = this;

      $("#artist-avatar-upload").uploadFile({
        url:"/",
        dragDrop:true,
        showPreview:true,
        previewHeight: "100px",
        previewWidth: "100px"
        // fileName:"myfile"
      });

    },
    init: function () {
      this.artist_avatar_upload();
    }
  }
  image_upload.init();
});