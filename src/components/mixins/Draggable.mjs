/** @typedef {import("../ListItem.mjs").ListItem} ListItem */

// eslint-disable-next-line no-unused-vars
import { LitElement } from "lit";
import { Task } from "../../models/Task.mjs";
import { RemoveTaskEvent, InsertTaskEvent } from "../../models/DraggableEvents.mjs";
import { InsertionDeletionHandler } from "./InsertionDeletionHandler.mjs";

/**
 * @param {unknown} superclass
 */
export const Draggable = (superclass) =>
  /** @extends LitElement */
  class extends InsertionDeletionHandler(superclass) {
    static properties = {
      insertAbove: { type: Boolean },
    };

    constructor() {
      super();

      /** @type {Boolean?} */
      this.insertAbove = null;
    }

    firstUpdated() {
      // @ts-ignore
      super.firstUpdated();
      this.header = /** @type {HTMLDivElement} */ (this.renderRoot.querySelector("header"));
      this.header.draggable = true;
      this.header.addEventListener("dragstart", this.onDragStart.bind(this));
      this.header.addEventListener("dragenter", this.onDragOver.bind(this));
      this.header.addEventListener("dragover", this.onDragOver.bind(this));
      this.header.addEventListener("dragleave", this.onDragLeave.bind(this));
      this.header.addEventListener("dragend", this.onDragEnd.bind(this));
      this.header.addEventListener("drop", /** @type {EventListener} */ (this.onDrop.bind(this)));
      this.addEventListener("inserttask", /** @type {EventListener} */ (this.onInsertTask.bind(this)));
      this.addEventListener("removetask", /** @type {EventListener} */ (this.onRemoveTask.bind(this)));
    }

    /** @param {Map<string, unknown>} diff */
    updated(diff) {
      super.updated(diff);
      if (diff.has("insertAbove")) {
        if (this.insertAbove === null) {
          this.header?.style.removeProperty("padding-top");
          this.header?.style.removeProperty("padding-bottom");
          this.header?.style.removeProperty("background-color");
        } else if (this.insertAbove) {
          if (this.header) this.header.style.paddingTop = "2em";
          this.header?.style.removeProperty("padding-bottom");
        } else {
          if (this.header) this.header.style.paddingBottom = "2em";
          this.header?.style.removeProperty("padding-top");
        }
      }
    }

    // /**
    //  * @param {InsertTaskEvent} e
    //  */
    // onInsertTask(e) {
    //   if (this === e.insertionTarget) return;

    //   e.stopPropagation();
    //   const taskIdToInsert = e.taskIdToInsert;
    //   const taskTarget = e.insertionTarget;
    //   const above = e.above;

    //   let insertionIndex = taskTarget.index;
    //   if (!above) insertionIndex++;
    //   this.task?.subtasks.splice(insertionIndex, 0, taskIdToInsert);

    //   this.requestUpdate();
    // }

    // /**
    //  * @param {RemoveTaskEvent} e
    //  */
    // onRemoveTask(e) {
    //   if (this === e.taskToRemove) return;

    //   e.stopPropagation();
    //   const taskToRemove = e.taskToRemove;

    //   let deletionIndex = taskToRemove.index;

    //   this.task?.subtasks.splice(deletionIndex, 1);
    // }

    /**
     * @param {DragEvent} e
     */
    onDragStart(e) {
      e.stopPropagation();
      e.dataTransfer?.setData("task", this.taskId);

      if (this.header) this.header.style.backgroundColor = "lightgreen";
      this.dispatchEvent(new RemoveTaskEvent(this));
    }

    /**
     * @param {DragEvent} e
     */
    onDragOver(e) {
      e.preventDefault();
      e.stopPropagation();

      // add padding to top or bottom
      const headerBounds = this.getBoundingClientRect();
      if (e.y < headerBounds.top + headerBounds.height / 2) {
        this.insertAbove = true;
      } else {
        this.insertAbove = false;
      }
      //
      if (this.header) this.header.style.backgroundColor = "green";
    }

    /**
     * @param {DragEvent} e
     */
    onDragLeave(e) {
      e.preventDefault();
      e.stopPropagation();
      this.insertAbove = null;
    }

    /**
     * @param {DragEvent} e
     */
    onDragEnd(e) {
      e.preventDefault();
      e.stopPropagation();
      this.insertAbove = null;
    }

    /**
     * @param {DragEvent & {dataTransfer: DataTransfer}} e
     */
    onDrop(e) {
      e.preventDefault();
      e.stopPropagation();

      const insertEvent = new InsertTaskEvent(
        /** @type {boolean} */
        (this.insertAbove),
        e.dataTransfer.getData("task"),
        /** @type {ListItem} */
        (/** @type {unknown} */ (this))
      );
      this.dispatchEvent(insertEvent);

      this.insertAbove = null;
      if (this.header) this.header.style.backgroundColor = "lightblue";
      setTimeout(() => this.header?.style.removeProperty("background-color"), 3000);
    }
  };
