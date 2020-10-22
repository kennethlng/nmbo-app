import firebase from 'firebase/app'
import 'firebase/auth'; 
import 'firebase/firestore'; 
import { config } from '../config/firebase'

try {
    firebase.initializeApp(config)
} catch (error) {
    if (!/already exists/.test(error.message)) {
        console.error('Firebase initialization error', error.stack);
    }
}

const auth = firebase.auth();
const db = firebase.firestore(); 

export { firebase, auth, db };