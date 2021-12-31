// import { firestore } from "./firebase.js";
import { getTask } from "./firebase.js";
import { loadTaskList, loadTaskDetails } from "./task-list.mjs";

getTask("SPv4bFNsfbzvFXo1Oi0f").then(
  task => {
    tasks = [task];
    page("/", () => { loadTaskList(tasks) })
    page("/details", () => { loadTaskDetails(tasks) }) // TODO remove
    page("/details/:id", () => { loadTaskDetails(tasks) })
    page.start();
  }
)


