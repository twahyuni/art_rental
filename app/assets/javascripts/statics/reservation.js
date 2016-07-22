$(document).ready(function() {
  // var name = "";
  // var showUrl = "";

  // if ($('body').hasClass("rentee_profile")) {
  //   name = "rentee";
  //   showUrl = '/api/rentee/reservations';
  // } else if ($('body').hasClass("artist_profile")) {
  //   name = "artist"
  //   showUrl = '/api/reservations';
  // } else {
  //   return false;
  // }

  var ajaxReservation = {
    createReservation: function(params, cb) {
      $.ajax({
        url: '/api/reservations',
        method: 'post',
        data: params,
        success: function (reservation) {
          ajaxReservation.bindShowReservations();
          cb(reservation, "edit");
          console.log(reservation)
        }
      })
    },
    bindCreateReservation: function() {
      var that = this;

      $('.reservation-date-button').on("click", function (e) {
        e.preventDefault();

        var params = {
          start_reservation_date: $('#datetimepicker-open-reservation input').val(),
          end_reservation_date: $('#datetimepicker-close-reservation input').val(),
          artwork_id: $('.reservation-date-button').parents('div').find('.row').attr('data-id'),
          artist_id: $('.reservation-date-button').parents('div').find('.row').attr('data-owner-id')
        }

        that.createReservation(params, that.setReservation);

      });
    },
    bindShowReservations: function() {
      if (!$('body').hasClass('rentee_profile')) { return false; }

      var that = this;


      // GET THE RESERVATION RELATED TO THIS RENTEE
      $.ajax({
        url: '/api/rentee/reservations',
        method: 'get',
        success: function (reservations) {
          $('#rented-artworks-index').html('');
          reservations.forEach(function (reservation) {

            var today = moment(new Date()).format('YYYY-MM-DD');
            var status = ''
            if (today >= reservation.start_reservation_date && today <= reservation.end_reservation_date) {
              status = 'NOT AVAILABLE'
            } else {
              status = 'AVAILABLE'
            }

            html = '' +
            '<div class="rentee-reservation-card">' +
              '<div class="row">' +
                reservation.start_reservation_date + '-' + reservation.end_reservation_date +
                '<div class="col-xs-5">' +
                  '<img src="'+ reservation.artwork_url + '">' +
                  '<a href="/public/artist_profile/' + reservation.artist_id + '"> by - ' + reservation.artwork_artist_name + '</a>' +
                '</div>' +
                '<div class="col-xs-7">' +
                  '<h1>' + reservation.artwork_title + '</h1>' +
                  '<p>' + reservation.artwork_medium + '</p>' +
                  '<p>' + reservation.artwork_size + '</p>' +
                  '<button class="btn btn-success show-reservation-card-button" + data-id="' + reservation.id + '">'+ status + '</button>' +
                '</div>' +
              '</div>' +
            '</div>';

            $('#rented-artworks-index').append(html);
          });

          that.bindShowReservation();
        }
      });
    },
    getReservation: function(id, cb) {
      $.ajax({
        url: '/api/reservations/' + id,
        method: 'get',
        success: function (reservation) {
          cb(reservation, "show");
        },
        error: function (resp) {
          console.log(resp);
        }
      });
    },
    hideAllInModal: function () {
      var $modal = $('#rentee-reservation-modal');

      $modal.find('.reservation-show').hide();
      $modal.find('.reservation-edit-delete').hide();
    },
    setReservation: function(reservation, mode) {
      ajaxReservation.hideAllInModal();

      var $modal = $('#rentee-reservation-modal');

      if (!$.isEmptyObject(reservation)) {
        // set data values
        $modal.data("id", reservation.id);

        // htmlData for set in the modal
        showData = '' +
                  '<div class="row">' +
                    reservation.start_reservation_date + ' - ' + reservation.end_reservation_date +
                    '<div class="col-xs-6">' +
                      '<img src="'+ reservation.artwork_url + '">' +
                      '<a href=""> by - ' + reservation.artwork_artist_name + '</a>' +
                    '</div>' +
                    '<div class="col-xs-6">' +
                      '<h1>' + reservation.artwork_title + '</h1>' +
                      '<p>' + reservation.artwork_medium + '</p>' +
                      '<p>' + reservation.artwork_size + '</p>' +
                    '</div>' +
                  '</div>'

        editData = '' +
                  '<div class="row">' +
                    reservation.start_reservation_date + ' - ' + reservation.end_reservation_date +
                    '<div class="col-xs-6">' +
                      '<img src="'+ reservation.artwork_url + '">' +
                      '<a href=""> by - ' + reservation.artwork_artist_name + '</a>' +
                    '</div>' +
                    '<div class="col-xs-6">' +
                      '<h1>' + reservation.artwork_title + '</h1>' +
                      '<p>' + reservation.artwork_medium + '</p>' +
                      '<p>' + reservation.artwork_size + '</p>' +
                    '</div>' +
                    '<div class="col-sm-6">' +
                      '<div class="form-group">' +
                        '<div class="input-group date" id="datetimepicker-start-reservation">' +
                          '<input type="date" class="form-control" value="' + reservation.start_reservation_date + '" />' +
                        '</div>' +
                      '</div>' +
                    '</div>' +
                    '<div class="col-sm-6">' +
                      '<div class="form-group">' +
                        '<div class= "input-group date" id="datetimepicker-end-reservation">' +
                          '<input type="date" class="form-control" value="' + reservation.end_reservation_date + '" />' +
                        '</div>' +
                      '</div>' +
                    '</div>'
                  '</div>'

        // set modal title and body with data
        $modal.find('.modal-title.reservation-show').text('RESERVATION ID: ' + reservation.id);
        $modal.find('.modal-body.reservation-show').html(showData);

        $modal.find('.modal-title.reservation-show').text('RESERVATION ID: ' + reservation.id);
        $modal.find('.modal-body.reservation-edit-delete').html(editData);

      }

      if (mode === "show") {
        $modal.find('.reservation-show').show();

        // var existance = !$.isEmptyObject($.auth.rentee);
        // if (!existance) {
        //   $('#post-modal-edit-btn').hide();
        // }
      } else if (mode === "edit") {
        $modal.find('.reservation-show').show();
      }

      $modal.modal('show');
    },
    updateReservation: function(id, params, cb) {
      $.ajax({
        url: '/api/reservations/' + id,
        method: 'put',
        data: params,
        success: function (reservation) {
          ajaxReservation.bindShowReservations();
          cb(reservation, "edit");
        },
        error: function (resp) {
          console.log(resp);
        }
      });
    },
    deleteReservation: function(id, cb) {
      $.ajax({
        url: '/api/reservations/' + id,
        method: 'delete',
        success: function (reservation) {
          cb(reservation, "delete");
        },
        error: function (resp) {
          console.log(resp);
        }
      });
    },
    bindShowReservation: function() {
      var that = this;
      $(document).on('click', '.show-reservation-card-button', function (e) {
        e.preventDefault();

        var id = $(this).data('id');

        that.getReservation(id, that.setReservation);
      });
    },
    bindReservationModalupdate: function() {
      $('#reservation-modal-edit-btn').on("click", function (e) {
        e.preventDefault();
        // SHOW SAVE DELETE BUTTON WHEN EDIT CLICKED
        $('#rentee-reservation-modal .reservation-edit-delete').show();
        $('#rentee-reservation-modal .reservation-show').hide();
      });
    },
    bindReservationModalSave: function() {
      var that = this;

       $('#reservation-modal-save-btn').on("click", function (e) {
        e.preventDefault();

        var id = $(this).parents('#rentee-reservation-modal').data("id");

        var params = {
          start_reservation_date: $('#datetimepicker-start-reservation input').val(),
          end_reservation_date: $('#datetimepicker-end-reservation input').val()
        };

        that.updateReservation(id, params, that.setReservation);

       });
    },
    bindDeleteReservation: function() {
      var that = this;

      $('#reservation-modal-delete-btn').on("click", function (e) {
        e.preventDefault();

        var id = $(this).parents('#rentee-reservation-modal').data("id");

        that.deleteReservation(id, that.setReservation);
      });

    },
    init: function() {
      this.bindCreateReservation();
      this.bindShowReservations();
      this.bindReservationModalupdate();
      this.bindReservationModalSave();
      this.bindDeleteReservation();
    }
  }

  ajaxReservation.init();

});