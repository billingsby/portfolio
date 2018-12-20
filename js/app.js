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

  var feed = new Instafeed({
        get: 'tagged',
        tagName: 'awesome',
        clientId: 'e7dc08a48f4340258d16fef5ebf5f836'
    });
    feed.run();
  

  // var userFeed = new Instafeed({
  //   get: 'user',
  //   userId: '14109436',
  //   accessToken: '14109436.1677ed0.6766c773b72749588fcdefa86020f837'
  // });
  // userFeed.run();

  // var parameters = { 
  //   access_token: '14109436.1677ed0.6766c773b72749588fcdefa86020f837',
  //   count: 12
  // };
  
  // $.ajax({
  //   url: 'https://api.instagram.com/v1/self/media/recent',
  //   data: parameters,
  //   dataType: 'jsonp',
  //   type: 'GET'
  // })
  // .done(function(result){ 
  //   $.each(result.data, function(i, data) {
  //     var instaPhoto = showInsta(data);
      
  //     if (i < 4) {
  //       $('#insta-items').append(instaPhoto);
  //     } else if (i < 8) {
  //       $('#insta-items-2').append(instaPhoto);
  //     } else if (i < 12) {
  //       $('#insta-items-3').append(instaPhoto);
  //     }

  //   });
   
  // })
  // .fail(function(jqXHR, textStatus, errorThrown){ 
  //   alert (errorThrown);
  //   // var errorElem = showError(error);
  //   // $('#insta-items').append(errorElem);
  // });
}

//Form Submission

function submitForm(){

    // Initiate Variables With Form Content
  var name = $('#name').val();
  var email = $('#email').val();
  var phone = $('#phone').val();
  var message = $('#message').val();
    
  $.ajax({
    type: 'POST',
    url: '../php/form-process.php',
    data: 'name=' + name + '&email=' + email + '&phone=' + phone + '&message=' + message
  });
    
  $('#contact-form').data('bootstrapValidator').resetForm();
  $('#contact-form').find('input[type=text], textarea').val('');

}


$(document).ready(function() {

  // $('body').css('display', 'none');

  getInsta();

  // Swap portfolio item in DOM
  $('.portfolio-items').on('click', '.portfolio-item', function() {
    event.preventDefault();
    var hashTag = $(this).find('h2').text();
    var project = $(this).find('a').attr('src');
    // let webProject = 'pages/' + project;
      
    $('.hash-font').text(hashTag);
    $('#project').attr('src', project);
      
    $.get(project, function( data ) {
      $('#result').html(data);
    });
  });

    // Portfolio Hover Effect

  // if (Modernizr.touchevents) {

    // show the close overlay button

    // $('.close-overlay').removeClass('hidden');

    // handle the adding of hover class when clicked
    // $('#portfolio-img').click(function(){
    //   if (!$(this).hasClass('hover')) {
    //     $(this).addClass('hover');
    //   }
    // });

  // handle the closing of the overlay

    // $('.close-overlay').click(function(e){
    //   e.preventDefault();
    //   e.stopPropagation();
    //   if ($(this).closest('.img').hasClass('hover')) {
    //     $(this).closest('.img').removeClass('hover');
    //   } else {
          // handle the mouseenter functionality
  $('.portfolio-item').mouseenter(function(){
    $(this).addClass('hover');
  });
  // handle the mouseleave functionality
  $('.portfolio-item').mouseleave(function(){
    $(this).removeClass('hover');
  });
      // }
    // });
// }  

    // Contact Form
    
  $('#contact-form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      name: {
        validators: {
          stringLength: {
            min: 2
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
      $('#success_message').slideDown({ opacity: 'show' }, 'slow'); 
      submitForm();
    }
  });

      
  $(document).on('click', '[data-toggle="lightbox"]', function(event) {
    event.preventDefault();
    $(this).ekkoLightbox();
  });
});
 