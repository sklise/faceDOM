(function() {
  var parseDiv, selectDiv;

  window.hoveredElem;

  window.rawInner;

  window.isDivSelected = false;

  window.rawLength = 132 / 2;

  selectDiv = function() {
    if (window.isDivSelected === !true) {
      $('div').mouseenter(function() {
        $('div').css('-webkit-box-shadow', 'none');
        window.hoveredElem = this;
        $(window.hoveredElem).one('click', function() {
          $('div').css('-webkit-box-shadow', 'none').unbind('mouseenter').unbind('mouseleave');
          window.selectedDiv = window.hoveredElem;
          if (window.isDivSelected !== true) {
            parseDiv(window.selectedDiv);
            return window.isDivSelected = true;
          }
        });
        return $(this).css('-webkit-box-shadow', '0 0 10px blue');
      });
      $('div').mouseleave(function() {
        return $(this).css('-webkit-box-shadow', 'none');
      });
    }
    return true;
  };

  parseDiv = function(div) {
    var cleanedInner, counter, splitInner, words;
    window.rawInner = $(div).html();
    window.divWidth = $(div).width();
    window.divHeight = $(div).height();
    $(div).css('position', 'relative');
    splitInner = $(div).html().split(' ');
    cleanedInner = window.rawInner.replace(/\n/g, function(match) {
      return "";
    });
    words = $(cleanedInner).text().split(' ');
    counter = 0;
    _.each(splitInner, function(str, i) {
      return _.each(words, function(word, j) {
        if (word.length > 0 && word === str) {
          counter += 1;
          return splitInner[i] = "<span class='faceElement element-" + (counter % window.rawLength) + "'>" + word + "</span>";
        }
      });
    });
    return $(div).html(splitInner.join(' '));
  };

  jQuery(function() {
    var socket;
    selectDiv();
    socket = io.connect('http://localhost');
    return socket.on('raw', function(data) {
      var half, _i, _results;
      half = data.length / 2;
      return _.each((function() {
        _results = [];
        for (var _i = 0; 0 <= half ? _i <= half : _i >= half; 0 <= half ? _i++ : _i--){ _results.push(_i); }
        return _results;
      }).apply(this), function(i) {
        return $(".element-" + i).css('position', 'absolute').css('left', data[2 * i]).css('top', data[2 * i + 1]);
      });
    });
  });

}).call(this);
