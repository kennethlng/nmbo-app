const functions = require("firebase-functions");
const { auth, admin } = require("../../api/firebase");
const CONSTANTS = require("../../constants");
const userProjectsModule = require("./userProjects");

module.exports = functions.firestore
  .document(
    `${CONSTANTS.DB.PROJECTS}/{projectId}/${CONSTANTS.DB.PROJECT_TASKS}/{taskId}`
  )
  .onWrite((change, context) => {
    let data = change.after.exists ? change.after.data() : null;
    let prevData = change.before.exists ? change.before.data() : null;
    let timestamp = admin.firestore.FieldValue.serverTimestamp();
    let snippet = "";

    // Task created or updated
    if (data) {
      let title = data[CONSTANTS.DB.TITLE];
      let isChecked = data[CONSTANTS.DB.IS_COMPLETED];
      let modifiedBy = data[CONSTANTS.DB.MODIFIED_BY];

      // Get the modifying user's displayName
      return auth.getUser(modifiedBy).then((userRecord) => {
        const displayName = userRecord.displayName;

        // Task updated (previous document exists)
        if (prevData) {
          let prevTitle = prevData[CONSTANTS.DB.TITLE];
          let prevIsChecked = prevData[CONSTANTS.DB.IS_COMPLETED];

          // If there was no change to the task title or checkbox, don't do anything
          if (title === prevTitle && isChecked === prevIsChecked) return null;

          // If the title was updated
          if (title !== prevTitle) {
            snippet = `${displayName} updated "${title}"`;
          }

          // If the checkbox was updated
          if (isChecked !== prevIsChecked) {
            // If the task was checked off
            if (isChecked && !prevIsChecked) {
              snippet = `${displayName} checked off "${title}"`;
            }
            // If the task was unchecked
            else if (!isChecked && prevIsChecked) {
              snippet = `${displayName} unchecked "${title}"`;
            }
          }
        }
        // Task created (previous document doesn't exist)
        else {
          snippet = `${displayName} added "${title}"`;
        }

        return userProjectsModule.updateUserProjectsByProjectId(
          context.params.projectId,
          {
            [CONSTANTS.DB.SNIPPET]: snippet,
            [CONSTANTS.DB.MODIFIED_ON]: timestamp,
            [CONSTANTS.DB.RELEVANT_ON]: timestamp,
          }
        );
      });
    }
    // Task deleted
    else {
      let prevTitle = prevData[CONSTANTS.DB.TITLE];

      return userProjectsModule.updateUserProjectsByProjectId(
        context.params.projectId,
        {
          [CONSTANTS.DB.SNIPPET]: `Removed: "${prevTitle}"`,
          [CONSTANTS.DB.MODIFIED_ON]: timestamp,
          [CONSTANTS.DB.RELEVANT_ON]: timestamp,
        }
      );
    }
  });
