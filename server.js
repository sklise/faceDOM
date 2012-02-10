(function() {
  var app, express, fs, gsock, io, m, newmessage, osc, oscServer, sys;

  sys = require('sys');

  fs = require('fs');

  express = require('express');

  app = express.createServer();

  io = require('socket.io').listen(app);

  app.listen(3000);

  gsock = '';

  osc = require('./lib/osc');

  m = '';

  newmessage = false;

  oscServer = new osc.Server(1337, '0.0.0.0');

  io.sockets.on('connection', function(socket) {
    return oscServer.on("message", function(msg, rinfo) {
      return socket.emit('news', msg);
    });
  });

  app.configure(function() {
    return app.use(express.static(__dirname + '/public'));
  });

}).call(this);
