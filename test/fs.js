const {readdirSync} = require('fs');
let map = new Map();

readdirSync('./commands/').forEach(dir => { 

    let pull = require(`./commands/${dir}`)
    console.log(pull.name)
    map.set(pull.name, pull);
})

console.log(map.get('hi'))