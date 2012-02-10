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

  oscServer.on("message", function(msg, rinfo) {
    var json;
    console.log("TUIO message:");
    console.log(msg);
    json = JSON.parse(msg[1]);
    console.log(json);
    m = msg;
    return newmessage = true;
  });

  io.sockets.on('connection', function(socket) {
    var json;
    if (newmessage) {
      socket.emit("detection", newmessage);
      try {
        json = JSON.parse(m);
        socket.emit('news', json);
      } catch (error) {
        console.log("skiping" + error);
        socket.emit('news', "hi");
      }
      return newmessage = false;
    }
  });

  app.configure(function() {
    return app.use(express.static(__dirname + '/public'));
  });

}).call(this);
