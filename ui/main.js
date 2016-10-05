$(document).ready(function() {
  var movementStrength = 25;
  var height = movementStrength / $(window).height();
  var width = movementStrength / $(window).width();
  $("#container").mousemove(function(e) {
    var pageX = e.pageX - ($(window).width() / 2);
    var pageY = e.pageY - ($(window).height() / 2);
    var newvalueX = width * pageX * -10 + 200;
    var newvalueY = height * pageY * -10 + 50;
    $('#container').css("background-position", newvalueX + "px     " + newvalueY + "px");
  });
});
