const functions = require('firebase-functions'); 
const DB = require('../constants/db'); 

exports.onIncrementUserProjectVisitCounter = functions.firestore.document(`${DB.USERS}/{userId}/${DB.USER_PROJECTS}/{projectId}`).onWrite((change, context) => {
    const doc = change.after.exists ? change.after.data() : null; 
    const prevDoc = change.before.data();

    // If the user_project doc exists. We don't care about when the doc is deleted (newValue === null)
    if (doc) {
        const counter = doc[DB.VISIT_COUNTER];

        if ((typeof prevDoc === 'undefined' && counter === 1) || 
            (typeof prevDoc !== 'undefined' && counter - prevDoc[DB.VISIT_COUNTER] === 1)
            ) {
            return change.after.ref.set({
                [DB.OPENED_ON]: change.after.updateTime
            }, { merge: true })
        }

        return null; 
    }

    return null; 
})