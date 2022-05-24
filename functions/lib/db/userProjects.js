const { db } = require("../../api/firebase");
const CONSTANTS = require("../../constants");

exports.updateUserProjectsByProjectId = function (projectId, obj) {
  return db
    .collectionGroup(CONSTANTS.DB.USER_PROJECTS)
    .where(CONSTANTS.DB.ID, "==", projectId)
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
