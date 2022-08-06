//匯率換算測試
const axios = require('axios')
const request = require("request");



//axios
asdf();
let money1 = 0
async function asdf(){
    await axios.get('https://openapi.taifex.com.tw/v1/DailyForeignExchangeRates')
    .then( res => {
        //console.log(res.data[35]['USD/NTD'])
        money = res.data[35]['USD/NTD'];  
        money1 = money
    })
    .catch(error => {
        console.error(error)        
    })

    console.log(money1);
}





