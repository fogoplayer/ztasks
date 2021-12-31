export default class Task {
  /**
   * @param {string} name = "",
   * @param {boolean} checked = undefined,
   * @param {string} description = "",
   * @param {Timestamp} dueDate = undefined,
   * @param {boolean} recurring = false,
   * @param {Timestamp[]} reminders = [],
   * @param {Task[]} subtasks = [],
   * @param {boolean} showSubtasks = true
   */
  constructor({
    name = "",
    checked = undefined,
    description = "",
    dueDate = undefined,
    recurring = false,
    reminders = [],
    subtasks = [],
    showSubtasks = true,
  }) {
    this.name = name;
    this.checked = checked;
    this.description = description;
    this.dueDate = dueDate;
    this.recurring = recurring;
    this.reminders = reminders;
    this.subtasks = subtasks;
    this.showSubtasks = showSubtasks;
  }
}
