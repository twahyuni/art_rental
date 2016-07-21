$(document).ready(function() {
  var ajaxReservation = {
    bindShowAvailableDates: function() {

    var that = this;
    var today = new Date()

    // RENDER THE TWO CALENDARS (FOR HOME PAGE)
    $('#datetimepicker-open-reservation').datetimepicker({
      format: 'MM/DD/YYYY',
      minDate: today
    });

    $('#datetimepicker-close-reservation').datetimepicker({
      format: 'MM/DD/YYYY',
      minDate: today
    });

    // LINK THE TWO CALENDARS
    $("#datetimepicker-open-reservation").on("dp.change", function (e) {
      $('#datetimepicker-close-reservation').data("DateTimePicker").minDate(e.date);
    });

    },
    bindReservationClick: function() {
      var that = this;

      $('.reservation-date-button').on("click", function (e) {

        e.preventDefault();

        // GET THE DATE OF START AND END AND PARSE THEM
        var $sr = $('#datetimepicker-open-reservation').data("DateTimePicker").date();
        var $er = $('#datetimepicker-close-reservation').data("DateTimePicker").date();

        var start_reservation_date = moment($sr).format("YYYY-MM-DD");
        var end_reservation_date = moment($er).format("YYYY-MM-DD");
        var artwork_id = $('.reservation-date-button').parents('div').find('.row').attr('data-id');
        var artist_id = $('.reservation-date-button').parents('div').find('.row').attr('data-owner-id');

        var data = {
          start_reservation_date: start_reservation_date,
          end_reservation_date: end_reservation_date,
          artwork_id: artwork_id,
          artist_id: artist_id
        }

        // PUSH INTO AJAX OF RESERVATION
        $.ajax({
          url: '/api/reservations',
          method: 'post',
          data: data,
          success: function (resp) {
            console.log(resp)
          }
        })

      });

    },
    init: function() {
      this.bindShowAvailableDates();
      this.bindReservationClick();
    }
  }

  ajaxReservation.init();

});