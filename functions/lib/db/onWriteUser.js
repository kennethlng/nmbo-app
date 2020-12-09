const functions = require('firebase-functions');
const { db } = require('../admin'); 
const CONSTANTS = require('../../constants'); 
const projectUsersModule = require('./projectUsers'); 

exports.onWriteUser = functions.firestore.document(`${CONSTANTS.DB.USERS}/{userId}`).onWrite((change, context) => {
    const data = change.after.data(); 
    const prevData = change.before.data(); 
    
    // User created or updated
    if (data) {
        // User updated
        if (prevData) {
            // Don't do anything if there's no change to the user's displayName or photoURL
            if (data[CONSTANTS.DB.DISPLAY_NAME] === prevData[CONSTANTS.DB.DISPLAY_NAME] && 
                data[CONSTANTS.DB.PHOTO_URL] === prevData[CONSTANTS.DB.PHOTO_URL]) {
                return null; 
            }
        }

        return projectUsersModule.updateProjectUsersByUserId(context.params.userId, {
            [CONSTANTS.DB.DISPLAY_NAME]: data[CONSTANTS.DB.DISPLAY_NAME],
            [CONSTANTS.DB.PHOTO_URL]: data[CONSTANTS.DB.PHOTO_URL]
        })
    }

    return null; 
})