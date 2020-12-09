const functions = require('firebase-functions'); 
const { db } = require('../admin'); 
const CONSTANTS = require('../../constants'); 

exports.onUpdateProject = functions.firestore.document(`${CONSTANTS.DB.PROJECTS}/{projectId}`).onUpdate((change, context) => {
    const newValue = change.after.data()
    const prevValue = change.before.data()

    // If there's no change to the project title don't do anything
    if (newValue[CONSTANTS.DB.TITLE] === prevValue[CONSTANTS.DB.TITLE]) return null;

    return db.collectionGroup(CONSTANTS.DB.USER_PROJECTS).where(CONSTANTS.DB.ID, "==", context.params.projectId).get()
        .then(function (querySnapshot) {
            if (querySnapshot.empty) {
                console.log("No matching documents");
                return null;
            }

            let batch = db.batch();

            querySnapshot.forEach(function (doc) {
                batch.update(doc.ref, {
                    [CONSTANTS.DB.TITLE]: newValue[CONSTANTS.DB.TITLE]
                })
            })

            return batch.commit();
        })
});