const functions = require('firebase-functions'); 
const { db } = require('./firebase'); 
const DB = require('../constants/db'); 

exports.onUpdateProjectTitle = functions.firestore.document(`${DB.PROJECTS}/{projectId}`).onUpdate((change, context) => {
    const newValue = change.after.data()
    const prevValue = change.before.data()

    if (newValue[DB.TITLE] === prevValue[DB.TITLE]) {
        return null;
    }

    return db.collectionGroup(DB.USER_PROJECTS).where(DB.ID, "==", context.params.projectId).get()
    .then(function(querySnapshot) {
        if (querySnapshot.empty) {
            console.log("No matching documents");
            return null;
        }

        let batch = db.batch(); 

        querySnapshot.forEach(function(doc) {
            batch.update(doc.ref, {
                [DB.TITLE]: newValue[DB.TITLE]
            })
        })

        return batch.commit(); 
    })
});