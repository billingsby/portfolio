function newpage() {
  window.location = newLocation;
}

// Header Slider

var offset = $('#header').offset();
var posY = offset.top - $(window).scrollTop();

$('#myCarousel').carousel({ interval: 3000 });
$('#myCarousel').carousel({ interval: 1000 });

var showInsta = function(data) {
  
 
  var thumbnail = data.images.low_resolution.url;
  var media;

  if (data.type == 'image') {
    media = data.images.standard_resolution.url;
    } else if (data.type == 'video') {
    media = data.videos.standard_resolution.url;
  }
  
  var result = '<div class="col-md-3" id="thumb"><a href="' + media + '"><img src="' + thumbnail + '"></a></div>'
  return result;
};

function getInsta() {
  
  var parameters = { 
    access_token: '14109436.17e910a.4e61a5540a2240d88efc17a2a3232107',
    count: 12
  };
  
  $.ajax({
    url: "https://api.instagram.com/v1/users/self/media/recent/",
    data: parameters,
    dataType: "jsonp",//use jsonp to avoid cross origin issues
    type: "GET",
  })
  .done(function(result){ //this waits for the ajax to return with a succesful promise object
    console.log(result);
    $.each(result.data, function(i, data) {
      var instaPhoto = showInsta(data);
      
      if (i < 4) {
      $('#insta-items').append(instaPhoto);
    } else if (i < 8) {
      $('#insta-items-2').append(instaPhoto);
    } else if (i < 12) {
      $('#insta-items-3').append(instaPhoto);
    }

    });
   
  })
  .fail(function(jqXHR, error){ //this waits for the ajax to return with an error promise object
    var errorElem = showError(error);
    $('#insta-items').append(errorElem);
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

  getInsta();

  $('.video .web').click(function() {

    event.preventDefault();

    newLocation = this.href;

    $('body').fadeOut(1500, newpage);
  });

  $('.portfolio-items').on('click', '.portfolio-item', function() {
      event.preventDefault();
      var hashTag = $(this).find('h2').text();
      var video = $(this).find('a').attr('src');
      
      $('.hash-font').text(hashTag);
      $('#video').attr('src', video);
  })

  // Portfolio Hover Effect

  if (Modernizr.touchevents) {
        // show the close overlay button
        $(".close-overlay").removeClass("hidden");
        // handle the adding of hover class when clicked
        $("#portfolio-img").click(function(e){
            if (!$(this).hasClass("hover")) {
                $(this).addClass("hover");
            }
        });
        // handle the closing of the overlay
        $(".close-overlay").click(function(e){
            e.preventDefault();
            e.stopPropagation();
            if ($(this).closest(".img").hasClass("hover")) {
                $(this).closest(".img").removeClass("hover");
            }
        });
    } else {
        // handle the mouseenter functionality
        $('.portfolio-item').mouseenter(function(){
            $(this).addClass("hover");
        })
        // handle the mouseleave functionality
        .mouseleave(function(){
            $(this).removeClass("hover");
        });
    }



});