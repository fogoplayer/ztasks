// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require("firebase-functions");

// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
admin.initializeApp();

exports.getTaskWithSubtasks = functions.https.onRequest(async (req, res) => {
  const path = req.path.split("/");
  const id = path[path.length - 1];
  const taskTree = await getTaskTree(id);
  res.send(taskTree);

  async function getTaskTree(taskId) {
    const doc = await admin.firestore().collection("tasks").doc(taskId).get();
    const data = doc.data();

    data.id = doc.id;
    for (let i = 0; i < data.subtasks.length; ++i) {
      data.subtasks[i] = await getTaskTree(data.subtasks[i]);
    }

    return data;
  }
});
