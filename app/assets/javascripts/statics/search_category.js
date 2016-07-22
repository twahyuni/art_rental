var category = ""
var artwork_id = ""
var view_artist_profile_id = ""

$(document).ready(function() {
  $('#reservation-artwork-Modal').modal('hide');

  $('.search_category_button').click(function(){
    $('#header-page').hide();
    $('.to-small-cat').hide();


    category = $(this).parent('li').find('.search_category_button').attr("data-category");
    console.log(category);
    search_engine.init1();
    search_engine.init1();

  });
});

var search_engine = {
  search_category: function() {
    var that = this;

    $.ajax({
        url: '/api/artworks/result/'+ category,
      method: 'get',
      success: function (artworks) {
        console.log(artworks)
        $('#search-category-artwork').html('');

        artworks.forEach(function (artwork) {
          html = '<div class= "search-artwork artwork-box" >' + '<div>'+
                '<img src="'+ artwork.artwork_image +'" width="280" height="280">' + '</div>'+
                '<a class="pull-right" href="/public/artist_profile/' + artwork.owner_id + '">'+ "by- "+ artwork.owner + '</a>' +
                '<h6 class= "hide artwork_id">'+ artwork.id +'</h6>'+
                '<button class="rent_artwork artist-hide btn btn-info">' + "rent" + '</button>'
              '</div>';
          $('#search-category-artwork').append(html);
        });
      }
    });

  },
  search_artwork_id: function() {
    var that = this;

    $.ajax({
      url: '/api/artworks/' + artwork_id,
      method: 'get',
      success: function (artwork) {
        console.log(artwork)

        html =  '<div class="row" data-id="'+ artwork.id + '" data-owner-id="'+ artwork.artist_id + '">' +
                  '<div class= "col-xs-7">' +
                    '<img src="'+ artwork.artwork_image +' " width="300" height="300">' +
                  '</div>' +
                  '<div class= "col-xs-5">' +
                    '<h4>'+ artwork.title+'</h4>' +
                    '<h4>'+ artwork.description + '</h4>' +
                    '<h6>'+ artwork.size + '</h6>' +
                    '<h6>' + artwork.owner + '</h6>' +
                  '</div>' +
                '</div>'
        $('.reservation-artworks-details-container').html(html);
      }
    });

  },
  init1: function() {
    this.search_category();

  },
   init2: function() {
    this.search_artwork_id();

  }
}


$(document).on('click', '.rent_artwork', function(e) {

  e.preventDefault();

  artwork_id = $(this).parent('div').find('.artwork_id').html();
  console.log(artwork_id);
  search_engine.init2();


  console.log("modal open")
  $('#reservation-artwork-Modal').modal('show');

});

