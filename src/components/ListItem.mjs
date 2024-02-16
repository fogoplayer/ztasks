import { LitElement, html, css } from "lit";
import Task from "../models/Task.mjs";
import globalCss from "../global-styles/global.css.mjs";
import "./Collapsible.mjs"

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

  render() {
    return html`<section class="${this.open? "open" : ""}">
      <header>
        <button class="toggle-subtasks" @click=${() => (this.open = !this.open)}>
          <span class="material-symbols"> chevron_right </span>
        </button>
        <span class="drag-handle"></span>
        <input type="checkbox" ?checked=${this.task?.complete} />
        <input type="text" class="task-title" value="${this.task?.title}" />
        <a href="" class="details-link"></a>
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
        grid-template-columns: auto auto auto 1fr auto;
        grid-template-rows: auto auto;
      }

      header {
        display: grid;
        grid-column: 1/-1;
        grid-template-columns: subgrid;

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
