function newpage() {
  window.location = newLocation;
}

// Header Slider

var offset = $('#header').offset();
var posY = offset.top - $(window).scrollTop();

$('#myCarousel').carousel({ interval: 3000 });

function getInsta() {
  console.log('fired');
  // the parameters we need to pass in our request to StackOverflow's API
  var parameters = { 
    ACCESS_TOKEN: '17e910a4f9fd4173814c7d00867a6084',
    COUNT: 10,
    MIN_ID: '',
    MAX_ID: ''
  };
  
  $.ajax({
    url: "https://api.instagram.com/v1/users/self/media/recent",
    data: request,
    dataType: "jsonp",//use jsonp to avoid cross origin issues
    type: "GET",
  })
  .done(function(result){ //this waits for the ajax to return with a succesful promise object
    console.log(result);
  //   var searchResults = showSearchResults(request.tagged, result.items.length);

  //   $('.search-results').html(searchResults);
  //   //$.each is a higher order function. It takes an array and a function as an argument.
  //   //The function is executed once for each item in the array.
  //   $.each(result.items, function(i, item) {
  //     var question = showQuestion(item);
  //     $('.results').append(question);
  //   });
  // })
  // .fail(function(jqXHR, error){ //this waits for the ajax to return with an error promise object
  //   var errorElem = showError(error);
  //   $('.search-results').append(errorElem);
  });
};
/*! Reloads page on every visit */
function Reload() {
try {
var headElement = document.getElementsByTagName("head")[0];
if (headElement && headElement.innerHTML)
headElement.innerHTML += "<meta http-equiv=\"refresh\" content=\"1\">";
}
catch (e) {}
}

/*! Reloads on every visit in mobile safari */
if ((/iphone|ipod|ipad.*os 5/gi).test(navigator.appVersion)) {
  window.onpageshow = function(evt) {
    if (evt.persisted) {
    document.body.style.display = "none";
    location.reload();
    }
  }
};


$(document).ready(function() {

  $('body').css('display', 'none');

  $('body').fadeIn(1000);



  $('.video .web').click(function() {

    event.preventDefault();

    newLocation = this.href;

    $('body').fadeOut(1500, newpage);
    getInsta();

  });



});