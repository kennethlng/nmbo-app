const functions = require('firebase-functions'); 
const CONSTANTS = require('../../constants'); 
const { db } = require('../admin'); 

exports.onCreateProject = functions.firestore.document(`${CONSTANTS.DB.PROJECTS}/{projectId}`).onCreate((snapshot, context) => {
    let batch = db.batch(); 

    batch.set(snapshot.ref, {
        [CONSTANTS.DB.CREATED_ON]: snapshot.createTime
    }, { merge: true })

    return db.collectionGroup(CONSTANTS.DB.USER_PROJECTS).where(CONSTANTS.DB.ID, '==', snapshot.ref.id).get()
        .then(function(querySnapshot) {
            if (querySnapshot.empty) {
                console.log("No matching documents");
                return null;
            }

            // Track the created_on date for each user_project
            querySnapshot.forEach(function(doc) {
                batch.set(doc.ref, {
                    [CONSTANTS.DB.CREATED_ON]: snapshot.createTime
                }, { merge: true })
            })

            return batch.commit(); 
        })
})