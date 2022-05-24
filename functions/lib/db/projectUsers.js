const { db } = require("../../api/firebase");
const CONSTANTS = require("../../constants");

exports.updateProjectUsersByUserId = function (userId, obj) {
  return db
    .collectionGroup(CONSTANTS.DB.PROJECT_USERS)
    .where(CONSTANTS.DB.ID, "==", userId)
    .get()
    .then(function (querySnapshot) {
      if (querySnapshot.empty) return null;

      let batch = db.batch();

      querySnapshot.forEach(function (doc) {
        batch.update(doc.ref, obj);
      });

      return batch.commit();
    });
};
