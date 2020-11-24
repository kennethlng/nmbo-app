const functions = require('firebase-functions');
const { db, auth } = require('../admin'); 
const admin = require('firebase-admin');
const CONSTANTS = require('../../constants'); 

exports.onWriteProjectTask = functions.firestore.document(`${CONSTANTS.DB.PROJECTS}/{projectId}/${CONSTANTS.DB.PROJECT_TASKS}/{taskId}`).onWrite((change, context) => {
    let data = change.after.exists ? change.after.data() : null;
    let prevData = change.before.exists ? change.before.data() : null; 
    let timestamp = admin.firestore.FieldValue.serverTimestamp();
    let batch = db.batch(); 
    let userProjects = db.collectionGroup(CONSTANTS.DB.USER_PROJECTS).where(CONSTANTS.DB.ID, '==', context.params.projectId);

    // Task created or updated
    if (data) {
        let title = data[CONSTANTS.DB.TITLE];
        let snippet = '';
        let modifiedBy = data[CONSTANTS.DB.MODIFIED_BY]; 

        // Task updated (previous document exists)
        if (prevData) {
            // Only add snippet and modified_on field if user completed a task. Otherwise, don't do anything
            let isCompleted = data[CONSTANTS.DB.IS_COMPLETED] && !prevData[CONSTANTS.DB.IS_COMPLETED]
            if (!isCompleted) return null;

            snippet = `Checked off: ${title}`;
        }
        // Task created (previous document doesn't exist)
        else {
            snippet = `New: ${title}`;
        }

        // return auth.getUser(modifiedBy)
        // .then(function(user) {
            
        // })
        // .catch(function(error) {
        //     console.log('Error fetching user data:', error);
        // });

        // Update all user projects
        return userProjects.get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    batch.update(doc.ref, {
                        [CONSTANTS.DB.SNIPPET]: snippet,
                        [CONSTANTS.DB.MODIFIED_ON]: timestamp,
                        [CONSTANTS.DB.RELEVANT_ON]: timestamp
                    })
                });

                return batch.commit();
            })
    }
    // Task deleted 
    else {
        return null; 
    }
})

// exports.onWriteProjectTask = functions.firestore.document(`${CONSTANTS.DB.PROJECTS}/{projectId}/${CONSTANTS.DB.PROJECT_TASKS}/{taskId}`).onWrite((change, context) => {
//     let projectRef = db.collection(CONSTANTS.DB.PROJECTS).doc(context.params.projectId);
//     let projectObj = {
//         [CONSTANTS.DB.MODIFIED_ON]: admin.firestore.FieldValue.serverTimestamp(),
//     }
//     let afterData = change.after.data(); 
//     let beforeData = change.before.data(); 

//     // Task deleted
//     if (change.before.exists && !change.after.exists) {
//         // -1 to total number of tasks counter on project doc
//         projectObj[CONSTANTS.DB.NUM_TASKS_TOTAL] = admin.firestore.FieldValue.increment(-1);

//         // If the deleted task was completed, increment the number of completed tasks counter by -1
//         if (beforeData[CONSTANTS.DB.IS_COMPLETED]) {
//             projectObj[CONSTANTS.DB.NUM_TASKS_COMPLETED] = admin.firestore.FieldValue.increment(-1);
//         }

//         return projectRef.set(projectObj, { merge: true })
//     } 
//     // Task created
//     else if (!change.before.exists && change.after.exists) {
//         let batch = db.batch(); 

//         // +1 to total number of tasks counter on project doc, and update modified_by to task creator
//         projectObj[CONSTANTS.DB.NUM_TASKS_TOTAL] = admin.firestore.FieldValue.increment(1);
//         projectObj[CONSTANTS.DB.MODIFIED_BY] = afterData[CONSTANTS.DB.CREATED_BY]
//         batch.set(projectRef, projectObj, { merge: true });

//         // Add created_on and modified_on timestamp to project task
//         batch.set(change.after.ref, {
//             [CONSTANTS.DB.CREATED_ON]: change.after.createTime,
//             [CONSTANTS.DB.MODIFIED_ON]: change.after.createTime
//         }, { merge: true })

//         return batch.commit(); 
//     } 
//     // Task updated 
//     else {
//         let titleUpdated = afterData[CONSTANTS.DB.TITLE] !== beforeData[CONSTANTS.DB.TITLE];
//         let isCompletedUpdated = afterData[CONSTANTS.DB.IS_COMPLETED] !== beforeData[CONSTANTS.DB.IS_COMPLETED];

//         // If there's no change to the title, is_completed, and is_hearted, don't do anything
//         if (!titleUpdated && !isCompletedUpdated) return null; 

//         let batch = db.batch(); 

//         // Update the project modified_by field to whoever modified the task (determined client-side when user hearts, completes, or changes the title for a task)
//         projectObj[CONSTANTS.DB.MODIFIED_BY] = afterData[CONSTANTS.DB.MODIFIED_BY]

//         // If is_completed changed, increment the number of tasks completed counter on project doc
//         if (isCompletedUpdated) {
//             projectObj[CONSTANTS.DB.NUM_TASKS_COMPLETED] = admin.firestore.FieldValue.increment(afterData[CONSTANTS.DB.IS_COMPLETED] ? 1 : -1);
//         }

//         batch.set(projectRef, projectObj, { merge: true })
//         batch.set(change.after.ref, {
//             [CONSTANTS.DB.MODIFIED_ON]: change.after.updateTime
//         }, { merge: true })

//         return batch.commit(); 
//     }
// })