var https = require('https');
var querystring = require('querystring');

exports.handler = (event, context, callback) => {
    event.events.forEach(function(res) {
        var postData = JSON.stringify({
            "replyToken": res.replyToken,
            "messages": [
                {
                    type: 'text',
                    text: getResponseMessage(res.message.text)
                }
            ]
        });
        var ChannelAccessToken = 'RYLztMK6usQVF0pstf1Gqh6gECGHyZNlhaGBGBB7ruRU+BAD6pHzkJ+eT8nYkBe/Jy9msAXH2eBWN1FnDGQtuIhlcqNQ6Q55pSCsXnQ75TC9X55Y97WO0i14jGXqCoZYeSYiDT+s6poyznksZIoBGwdB04t89/1O/w1cDnyilFU=';
        var options = {
            hostname: 'api.line.me',
            path: '/v2/bot/message/reply',
            port: 443,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ChannelAccessToken}`
            }
        };
        var req = https.request(options, (res) => {
            res.on('data', (chunk) => {
               console.log(`data: ${chunk}`); 
            });
            res.on('end', () => {
               console.log('No more data in response.'); 
            });
        });
        req.on('error', (e) => {
           console.log(`Problem with request: ${e.message}`); 
        });
        req.write(postData);
        req.end();
    });
    callback(null, 'Success!');
};

var getResponseMessage = function(message) {
    return message;
};
