jQuery ->
  socket = io.connect('http://localhost')
  socket.on 'detection', (data) ->
    ($ 'body').append('<p>'+data+'</p>')
  socket.on 'news', (data) ->
    
    # console.log(data)
    # If there is a face found, move everything
    if data[2][1] == 1
      $('.part').css {
        'position': 'absolute'
      }
      $('.right-eye').css('left', "#{data[6][1]}px").css('top', "#{data[6][2]}px")
      $('.left-eye').css('left', "#{data[7][1]}px").css('top', "#{data[7][2]}px") #.css('font-size', "#{(data[10][1]-1)*100}%")
      $('.right-eybrow').css {
        'left' : data[8][1]
        'top' : data[8][2]
      }
      $('.left-eyebrow').css {
        'left' : data[9][1]
        'top' : data[9][2]
      }
      ($ '.mouth-outer').css {
        'left' : data[10][1] 
        'top' : data[10][2]
      }
      ($ '.mouth-inner').css {
        'left' : data[11][1] 
        'top' : data[11][2]
      }
      
    # Otherwise put it all back.
    else
      $('.part').css('left', 'auto').css('top','auto').css('position', 'relative')
    