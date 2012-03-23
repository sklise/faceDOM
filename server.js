(function() {
  var app, express, fs, io, osc, oscServer, sys;

  sys = require('sys');

  fs = require('fs');

  express = require('express');

  app = express.createServer();

  io = require('socket.io').listen(app);

  app.listen(3000);

  osc = require('./lib/osc');

  oscServer = new osc.Server(8338, '0.0.0.0');

  io.sockets.on('connection', function(socket) {
    return oscServer.on("message", function(msg, rinfo) {
      if (msg.length === 15) return socket.emit('raw', msg[14].slice(1, 133));
    });
  });

  app.configure(function() {
    return app.use(express.static(__dirname + '/public'));
  });

}).call(this);
