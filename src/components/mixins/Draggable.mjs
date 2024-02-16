import { ListItem } from "../ListItem.mjs";

/**
 *
 * @param {ListItem} superclass
 */
export const Draggable = (superclass) =>
  class extends superclass {
    constructor() {
      super();
      this.draggable = true;
      this.addEventListener("dragstart", this.onDragStart);
      this.addEventListener("dragenter", this.onDragOver);
      this.addEventListener("dragover", this.onDragOver);
      this.addEventListener("dragleave", this.onDragLeave);
      this.addEventListener("dragend", this.onDragEnd);
      this.addEventListener("drop", this.onDrop);
    }

    /**
     * @this {ListItem}
     * @param {DragEvent} e
     */
    onDragStart(e) {
      e.stopPropagation();
      // e.dataTransfer.setData('text/plain', JSON.stringify(this.task));
      //
      this.style.backgroundColor = "lightgreen";
    }

    /**
     * @this {ListItem}
     * @param {DragEvent} e
     */
    onDragOver(e) {
      e.preventDefault();
      e.stopPropagation();
      const headerBounds = this.header.getBoundingClientRect();
      if (e.y < headerBounds.top + headerBounds.height / 2) {
        this.style.paddingTop = "2em";
        this.style.removeProperty("padding-bottom");
      } else {
        this.style.paddingBottom = "2em";
        this.style.removeProperty("padding-top");
      }
      //
      this.style.backgroundColor = "green";
    }

    /**
     * @this {ListItem}
     * @param {DragEvent} e
     */
    onDragLeave(e) {
      e.preventDefault();
      e.stopPropagation();
      this.style.removeProperty("padding-top");
      this.style.removeProperty("padding-bottom");
      //
      this.style.removeProperty("background-color");
    }

    /**
     * @this {ListItem}
     * @param {DragEvent} e
     */
    onDragEnd(e) {
      e.preventDefault();
      e.stopPropagation();
      this.style.removeProperty("background-color");
    }

    /**
     * @this {ListItem}
     * @param {DragEvent} e
     */
    onDrop(e) {
      e.preventDefault();
      e.stopPropagation();
      this.style.backgroundColor = "lightblue";
      setTimeout(() => this.style.removeProperty("background-color"), 3000);
      this.onDragLeave(e);
    }
  };
