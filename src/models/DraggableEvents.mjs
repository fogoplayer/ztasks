export class InsertTaskEvent extends CustomEvent {
  /**
   * @param {boolean} above if the task should be inserted above (as opposed to below) the current task
   * @param {string} taskIdToInsert a stringified JSON representation of the task to be inserted
   * @param {ListItem} insertionTarget the target list item to insert the task into
   */
  constructor(above, taskIdToInsert, insertionTarget) {
    super("inserttask", {
      composed: true,
      bubbles: true,
      detail: { above, taskIdToInsert, insertionTarget },
    });
  }

  get above() {
    return this.detail.above;
  }

  get taskIdToInsert() {
    return this.detail.taskIdToInsert;
  }

  get insertionTarget() {
    return this.detail.insertionTarget;
  }
}

export class RemoveTaskEvent extends CustomEvent {
  /**
   * @param {unknown} taskToRemove
   */
  constructor(taskToRemove) {
    super("removetask", {
      composed: true,
      bubbles: true,
      detail: { taskToRemove },
    });
  }

  get taskToRemove() {
    return this.detail.taskToRemove;
  }
}
