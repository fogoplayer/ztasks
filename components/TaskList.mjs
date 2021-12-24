import "../components/TaskItem.mjs";

/**
 * @param complete whether the task is completed or not
 * @param name the name of the task
 * @param due-date the due date of the task
 * @param has-reminder if the user has opted into reminder notifications
 * @param is-recurring whether or not the task is recurring
 * @param has-description whether or not the task has a description
 * @param show-subtasks a boolean for whether or not to show the subtasks
  */


class TaskList extends HTMLElement {
  constructor() {
    super();

    // Shadow checkbox and label
    const template = document.createElement("template");
    template.innerHTML = `<ul>
      <!--<slot name="task"></slot>-->
    </ul>
    <link rel="stylesheet" href="/styles/components/TaskList.css" />`;

    // Create

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    Array.from(this.children).forEach(task => {
      this.shadowRoot.querySelector("ul").appendChild(task);
    });

    while (this.firstChild) {
      this.removeChild(this.firstChild);
    }
  }
}

window.customElements.define("task-list", TaskList);