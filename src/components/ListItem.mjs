import { LitElement, html, css } from "lit";
import Task from "../models/Task.mjs";

export class ListItem extends LitElement {
  /** @type {Task?} */
  task = null;

  static properties = {
    task: { reflect: true, type: Object, attribute: true },
    open: { state: true, type: Boolean },
  };

  constructor() {
    super();
    this.open = true;
  }

  static styles = css``;

  render() {
    return html`<details ?open="${this.open}">
      <summary>
        <button class="toggle-subtasks"></button>
        <span class="drag-handle"></span>
        <input type="checkbox" ?checked=${this.task?.complete} />
        <input type="text" class="task-title" value="${this.task?.title}" />
        <a href="" class="details-link"></a>
      </summary>
      <ul class="subtasks">
        ${this.task?.subtasks.map((subtask) => html`<list-item .task=${subtask}></list-item>`)}
      </ul>
    </details>`;
  }

  updated() {
    console.log(this.task);
  }
}

customElements.define("list-item", ListItem);
