const functions = require('firebase-functions');
const { db } = require('../admin'); 
const CONSTANTS = require('../../constants'); 

exports.onUpdateUser = functions.firestore.document(`${CONSTANTS.DB.USERS}/{userId}`).onUpdate((change, context) => {
    const newData = change.after.data(); 
    const prevData = change.before.data(); 
    
    // Don't do anything if there's no change to the user's displayName or photoURL
    if (newData[CONSTANTS.DB.DISPLAY_NAME] === prevData[CONSTANTS.DB.DISPLAY_NAME] && 
        newData[CONSTANTS.DB.PHOTO_URL] === prevData[CONSTANTS.DB.PHOTO_URL]) {
        return null; 
    }

    // Update all project_user docs for the respective user 
    return db.collectionGroup(CONSTANTS.DB.PROJECT_USERS).where(CONSTANTS.DB.ID, '==', context.params.userId).get()
        .then(function(querySnapshot) {
            let batch = db.batch(); 

            // Update the displayName and photoURL for every corresponding project_user doc
            querySnapshot.forEach(function(doc) {
                batch.update(doc.ref, {
                    [CONSTANTS.DB.DISPLAY_NAME]: newData[CONSTANTS.DB.DISPLAY_NAME],
                    [CONSTANTS.DB.PHOTO_URL]: newData[CONSTANTS.DB.PHOTO_URL]
                })
            })

            return batch.commit(); 
        })
})