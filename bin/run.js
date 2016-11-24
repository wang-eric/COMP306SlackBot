'use strict'

const slackClient = require("../server/slackClient");
const service = require("../server/service");
const http = require("http");
const server = http.createServer(service);

const slackToken = 'xoxb-107653492036-aq1tk1cLCCVHMqxCiG8OpFQ4';
const slackLogLevel = 'verbose';

const witToken = 'VAVZK3UEM7PYMLIIUA3EFAXHFDLPQZTA';

const rtm = slackClient.init(slackToken,slackLogLevel);
rtm.start();

slackClient.addAuthenticatedHandler(rtm, () => server.listen(3000));

//server.listen(3000);

server.on('listening',function(){
    console.log(`Bot is listening on ${server.address().port} in ${service.get('env')} mode. `);
});