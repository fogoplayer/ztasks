# Task List

## `generateSortedTaskTree()`

Recursively produces task list HTML, sorted by due date. Returns an array of `li`s containing HTML for all tasks in `taskArray`, including subtasks

| Parameter         | Description              |
| ----------------- | ------------------------ |
| `taskArray`       | an array of task objects |

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
| `sorted`          | whether or not the tasks should be sorted by due date. Defaults to false|

## `sortTasks()`

Takes an array of task objects and recursively sorts it by due date

| Parameter         | Description              |
| ----------------- | -------------------------|
| `taskArray`       | an array of task objects |