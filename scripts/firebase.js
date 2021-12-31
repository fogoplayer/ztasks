// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";
import { getFirestore, doc, collection, getDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js"
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import firebaseConfig from "../firebase/firebase_config.mjs";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore();
const auth = getAuth();

// Other vars
export let user = undefined;
const usersRef = collection(firestore, "users")
const tasksRef = collection(firestore, "tasks")

export function getTask(id) {
  return fetch("/task/" + id).then(res => res.json());
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

export default app