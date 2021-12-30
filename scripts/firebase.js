// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const firestore = getFirestore();

const querySnapshot = await getDocs(collection(firestore, "tasks"));
querySnapshot.forEach((doc) => {
  console.log(doc.id, doc.data());
});

export default app