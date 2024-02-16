import { LitElement, html, css } from "lit";
import Task from "../models/Task.mjs";
import globalCss from "../global-styles/global.css.mjs";
import "./Collapsible.mjs"
import { Draggable } from "./mixins/Draggable.mjs";

export class ListItem extends Draggable(LitElement) {
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

  render() {
    return html`<section class="${this.open? "open" : ""}">
      <header>
        <span class="drag-handle material-symbols">drag_handle</span>
        ${this.task?.subtasks.length ? html`<button class="toggle-subtasks" @click=${() => (this.open = !this.open)}>
          <span class="material-symbols"> chevron_right </span>
        </button>` : html`<span></span>`}
        <input type="checkbox" ?checked=${this.task?.complete} />

        <input type="text" class="task-title" value="${this.task?.title}" />
        
        <a href="" class="details-link">
          ${this.task?.description || this.task?.dueDate || this.task?.reminders.length || (this.task?.owners.length && this.task.owners.length > 1) 
            ? html`<span class="chip">
                ${this.task?.dueDate ? html`<span>${this.task?.dueDate.toLocaleDateString()}</span>` : ""}
                ${this.task?.reminders.length ? html`<span class="material-symbols">notifications</span>` : ""}
                ${this.task?.recurring ? html`<span class="material-symbols">cached</span>` : ""}
                ${this.task?.description ? html`<span class="material-symbols">notes</span>` : ""}
                ${this.task?.owners.length > 1 ? html`<span class="material-symbols">group</span>` : ""}
              </span> `
            : html`<span class="material-symbols">more_vert</span>`

          }
        </a>
      </header>
      <collapsible- class="subtasks" ?open="${this.open}">
        <ul class="subtasks unstyled-ul">
          ${this.task?.subtasks.map((subtask) => html`<list-item .task=${subtask}></list-item>`)}
        </ul>
      </collapsible->
    </section>`;
  }

  static styles = [
    globalCss,
    css`
      section {
        display: grid;
        grid-template-columns: repeat(3, 1em) 1fr auto;
        grid-template-rows: auto auto;
        column-gap: var(--task-spacing);
      }

      header {
        display: grid;
        grid-column: 1/-1;
        grid-template-columns: subgrid;

        padding: calc(var(--task-spacing) / 2);

        list-style: none;

        .toggle-subtasks {
          cursor: pointer;
          transition: rotate var(--collapsible-timing) ease-in-out;

          .open & {
            rotate: 90deg;
          }
        }
      }

      .subtasks {
        display: grid;
        grid-column: 2/-1;
      }
    `,
  ];
}

customElements.define("list-item", ListItem);
