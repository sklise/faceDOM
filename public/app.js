(function() {

  jQuery(function() {
    var socket;
    socket = io.connect('http://localhost');
    socket.on('detection', function(data) {
      return ($('body')).append('<p>' + data + '</p>');
    });
    return socket.on('news', function(data) {
      if (data[2][1] === 1) {
        $('.part').css({
          'position': 'absolute'
        });
        $('.right-eye').css('left', "" + data[6][1] + "px").css('top', "" + data[6][2] + "px");
        $('.left-eye').css('left', "" + data[7][1] + "px").css('top', "" + data[7][2] + "px");
        $('.right-eybrow').css({
          'left': data[8][1],
          'top': data[8][2]
        });
        $('.left-eyebrow').css({
          'left': data[9][1],
          'top': data[9][2]
        });
        ($('.mouth-outer')).css({
          'left': data[10][1],
          'top': data[10][2]
        });
        return ($('.mouth-inner')).css({
          'left': data[11][1],
          'top': data[11][2]
        });
      } else {
        return $('.part').css('left', 'auto').css('top', 'auto').css('position', 'relative');
      }
    });
  });

}).call(this);
