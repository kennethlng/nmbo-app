const functions = require("firebase-functions");
const { db } = require("../../api/firebase");
const CONSTANTS = require("../../constants");

module.exports = functions.firestore
  .document(`${CONSTANTS.DB.PROJECTS}/{projectId}`)
  .onDelete((snapshot, context) => {
    return db
      .collectionGroup(CONSTANTS.DB.USER_PROJECTS)
      .where(CONSTANTS.DB.ID, "==", context.params.projectId)
      .get()
      .then(function (querySnapshot) {
        if (querySnapshot.empty) {
          console.log("No matching documents");
          return null;
        }

        let batch = db.batch();

        querySnapshot.forEach(function (doc) {
          batch.delete(doc.ref);
        });

        return batch.commit();
      });
  });
