const bot = require('./../bot.js');

var self = {
  menu: function (replyToken) {
    var client = bot.client;
    return client.replyMessage(replyToken,{
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
              "text": "Simulated Annealing",
              "wrap": true,
              "weight": "bold",
              "gravity": "center",
              "size": "xl",
              "color": "#338dff"
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
                      "text": "Searching (Simulated Annealing)",
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
                      "text": "Minggu 23 September 2018, 21:00",
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
                    "label": "Start Simulated Annealing",
                    "text": "Start Simulated Annealing"
                  },
                  "style": "primary",
                  "color": "#0000ff"
                }
              ]
            },
            {
              "type": "box",
              "layout": "vertical",
              "margin": "sm",
              "contents": [
                {
                  "type": "spacer",
                  "size": "sm"
                },
                {
                  "type": "text",
                  "text": "Tunggu paling lama 15 detik (jangan di spam ya kak hehe)",
                  "color": "#aaaaaa",
                  "wrap": true,
                  "margin": "xxl",
                  "size": "xs"
                }
              ]
            }
          ]
        }
      }
    });
  },
  hasil: function (userId, x1, x2, cost) {
    var client = bot.client;
    // Log kalau ada yang nyobain Simulated Annealing nya, push message ke akun owner (iyai)
    var client = bot.client;
    client.getProfile(userId).then((profile) => {
      return client.pushMessage("U09d83d49fac35990146d381894d0d672", {
        type: 'text',
        text: `Dicobain sama ${profile.displayName}(${profile.pictureUrl})\n\nHasil:\nx1: ${x1}\nx2: ${x2}\ncost: ${cost}`});
    });
    return client.pushMessage(userId, {
      "type": "flex",
      "altText": "Menu Simulated Annealing",
      "contents": {
        "type": "bubble",
        "styles": {
          "footer": {
            "separator": true
          }
        },
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "HASIL SIMULATED ANNEALING",
              "weight": "bold",
              "color": "#338dff",
              "size": "sm"
            },
            {
              "type": "text",
              "text": "Function | f(x1,x2)",
              "weight": "bold",
              "size": "md",
              "margin": "md"
            },
            {
              "type": "text",
              "text": "-|sin(x1)*cos(x2)*exp(|1-√(x1^2+x2^2)/π|)|",
              "size": "xs",
              "color": "#aaaaaa",
              "wrap": true
            },
            {
              "type": "text",
              "text": "\n-10 ≤ x1 ≤ 10 dan -10 ≤ x2 ≤ 10",
              "size": "xs",
              "color": "#aaaaaa",
              "wrap": true
            },
            {
              "type": "separator",
              "margin": "xxl"
            },
            {
              "type": "box",
              "layout": "vertical",
              "margin": "xxl",
              "spacing": "sm",
              "contents": [
                {
                  "type": "box",
                  "layout": "horizontal",
                  "contents": [
                    {
                      "type": "text",
                      "text": "x1",
                      "size": "sm",
                      "color": "#555555",
                      "flex": 0
                    },
                    {
                      "type": "text",
                      "text": x1.toString(),
                      "size": "sm",
                      "color": "#111111",
                      "align": "end"
                    }
                  ]
                },
                {
                  "type": "box",
                  "layout": "horizontal",
                  "contents": [
                    {
                      "type": "text",
                      "text": "x2",
                      "size": "sm",
                      "color": "#555555",
                      "flex": 0
                    },
                    {
                      "type": "text",
                      "text": x2.toString(),
                      "size": "sm",
                      "color": "#111111",
                      "align": "end"
                    }
                  ]
                },
                {
                  "type": "box",
                  "layout": "horizontal",
                  "contents": [
                    {
                      "type": "text",
                      "text": "Cost",
                      "size": "sm",
                      "color": "#555555",
                      "flex": 0
                    },
                    {
                      "type": "text",
                      "text": cost,
                      "size": "sm",
                      "color": "#111111",
                      "align": "end"
                    }
                  ]
                },
                {
                  "type": "separator",
                  "margin": "xxl"
                },
                {
                  "type": "box",
                  "layout": "horizontal",
                  "margin": "xxl",
                  "contents": [
                    {
                      "type": "text",
                      "text": "Akurasi SA",
                      "size": "sm",
                      "color": "#555555"
                    },
                    {
                      "type": "text",
                      "text": "(1-|(fA-fR)/fR|)*100%",
                      "size": "sm",
                      "color": "#111111",
                      "align": "end",
                      "flex": 2
                    }
                  ]
                }
              ]
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
                "type": "message",
                "label": "Coba Lagi",
                "text": "Start Simulated Annealing"
              },
              "style": "primary",
              "color": "#0000ff"
            },
            {
              "type": "button",
              "action": {
                "type": "message",
                "label": "Menu Utama",
                "text": "/menu"
              },
              "style": "link"
            }
          ]
        }
      }
    });
  }
}

module.exports = self;
