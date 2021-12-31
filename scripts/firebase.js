// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";
import {
  getFirestore,
  doc,
  collection,
  getDoc,
  addDoc,
  updateDoc,
  arrayUnion,
  connectFirestoreEmulator,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import firebaseConfig from "/firebase/firebase_config.mjs";
import Task from "./TaskSchema.mjs";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore();
const auth = getAuth();

// Other vars
export let user = undefined;
const usersRef = collection(firestore, "users");
const tasksRef = collection(firestore, "tasks");

// Emulator
connectFirestoreEmulator(firestore, "localhost", 8080);

export function getTask(id) {
  return fetch("/task/" + id).then((res) => res.json());
}

export async function getTaskLists() {
  const docRef = await getDoc(doc(usersRef, user.uid));
  user.lists = docRef.data();
}

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      user = userCredential.user;
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

export async function createSubtask(id) {
  const parentRef = await doc(tasksRef, id);
  const subtaskRef = await addDoc(collection(firestore, "tasks"), {
    name: "",
    complete: false,
    description: "",
    recurring: false,
    reminders: [],
    subtasks: [],
    showSubtasks: true,
  });

  // Add ID to subtask
  await updateDoc(subtaskRef, {
    id: subtaskRef.id,
  });

  // Add subtask to parent
  await updateDoc(parentRef, {
    subtasks: arrayUnion(subtaskRef.id),
  });
}

export default app;
