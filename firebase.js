// const {initializeApp, cert}= require("firebase-admin/app")
// const {getFirestore} = require("firebase-admin/firestore")

// var admin = require("firebase-admin/app");
// // import admin from 'firebase-admin'
// var serviceAccount = require("./test-650ba-firebase-adminsdk-ngubc-94881447b6.json");

// // console.log(admin.credential)
// // admin.initializeApp({
// //   credential: admin.credential.cert(serviceAccount)
// // });
// // import { initializeAp, cert, getFirestore} from "firebase/app";
// // const { initializeApp, applicationDefault, cert } = require('firebase/app');
// // const firebaseAdmin = require('firebase-admin');

// // const serviceAccount=require("./test-650ba-firebase-adminsdk-ngubc-94881447b6.json")

// initializeApp({
//  credential:cert(serviceAccount)
// //  const app = initializeApp(firebaseCosnfig);
// })

// const db= getFirestore()
// module.exports={ db }




const {initializeApp, cert}= require("firebase-admin/app")
const {getFirestore} = require("firebase-admin/firestore")

const serviceAccount=require("./test-650ba-firebase-adminsdk-ngubc-94881447b6.json")

initializeApp({
 credential:cert(serviceAccount)
})

const db= getFirestore()
module.exports={ db }