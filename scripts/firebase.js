// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";
import { getFirestore, doc, collection, getDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js"
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrT1-P-gDVsgPAZujMXQGg_s9FmrS8Mys",
  authDomain: "ztasks-d48a3.firebaseapp.com",
  projectId: "ztasks-d48a3",
  storageBucket: "ztasks-d48a3.appspot.com",
  messagingSenderId: "427040187872",
  appId: "1:427040187872:web:7091b156a3798219f87785",
  measurementId: "G-JG2PP1P43Y"
};

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