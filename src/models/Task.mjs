/**
 * @template T
 * @typedef {{ [K in keyof T as T[K] extends Function ? never : K]: T[K]}} PropertiesOnly
 */

export default class Task {
  /**
   * Creates a new Task object.
   *
   * @param {PropertiesOnly<Task>} taskData - The task data.
   */
  constructor({
    id,
    title,
    description = "",
    complete = false,
    dueDate = null,
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
    if (dueDate) /** @type {Date?} */ (this.dueDate = dueDate);
    /** @type {Date[]} */
    this.reminders = reminders;
    /** @type {Task[]} */
    this.subtasks = subtasks;
    /** @type {string[]} */
    this.owners = owners;
  }
}
