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
      <slot name="task"></slot>
    </ul>
    <link rel="stylesheet" href="/styles/components/TaskList.css" />`;

    // Create
    this.appendChild(template.content.cloneNode(true));

    // Data binding
    // this.shadowRoot.querySelector(".task-name").onchange = (e) => {
    //   this.setAttribute("name", e.target.value);
    // };
    // this.shadowRoot.querySelector(".subtasks-toggle").onclick = (e) => {
    //   this.setAttribute("show-subtasks", !this.showSubtasks);
    // };
  }

  /* // Attributes
  static get observedAttributes() {
    return ["complete", "name", "has-due-date", "has-reminder", "is-recurring", "show-subtasks"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "complete": this.completeChanged(oldValue, newValue); break;
      case "name": this.parentChangedName(oldValue, newValue); break;
      case "has-due-date": this.hasDueDateChanged(oldValue, newValue); break;
      case "has-reminder": this.hasReminderChanged(oldValue, newValue); break;
      case "is-recurring": this.isRecurringChanged(oldValue, newValue); break;
      case "has-description": this.hasDescriptionChanged(oldValue, newValue); break;
      case "show-subtasks": this.showSubtasksChanged(oldValue, newValue); break;
      default: break;
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

  // Has Description
  get hasDescription() {
    return this.hasAttribute("has-description");
  }

  hasDescriptionChanged(oldValue, newValue) {
    if (newValue !== null) {
      this.shadowRoot.querySelector(".task").classList.add("has-description");
    } else {
      this.shadowRoot.querySelector(".task").classList.remove("has-description");
    }
  }

  // Show Subtasks
  get showSubtasks() {
    return JSON.parse(this.getAttribute("show-subtasks"));
  }

  set showSubtasks(val) {
    this.setAttribute("show-subtasks", val);
  }

  showSubtasksChanged(oldValue, newValue) {
    if (newValue === null) {
      this.removeAttribute("show-subtasks");
    }
    else if (JSON.parse(newValue)) {
      this.shadowRoot.querySelector(".subtasks-toggle").classList.remove("hide");
      this.shadowRoot.querySelector(".subtasks").classList.remove("hide");
    } else {
      this.shadowRoot.querySelector(".subtasks-toggle").classList.add("hide");
      this.shadowRoot.querySelector(".subtasks").classList.add("hide");
    }
  } */
}

window.customElements.define("task-list", TaskList);