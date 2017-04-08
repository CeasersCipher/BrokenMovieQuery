// jQuery //

$(document).ready(function(){
  //remove validation message if no image
  $('#term').focus(function(){
    var full = $("#poster").has('img').length ? true : false;
    if(full == false){
      $('#poster').empty();
    }
  });
});

// IMPORTANT SHIT //
// HOW TO PULL FROM FORM VIA ID //

var getPoster = function() {

  //grab movie title & store as variable
  var film = $('#term').val();

  //form validation (if nothing enter)
  if(film == ''){
    //diplay message
    $('#poster').html("<h2 class='loading'>Forgot to enter titlez.</h2>");
  } else {
    //something was entered
    $('#poster').html("<h2 class='load'>Stand-by Calling The Internet</h2>");

    $.getJSON("http://api.themoviedb.org/2.1/Movie.search/en/json/4019eb7302645acdfeebbf334befe0e0/" + film + "?callback=?", function(json) {
      if (json != 'Nothing found.'){
        $('#poster').html('<h2 class="loading">Ou La la...</h2><img id="thePoster"  src=' + json[0].posters[0].image.url + ' />');

      } else {
        $.getJSON("http://api.themoviedb.org/2.1/Movie.search/en/json/4019eb7302645acdfeebbf334befe0e0/oceans-11?callback=?", function(json) {
          console.log(json);
          $('#poster').html('<h2 class="loading">Nothing Found, keep on heisting!</h2><img id="thePoster" src=' + json[0].posters[0].image.url + ' /> ');
        });



      }
    });
  }

      return false;
}

$('#search').click(getPoster);
$('#term').keyup(function(event) {
  if(event.keyCode == 13){getPoster();}
});
