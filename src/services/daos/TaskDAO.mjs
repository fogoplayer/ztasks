import { Task } from "../../models/Task.mjs";

/** @type {{[key: string]: Task}} */
const taskDict = {};
let tasksMade = 0;

/**
 *
 * @param {string} id
 * @returns {Task?}
 */
export function getTaskById(id) {
  return taskDict[id];
}

// Temp local storage data

let taskData = localStorage.getItem("task-data");
if (taskData) {
  JSON.parse(taskData).forEach((taskObj) => {
    const task = new Task(taskObj);
    taskDict[task.id] = task;
  });
} else {
  makeTask();
  localStorage.setItem("task-data", JSON.stringify(Object.values(taskDict)));
}

/**
 *
 * @returns {string}
 */
function makeTask() {
  const id = (++tasksMade).toString();
  const newTask = new Task({
    id: id,
    title: tasksMade.toString(),
    description: oneIn(3) ? "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, quas." : null,
    complete: oneIn(2),
    dueDate: oneIn(7) ? new Date(Date.now() + randomInt(-10, 10) * 24 * 60 * 60 * 1000) : null,
    recurring: oneIn(3) ? "daily" : "",
    reminders: oneIn(4)
      ? new Array(randomInt(1, 5)).fill(0).map(() => new Date(Date.now() + randomInt(1, 10) * 24 * 60 * 60 * 1000))
      : [],
    subtasks: oneIn(tasksMade) ? new Array(randomInt(1, 10)).fill(0).map(makeTask).map(getTaskById) : [],
    owners: oneIn(4) ? ["Alice", "Bob", "Charlie"] : undefined,
  });
  taskDict[id] = newTask;
  return id;
}

/**
 * Generates a random probability
 *
 * @param {number} n
 * @returns {boolean}
 */
function oneIn(n) {
  return Math.random() < 1 / n;
}

/**
 * Generates a random int in a range
 *
 * @param  {[number] | [number, number]} nums
 * @returns number
 */
function randomInt(...nums) {
  let [max, min = 0] = nums.reverse();
  return Math.floor(Math.random() * (max - min) + min);
}
