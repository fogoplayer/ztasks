/** @typedef {import("../../models/DraggableEvents.mjs").InsertTaskEvent} InsertTaskEvent */
/** @typedef {import("../../models/DraggableEvents.mjs").RemoveTaskEvent} RemoveTaskEvent */

/**
 * @param {unknown} superclass
 */
export const InsertionDeletionHandler = (superclass) =>
  /** @extends LitElement */
  class extends superclass {
    firstUpdated() {
      super.firstUpdated();
      this.addEventListener("inserttask", this.onInsertTask);
      this.addEventListener("removetask", this.onRemoveTask);
    }

    /**
     * @param {InsertTaskEvent} e
     */
    onInsertTask(e) {
      if (this === e.insertionTarget) return;

      e.stopPropagation();
      const taskIdToInsert = e.taskIdToInsert;
      const taskTarget = e.insertionTarget;
      const above = e.above;

      let insertionIndex = taskTarget.index;
      if (!above) insertionIndex++;
      this.task?.subtasks.splice(insertionIndex, 0, taskIdToInsert);

      this.requestUpdate();
    }

    /**
     * @param {RemoveTaskEvent} e
     */
    onRemoveTask(e) {
      if (this === e.taskToRemove) return;

      e.stopPropagation();
      const taskToRemove = e.taskToRemove;

      let deletionIndex = taskToRemove.index;

      this.task?.subtasks.splice(deletionIndex, 1);
    }
  };
