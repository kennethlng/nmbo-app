import firebase from 'firebase/app';
import { prodConfig, devConfig } from '../config/firebase'; 
import 'firebase/auth';
import 'firebase/firestore'; 
import 'firebase/analytics'; 

const isDev = true; 
const config = isDev ? devConfig : prodConfig

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

export { auth, db, firebase }