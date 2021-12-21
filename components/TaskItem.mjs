import "../components/CustomCheckbox.mjs";

/**
 * @param complete whether the task is completed or not
 * @param name the name of the task
 * @param due-date the due date of the task
 * @param has-reminder if the user has opted into reminder notifications
 * @param is-recurring whether or not the task is recurring
 * @param description a description of the task
 * @param show-subtasks a boolean for whether or not to show the subtasks
  */


class TaskItem extends HTMLElement {
  constructor() {
    super();

    // Shadow checkbox and label
    const template = document.createElement("template");
    template.innerHTML = `    <li class="task${this.hasDueDate ? " has-due-date" : ""
      }${this.hasDueDate ? " has-reminder" : ""
      }${this.isRecurring ? " is-recurring" : ""
      }${this.hasDescription ? "has-description" : ""
      }"
      >
        <div class="task-preview">
          <span class="material-icons task-drag-handle"> drag_handle </span>
          <custom-checkbox class="task-check" ${this.complete ? " checked" : ""
      }></custom-checkbox>
      <input type="text" class="task-name" value="${this.name}"/>
      <a class="details-link" href = "../task-details">
        <div class="chip task-data">
          <span class="material-icons notif-indicator">
            notifications_active
          </span>
          <span class="task-due-date">Tomorrow</span>
          <span class="material-icons recurring-indicator">cached</span>
          <span class="material-icons description-indicator">notes</span>
        </div>
        <button class="task-more">
          <i class="material-icons">more_vert</i>
        </button>
      </a >
    </div >
    <ul class="subtasks"></ul>
        </li >
    <link rel="stylesheet" href="/styles/components/TaskItem.css" />
    `;

    // Create
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // Data binding
    this.shadowRoot.querySelector(".task-name").onchange = (e) => {
      this.setAttribute("name", e.target.value);
    };

  }

  // Attributes
  static get observedAttributes() {
    return ["complete", "name", "has-due-date", "has-reminder", "is-recurring"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "complete":
        this.completeChanged(oldValue, newValue);
        break;

      case "name":
        this.parentChangedName(oldValue, newValue);
        break;

      case "has-due-date":
        this.hasDueDateChanged(oldValue, newValue);
        break;

      case "has-reminder":
        this.hasReminderChanged(oldValue, newValue);
        break;

      case "is-recurring":
        this.isRecurringChanged(oldValue, newValue);
        break;

      default:
        break;
    }
  }

  // Complete
  get complete() {
    return this.hasAttribute("complete");
  }

  set complete(val) {
    if (val) {
      this.setAttribute("complete", "");
    } else {
      this.removeAttribute("complete");
    }
  }

  completeChanged(oldValue, newValue) {
    if (newValue !== null) {
      this.shadowRoot.querySelector("custom-checkbox").checked = true;
    } else {
      this.shadowRoot.querySelector("custom-checkbox").checked = false;
    }
  }

  // Name
  get name() {
    return this.getAttribute("name");
  }

  set name(val) {
    this.setAttribute("name", val);
  }

  parentChangedName(oldValue, newValue) {
    this.shadowRoot.querySelector(".task-name").value = this.name;
  }

  // Has Due Date
  get hasDueDate() {
    return this.hasAttribute("has-due-date");
  }

  hasDueDateChanged(oldValue, newValue) {
    if (newValue !== null) {
      this.shadowRoot.querySelector(".task").classList.add("has-due-date");
    } else {
      this.shadowRoot.querySelector(".task").classList.remove("has-due-date");
    }
  }

  // Has Reminder
  get hasReminder() {
    return this.hasAttribute("has-reminder");
  }

  hasReminderChanged(oldValue, newValue) {
    if (newValue !== null) {
      this.shadowRoot.querySelector(".task").classList.add("has-reminder");
    } else {
      this.shadowRoot.querySelector(".task").classList.remove("has-reminder");
    }
  }

  // Is Recurring
  get isRecurring() {
    return this.hasAttribute("is-recurring");
  }

  isRecurringChanged(oldValue, newValue) {
    if (newValue !== null) {
      this.shadowRoot.querySelector(".task").classList.add("is-recurring");
    } else {
      this.shadowRoot.querySelector(".task").classList.remove("is-recurring");
    }
  }
}

window.customElements.define("task-item", TaskItem);;;