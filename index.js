const fs = require('fs'), 
      express = require('express'),
      app = express(),
      profile = {
        name: "Jake",
        location: "Roaming a sun-blasted desert",
        avatar: "https://pbs.twimg.com/profile_images/1782930330/jake_400x400.png",
        color: "#161313"
      },
      portal = [
            "rotonde.monochromatic.co",
            "rotonde.cblgh.org",
            "rotonde.anxl.faith",
            "rotonde.xxiivv.com"
      ];

app.get('/', function(req, res) {
    console.log('Fetching feed...');

    fs.readFile(__dirname + '/feed.json', 'utf8', function(err, contents) {
        console.log('done.');
        var now = Math.round(new Date().getTime() / 1000);
        if(err) {
            console.error('There was an issue reading the file');
            console.error(err);
            res.json({
                profile,
                feed: [
                    {
                        time: now,
                        text: 'There was a problem fetching this feed'
                    }
                ],
                portal
            });
        } 
        else {
            var feed = JSON.parse(contents);
            feed.push({
                time: now - 3600,
                text: "This event happened an hour ago"
            });
            feed.push({
                time: now - 60,
                text: "This event happened a minute ago"
            });
            feed.push({
                time: now - (60 * 60 * 24),
                text: "This event happened a day ago"
            });
            feed.push({
                time: now - 5,
                text: "This event happened 5 seconds ago"
            });
            console.log('Serving Rotonde feed...');
            res.json({profile, feed, portal});
        }
    });
});

app.listen(8080);