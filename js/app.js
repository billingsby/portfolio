$(document).ready(function() {

$('body').css('display', 'none');

$('body').fadeIn(1000);



$('.link').click(function() {

event.preventDefault();

newLocation = this.href;

$('body').fadeOut(1000, newpage);

});

function newpage() {

window.location = newLocation;

}
var offset = $('#header').offset();
var posY = offset.top - $(window).scrollTop();

 $('#myCarousel').carousel({ interval: 3000 })

});