#!/usr/bin/env node
const checkEnv = require('check-env');
const { RTM_EVENTS, RtmClient, WebClient } = require('@slack/client');

// Required env variables:
checkEnv(['SLACK_TOKEN', 'WELCOME_MESSAGE']);

const { SLACK_TOKEN, WELCOME_MESSAGE } = process.env;
const rtmClient = new RtmClient(SLACK_TOKEN);
const webClient = new WebClient(SLACK_TOKEN);

/**
 * Listen for new team signups, and send welcome messages.
 */
rtmClient.on(RTM_EVENTS.TEAM_JOIN, ({ user }) => {
  webClient.im.open(user.id)
    .then(({ channel }) => {
      console.log(`Sending welcome message to ${channel.id}`);
      return rtmClient.sendMessage("Welcome + " <@user.id> + " here is a small guide https://devoffuture.slack.com/files/sdmg15/F2HVBAZJR/Guide_of_new_user \n Bienvenue voici un petit guide https://devoffuture.slack.com/files/sdmg15/F2G00CFM3/Guide_du_nouveau", channel.id);
    });
});

rtmClient.start();
console.log('Waiting for new signups...');
