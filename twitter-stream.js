// App monitoring with Nodetime
if(process.env.NODETIME_ACCOUNT_KEY) {
  require('nodetime').profile({
    accountKey: process.env.NODETIME_ACCOUNT_KEY,
    appName: 'CHI Tweets' // optional
  })
}

// Module dependencies
var express = require('express')
  , io = require('socket.io')({
      'transports': ['xhr-polling']
    }, {
      'polling duration': 30
    })
  , http = require('http')
  , sendgrid  = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD)
  , twitter = require('ntwitter')
  , _ = require('underscore')
  , path = require('path')
  , mongo = require('mongodb')
  , mongoUri = process.env.MONGOHQ_URL || 'mongodb://localhost:27017/chitweets'

var insertTweet = function(db, tweet, callback) {
  // Get the tweets collection
  var collection = db.collection('tweets')
  // Insert a tweet
  collection.insert(tweet, function(err, result) {
    callback(result)
  })
}

var findRecentTweets = function(db, callback) {
  // Get the tweets collection
  var collection = db.collection('tweets')
  // Find the last 20 tweets
  collection.find().sort({_id:1}).limit(20).toArray(function(err, tweets) {
    callback(tweets)
  })     
}

var findTwitterAccount = function(db, twitter_id, callback) {
  // Get the startups collection
  var collection = db.collection('startups')
  // Search for twitter account id in list of accounts to track
  collection.find({twitter_id:twitter_id}).toArray(function(err, account) {
    callback(account)
  })
}

// Search for twitter account id in list of accounts to track
var getListOfTwitterAccounts = function(db, callback) {
  var twitter_ids = []
  db.collection('startups').find().each(function(err, item) {
    if(item == null) {
      callback(twitter_ids)
    } else {
      twitter_ids.push(item.twitter_id)
    }
  })
}

// Create an express app
var app = express()

// Create an HTTP server with the express app
var server = http.createServer(app)

