const firebase = require('firebase/app'); 
const { config } = require('../config/firebase'); 
require('firebase/auth');
require('firebase/firestore'); 

try {
    firebase.initializeApp(config)
} catch (error) {
    if (!/already exists/.test(error.message)) {
        console.error('Firebase initialization error', error.stack);
    }
}

const auth = firebase.auth();
const db = firebase.firestore(); 

exports.firebase = firebase;
exports.auth = auth; 
exports.db = db; 