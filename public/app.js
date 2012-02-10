(function() {

  jQuery(function() {
    var socket;
    socket = io.connect('http://localhost');
    socket.on('detection', function(data) {
      return $('body').append('<p>' + data + '</p>');
    });
    return socket.on('news', function(data) {
      return console.log(data);
    });
  });

}).call(this);
