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

/* on editing */
var getResponseMessage = function(message) {
    if(isGoHome(message)){
        var dt = new Date();
        dt.setTime(dt.getTime() + 32400000); // 1000 * 60 * 60 * 9(hour) <- is it need?
        var workFinishTime = dt.setHours(17);
        
        workFinishTime.setMinutes(45);
        dt = normalizeMinuete(dt);
        var diff = (dt.getTime() - workFinishTime.getTime())/1000*60;
        return "Your overtime is ...";
    }
    return message;
};

/* Does user want to go home */
/* string matching is not good work */
var isGoHome = function(message) {
    /*var goHomeWord = ['帰','きたく','かえる','かえり'];
    for each (var val in goHomeWord){
        if ( message.indexOf(val) != -1) {
            return true;
        }
    }*/
    return true;
};
/*　normalize 15minute or 30minute */
/* also not good work */
var normalizeMinuete = function(dt){
    if(0<dt.getMinutes() || dt.getMinutes()<30 ){
        dt.setMinutes(15);
        return dt;
    }else
    {
        dt.setMinutes(45);
        dt.setHours(19)
        return dt; 
    }
};
