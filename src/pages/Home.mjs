// @ts-ignore
import { LitElement, html, css, repeat } from "../libs/lit-all@2.7.6.js";
import globalCss from "../global-styles/global.css.mjs";
import "../components/ListItem.mjs";
import { Task } from "../models/Task.mjs";
import * as TaskDAO from "../services/daos/TaskDAO.mjs";

export default class Home extends LitElement {
  static get properties() {
    return {
      task: { type: Task, state: true },
    };
  }

  constructor(context) {
    super();
    this.task = TaskDAO.getTaskById(context?.params?.taskId || 1);
  }

  render() {
    return html`<header>
        <custom-checkbox ?checked=${this.task?.complete} ?disabled="${!this.task?.title}"></custom-checkbox>
        <input type="text" class="task-title" value="${this.task?.title || ""}" placeholder="Create a new task" />
      </header>
      <main>
        ${this.task
          ? repeat(
              this.task.subtasks,
              /**
               * @param {string} subtask
               * @param {number} i
               */
              (subtask, i) => html`<list-item task-id="${subtask}" index="${i}"></list-item>`
            )
          : ""}
        <list-item .task=${new Task({})}></list-item>
      </main>`;
  }

  static styles = [globalCss, css``];
}

customElements.define("home-", Home);
