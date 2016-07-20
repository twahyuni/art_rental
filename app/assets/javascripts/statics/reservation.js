$(document).ready(function() {
  var ajaxReservation = {
    bindShowAvailableDates: function() {

      var that = this;

      $('#').on("click", function (e) {

        // GET THE RESERVATION DATES RELATED TO ARTWORK AJAX ....???
        $.ajax({
          url: 'api/reservations/' + id,
          method: 'get',
          success: function (resp) {
            console.log(resp)
          },
          error: function (resp) {
            console.log(resp);
          }
        })


        // GENERATE DATE BETWEEN AFTER GET THE RESERVATION DATES (FOR THE RENDER) ....????

        reserved_dates = [];


        // RENDER THE TWO CALENDARS
        $('#datetimepicker-open-reservation').datetimepicker({
          format: 'MM/DD/YYYY',
          disableDates: reserved_dates
        });

        $('#datetimepicker-close-reservation').datetimepicker({
          format: 'MM/DD/YYYY',
          disableDates: reserved_dates
        });

        // LINK THE TWO CALENDARS
        $("#datetimepicker-open-reservation").on("dp.change", function (e) {
          $('#datetimepicker-close-reservation').data("DateTimePicker").minDate(e.date);
        });

      });

    },
    bindReservationClick: function() {
      var that = this;

      $('#').on("submit", function (e) {

        e.preventDefault();

        // GET THE DATE OF START AND END
        var start_reservation = $('#datetimepicker-open-reservation').data("DateTimePicker").date();
        var end_reservation = $('#datetimepicker-close-reservation').data("DateTimePicker").date();

        // PUSH INTO AJAX OF RESERVATION
        $.ajax({
          url: 'api/reservations',
          method: 'post',
          data: {start_reservation_date: start_reservation, end_reservation_date: end_reservation},
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

  // ajaxReservation.init();

});