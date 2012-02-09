sys = require 'sys'
fs = require 'fs'
app = require('express').createServer()
io = require('socket.io').listen(app)

app.listen(3000)

osc = require('./lib/osc');

m = ''
newmessage = false
oscServer = new osc.Server(1337, '0.0.0.0')
oscServer.on "message", (msg, rinfo) ->
  console.log("TUIO message:")
  console.log(msg)
  m = msg
  newmessage = true
  io.sockets.on 'connection', (socket) ->
    socket.emit('news', {hello: 'world'})
    if newmessage
      socket.emit 'news', m
      newmessage = !newmessage
    socket.on 'my other event', (data) ->
      console.log data



app.get '/', (req, res) ->
  res.sendfile(__dirname + '/index.html')