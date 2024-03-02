// eslint-disable-next-line no-unused-vars
import { LitElement } from "lit";
import { ListItem } from "../ListItem.mjs";

/**
 *
 * @param {ListItem} superclass
 */
export const Draggable = (superclass) =>
  /** @extends LitElement */
  class extends superclass {
    static properties = {
      insertAbove: { type: Boolean },
    };

    constructor() {
      super();

      /** @type {Boolean?} */
      this.insertAbove = null;
    }

    firstUpdated() {
      super.firstUpdated();
      const header = this.renderRoot.querySelector("header");
      header.draggable = true;
      header.addEventListener("dragstart", this.onDragStart);
      header.addEventListener("dragenter", this.onDragOver);
      header.addEventListener("dragover", this.onDragOver);
      header.addEventListener("dragleave", this.onDragLeave);
      header.addEventListener("dragend", this.onDragEnd);
      header.addEventListener("drop", this.onDrop);
    }

    /** @param {Map<string, unknown>} diff */
    updated(diff) {
      super.updated(diff);
      if (diff.has("insertAbove")) {
        if (this.insertAbove === null) {
          this.style.removeProperty("padding-top");
          this.style.removeProperty("padding-bottom");
          this.style.removeProperty("background-color");
        } else if (this.insertAbove) {
          this.style.paddingTop = "2em";
          this.style.removeProperty("padding-bottom");
        } else {
          this.style.paddingBottom = "2em";
          this.style.removeProperty("padding-top");
        }
      }
    }

    /**
     * @param {DragEvent} e
     */
    onDragStart(e) {
      e.stopPropagation();
      e.dataTransfer?.setData("text/plain", JSON.stringify(this.task));

      this.style.backgroundColor = "lightgreen";
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
      this.style.backgroundColor = "green";
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
     * @param {DragEvent} e
     */
    onDrop(e) {
      e.preventDefault();
      e.stopPropagation();
      this.insertAbove = null;

      this.style.backgroundColor = "lightblue";
      setTimeout(() => this.style.removeProperty("background-color"), 3000);
    }
  };
