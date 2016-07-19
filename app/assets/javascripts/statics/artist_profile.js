$(document).ready(function(){

 // $(":file").change(function () {
 //    if (this.files && this.files[0]) {
 //      var reader = new FileReader();
 //      reader.onload = imageIsLoaded;
 //      reader.readAsDataURL(this.files[0]);
 //    }
 //  });

// $('#edit-artist-info-form').on('submit', function(e){
//    e.preventDefault();

//    $.auth.updateAccount({
//      name: $('#edit-artist-info-form input[name="name"]').val(),
//      username: $('#edit-artist-info-form input[name="username"]').val(),
//      website: $('#edit-artist-info-form input[name="website"]').val(),
//      contact: $('#edit-artist-info-form input[name="contact"]').val(),
//      description: $('#edit-artist-info-form input[name="description"]').val()
//    }).then(function(resp){
//      console.log(resp);
//      console.log("sucess")
//    }).fail(function(resp){
//      console.log(resp);
//    });
//  });

  function imageIsLoaded(e) {
    $('#image-artwork-upload').attr('src', e.target.result);
  };
})