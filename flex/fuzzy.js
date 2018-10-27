const bot = require('./../bot.js');

var self = {
  menu: function (replyToken) {
    var client = bot.client;
    return client.replyMessage(replyToken, {
      "type": "flex",
      "altText": "Menu Simulated Annealing",
      "contents": {
        "type": "bubble",
        "body": {
          "type": "box",
          "layout": "vertical",
          "spacing": "md",
          "contents": [
            {
              "type": "text",
              "text": "Fuzzy Logic",
              "wrap": true,
              "weight": "bold",
              "gravity": "center",
              "size": "xl"
            },
            {
              "type": "box",
              "layout": "vertical",
              "margin": "lg",
              "spacing": "sm",
              "contents": [
                {
                  "type": "box",
                  "layout": "baseline",
                  "spacing": "sm",
                  "contents": [
                    {
                      "type": "text",
                      "text": "Tugas",
                      "color": "#aaaaaa",
                      "size": "sm",
                      "flex": 2
                    },
                    {
                      "type": "text",
                      "text": "Fuzzy Logic",
                      "wrap": true,
                      "size": "sm",
                      "color": "#666666",
                      "flex": 4
                    }
                  ]
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "spacing": "sm",
                  "contents": [
                    {
                      "type": "text",
                      "text": "Deadline",
                      "color": "#aaaaaa",
                      "size": "sm",
                      "flex": 2
                    },
                    {
                      "type": "text",
                      "text": "Minggu 28 Oktober 2018, 21:00",
                      "wrap": true,
                      "size": "sm",
                      "color": "#666666",
                      "flex": 4
                    }
                  ]
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "spacing": "sm",
                  "contents": [
                    {
                      "type": "text",
                      "text": "Laporan",
                      "color": "#aaaaaa",
                      "size": "sm",
                      "flex": 2
                    },
                    {
                      "type": "text",
                      "text": "Google Drive (Tugas AI)",
                      "wrap": true,
                      "action": {
                        "type": "uri",
                        "label": "Laporan",
                        "uri": "https://drive.google.com/drive/folders/1mEXtDogBosDpxpBLy5oha2y8WyOIVPHR?usp=sharing"
                      },
                      "color": "#338dff",
                      "size": "sm",
                      "flex": 4
                    }
                  ]
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "spacing": "sm",
                  "contents": [
                    {
                      "type": "text",
                      "text": "Source Code",
                      "color": "#aaaaaa",
                      "size": "sm",
                      "flex": 2
                    },
                    {
                      "type": "text",
                      "text": "github.com/raihaniyai",
                      "action": {
                        "type": "uri",
                        "label": "Source Code",
                        "uri": "https://github.com/raihaniyai/Artificial-Intelligence-Task"
                      },
                      "wrap": true,
                      "color": "#338dff",
                      "size": "sm",
                      "flex": 4
                    }
                  ]
                }
              ]
            },
            {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "spacer",
                  "size": "xl"
                },
                {
                  "type": "button",
                  "action": {
                    "type": "message",
                    "label": "Start Fuzzy Logic",
                    "text": "Start Fuzzy Logic"
                  },
                  "style": "primary",
                  "color": "#0000ff"
                }
              ]
            }
          ]
        }
      }
    });
  },
  hasil: function (userId, hasil) {
    var client = bot.client;
    var flex = {
      "type": "flex",
      "altText": "Flex Message",
      "contents": {
        "type": "bubble",
        "body": {
          "type": "box",
          "layout": "vertical",
          "spacing": "md",
          "contents": [
            {
              "type": "text",
              "text": "HASIL FUZZY LOGIC",
              "size": "sm",
              "weight": "bold",
              "color": "#338DFF"
            },
            {
              "type": "text",
              "text": "Nomor Baris",
              "align": "center"
            }
          ]
        },
        "footer": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "button",
              "action": {
                "type": "uri",
                "label": "Unduh Hasil",
                "uri": "https://linecorp.com"
              },
              "color": "#0000FF",
              "style": "primary"
            },
            {
              "type": "button",
              "action": {
                "type": "uri",
                "label": "Menu Utama",
                "uri": "https://linecorp.com"
              }
            }
          ]
        }
      }
    };
    var start = 1;
    var count = 0;
    for (var i = 0; i < 5; i++) {
      var boks = {
        "type": "box",
        "layout": "horizontal",
        "contents": []
      }
      flex.contents.body.contents.push(boks);
      start++;
      for (var j = 0; j < 4; j++) {
        kotak = self.kotak(hasil[count].No);
        flex.contents.body.contents[start].contents.push(kotak);
        count++;
      }
    }
    // Log kalau ada yang nyobain Fuzzy Logic nya, push message ke akun owner (iyai)
    // client.getProfile(userId).then((profile) => {
    //   return client.pushMessage("U09d83d49fac35990146d381894d0d672", [
    //     {
    //       type: 'text',
    //       text: `Dicobain sama ${profile.displayName}(${profile.pictureUrl})`;
    //     },
    //     flex
    // });
    console.log(flex);
    return client.pushMessage(userId, flex);
  },
  kotak: function (nomor) {
    var flex = {
      "type": "text",
      "text": nomor.toString(),
      "align": "center"
    }
    return flex;
  }
}

module.exports = self;
