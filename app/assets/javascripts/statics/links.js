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
    // END OF - ONE PAGE FOR ARTIST
    // ONE PAGE FOR RENTEE
    bindToRenteeSettings: function () {
      var that = this;

    },
    bindToRenteeGallery: function () {
      var that = this;

    },
    // END OF - ONE PAGE FOR RENTEE
    // BIND INIT
    init: function () {
      this.bindToArtistSettings();
      this.bindToArtistArtworks();

      this.bindToRenteeSettings();
      this.bindToRenteeGallery();
    }
  };

  links.init();
});
