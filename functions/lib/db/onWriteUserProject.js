const functions = require('firebase-functions'); 
const CONSTANTS = require('../../constants'); 
const admin = require('firebase-admin');

exports.onWriteUserProject = functions.firestore.document(`${CONSTANTS.DB.USERS}/{userId}/${CONSTANTS.DB.USER_PROJECTS}/{projectId}`).onWrite((change, context) => {
    const data = change.after.exists ? change.after.data() : null; 
    const prevData = change.before.exists ? change.before.data() : null;
    const timestamp = admin.firestore.FieldValue.serverTimestamp(); 

    // user_project doc is created or updated
    if (data) {
        let obj = {}

        // Updated
        if (prevData) {
            // If the visit counter hasn't incremented by 1, don't do anything
            const counter = data[CONSTANTS.DB.VISIT_COUNTER];
            const prevCounter = prevData[CONSTANTS.DB.VISIT_COUNTER]; 
            if (counter - prevCounter < 1) return null; 
        }
        // Created 
        // User visits the project for the first time
        else {
            // Store the 'relevant_on' field so it will show up in the recent user_projects list query
            obj[CONSTANTS.DB.RELEVANT_ON] = timestamp;
        }

        obj[CONSTANTS.DB.OPENED_ON] = timestamp;

        return change.after.ref.update(obj)
    }

    return null; 
})