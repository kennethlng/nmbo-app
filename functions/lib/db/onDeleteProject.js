const functions = require('firebase-functions'); 
const { db } = require('../admin'); 
const CONSTANTS = require('../../constants'); 

exports.onDeleteProject = functions.firestore.document(`${CONSTANTS.DB.PROJECTS}/{projectId}`).onDelete((snapshot, context) => {
    return db.collectionGroup(CONSTANTS.DB.USER_PROJECTS).where(CONSTANTS.DB.ID, "==", context.params.projectId).get()
    .then(function(querySnapshot) {
        if (querySnapshot.empty) {
            console.log("No matching documents");
            return null;
        }

        let batch = db.batch(); 

        querySnapshot.forEach(function(doc) {
            batch.delete(doc.ref);
        })

        return batch.commit(); 
    })
})