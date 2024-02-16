/**
 * 
 * @param {LitElement} superclass 
 */
export const Draggable = (superclass) => class extends superclass {
  constructor() {
    super();
    this.draggable = true;
    this.addEventListener('dragstart', this.onDragStart);
    this.addEventListener("dragenter", this.onDragOver);
    this.addEventListener("dragover", this.onDragOver);
    this.addEventListener('dragleave', this.onDragLeave);
    this.addEventListener('dragend', this.onDragEnd);
    this.addEventListener('drop', this.onDrop);
  }

  /**
   * 
   * @param {DragEvent} e 
   */
  onDragStart(e) {
    e.stopPropagation(); 
    this.style.backgroundColor = 'lightgreen'
  }

  /**
   * 
   * @param {DragEvent} e 
   */
  onDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    this.style.backgroundColor = "green";
  }

  /**
   * 
   * @param {DragEvent} e 
   */
  onDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    this.style.removeProperty("background-color")
  }

  /**
   * 
   * @param {DragEvent} e 
   */
  onDragEnd(e) {
    e.preventDefault();
    e.stopPropagation();
    this.style.removeProperty("background-color")
  }

  /**
   * 
   * @param {DragEvent} e 
   */
  onDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    this.style.backgroundColor = "lightblue";
    setTimeout(()=>this.style.removeProperty("background-color"), 3000);
  }
}