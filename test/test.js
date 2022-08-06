//import {initializeApp} from "firebase/app";
//import {getStorage, ref, getDownloadURL, listAll} from "firebase/storage";
const {initializeApp} = require("firebase/app")
const {getStorage, ref, getDownloadURL, listAll} = require("firebase/storage")

const firebaseConfig = {
    apiKey: "AIzaSyArrCKFGqOWPmyU60IiBsWHnwgcOj9pl6o",
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

let arr = [], arr2 = [];


async function foo() {
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

    console.log(arr2)

}

foo()
