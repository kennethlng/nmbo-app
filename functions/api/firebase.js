const admin = require("firebase-admin");

admin.initializeApp();

const db = admin.firestore();
const auth = admin.auth();

module.exports = {
  auth,
  db,
  admin,
};