// Twitter accounts - RUN THIS TO PREPOPULATE DB
// db.startups.insert([{twitter_handle: 'FlyoverWorks',twitter_id: '2600293579',lat: 41.89624,lon: -87.632462},{twitter_handle: 'ycharts',twitter_id: '22869238',lat: 41.8896996,lon: -87.6371928},{twitter_handle: 'Doggyloot',twitter_id: '226727658',lat: 41.886017,lon: -87.656462},{twitter_handle: 'rocketmiles',twitter_id: '1109586098',lat: 41.883434,lon: -87.6420629},{twitter_handle: 'foodgenius',twitter_id: '134637509',lat: 41.89374,lon: -87.63533},{twitter_handle: 'ScoutAlarm',twitter_id: '1019117701',lat: 41.886017,lon: -87.656462},{twitter_handle: 'lightbank',twitter_id: '115186995',lat: 41.8967156,lon: -87.6432804},{twitter_handle: 'CatervaInc',twitter_id: '205870141',lat: 41.8883695,lon: -87.6353645},{twitter_handle: 'retrofitme',twitter_id: '336883384',lat: 41.8841061,lon: -87.6365326},{twitter_handle: 'styleseek',twitter_id: '540104759',lat: 41.8880653,lon: -87.6307608},{twitter_handle: 'GiveForward',twitter_id: '15984241',lat: 41.9099067,lon: -87.6774502},{twitter_handle: 'ownkiwi',twitter_id: '37490931',lat: 41.9594952,lon: -87.6745535},{twitter_handle: 'eSparkLearning',twitter_id: '117252513',lat: 41.8783109,lon: -87.648055},{twitter_handle: 'TrunkClub',twitter_id: '19734728',lat: 41.892116,lon: -87.636659},{twitter_handle: 'OpenAirplane',twitter_id: '353354346',lat: 41.871902,lon: -87.633247},{twitter_handle: '1871Chicago',twitter_id: '427424201',lat: 41.8883695,lon: -87.6353645},{twitter_handle: 'MentorMob',twitter_id: '195633064',lat: 41.8880653,lon: -87.6307608},{twitter_handle: 'MobileXLabs',twitter_id: '341130570',lat: 41.8883695,lon: -87.6353645},{twitter_handle: 'cloudbot',twitter_id: '219573413',lat: 41.9107785,lon: -87.6781239},{twitter_handle: 'Tempo_IQ',twitter_id: '417595294',lat: 41.8880653,lon: -87.6307608},{twitter_handle: 'narrativesci',twitter_id: '139819194',lat: 41.8868264,lon: -87.6182722},{twitter_handle: 'SandboxInd',twitter_id: '59518194',lat: 41.886017,lon: -87.656462},{twitter_handle: 'BellyCard',twitter_id: '328723269',lat: 41.8967156,lon: -87.6432804},{twitter_handle: 'groovebug',twitter_id: '281769966',lat: 41.8883695,lon: -87.6353645},{twitter_handle: 'Pear_says',twitter_id: '546356652',lat: 41.8976465,lon: -87.6363531},{twitter_handle: 'picturelife',twitter_id: '296980645',lat: 41.877814,lon: -87.641833},{twitter_handle: 'hydeparkangels',twitter_id: '364945587',lat: 41.7893998,lon: -87.5963929},{twitter_handle: 'BucketFeet',twitter_id: '93684143',lat: 41.884035,lon: -87.651168},{twitter_handle: 'CatapultChi',twitter_id: '407915123',lat: 41.8880653,lon: -87.6307608},{twitter_handle: 'Learnmetrics',twitter_id: '1011692930',lat: 41.8883695,lon: -87.6353645},{twitter_handle: 'RaiseMarket',twitter_id: '1176649850',lat: 41.8953172,lon: -87.6365723},{twitter_handle: 'SproutSocial',twitter_id: '42793960',lat: 41.8826584,lon: -87.656986},{twitter_handle: 'SpotHero',twitter_id: '36217679',lat: 41.8958753,lon: -87.6349167},{twitter_handle: 'threadless',twitter_id: '5380672',lat: 41.8822481,lon: -87.659058},{twitter_handle: 'GetCentUp',twitter_id: '627482902',lat: 41.8875879,lon: -87.6779522},{twitter_handle: 'StageBloc',twitter_id: '15858514',lat: 41.9279859,lon: -87.7043763},{twitter_handle: 'ParkWhiz',twitter_id: '16870480',lat: 41.8788596,lon: -87.6428843},{twitter_handle: 'gofooda',twitter_id: '217190520',lat: 41.8967156,lon: -87.6432804},{twitter_handle: 'ChicagoVentures',twitter_id: '170011830',lat: 41.8883695,lon: -87.6353645},{twitter_handle: 'FanFueled',twitter_id: '59813251',lat: 41.8895507,lon: -87.6281939},{twitter_handle: 'Technori',twitter_id: '176211652',lat: 41.8902773,lon: -87.6322469},{twitter_handle: 'benchprep',twitter_id: '33389501',lat: 41.8967156,lon: -87.6432804}])
// db.startups.insert([{twitter_handle: 'stathat',twitter_id: '211223932',lat: 41.976667,lon: -87.674141},{twitter_handle: 'brideside',twitter_id: '553670217',lat: 41.8923914,lon: -87.6364606},{twitter_handle: 'netgamix',twitter_id: '207842824',lat: 41.8789887,lon: -87.6371429},{twitter_handle: 'Optyn',twitter_id: '410360307',lat: 41.8883695,lon: -87.6353645},{twitter_handle: 'GoProcured',twitter_id: '436640690',lat: 41.8880653,lon: -87.6307608},{twitter_handle: 'MusicDealers',twitter_id: '23459000',lat: 41.8771324,lon: -87.6427555},{twitter_handle: 'hydeparkvp',twitter_id: '576269965',lat: 41.8830087,lon: -87.6351499},{twitter_handle: 'dabblehq',twitter_id: '274179758',lat: 41.917103,lon: -87.68311},{twitter_handle: 'ohkumbuya',twitter_id: '291321080',lat: 41.8883695,lon: -87.6353645},{twitter_handle: 'SimpleRelevance',twitter_id: '392753093',lat: 41.8883695,lon: -87.6353645},{twitter_handle: 'everpurse',twitter_id: '604113352',lat: 41.8958753,lon: -87.6349167},{twitter_handle: 'SceneTap',twitter_id: '292717162',lat: 41.8870387,lon: -87.6270653},{twitter_handle: 'AvantCredit',twitter_id: '1392277274',lat: 41.9129859,lon: -87.633154},{twitter_handle: 'publicgood',twitter_id: '1408489836',lat: 41.8762169,lon: -87.6282726},{twitter_handle: 'getbase',twitter_id: '35222831',lat: 41.8958753,lon: -87.6349167},{twitter_handle: 'GeoramaTravel',twitter_id: '231949620',lat: 41.8883695,lon: -87.6353645},{twitter_handle: 'SwiftIQ',twitter_id: '1706394698',lat: 41.882401,lon: -87.637816},{twitter_handle: 'Resultly',twitter_id: '305769956',lat: 41.8902504,lon: -87.6319071},{twitter_handle: 'WeDelivr',twitter_id: '906365376',lat: 41.8896869,lon: -87.6323132},{twitter_handle: 'caremerge',twitter_id: '538681567',lat: 41.8883695,lon: -87.6353645},{twitter_handle: 'Winestyr',twitter_id: '264289725',lat: 41.8902166,lon: -87.6453862},{twitter_handle: 'Aisle50',twitter_id: '330424809',lat: 41.8847792,lon: -87.6447697},{twitter_handle: 'starterleague',twitter_id: '286674780',lat: 41.8883695,lon: -87.6353645},{twitter_handle: 'ExpertBids',twitter_id: '176977952',lat: 41.8883695,lon: -87.6353645},{twitter_handle: 'smallbizhive',twitter_id: '415814667',lat: 41.895865,lon: -87.6354269},{twitter_handle: 'BetterWeekdays',twitter_id: '394882322',lat: 41.8883695,lon: -87.6353645},{twitter_handle: 'MarkITx',twitter_id: '370177045',lat: 41.8870387,lon: -87.6270653},{twitter_handle: 'ReviewTrackers',twitter_id: '558149323',lat: 41.90913,lon: -87.674983},{twitter_handle: 'rivscom',twitter_id: '310379143',lat: 41.8799651,lon: -87.6508307},{twitter_handle: 'bigmarker',twitter_id: '139324845',lat: 41.8880653,lon: -87.6307608},{twitter_handle: 'Leasabl',twitter_id: '204159806',lat: 41.8883695,lon: -87.6353645},{twitter_handle: 'LearnCore',twitter_id: '240742457',lat: 41.8880653,lon: -87.6307608},{twitter_handle: 'signalengage',twitter_id: '82959314',lat: 41.8883695,lon: -87.6353645},{twitter_handle: 'OurLabel',twitter_id: '190911858',lat: 41.8883695,lon: -87.6353645},{twitter_handle: 'Spotlite_com',twitter_id: '497350670',lat: 41.892617,lon: -87.634916},{twitter_handle: 'BlazePortfolio',twitter_id: '218351766',lat: 41.963728,lon: -87.673581},{twitter_handle: 'TableSAVVY',twitter_id: '255834014',lat: 41.8883695,lon: -87.6353645},{twitter_handle: 'upcityinc',twitter_id: '952497528',lat: 41.893377,lon: -87.638631},{twitter_handle: 'SpartzInc',twitter_id: '226694810',lat: 41.8931808,lon: -87.6382342},{twitter_handle: 'KLUTCHclub',twitter_id: '411895650',lat: 41.906116,lon: -87.64882},{twitter_handle: 'inklinghq',twitter_id: '19910585',lat: 41.9031361,lon: -87.6286364},{twitter_handle: 'contextmediainc',twitter_id: '1059030948',lat: 41.888872,lon: -87.627583}])
// db.startups.insert([{twitter_handle: 'GrouponChicago',twitter_id: '16633816',lat: 41.896917,lon: -87.643547},{twitter_handle: 'CancerIQ',twitter_id: '1153392204',lat: 41.8883695,lon: -87.6353645}])

