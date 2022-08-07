const {initializeApp} = require("firebase/app")
const {getStorage, ref, getDownloadURL, listAll} = require("firebase/storage")
require('dotenv').config();

let arr = [], arr2 = [];

module.exports = {
    name: 'pick_picture',

    description: '挑圖片',
    trigger : '抽圖片',
    async execute(client , event) {
            await getURL()
            
            return client.replyMessage(event.replyToken, { 
                "type": "image",
                "originalContentUrl": arr2[getRandomInt(5)],
                "previewImageUrl": arr2[getRandomInt(5)]
         })
        
    }
};


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}



const firebaseConfig = {
    apiKey: process.env.FIREBASE_KEY,
    authDomain: "line-bot-32513.firebaseapp.com",
    projectId: "line-bot-32513",
    storageBucket: "line-bot-32513.appspot.com",
    messagingSenderId: "265102988862",
    appId: "1:265102988862:web:f8bc1b3a5d4b032ee7a36f",
    measurementId: "G-3LBV8DM7GV"
};


const app = initializeApp(firebaseConfig)
const storage = getStorage(app)


let root = 'gs://line-bot-32513.appspot.com'
const listRef = ref(storage, root);

  

async function getURL() {
    await listAll(listRef)
        .then((res) => {
            res.items.forEach((itemRef) => {
                let item = JSON.parse((JSON.stringify(itemRef)))
                arr.push(item["_location"]["path_"])
            });
        }).catch((error) => {
            console.log(error)
        });

    for(let item of arr){
        await getDownloadURL(ref(storage, root + '/' + item))
        .then((url) => {
            arr2.push(url)
        })
        .catch((error) => {
            console.log(error)
        });
    }
}

