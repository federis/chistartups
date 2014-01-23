var twitter = require('ntwitter');
var hydna = require('hydna');

var t = new twitter({
    consumer_key: 'MZV9w6M8rxQlWQ0ggtQHg',
    consumer_secret: 'edlZji6yc3Q5z9wWeXkhaO1HA7GV1O68soYnEHFwWs',
    access_token_key: '324767501-GWoDlNKpOMe90vUCvD5HSdnV63FGyPlanwJS4mIX',
    access_token_secret: 'k6dugvpAUhGbC8mYV6A6qAaaM5fRLQ2mgAMtxOuZREtZ6'
});

var startups = [
    // begin testing accounts
    /*
    {
        twitter_id: '2557521',
        lat: 41.8883695,
        lon: -87.6353645
    },
    {
        twitter_id: '16331010',
        lat: 41.8883695,
        lon: -87.6353645
    },
    {
        twitter_id: '16381558',
        lat: 41.8883695,
        lon: -87.6353645
    },
    {
        twitter_id: '807095',
        lat: 41.8883695,
        lon: -87.6353645
    },
    {
        twitter_id: '1367531',
        lat: 41.8883695,
        lon: -87.6353645
    },
    {
        twitter_id: '428333',
        lat: 41.8883695,
        lon: -87.6353645
    },*/
    // end testing accounts
    {
        twitter_id: '22869238', 
        lat: 41.8896996,
        lon: -87.6371928
    },
    {
        twitter_id: '1109586098',
        lat: 41.883434,
        lon: -87.6420629
    },
    {
        twitter_id: '134637509',
        lat: 41.89374,
        lon: -87.63533
    },
    {
        twitter_id: '1019117701',
        lat: 41.886017,
        lon: -87.656462
    },
    {
        twitter_id: '115186995',
        lat: 41.8967156,
        lon: -87.6432804
    },
    {
        twitter_id: '205870141',
        lat: 41.8883695,
        lon: -87.6353645
    },
    {
        twitter_id: '336883384',
        lat: 41.8841061,
        lon: -87.6365326
    },
    {
        twitter_id: '540104759',
        lat: 41.8880653,
        lon: -87.6307608
    },
    {
        twitter_id: '15984241',
        lat: 41.9099067,
        lon: -87.6774502
    },
    {
        twitter_id: '37490931',
        lat: 41.9594952,
        lon: -87.6745535
    },
    {
        twitter_id: '117252513',
        lat: 41.8783109,
        lon: -87.648055
    },
    {
        twitter_id: '19734728',
        lat: 41.892116,
        lon: -87.636659
    },
    {
        twitter_id: '353354346',
        lat: 41.871902,
        lon: -87.633247
    },
    {
        twitter_id: '427424201',
        lat: 41.8883695,
        lon: -87.6353645
    },
    {
        twitter_id: '195633064',
        lat: 41.8880653,
        lon: -87.6307608
    },
    {
        twitter_id: '341130570',
        lat: 41.8883695,
        lon: -87.6353645
    },
    {
        twitter_id: '219573413',
        lat: 41.9107785,
        lon: -87.6781239
    },
    {
        twitter_id: '417595294',
        lat: 41.8880653,
        lon: -87.6307608
    },
    {
        twitter_id: '139819194',
        lat: 41.8868264,
        lon: -87.6182722
    },
    {
        twitter_id: '59518194',
        lat: 41.886017,
        lon: -87.656462
    },
    {
        twitter_id: '328723269',
        lat: 41.8967156,
        lon: -87.6432804
    },
    {
        twitter_id: '281769966',
        lat: 41.8883695,
        lon: -87.6353645
    },
    {
        twitter_id: '546356652',
        lat: 41.8976465,
        lon: -87.6363531
    },
    {
        twitter_id: '296980645',
        lat: 41.877814,
        lon: -87.641833
    },
    {
        twitter_id: '364945587',
        lat: 41.7893998,
        lon: -87.5963929
    },
    {
        twitter_id: '93684143',
        lat: 41.884035,
        lon: -87.651168
    },
    {
        twitter_id: '407915123',
        lat: 41.8880653,
        lon: -87.6307608
    },
    {
        twitter_id: '1011692930',
        lat: 41.8883695,
        lon: -87.6353645
    },
    {
        twitter_id: '1176649850',
        lat: 41.8953172,
        lon: -87.6365723
    },
    {
        twitter_id: '42793960',
        lat: 41.8826584,
        lon: -87.656986
    },
    {
        twitter_id: '36217679',
        lat: 41.8958753,
        lon: -87.6349167
    },
    {
        twitter_id: '5380672',
        lat: 41.8822481,
        lon: -87.659058
    },
    {
        twitter_id: '627482902',
        lat: 41.8875879,
        lon: -87.6779522
    },
    {
        twitter_id: '15858514',
        lat: 41.9279859,
        lon: -87.7043763
    },
    {
        twitter_id: '16870480',
        lat: 41.8788596,
        lon: -87.6428843
    },
    {
        twitter_id: '217190520',
        lat: 41.8967156,
        lon: -87.6432804
    },
    {
        twitter_id: '170011830',
        lat: 41.8883695,
        lon: -87.6353645
    },
    {
        twitter_id: '59813251',
        lat: 41.8895507,
        lon: -87.6281939
    },
    {
        twitter_id: '176211652',
        lat: 41.8902773,
        lon: -87.6322469
    },
    {
        twitter_id: '33389501',
        lat: 41.8967156,
        lon: -87.6432804
    },
    {
        twitter_id: '211223932',
        lat: 41.976667,
        lon: -87.674141
    },
    {
        twitter_id: '553670217',
        lat: 41.8923914,
        lon: -87.6364606
    },
    {
        twitter_id: '207842824',
        lat: 41.8789887,
        lon: -87.6371429
    },
    {
        twitter_id: '410360307',
        lat: 41.8883695,
        lon: -87.6353645
    },
    {
        twitter_id: '436640690',
        lat: 41.8880653,
        lon: -87.6307608
    },
    {
        twitter_id: '23459000',
        lat: 41.8771324,
        lon: -87.6427555
    },
    {
        twitter_id: '226727658',
        lat: 41.886017,
        lon: -87.656462
    },
    {
        twitter_id: '576269965',
        lat: 41.8830087,
        lon: -87.6351499
    },
    {
        twitter_id: '274179758',
        lat: 41.917103,
        lon: -87.68311
    },
    {
        twitter_id: '291321080',
        lat: 41.8883695,
        lon: -87.6353645
    },
    {
        twitter_id: '392753093',
        lat: 41.8883695,
        lon: -87.6353645
    },
    {
        twitter_id: '604113352',
        lat: 41.8958753,
        lon: -87.6349167
    },
    {
        twitter_id: '292717162',
        lat: 41.8870387,
        lon: -87.6270653
    },
    {
        twitter_id: '1392277274',
        lat: 41.9129859,
        lon: -87.633154
    },
    {
        twitter_id: '1408489836',
        lat: 41.8762169,
        lon: -87.6282726
    },
    {
        twitter_id: '35222831',
        lat: 41.8958753,
        lon: -87.6349167
    },
    {
        twitter_id: '231949620',
        lat: 41.8883695,
        lon: -87.6353645
    },
    {
        twitter_id: '1706394698',
        lat: 41.882401,
        lon: -87.637816
    },
    {
        twitter_id: '305769956',
        lat: 41.8902504,
        lon: -87.6319071
    },
    {
        twitter_id: '906365376',
        lat: 41.8896869,
        lon: -87.6323132
    },
    {
        twitter_id: '538681567',
        lat: 41.8883695,
        lon: -87.6353645
    },
    {
        twitter_id: '264289725',
        lat: 41.8902166,
        lon: -87.6453862
    },
    {
        twitter_id: '330424809',
        lat: 41.8847792,
        lon: -87.6447697
    },
    {
        twitter_id: '286674780',
        lat: 41.8883695,
        lon: -87.6353645
    },
    {
        twitter_id: '176977952',
        lat: 41.8883695,
        lon: -87.6353645
    },
    {
        twitter_id: '789555043',
        lat: 41.901796,
        lon: -87.689621
    },
    {
        twitter_id: '415814667',
        lat: 41.895865,
        lon: -87.6354269
    },
    {
        twitter_id: '394882322',
        lat: 41.8883695,
        lon: -87.6353645
    },
    {
        twitter_id: '370177045',
        lat: 41.8870387,
        lon: -87.6270653
    },
    {
        twitter_id: '558149323',
        lat: 41.90913,
        lon: -87.674983
    },
    {
        twitter_id: '310379143',
        lat: 41.8799651,
        lon: -87.6508307
    },
    {
        twitter_id: '139324845',
        lat: 41.8880653,
        lon: -87.6307608
    },
    {
        twitter_id: '204159806',
        lat: 41.8883695,
        lon: -87.6353645
    },
    {
        twitter_id: '240742457',
        lat: 41.8880653,
        lon: -87.6307608
    },
    {
        twitter_id: '82959314',
        lat: 41.8883695,
        lon: -87.6353645
    },
    {
        twitter_id: '190911858',
        lat: 41.8883695,
        lon: -87.6353645
    },
    {
        twitter_id: '497350670',
        lat: 41.892617,
        lon: -87.634916
    },
    {
        twitter_id: '218351766',
        lat: 41.963728,
        lon: -87.673581
    },
    {
        twitter_id: '255834014',
        lat: 41.8883695,
        lon: -87.6353645
    },
    {
        twitter_id: '952497528',
        lat: 41.893377,
        lon: -87.638631
    },
    {
        twitter_id: '226694810',
        lat: 41.8931808,
        lon: -87.6382342
    },
    {
        twitter_id: '411895650',
        lat: 41.906116,
        lon: -87.64882
    },
    {
        twitter_id: '19910585',
        lat: 41.9031361,
        lon: -87.6286364
    },
    {
        twitter_id: '856729849',
        lat: 41.9031361,
        lon: -87.6286364
    }
];

