sys = require 'sys'
fs = require 'fs'
express = require 'express'
app = express.createServer()
io = require('socket.io').listen(app)

app.listen(3000)

gsock = ''

osc = require('./lib/osc');

m = ''
newmessage = false
oscServer = new osc.Server(1337, '0.0.0.0')

io.sockets.on 'connection', (socket) ->
  oscServer.on "message", (msg, rinfo) ->
    socket.emit 'news', msg

app.configure ->
  # Setup static file server
  app.use express.static(__dirname + '/public')