import "../components/CustomCheckbox.mjs";

/**
 * @param complete whether the task is completed or not
 * @param name the name of the task
 * @param due-date the due date of the task
 * @param has-reminder if the user has opted into reminder notifications
 * @param is-recurring whether or not the task is recurring
 * @param has-description whether or not the task has a description
 * @param show-subtasks a boolean for whether or not to show the subtasks
*/

class PlaceholderTask extends HTMLElement {
  constructor() {
    super();

    // Shadow checkbox and label
    const template = document.createElement("template");
    template.innerHTML = `    
    `;

    // Create
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

window.customElements.define("placeholder-task", PlaceholderTask);