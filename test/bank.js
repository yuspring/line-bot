const axios = require('axios')
const cheerio = require('cheerio')



async function foo(){
	let res = await axios.get('https://rate.bot.com.tw/xrt?Lang=zh-TW')
	let money = [], money2 = []
	$ = cheerio.load(res.data);
	//console.log($('#ie11andabove [title="牌告匯率"] tbody').html());
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
		money2.push(item);
	}
	console.log(money2)
}

foo()


/*
axios.get('https://rate.bot.com.tw/xrt?Lang=zh-TW', {
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json;charset=UTF-8",
	}
}).then(res => {
	let money = [], money2 = []
	$ = cheerio.load(res.data);
	//console.log($('#ie11andabove [title="牌告匯率"] tbody').html());
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
		money2.push(item);
	}
	console.log(money2)
})
*/