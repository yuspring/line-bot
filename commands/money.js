const axios = require('axios')
const cheerio = require('cheerio')

var exchange_rate = [];

module.exports = {
    name: 'exchange_money',
    description: '查詢匯率',
    trigger : '美金匯率',
    async execute(client , event) {
            await get_exchange()
            content = '台幣對美金:' + exchange_rate[0].cash_exchange_rate.sell
            return client.replyMessage(event.replyToken, { type: 'text', text: content })
        
    }
};

async function get_exchange(){
    let res = await axios.get('https://rate.bot.com.tw/xrt?Lang=zh-TW')
	let money = []
	$ = cheerio.load(res.data);
	$('#ie11andabove [title="牌告匯率"] tbody').each(function() {
		money.push($(this).text().split('\n'))
	})

	for (let i = 0; i < money[0].length - 2; i += 30) {

		let item = {
			'name': money[0][i + 9].replace(/\s/g, ''),
			'cash_exchange_rate': {
				'buy': money[0][i + 16].replace(/\s/g, ''),
				'sell': money[0][i + 17].replace(/\s/g, ''),
			},
			'spot_exchange_rate': {
				'buy': money[0][i + 19].replace(/\s/g, ''),
				'sell': money[0][i + 22].replace(/\s/g, ''),
			}
		}
		exchange_rate.push(item);
	}
}

