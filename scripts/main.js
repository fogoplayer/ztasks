let tasks = [{
  name: "Somebody once told me",
  description: "Task 1",
  checked: true,
  dueDate: new Date("04 Dec 2022 00:12:00 GMT"),
  showSubtasks: false,
  subtasks: [{
    name: "The world was gonna roll me",
    checked: false,
    description: "Task 1a",
    dueDate: new Date("04 Dec 2021 00:12:00 GMT"),
    showSubtasks: false,
    subtasks: [],
  },
  {
    name: "I ain't the sharpest tool in the shed",
    checked: false,
    description: "",
    dueDate: new Date("04 Dec 2022 00:12:00 GMT"),
    showSubtasks: true,
    subtasks: [],
  }],
},
{
  name: "She was looking kinda dumb",
  checked: true,
  description: "Task 2",
  showSubtasks: true,
  subtasks: [{
    name: "With her finger and her thumb",
    checked: false,
    description: "",
    dueDate: new Date("04 Dec 2022 00:12:00 GMT"),
    showSubtasks: true,
    subtasks: [],
  },
  {
    name: "In the shape of an L",
    checked: false,
    description: "",
    dueDate: new Date("04 Dec 2022 00:12:00 GMT"),
    showSubtasks: true,
    subtasks: [{
      name: "On her forhead",
      checked: false,
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
    taskEl.setAttribute("checked", task.checked)
    taskEl.setAttribute("slot", "task")
    if (!!task.dueDate) taskEl.setAttribute("has-due-date", "")
    taskEl.setAttribute("show-subtasks", task.showSubtasks)


    renderTasks(task.subtasks).forEach(subtask => {
      taskEl.appendChild(subtask)
    });
    return taskEl
  });

  return taskElArray;
}

renderTasks(tasks).forEach(task => document.querySelector(".task-list").appendChild(task));