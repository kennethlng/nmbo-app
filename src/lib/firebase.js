import firebase from 'firebase/app';
import { config } from '../config/firebase'; 
import 'firebase/auth';
import 'firebase/firestore'; 
import 'firebase/analytics'; 
import 'firebase/storage'; 

try {
    firebase.initializeApp(config)
} catch (error) {
    if (!/already exists/.test(error.message)) {
        console.error('Firebase initialization error', error.stack);
    }
}

if (typeof window !== 'undefined') {
    // To enable analytics
    if ('measurementId' in config) firebase.analytics(); 
}

const auth = firebase.auth();
const db = firebase.firestore(); 
const storage = firebase.storage(); 

export { auth, db, storage, firebase }