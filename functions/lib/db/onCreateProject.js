const functions = require('firebase-functions'); 
const CONSTANTS = require('../../constants'); 

exports.onCreateProject = functions.firestore.document(`${CONSTANTS.DB.PROJECTS}/{projectId}`).onCreate((snapshot, context) => {
    const data = snapshot.data(); 

    return snapshot.ref.set({
        [CONSTANTS.DB.CREATED_ON]: snapshot.createTime,
        [CONSTANTS.DB.MODIFIED_ON]: snapshot.createTime,
        [CONSTANTS.DB.MODIFIED_BY]: data[CONSTANTS.DB.CREATED_BY]
    }, { merge: true })
})