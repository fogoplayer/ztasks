import { LitElement, html, css } from "../libs/lit-all@2.7.6.js";
import globalCss from "../global-styles/global.css.mjs";
import "../components/ListItem.mjs";
import Task from "../models/Task.mjs";

export default class Home extends LitElement {
  static get properties() {
    return {
      task: { type: Task, state: true },
    };
  }

  constructor() {
    super();
    this.task = makeTask();
    console.log(JSON.stringify(this.task, null, 2));
  }

  render() {
    return html`<header><h1>%project-name%</h1></header>
      <main>Welcome to my app!
        <list-item title="title" checked="${true}"><list-item>
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
    description: oneIn(10) ? "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, quas." : undefined,
    complete: oneIn(2),
    dueDate: new Date(Date.now() + randomInt(-10, 10) * 24 * 60 * 60 * 1000),
    subtasks: oneIn(tasksMade) ? new Array(randomInt(1, 10)).fill(0).map(makeTask) : [],
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
