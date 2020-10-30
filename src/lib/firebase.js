import firebase from 'firebase/app';
import { config } from '../config/firebase'; 
import 'firebase/auth';
import 'firebase/firestore'; 
import 'firebase/analytics'; 

if (typeof window !== 'undefined' && !firebase.apps.length) {
    firebase.initializeApp(config)

    // To enable analytics
    if ('measurementId' in config) firebase.analytics(); 
}

// try {
//     firebase.initializeApp(config)
// } catch (error) {
//     if (!/already exists/.test(error.message)) {
//         console.error('Firebase initialization error', error.stack);
//     }
// }

const auth = firebase.auth();
const db = firebase.firestore(); 

export { auth, db, firebase }