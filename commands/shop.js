module.exports = {
    name: 'shop',
    description: '購買商品',
    trigger : '購買商品',
    execute(client , event) {
        return client.replyMessage(event.replyToken,{
            "type": "flex",
            "altText": "this is a flex message",
            "contents": {
              "type": "bubble",
              "body": {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "image",
                    "url": "https://cf.shopee.tw/file/9a71ebbf221f249bb8bc5447d6464cb8",
                    "size": "full",
                    "aspectRatio": "1.91:1"
                  },
                  {
                    "type": "text",
                    "text": "一支筆",
                    "size": "xl",
                    "weight": "bold",
                    "color": "#0000ff"
                  },
                  {
                    "type": "button",
                    "action": {
                      "type": "uri",
                      "label": "點選連結",
                      "uri": "https://www.google.com/"
                    },
                    "style": "primary",
                    "color": "#0000ff"
                  }
                ]
              }
            }
          })
        
    }
};