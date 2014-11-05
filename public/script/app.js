function addGoogleMap() {
  var script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&callback=initializeMap'
  document.body.appendChild(script)
}
function initializeMap() {
  var mapOptions = {
    center: new google.maps.LatLng(41.8883695, -87.6353645),
    minZoom: 13,
    maxZoom: 16,
    zoom: 15,
    mapTypeControl: false,
    zoomControl: false,
    panControl: false, 
    streetViewControl: false,
    styles: [
      {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
          {
            "hue": "#b3ddf2"
          }, {
            "visibility": "on"
          }
        ]
      }, {
        "featureType": "landscape",
        "stylers": [
          {
            "color": "#f2f2f2"
          }
        ]
      }, {
        "featureType": "road",
        "stylers": [
          {
            "saturation": -100
          }, {
            "lightness": 45
          }
        ]
      }, {
        "featureType": "poi",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      }
    ]
  }
  window.map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions)
  google.maps.event.addListenerOnce(window.map, 'idle', function(){
    // do something only the first time the map is loaded
    appInit()
  })
}
function appInit() {
  var tweets = $('#tweets')
  var markers = []
  var zIndex = 1

  var renderTweet = function(tweet) {
    try {
      var myLatlng = new google.maps.LatLng(tweet.user.lat, tweet.user.lon)
      var contentString = 
        '<div class="tweet">' +
          '<div class="content">' +
            '<div class="stream-item-header">' + 
              '<a class="account-group" href="https://twitter.com/' + tweet.user.screen_name + '">' + 
                '<img class="avatar" src="' + tweet.user.profile_img_url + '" alt="">' + 
                '<strong class="fullname">' + tweet.user.name + '</strong>' + 
                '<span class="username">&nbsp;<s>@</s><b>' + tweet.user.screen_name + '</b></span>' +
              '</a>' + 
            '</div>' + 
            '<p class="tweet-text">' + 
              tweet.text + 
            '</p>' + 
          '</div>' +
        '</div>'
      var infoWindow = new google.maps.InfoWindow({
        content: contentString,
        position: myLatlng,
        maxWidth: 300,
        zIndex: zIndex
      })

      infoWindow.open(window.map)
      markers.push(infoWindow)

      if (markers.length > 3) {
        var old_marker = markers.shift()
        old_marker.close()
      }

      zIndex++
      var element = $(contentString)
      element.prependTo(tweets)

      // remove old tweets to prevent the browser from crashing
      tweets.children().slice(20).remove()
    } catch (e) {
      console.log("Unable to parse tweet.")
    }    
  }  

  var socket = io.connect(window.location.hostname)
  socket.on('data', function(data) {
    if (data.length != undefined) {
      $('<div/>', {
        'class': 'info',
        text: 'Connected. Waiting for tweets!'
      }).prependTo(tweets)
      $.each(data.reverse(), function(index, tweet) {
        renderTweet(tweet)
      })
    } else {
      renderTweet(data)
    }
  })

  $('#add-btn').click(function() {
    $('#mask').addClass('visible')
    $('#add-account-form').addClass('visible')
    ga('send', 'event', 'form', 'view')
  })

  $('#mask, .close').click(function() {
    $('#mask').removeClass('visible')
    $('#add-account-form').removeClass('visible')
  })

  $('#contact input').on('focus', function() {
    $('#alert')
      .removeClass('success')
      .removeClass('fail')
  })

  function isValidEmail(email) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i)
    return pattern.test(email)
  }

  var timeout

  $('#contact').submit(function() {

    clearTimeout(timeout)

    $('#alert')
      .removeClass('success')
      .removeClass('fail')

    if ($('#contact input:blank').length > 0) {
      $('#alert')
        .text('All fields are required.')
        .removeClass('success')
        .addClass('fail')
      timeout = setTimeout(function() {
        $('#alert').removeClass('fail')
      }, 10000)
      return false
    }

    if (!isValidEmail($('#emailField').val())) {
      $('#alert')
        .text('You must enter a valid email address.')
        .removeClass('success')
        .addClass('fail')
      timeout = setTimeout(function() {
        $('#alert').removeClass('fail')
      }, 10000)
      return false    
    }

    ga('send', 'event', 'form', 'submit')
    $.ajax({
      type: "POST",
      url: '/contact',
      data: $("#contact").serialize(), // serializes the form's elements.
      success: function(data) {
        if (data === 200) {
          ga('send', 'event', 'form', 'success')
          $('#mask').removeClass('visible')
          $('#add-account-form').removeClass('visible')
          $('#alert')
            .text('Thanks! We\'ll update the map shortly.')
            .removeClass('fail')
            .addClass('success')
          timeout = setTimeout(function() {
            $('#alert').removeClass('success')
          }, 10000)
        } else {
          ga('send', 'event', 'form', 'fail')
          $('#alert')
            .text('Unable to submit form. Please check the information and re-submit.')
            .removeClass('success')
            .addClass('fail')
          timeout = setTimeout(function() {
            $('#alert').removeClass('fail')
          }, 10000)
        }
      }
    })
    return false
  })
}
