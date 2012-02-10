jQuery ->
  socket = io.connect('http://localhost')
  socket.on 'detection', (data) ->
    $('body').append('<p>'+data+'</p>')
  socket.on 'news', (data) ->
    console.log(data)
