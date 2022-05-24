const functions = require("firebase-functions");
const CONSTANTS = require("../../constants");
const { db, auth } = require("../admin");
const displayNameHelpers = require("../../helpers/displayName");

function createUser(id, displayName, photoURL) {
  return db
    .collection(CONSTANTS.DB.USERS)
    .doc(id)
    .set({
      [CONSTANTS.DB.DISPLAY_NAME]: displayName,
      [CONSTANTS.DB.PHOTO_URL]: photoURL,
    });
}

module.exports = functions.auth.user().onCreate((user) => {
  // If the user doesn't have a display name
  if (!user.displayName) {
    // Create a random display name
    const newName = displayNameHelpers.generateRandomDisplayName();
    return auth
      .updateUser(user.uid, { displayName: newName })
      .then((userRecord) => {
        // Create the corresponding user doc in Firestore
        createUser(user.uid, newName, user.photoURL);
      });
  } else {
    // Create the corresponding user doc in Firestore
    createUser(user.uid, user.displayName, user.photoURL);
  }
});
