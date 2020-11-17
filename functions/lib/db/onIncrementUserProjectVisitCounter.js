const functions = require('firebase-functions'); 
const CONSTANTS = require('../../constants'); 
const { db } = require('../admin');

exports.onIncrementUserProjectVisitCounter = functions.firestore.document(`${CONSTANTS.DB.USERS}/{userId}/${CONSTANTS.DB.USER_PROJECTS}/{projectId}`).onWrite((change, context) => {
    const doc = change.after.exists ? change.after.data() : null; 
    const prevDoc = change.before.data();

    if (doc) {
        // Get the updated counter
        const counter = doc[CONSTANTS.DB.VISIT_COUNTER];

        // Check for when the user first visit the project for the first time and for when the user visits the project again
        if ((typeof prevDoc === 'undefined' && counter === 1) || 
            (typeof prevDoc !== 'undefined' && counter - prevDoc[CONSTANTS.DB.VISIT_COUNTER] === 1)
            ) {

            // Run transaction
            return db.runTransaction(function(transaction) {

                // Grab the project data (specifically the created_on timestamp)
                var projRef = db.collection(CONSTANTS.DB.PROJECTS).doc(change.after.id);
                return transaction.get(projRef)
                    .then(function(projDoc) {
                        if (!projDoc.exists) {
                            throw "Document doesn't exist!"
                        }

                        let data = projDoc.data(); 
                        return transaction.update(change.after.ref, {
                            [CONSTANTS.DB.CREATED_ON]: data[CONSTANTS.DB.CREATED_ON] ? data[CONSTANTS.DB.CREATED_ON] : null,
                            [CONSTANTS.DB.OPENED_ON]: change.after.updateTime
                        });
                    })
            })
        }

        return null; 
    }

    return null; 
})