// @ts-ignore
import { LitElement, html, css, repeat } from "../libs/lit-all@2.7.6.js";
import globalCss from "../global-styles/global.css.mjs";
import "../components/ListItem.mjs";
import { Task } from "../models/Task.mjs";

export default class Home extends LitElement {
  static get properties() {
    return {
      task: { type: Task, state: true },
    };
  }

  constructor() {
    super();
    this.task = makeTask();
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
              /** @param {Task} subtask */
              (subtask) => subtask.id,
              /**
               * @param {Task} subtask
               * @param {number} i
               */
              (subtask, i) => html`<list-item .task=${subtask} index="${i}"></list-item>`
            )
          : ""}
        <list-item .task=${new Task({})}></list-item>
      </main>`;
  }

  static styles = [globalCss, css``];
}

customElements.define("home-", Home);

let tasksMade = 0;

/**
 *
 * @returns {Task}
 */
function makeTask() {
  return new Task({
    id: (++tasksMade).toString(),
    title: tasksMade.toString(),
    description: oneIn(3) ? "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, quas." : null,
    complete: oneIn(2),
    dueDate: oneIn(7) ? new Date(Date.now() + randomInt(-10, 10) * 24 * 60 * 60 * 1000) : null,
    recurring: oneIn(3) ? "daily" : "",
    reminders: oneIn(4)
      ? new Array(randomInt(1, 5)).fill(0).map(() => new Date(Date.now() + randomInt(1, 10) * 24 * 60 * 60 * 1000))
      : [],
    subtasks: oneIn(tasksMade) ? new Array(randomInt(1, 10)).fill(0).map(makeTask) : [],
    owners: oneIn(4) ? ["Alice", "Bob", "Charlie"] : undefined,
  });
}

/**
 * Generates a random probability
 *
 * @param {number} n
 * @returns {boolean}
 */
function oneIn(n) {
  return Math.random() < 1 / n;
}

/**
 * Generates a random int in a range
 *
 * @param  {[number] | [number, number]} nums
 * @returns number
 */
function randomInt(...nums) {
  let [max, min = 0] = nums.reverse();
  return Math.floor(Math.random() * (max - min) + min);
}