var channel = hydna.createChannel('chistartups.hydna.net/tweets', 'w');

channel.on('connect', function() {
    console.log('Connected to Hydna ...');
    var twitter_ids = [];
    for(var s in startups) {
        twitter_ids.push(startups[s].twitter_id);
    }
    var startup;
    t.stream('statuses/filter', { follow: twitter_ids },
        function(stream) {
            console.log('Connected to Twitter ...');
            stream.on('data', function(tweet) {
                startup = findStartup(tweet.user.id_str);
                if (startup.length > 0) {
                    var tweet_info = {
                        id_str: tweet.id_str,
                        created_at: tweet.created_at,
                        user: { 
                            id_str : tweet.user.id_str,
                            name: tweet.user.name,
                            screen_name: tweet.user.screen_name,
                            profile_img_url: tweet.user.profile_image_url,
                            lat: startup[0].lat,
                            lon: startup[0].lon
                        },
                        text: tweet.text,
                        entities: tweet.entities
                    };
                    channel.write(JSON.stringify(tweet_info));
                }
            });

            stream.on('destroy', function() {
                console.log("Disconnected from Twitter.");
            });
        }
    );
});

channel.on('error', function() {
    console.log("Disconnected from Hydna.");
});

function findStartup(twitter_id) {
    return startups.filter(function(item) {
        return item.twitter_id == twitter_id;
    });
};