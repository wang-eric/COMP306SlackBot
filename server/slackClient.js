'use strict'

const RtmClient = require("@slack/client").RtmClient;
const CLIENT_EVENTS = require("@slack/client").CLIENT_EVENTS;
const RTM_EVENTS = require("@slack/client").RTM_EVENTS;
let rtm = null;

function handlerOnAuthenticated(rtmStartData){
    console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
}

function handleOnMessage(message){
    console.log(message);
    rtm.sendMessage(`Hey!`, message.channel, function messageSent(){
    //rtm.sendMessage('This is a test message', message.channel, function messageSent(){
        //optional
    });
}

function addAuthenticatedHandler(rtm, handler){
    rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, handler);
}

module.exports.init = function slackClient(token, logLevel){
    rtm = new RtmClient(token, logLevel);
    addAuthenticatedHandler(rtm, handlerOnAuthenticated);
    rtm.on(RTM_EVENTS.MESSAGE, handleOnMessage);
    return rtm;
}

module.exports.addAuthenticatedHandler = addAuthenticatedHandler;