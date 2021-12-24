import { renderTasks } from "./task-list.mjs"

let tasks = [{
  name: "Somebody once told me",
  description: "Task 1",
  complete: true,
  dueDate: new Date("27 Dec 2022"),
  showSubtasks: true,
  subtasks: [{
    name: "The world was gonna roll me",
    complete: false,
    description: "Task 1a",
    dueDate: new Date("04 Mar 2022"),
    showSubtasks: false,
    subtasks: [],
  },
  {
    name: "I ain't the sharpest tool in the shed",
    complete: false,
    description: "",
    dueDate: new Date("26 Dec 2021"),
    showSubtasks: true,
    subtasks: [],
  }],
},
{
  name: "She was looking kinda dumb",
  complete: true,
  description: "Task 2",
  dueDate: new Date("28 Dec 2022"),
  showSubtasks: true,
  subtasks: [{
    name: "With her finger and her thumb",
    complete: false,
    description: "",
    dueDate: new Date("28 Dec 2021"),
    showSubtasks: true,
    subtasks: [],
  },
  {
    name: "In the shape of an L",
    complete: false,
    description: "",
    showSubtasks: true,
    subtasks: [{
      name: "On her forhead",
      description: "",
      dueDate: new Date("24 Dec 2021"),
      showSubtasks: true,
      subtasks: [],
    }],
  }],
}]

window.onload = renderTasks(tasks, ".task-list", false);