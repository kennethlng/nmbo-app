const functions = require("firebase-functions");
const CONSTANTS = require("../../constants");
const { admin } = require("../../api/firebase");

module.exports = functions.firestore
  .document(
    `${CONSTANTS.DB.USERS}/{userId}/${CONSTANTS.DB.USER_PROJECTS}/{projectId}`
  )
  .onWrite((change, context) => {
    const data = change.after.exists ? change.after.data() : null;
    const prevData = change.before.exists ? change.before.data() : null;
    const timestamp = admin.firestore.FieldValue.serverTimestamp();

    // user_project doc is created or updated
    if (data) {
      // Updated
      if (prevData) {
        const counter = data[CONSTANTS.DB.VISIT_COUNTER];
        const prevCounter = prevData[CONSTANTS.DB.VISIT_COUNTER];

        if (counter === prevCounter) {
          // If the visit counter hasn't incremented by 1, don't do anything
          return null;
        } else {
          return change.after.ref.update({
            [CONSTANTS.DB.OPENED_ON]: timestamp,
          });
        }
      }
      // Created (user visits the project for the first time)
      else {
        // Store the 'relevant_on' field so it will show up in the recent user_projects list query
        return change.after.ref.update({
          [CONSTANTS.DB.RELEVANT_ON]: timestamp,
          [CONSTANTS.DB.OPENED_ON]: timestamp,
        });
      }
    }

    return null;
  });
