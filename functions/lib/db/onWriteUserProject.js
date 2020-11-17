const functions = require('firebase-functions'); 
const CONSTANTS = require('../../constants'); 

exports.onWriteUserProject = functions.firestore.document(`${CONSTANTS.DB.USERS}/{userId}/${CONSTANTS.DB.USER_PROJECTS}/{projectId}`).onWrite((change, context) => {
    const data = change.after.exists ? change.after.data() : null; 
    const prevData = change.before.exists ? change.before.data() : null;

    // user_project doc created or updated
    if (data) {
        // user_project doc updated
        if (prevData) {
            // If the visit counter hasn't incremented by 1, don't do anything
            const counter = data[CONSTANTS.DB.VISIT_COUNTER];
            const prevCounter = prevData[CONSTANTS.DB.VISIT_COUNTER]; 
            if (counter - prevCounter < 1) return null; 
        }

        return change.after.ref.update({
            [CONSTANTS.DB.OPENED_ON]: change.after.updateTime
        })
    }

    return null; 
})