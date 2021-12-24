# Task List

## `generateTaskTree()`

Recursively produces task list HTML. Returns an array of `li`s containing HTML for all tasks in `taskArray`, including subtasks

| Parameter         | Description              |
| ----------------- | ------------------------ |
| `taskArray`       | an array of task objects |

## `renderTasks()`

Takes an array of task objects and renders it in a specified element

| Parameter         | Description                                      |
| ----------------- | ------------------------------------------------ |
| `taskArray`       | an array of task objects                         |
| `target`          | the selector for the ul to contain the task list |