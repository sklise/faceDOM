(function() {
  var app, fs, io, m, newmessage, osc, oscServer, sys;

  sys = require('sys');

  fs = require('fs');

  app = require('express').createServer();

  io = require('socket.io').listen(app);

  app.listen(3000);

  osc = require('./lib/osc');

  m = '';

  newmessage = false;

  oscServer = new osc.Server(1337, '0.0.0.0');

  oscServer.on("message", function(msg, rinfo) {
    console.log("TUIO message:");
    console.log(msg);
    m = msg;
    newmessage = true;
    return io.sockets.on('connection', function(socket) {
      socket.emit('news', {
        hello: 'world'
      });
      if (newmessage) {
        socket.emit('news', m);
        newmessage = !newmessage;
      }
      return socket.on('my other event', function(data) {
        return console.log(data);
      });
    });
  });

  app.get('/', function(req, res) {
    return res.sendfile(__dirname + '/index.html');
  });

}).call(this);
