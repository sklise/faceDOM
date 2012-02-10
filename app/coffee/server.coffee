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

oscServer.on "message", (msg, rinfo) ->
  console.log("TUIO message:")
  console.log(msg)
  json = JSON.parse(msg[1])
  console.log(json)
  m = msg
  newmessage = true

io.sockets.on 'connection', (socket) ->
  if newmessage
    socket.emit "detection", newmessage
    try
      json = JSON.parse(m)
      socket.emit 'news', json
    catch error
      console.log("skiping" + error)
      socket.emit 'news', "hi"
    newmessage = false

app.configure ->
  # Setup static file server
  app.use express.static(__dirname + '/public')