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
  $("#container").mousemove(function(e) {
    var pageX = e.pageX - ($(window).width() / 2);
    var pageY = e.pageY - ($(window).height() / 2);
    var newvalueX = width * pageX * -1 ;
    var newvalueY = height * pageY * -1;
    $('.navi').css("margin-left",newvalueX + "px");
    $('.navi').css("margin-top", newvalueY + "px");
    $('.propic').css("margin-left",newvalueX + "px");
    $('.propic').css("margin-top", newvalueY + "px");
    $('#header').css("margin-left",newvalueX + "px");
    $('#header').css("margin-top", newvalueY + "px");
  });
});
