const line = require('@line/bot-sdk');
require('dotenv').config();
const express = require('express');
const app = express();

var config = {
	channelSecret: process.env.CHANNEL_SECRET,
	channelAccessToken: process.env.CHANNEL_ACCESSTOKEN
}

const client = new line.Client(config);


const {readdirSync} = require('fs');
let map = new Map();

readdirSync('./commands/').forEach(dir => { 

    let pull = require(`./commands/${dir}`)
    map.set(pull.trigger, pull);
})



app.post('/callback', line.middleware(config), (req, res) => {
	Promise
		.all(req.body.events.map(handleEvent))
		.then((result) => res.json(result))
		.catch((err) => {
		res.status(200).end()
	  });
});


function handleEvent(event) {
	
	let command = map.get(event.message.text)
	if(command == null) return Promise.resolve(null);

	try{
		command.execute(client, event)
	}
	catch(error){
		console.log(error)
		return Promise.resolve(null);
	}
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`listening on ${port}`)
})
