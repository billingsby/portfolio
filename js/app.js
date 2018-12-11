function newpage() {
  window.location = newLocation;
}

// Header Slider

var offset = $('#header').offset();
var posY = offset.top - $(window).scrollTop();

$('#myCarousel, #insta-wrapper').carousel({ interval: 5000 });


var showInsta = function(data) {
  
 
  var thumbnail = data.images.standard_resolution.url;
  var media;
  var link = data.link;
  var caption = data.caption.text;
  var result; 

  if (data.type == 'image') {
    media = data.images.standard_resolution.url;
    result = '<div class="col-md-3 " id="thumb"><a data-gallery="instagram" data-type="image" data-toggle="lightbox" href="' + media + '" data-title="' + caption + '"><img src="' + thumbnail + '"></a></div>';
    } else if (data.type == 'video') {
    media = data.videos.standard_resolution.url;
    result = '<div class="col-md-3 " id="thumb" ><a data-gallery="instagram" data-toggle="lightbox" href="' + link + '" data-title="' + caption + '"><img src="' + thumbnail + '"</a></div>';
  }
  
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
    dataType: "jsonp",
    type: "GET",
  })
  .done(function(result){ 
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
  .fail(function(jqXHR, error){ 
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

// Form Submission

function submitForm(){

    // Initiate Variables With Form Content
    var name = $('#name').val();
    var email = $('#email').val();
    var phone = $('#phone').val();
    var message = $('#message').val();
    $.ajax({
        type: "POST",
        url: "../php/form-process.php",
        data: "name=" + name + "&email=" + email + "&phone=" + phone + "&message=" + message
    });
    $('#contact-form').data('bootstrapValidator').resetForm();
    $('#contact-form').find("input[type=text], textarea").val("");

}


$(document).ready(function() {

  $('body').css('display', 'none').fadeIn(500);

  getInsta();

  $('.video .web').click(() => {

    event.preventDefault();

    newLocation = this.href;
  })

});

  // Swap portfolio item in DOM
  $('.portfolio-items').on('click', '.portfolio-item', function() {
      event.preventDefault();
      var hashTag = $(this).find('h2').text();
      var project = $(this).find('a').attr('src');
      var webProject = "pages/" + project;
      
      $('.hash-font').text(hashTag);
      $('#project').attr('src', project);
      
      $.get(project, function( data ) {
        $('#result').css("display", "none");
        $('#result').fadeIn(1000).html(data);
      });
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

    // Contact Form
    
    $('#contact-form').bootstrapValidator({
        // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            name: {
                validators: {
                        stringLength: {
                        min: 2,
                    },
                        notEmpty: {
                        message: 'Please supply your name'
                    }
                }
            },
             
            email: {
                validators: {
                    notEmpty: {
                        message: 'Please supply your email address'
                    },
                    emailAddress: {
                        message: 'Please supply a valid email address'
                    }
                }
            },
            phone: {
                validators: {
                    notEmpty: {
                        message: 'Please supply your phone number'
                    },
                    phone: {
                        country: 'US',
                        message: 'Please supply a vaild phone number with area code'
                    }
                }
            },
          
            comment: {
                validators: {
                      stringLength: {
                        min: 10,
                        max: 500,
                        message:'Please enter at least 10 characters and no more than 500'
                    },
                    notEmpty: {
                        message: 'Please supply a description of your project'
                    }
                    }
                }
            },
            submitButton: '$contact-form button[type="submit"]',
            submitHandler: function(validator, form, submitButton) {
              $('#success_message').slideDown({ opacity: "show" }, "slow"); 
              submitForm();
            }
        });
      
    $(document).delegate('*[data-toggle="lightbox"]', 'click', function(event) {
      event.preventDefault();
      $(this).ekkoLightbox();
    }); 
 
});