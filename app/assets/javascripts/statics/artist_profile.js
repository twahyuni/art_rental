$(document).ready(function(){
  $('.edit-uploaded-artwork').click(function(){
    console.log("edit art");

    $('#edit-upload-art-Modal').modal('show');
  });

  function imageIsLoaded(e) {
    $('#image-artwork-upload').attr('src', e.target.result);
  };
});