/**
 * @template T
 * @typedef {{ [K in keyof T as T[K] extends Function ? never : K]: T[K]}} PropertiesOnly
 */

export class Task {
  /**
   * Creates a new Task object.
   *
   * @param {Partial<PropertiesOnly<Task>>} taskData - The task data.
   */
  constructor({
    id = "",
    title = "",
    description = "",
    complete = false,
    dueDate = null,
    recurring = "",
    reminders = [],
    /* 
        labels,
        attachments,
        */
    subtasks = [],
    owners = ["current user"],
  }) {
    /** @type {string} */
    this.id = id;
    /** @type {string} */
    this.title = title;
    /** @type {string?} */
    this.description = description;
    /** @type {boolean} */
    this.complete = complete;
    /** @type {Date?} */
    this.dueDate = typeof dueDate === "string" ? new Date(dueDate) : dueDate;
    /** @type {string} */
    this.recurring = recurring;
    /** @type {Date[]} */
    this.reminders = reminders;
    /** @type {Task[]} */
    this.subtasks = subtasks.map((subtask) => {
      if (subtask instanceof Task) return subtask;
      return new Task(subtask);
    });
    /** @type {string[]} */
    this.owners = owners;
  }
}
