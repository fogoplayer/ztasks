import { createSubtask } from "./firebase.js";
import { getTask } from "./firebase.js";

export function loadTaskList(tasks) {
  console.log(tasks);
  renderTasks(tasks, ".task-list", false);
}

export async function loadTaskDetails(context) {
  const task = await getTask(context.params.id);

  if (task.complete === undefined) {
    document.querySelector("app-shell").innerHTML = `
      <span slot="app-header">
      <title-task 
        class="header-task"
        name="${task.name}"
        id="${task.id}"
      >
      </title-task>
      </span>
      <main slot="app-content">
        <ul class="task-list" style="display: none;"></ul>
        <ul class="task-list placeholder">
          <placeholder-task></placeholder-task>
          <placeholder-task></placeholder-task>
        </ul>
      </main>
    `;
  } else {
    document.querySelector("app-shell").innerHTML = `
      <span slot="app-header">
        <task-item
          class="header-task"
          name="${task.name}"
        >
        </task-item>
      </span>
      <main slot="app-content">
        <task-details></task-details>
      </main>
    `;
  }
  renderTasks(task.subtasks, ".task-list", false);
}

/**
 * Recursively produces task list HTML, sorted by due date
 * @param {Task[]} taskArray an array of task objects
 * @returns an array of HTML elements
 */
function generateSortedTaskTree(taskArray) {
  const sortedTasks = sortTasks(taskArray);
  return generateTaskTree(sortedTasks);
}

/**
 * Recursively produces task list HTML
 * @param {Task[]} taskArray an array of task objects
 * @returns an array of HTML elements
 */
function generateTaskTree(taskArray) {
  if (!taskArray || taskArray.length === 0) return [];

  const taskElArray = taskArray.map((task) => {
    const taskEl = document.createElement(
      task.complete === undefined ? "title-task" : "task-item"
    );
    taskEl.setAttribute("slot", "task");
    taskEl.setAttribute("id", task.id);
    taskEl.setAttribute("name", task.name);
    if (task.complete) taskEl.setAttribute("complete", "");
    if (!!task.dueDate) taskEl.setAttribute("due-date", new Date(task.dueDate));
    if (task.reminders && task.reminders.length > 0)
      taskEl.setAttribute("has-reminder", "");
    if (task.recurring) taskEl.setAttribute("is-recurring", "");
    if (task.description) taskEl.setAttribute("has-description", "");
    taskEl.setAttribute("show-subtasks", !!task.showSubtasks);

    generateTaskTree(task.subtasks).forEach((subtask) => {
      taskEl.appendChild(subtask);
    });
    return taskEl;
  });
  return taskElArray;
}

/**
 * Takes an array of task objects and renders it in a specified element
 * @param {Task[]} taskArray an array of task objects
 * @param {string} target the selector for the ul to contain the task list
 * @param {boolean} sorted whether or not the tasks should be sorted by due date. Defaults to false
 */
export function renderTasks(taskArray, target, sorted = false) {
  if (sorted) {
    generateSortedTaskTree(taskArray).forEach((task) =>
      document.querySelector(target).appendChild(task)
    );
  } else {
    generateTaskTree(taskArray).forEach((task) =>
      document.querySelector(target).appendChild(task)
    );
  }
}

/**
 * @param {Task[]} taskArray an array of tasks to sort by due date
 * @returns an array of sorted tasks
 */
function sortTasks(taskArray) {
  if (!taskArray || taskArray.length === 0) return [];

  const taskArraySorted = [...taskArray];
  taskArraySorted.sort((first, second) => first.dueDate - second.dueDate);

  taskArraySorted.map((task) => {
    task.subtasks = sortTasks(task.subtasks);
    return task;
  });

  return taskArraySorted;
}
