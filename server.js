(function() {
  var app, fs, io, osc, oscServer, sys;

  sys = require('sys');

  fs = require('fs');

  app = require('express').createServer();

  io = require('socket.io').listen(app);

  app.listen(3000);

  osc = require('./lib/osc');

  oscServer = new osc.Server(1337, '0.0.0.0');

  oscServer.on("message", function(msg, rinfo) {
    console.log("TUIO message:");
    return console.log(msg);
  });

  app.get('/', function(req, res) {
    return res.sendfile(__dirname + '/index.html');
  });

  io.sockets.on('connection', function(socket) {
    socket.emit('news', {
      hello: 'world'
    });
    return socket.on('my other event', function(data) {
      return console.log(data);
    });
  });

}).call(this);
