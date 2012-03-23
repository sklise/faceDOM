# select hovered div
window.hoveredElem
window.rawInner
window.isDivSelected = false
window.rawLength = 132/2

selectDiv = ->
  if window.isDivSelected is not true
    $('div').mouseenter ->
      $('div').css('-webkit-box-shadow', 'none')
      window.hoveredElem = this
      # On click get only the most nested div.
      $(window.hoveredElem).one 'click', ->
        $('div').css('-webkit-box-shadow', 'none').unbind('mouseenter').unbind('mouseleave')
        window.selectedDiv = window.hoveredElem
        if window.isDivSelected != true
          parseDiv window.selectedDiv
          window.isDivSelected = true
      $(this).css('-webkit-box-shadow', '0 0 10px blue')
    $('div').mouseleave ->
      $(this).css('-webkit-box-shadow','none')
  true
parseDiv = (div) ->
  window.rawInner = $(div).html()
  window.divWidth = $(div).width()
  window.divHeight = $(div).height()
  $(div).css 'position', 'relative'
  splitInner = $(div).html().split(' ')
  # remove new lines
  cleanedInner = window.rawInner.replace /\n/g, (match) ->
    ""
  words = $(cleanedInner).text().split(' ')
  counter = 0
  _.each splitInner, (str, i) ->
    _.each words, (word, j) ->
      if word.length > 0 && word == str
        counter += 1
        splitInner[i] = "<span class='faceElement element-#{ counter % window.rawLength }'>#{word}</span>"
  $(div).html(splitInner.join(' '))
  
jQuery ->
  # Insert buttons for selecting div.
  selectDiv()
  
  socket = io.connect('http://localhost')
  socket.on 'raw', (data) ->
    if data.length
    half = data.length/2
    _.each [0..half], (i) ->
      $(".element-#{i}").css('position', 'absolute').css('left',data[2*i]).css('top',data[2*i+1])
    # else
      # $('.part').css('left', 'auto').css('top','auto').css('position', 'relative')
    