module.exports = {
    name: 'hi',
    description: '安安你好',
    trigger : '安安',
    execute(client , event) {
        return client.replyMessage(event.replyToken, { type: 'text', text: '你好' })
        
    }
};