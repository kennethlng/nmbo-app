const functions = require('firebase-functions'); 
const { db } = require('./firebase'); 
const DB = require('../constants/db');  

exports.onDeleteProject = functions.firestore.document(`${DB.PROJECTS}/{projectId}`).onDelete((snapshot, context) => {
    return db.collectionGroup(DB.USER_PROJECTS).where(DB.ID, "==", context.params.projectId).get()
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