const functions = require('firebase-functions'); 
const DB = require('../constants/db'); 

exports.onCreateProject = functions.firestore.document(`${DB.PROJECTS}/{projectId}`).onCreate((snapshot, context) => {
    const data = snapshot.data(); 

    return snapshot.ref.set({
        [DB.CREATED_ON]: snapshot.createTime,
        [DB.MODIFIED_ON]: snapshot.createTime,
        [DB.MODIFIED_BY]: data[DB.CREATED_BY]
    }, { merge: true })
})