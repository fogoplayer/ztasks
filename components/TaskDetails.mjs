import "../components/Modal.mjs";
import { renderTasks } from "../scripts/task-list.mjs";

/**
 * @param name the name of the task
 * @param show-subtasks a boolean for whether or not to show the subtasks
  */


class TaskDetails extends HTMLElement {
  constructor() {
    super();

    // Shadow checkbox and label
    const template = document.createElement("template");
    template.innerHTML = `
    <link rel="stylesheet" href="../styles/icon-font.css">
    <link rel="stylesheet" href="../styles/components/TaskDetails.css">
    <section class="task-details grid">
      <span class="material-icons">event_available</span>
      <h2 class="detail-label">Due Date</h2>
      <input type="date" class="task-due-date" value="2021-09-25">
      
      <span class="material-icons">cached</span>
      <h2 class="detail-label">Repeats</h2>
      <button id="repeat-button">
        <span class="repeat-frequency">Daily</span>
      </button>
      
      <span class="material-icons"> notifications_active </span>
      <h2 class="detail-label">Reminder</h2>
      <button id="notification-button">Daily at 9:00AM</button>

      <label class="description grid">
        <span class="material-icons">notes</span>
        Description
      <textarea id="description" placeholder="Describe your task">This is going to be
  tough.</textarea>
      </label>
    </section>

    <section class="subtasks">
      <ul class="task-list" style="display: none;"></ul>
      <ul class="task-list placeholder">
        <placeholder-task></placeholder-task>
        <placeholder-task></placeholder-task>
      </ul>
    </section>
    <modal-component id="repeat-modal">This is for repeating</modal-component>
    <modal-component id="notification-modal"This is for notifications></modal-component>
    `;

    // Create
    this.appendChild(template.content.cloneNode(true));
    renderTasks(tasks, ".task-list")

    this.querySelector("#repeat-button").onclick = () => this.querySelector("#repeat-modal").setAttribute("show", "")
    this.querySelector("#notification-button").onclick = () => this.querySelector("#notification-modal").setAttribute("show", "")
  }
}

window.customElements.define("task-details", TaskDetails);