const functions = require("firebase-functions");
const CONSTANTS = require("../../constants");
const { db } = require("../admin");

module.exports = functions.auth.user().onDelete((user) => {
  let batch = db.batch();

  // Delete the corresponding user document
  let userRef = db.collection(CONSTANTS.DB.USERS).doc(user.uid);
  batch.delete(userRef);

  // Delete all corresponding project_user docs
  return db
    .collectionGroup(CONSTANTS.DB.PROJECT_USERS)
    .where(CONSTANTS.DB.ID, "==", user.uid)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        batch.delete(doc.ref);
      });

      return batch.commit();
    });
});