// Express setup
app.set('port', process.env.PORT || 3000)
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')

// Our only route, render with the current list of tweets
app.get('/', function(req, res) {
  res.render('index')
})

app.post('/contact', function(req, res) {
  var name = req.body.name
  , email = req.body.email
  , company = req.body.company
  , twitter = req.body.twitter
  , address = req.body.address

  var emailMsg = new sendgrid.Email({
    to:       email,
    from:     'asaf@flyoverworks.com',
    fromname: 'FlyoverWorks',
    subject:  'Your Request to Add ' + company + ' to the CHI Tweets Map',
    html:     'Hi ' + name + ',<br/><br/>Thank you for submitting a request ' +
              'to add ' + company + ' to the CHI Tweets Map. We\'re reviewing ' +
              'and verifying the information you provided and will update ' +
              'the map in the next 24 hours.<br/><br/>Asaf Elani<br/>' +
              '<a href="http://www.flyoverworks.com">FlyoverWorks</a>'
  })
  
  var formData = new sendgrid.Email({
    to:       'asaf@flyoverworks.com',
    from:     'chitweets@flyoverworks.com',
    fromname: 'CHI Tweets',
    subject:  'Request to Add ' + company + ' to CHI Tweets',
    html:     '<p>Name: ' + name + '</p>' +
              '<p>Email: ' + email + '</p>' +
              '<p>Company: ' + company + '</p>' +
              '<p>Twitter: ' + twitter + '</p>' +
              '<p>Address: ' + address + '</p>'
  })

  sendgrid.send(formData, function(err, json) {
    if (err) {
      res.json(400)
      return console.error(err)
    } else {
      sendgrid.send(emailMsg, function(err, json) {
        if (err) { 
          res.json(400)
          return console.error(err)
        } else {
          res.json(200)
        }
      })
    }
  })
})

