// import { firestore } from "./firebase.js";
import { login } from "./firebase.js";
import { getTaskLists } from "./firebase.js";
import { getTask } from "./firebase.js";
import { loadTaskList, loadTaskDetails } from "./task-list.mjs";

// login("zarinloosli@gmail.com", "Testing123!").then(
//   getTaskLists
// )

// Routing
page("/list/:id", getTaskById, loadTaskDetails);
page.start();

function getTaskById(context, next) {
  getTask(context.params.id).then((task) => {
    console.log(task);
    next(task.subtasks);
  });
}
