sys = require 'sys'
fs = require 'fs'
express = require 'express'
app = express.createServer()
io = require('socket.io').listen(app)

app.listen(3000)

# node-osc, not quite a module
# https://github.com/hanshuebner/node-osc
osc = require('./lib/osc')

# Setup oscServer ot listen on localhost port 8338
oscServer = new osc.Server(8338, '0.0.0.0')

io.sockets.on 'connection', (socket) ->
  oscServer.on "message", (msg, rinfo) ->
    if msg.length == 15
      socket.emit 'raw', msg[14][1..132]

app.configure ->
  # Setup static file server
  app.use express.static(__dirname + '/public')

