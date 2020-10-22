const functions = require('firebase-functions'); 
const DB = require('../constants/db');  

exports.onCreateProjectTask = functions.firestore.document(`${DB.PROJECTS}/{projectId}/${DB.PROJECT_TASKS}/{taskId}`).onCreate((snapshot, context) => {
    return snapshot.ref.update({
        [DB.CREATED_ON]: snapshot.createTime
    })
})