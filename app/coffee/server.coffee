sys = require 'sys'
fs = require 'fs'
app = require('express').createServer()
io = require('socket.io').listen(app)

app.listen(3000)

osc = require('./lib/osc');

oscServer = new osc.Server(1337, '0.0.0.0')
oscServer.on "message", (msg, rinfo) ->
	console.log("TUIO message:")
	console.log(msg)


app.get '/', (req, res) ->
  res.sendfile(__dirname + '/index.html')
  
io.sockets.on 'connection', (socket) ->
  socket.emit('news', {hello: 'world'})
  socket.on 'my other event', (data) ->
    console.log data