app.use(require('stylus').middleware(__dirname + '/public'))
app.use(express.static(path.join(__dirname, 'public')))

// We're using bower components, so adding to the path to make things easier
app.use('/components', express.static(path.join(__dirname, 'components')))

// Start a Socket.IO listen
var sockets = io.listen(server)

// If the client just connected, give them fresh data
sockets.sockets.on('connection', function(socket) {
  mongo.connect(mongoUri, function(err, db) {
    findRecentTweets(db, function(tweets) {
      db.close()
      socket.emit('data', tweets)
    })
  })
})

mongo.connect(mongoUri, function(err, db) {

  getListOfTwitterAccounts(db, function(twitter_ids) {
    db.close()

    // Instantiate the twitter component
    var t = new twitter({
      consumer_key: 'MZV9w6M8rxQlWQ0ggtQHg',
      consumer_secret: 'edlZji6yc3Q5z9wWeXkhaO1HA7GV1O68soYnEHFwWs',
      access_token_key: '324767501-GWoDlNKpOMe90vUCvD5HSdnV63FGyPlanwJS4mIX',
      access_token_secret: 'k6dugvpAUhGbC8mYV6A6qAaaM5fRLQ2mgAMtxOuZREtZ6'
    })

    t.stream('statuses/filter', { follow: twitter_ids }, function(stream) {
      console.log('Connected to Twitter...')
      stream.on('data', function(tweet) {
        mongo.connect(mongoUri, function(err, db) {
          findTwitterAccount(db, tweet.user.id_str, function(account) {
            if (account.length > 0) {
              var tweet_info = {
                id_str: tweet.id_str,
                created_at: tweet.created_at,
                user: { 
                  id_str : tweet.user.id_str,
                  name: tweet.user.name,
                  screen_name: tweet.user.screen_name,
                  profile_img_url: tweet.user.profile_image_url,
                  lat: account[0].lat,
                  lon: account[0].lon
                },
                text: tweet.text,
                entities: tweet.entities
              }
              sockets.sockets.emit('data', tweet_info)
              insertTweet(db, tweet_info, function(result) {
                db.close()
              })
            } else {
              db.close()
            }
          })
        })
      })
      stream.on('destroy', function() {
        console.log("Disconnected from Twitter.")
      })
    })
  })
})

// Create the server
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
})
