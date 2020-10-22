const functions = require('firebase-functions');
const { db } = require('./firebase'); 
const admin = require('firebase-admin');
const DB = require('../constants/db'); 

exports.onWriteProjectTaskUpdateProjectModified = functions.firestore.document(`${DB.PROJECTS}/{projectId}/${DB.PROJECT_TASKS}/{taskId}`).onWrite((change, context) => {
    let timestamp = admin.firestore.FieldValue.serverTimestamp();
    let batch = db.batch();

    let projectRef = db.collection(DB.PROJECTS).doc(context.params.projectId);
    batch.set(projectRef, {
        [DB.MODIFIED_ON]: timestamp
    }, { merge: true });

    return db.collectionGroup(DB.USER_PROJECTS).where(DB.ID, "==", context.params.projectId).get()
    .then(function(querySnapshot) {
        if (!querySnapshot.empty) {
            querySnapshot.forEach(function(doc) {
                batch.update(doc.ref, {
                    [DB.MODIFIED_ON]: timestamp
                })
            })
        }

        return batch.commit(); 
    })
})