/**
 * Recursively produces task list HTML
 * @param {Task[]} taskArray an array of task objects
 * @returns an array of HTML elements
 */
export function generateTaskTree(taskArray) {
  if (taskArray.length === 0) return [];

  const taskElArray = taskArray.map((task) => {
    const taskEl = document.createElement("task-item");
    taskEl.setAttribute("name", task.name)
    taskEl.setAttribute("slot", "task")
    taskEl.setAttribute("show-subtasks", task.showSubtasks)
    if (task.complete) taskEl.setAttribute("complete", "")
    if (!!task.dueDate) taskEl.setAttribute("due-date", task.dueDate)


    renderTasks(task.subtasks).forEach(subtask => {
      taskEl.appendChild(subtask)
    });
    return taskEl
  });

  return taskElArray;
}

/**
 * 
 * @param {Task[]} taskArray an array of task objects
 * @param {string} target the selector for the element to contain the task list
 */
export function renderTasks(taskArray, target) {
  renderTasks(tasks).forEach(task => document.querySelector(".task-list").appendChild(task));
}