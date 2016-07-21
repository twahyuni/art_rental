$(document).ready(function(){

  var links = {
    hideAllContent: function () {
      $('.content').hide();
    },
    // ONE PAGE FOR ARTIST
    bindToArtistSettings: function () {
      var that = this;

      $('.to-artist-settings').on("click", function () {

        that.hideAllContent();
        $('.artist-settings').show();
      });

    },
    bindToArtistArtworks: function () {
      var that = this;

      $('.to-artist-artworks').on("click", function () {
        that.hideAllContent();
        $('.artist-artworks').show();
      });

    },
    bindToArtistUpload: function(){

      $('.to-upload-artworks').on("click", function(){
        $('#upload-art-Modal').modal('show');
      });

    },
    // END OF - ONE PAGE FOR ARTIST
    // ONE PAGE FOR RENTEE
    bindToRenteeSettings: function () {
      var that = this;

      $('.to-rentee-settings').on("click", function () {
        that.hideAllContent();
        $('.rentee-settings').show();
      });

    },
    bindToRenteeGallery: function () {
      var that = this;

      $('.to-rentee-gallery').on("click", function () {
        that.hideAllContent();
        $('.rentee-gallery').show();
      });

    },
    bindToRenteeUpload: function(){

      $('.to-upload-picture').click(function(){
        $('#upload-picture-Modal').modal('show');
      });

    },
    // END OF - ONE PAGE FOR RENTEE
    // BIND INIT
    init: function () {
      this.bindToArtistSettings();
      this.bindToArtistArtworks();
      this.bindToArtistUpload();

      this.bindToRenteeSettings();
      this.bindToRenteeGallery();
      this.bindToRenteeUpload();
    }
  };

  links.init();
});
