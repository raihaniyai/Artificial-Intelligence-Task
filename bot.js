'use strict';

const line = require('@line/bot-sdk');
const express = require('express');

const flexSimulated = require('./flex/simulated.js');
const flexFuzzy = require('./flex/fuzzy.js');

const simulated = require('./tugas/simulated.js');
const fuzzy = require('./tugas/fuzzy.js');
require('dotenv').config();

// create LINE SDK config from env variables
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

// base URL for webhook server
const baseURL = process.env.BASE_URL;

// create LINE SDK client
const client = new line.Client(config);
module.exports.client = client;

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// webhook callback
app.post('/callback', line.middleware(config), (req, res) => {
  // req.body.events should be an array of events
  if (!Array.isArray(req.body.events)) {
    return res.status(500).end();
  }

  // handle events separately
  Promise.all(req.body.events.map(handleEvent))
    .then(() => res.end())
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// simple reply function
const replyText = (token, texts) => {
  texts = Array.isArray(texts) ? texts : [texts];
  return client.replyMessage(
    token,
    texts.map((text) => ({ type: 'text', text }))
  );
};

// callback function to handle a single event
function handleEvent(event) {
  switch (event.type) {
    case 'message':
      const message = event.message;
      switch (message.type) {
        case 'text':
          console.log(event);
          return handleText(message, event.replyToken, event.source);
          break;
        default:
          throw new Error(`Unknown message: ${JSON.stringify(message)}`);
      }

    case 'follow':
    return client.getProfile(event.source.userId)
    .then((profile) => client.replyMessage(event.replyToken, [
      {
      "type": "text",
      "text": `Halo, kak ${profile.displayName}! :D`
      },
      {
      "type": "text",
      "text": `Akun Line ini khusus untuk Tugas AI Raihan Hamid Suraperwata (1301160466) kelas IF-40-06.\n\nKalau kak ${profile.displayName} mau meriksa tugas aku, langsung pilih aja tugas mana yang mau diperiksa :D`
      },
      {
        "type": 'template',
        "altText": 'Menu Tugas AI',
        "template": {
          "type": 'buttons',
          "title": 'Menu Tugas AI',
          "text": 'Raihan Hamid Suraperwata (1301160466)\nIF-40-06',
          "actions": [
            { "label": 'Tugas 1', "type": 'message', "text": '/tugas1' },
            { "label": 'Tugas 2', "type": 'message', "text": '/tugas2' },
            { "label": 'Tugas 3', "type": 'message', "text": '/tugas3' },
            { "label": 'Tugas 4', "type": 'message', "text": '/tugas4' },
          ],
        },
      }
    ]));

    case 'unfollow':
      return console.log(`Unfollowed this bot: ${JSON.stringify(event)}`);

    case 'join':
      return replyText(event.replyToken, `Joined ${event.source.type}`);

    case 'leave':
      return console.log(`Left: ${JSON.stringify(event)}`);

    case 'postback':
      let data = event.postback.data;
      if (data === 'DATE' || data === 'TIME' || data === 'DATETIME') {
        data += `(${JSON.stringify(event.postback.params)})`;
      }
      return replyText(event.replyToken, `Got postback: ${data}`);

    case 'beacon':
      return replyText(event.replyToken, `Got beacon: ${event.beacon.hwid}`);

    default:
      throw new Error(`Unknown event: ${JSON.stringify(event)}`);
  }
}

function handleText(message, replyToken, source) {
  switch (message.text) {
    case 'profile':
      if (source.userId) {
        return client.getProfile(source.userId)
          .then((profile) => replyText(
            replyToken,
            [
              `Display name: ${profile.displayName}`,
              `Status message: ${profile.statusMessage}`,
            ]
          ));
      } else {
        return replyText(replyToken, 'Bot can\'t use profile API without user ID');
      }
    case '/menu':
      return client.replyMessage(
        replyToken,
        {
          type: 'template',
          altText: 'Menu Tugas AI',
          template: {
            type: 'buttons',
            title: 'Menu Tugas AI',
            text: 'Raihan Hamid Suraperwata (1301160466)\nIF-40-06',
            actions: [
              { label: 'Tugas 1', type: 'message', text: '/tugas1' },
              { label: 'Tugas 2', type: 'message', text: '/tugas2' },
              { label: 'Tugas 3', type: 'message', text: '/tugas3' },
              { label: 'Tugas 4', type: 'message', text: '/tugas4' },
            ],
          },
        }
      );
      break;
    case '/tugas1':
      return flexSimulated.menu(replyToken);
      break;
    case '/tugas2':
      return flexFuzzy.menu(replyToken);
      break;
    case '/tugas3':
    case '/tugas4':
      return replyText(replyToken, "Wah udah ga sabar ya kak? Aku belum dapet tugasnya nih..\nDitunggu aja ya kak :D");
      break;
    case 'Start Simulated Annealing':
      return simulated.hasil(source.userId);
      break;
    case 'Start Fuzzy Logic':
      return fuzzy.hasil(source.userId);
      break;
    default:
      console.log(`Echo message to ${replyToken}: ${message.text}`);
      return client.replyMessage(replyToken, [
        {
          type: 'text',
          text: 'Mau meriksa tugas yang mana nih kak?'
        },
        {
          type: 'template',
          altText: 'Menu Tugas AI',
          template: {
            type: 'buttons',
            title: 'Menu Tugas AI',
            text: 'Raihan Hamid Suraperwata (1301160466)\nIF-40-06',
            actions: [
              { label: 'Tugas 1', type: 'message', text: '/tugas1' },
              { label: 'Tugas 2', type: 'message', text: '/tugas2' },
              { label: 'Tugas 3', type: 'message', text: '/tugas3' },
              { label: 'Tugas 4', type: 'message', text: '/tugas4' },
            ],
          },
        }
      ]);
  }
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
