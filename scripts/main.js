let tasks = [{
  name: "Somebody once told me",
  description: "Task 1",
  complete: true,
  dueDate: new Date("04 Dec 2022 00:12:00 GMT"),
  showSubtasks: false,
  subtasks: [{
    name: "The world was gonna roll me",
    complete: false,
    description: "Task 1a",
    dueDate: new Date("04 Dec 2021 00:12:00 GMT"),
    showSubtasks: false,
    subtasks: [],
  },
  {
    name: "I ain't the sharpest tool in the shed",
    complete: false,
    description: "",
    dueDate: new Date("04 Dec 2022 00:12:00 GMT"),
    showSubtasks: true,
    subtasks: [],
  }],
},
{
  name: "She was looking kinda dumb",
  complete: true,
  description: "Task 2",
  showSubtasks: true,
  subtasks: [{
    name: "With her finger and her thumb",
    complete: false,
    description: "",
    dueDate: new Date("04 Dec 2022 00:12:00 GMT"),
    showSubtasks: true,
    subtasks: [],
  },
  {
    name: "In the shape of an L",
    complete: false,
    description: "",
    dueDate: new Date("04 Dec 2022 00:12:00 GMT"),
    showSubtasks: true,
    subtasks: [{
      name: "On her forhead",
      description: "",
      dueDate: new Date("04 Dec 2022 00:12:00 GMT"),
      showSubtasks: true,
      subtasks: [],
    }],
  }],
}]

function renderTasks(taskArray) {
  if (taskArray.length === 0) return [];

  const taskElArray = taskArray.map((task) => {
    const taskEl = document.createElement("task-item");
    taskEl.setAttribute("name", task.name)
    taskEl.setAttribute("slot", "task")
    taskEl.setAttribute("show-subtasks", task.showSubtasks)
    if (task.complete) taskEl.setAttribute("complete", "")
    if (!!task.dueDate) taskEl.setAttribute("has-due-date", "")


    renderTasks(task.subtasks).forEach(subtask => {
      taskEl.appendChild(subtask)
    });
    return taskEl
  });

  return taskElArray;
}

renderTasks(tasks).forEach(task => document.querySelector(".task-list").appendChild(task));