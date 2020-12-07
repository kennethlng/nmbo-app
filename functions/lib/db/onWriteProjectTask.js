const functions = require('firebase-functions');
const { db, auth } = require('../admin'); 
const admin = require('firebase-admin');
const CONSTANTS = require('../../constants'); 

exports.onWriteProjectTask = functions.firestore.document(`${CONSTANTS.DB.PROJECTS}/{projectId}/${CONSTANTS.DB.PROJECT_TASKS}/{taskId}`).onWrite((change, context) => {
    let data = change.after.exists ? change.after.data() : null;
    let prevData = change.before.exists ? change.before.data() : null; 
    let timestamp = admin.firestore.FieldValue.serverTimestamp();
    let snippet = ''; 

    // Task created or updated
    if (data) {
        let title = data[CONSTANTS.DB.TITLE];
        let isChecked = data[CONSTANTS.DB.IS_COMPLETED];
        let modifiedByDisplayName = data[CONSTANTS.DB.MODIFIED_BY_DISPLAY_NAME]

        // Task updated (previous document exists)
        if (prevData) {
            let prevTitle = prevData[CONSTANTS.DB.TITLE];  
            let prevIsChecked = prevData[CONSTANTS.DB.IS_COMPLETED]; 

            // If there was no change to the task title or checkbox, don't do anything
            if (title === prevTitle && isChecked === prevIsChecked) return null; 

            // If the title was updated
            if (title !== prevTitle) {
                snippet = `${modifiedByDisplayName} updated "${title}"`;
            }

            // If the checkbox was updated
            if (isChecked !== prevIsChecked) {
                // If the task was checked off
                if (isChecked && !prevIsChecked) {
                    snippet = `${modifiedByDisplayName} checked off "${title}"`;
                } 
                // If the task was unchecked
                else if (!isChecked && prevIsChecked) {
                    snippet = `${modifiedByDisplayName} unchecked "${title}"`;
                }
            }
        }
        // Task created (previous document doesn't exist)
        else {
            snippet = `${modifiedByDisplayName} added "${title}"`;
        }
    }

    // Update all user projects
    return db.collectionGroup(CONSTANTS.DB.USER_PROJECTS).where(CONSTANTS.DB.ID, '==', context.params.projectId).get()
        .then(function (querySnapshot) {
            let batch = db.batch();

            querySnapshot.forEach(function (doc) {
                batch.update(doc.ref, {
                    [CONSTANTS.DB.SNIPPET]: snippet,
                    [CONSTANTS.DB.MODIFIED_ON]: timestamp,
                    [CONSTANTS.DB.RELEVANT_ON]: timestamp
                })
            });

            return batch.commit();
        })
})