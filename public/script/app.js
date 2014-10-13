$(function() {
  var tweets = $('#tweets')
  var markers = []
  var zIndex = 1

  var renderTweet = function(tweet) {
    try {
      var myLatlng = new google.maps.LatLng(tweet.user.lat, tweet.user.lon);
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
    if (data.length) {
      $('<div/>', {
        'class': 'info',
        text: 'Connected. Waiting for tweets!'
      }).prependTo(tweets)
      $.each(data, function(index, tweet) {
        renderTweet(JSON.parse(tweet))
      })
    } else {
      renderTweet(data)
    }
  })
})
/*
  channel.onclose = function(event) {
    $('<div/>', {
      'class': 'info',
      text: 'Disconnected for reason: ' + event.reason
    }).prependTo(tweets);
  };

  channel.onmessage = function(event) {
});
*/
