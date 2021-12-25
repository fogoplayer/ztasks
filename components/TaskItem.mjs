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


class TaskItem extends HTMLElement {
  constructor() {
    super();

    // Shadow checkbox and label
    const template = document.createElement("template");
    template.innerHTML = `    
      <link rel="stylesheet" href="/styles/components/TaskItem.css" />
      <link rel="stylesheet" href="/styles/icon-font.css" />  
      <li class="task${this.hasDueDate ? " has-due-date" : ""
      }${this.hasReminder ? " has-reminder" : ""
      }${this.isRecurring ? " is-recurring" : ""
      }${this.hasDescription ? " has-description" : ""
      }"
      >
        <div class="task-preview">
          <span class="material-icons task-drag-handle"> drag_handle </span>
          <custom-checkbox class="task-check" ${this.complete ? " checked" : ""}></custom-checkbox>
          <input type="text" class="task-name" value="${this.name}"/>
          <a class="details-link" href = "../task-details">
            <div class="chip task-data">
              <span class="material-icons notif-indicator">
                notifications_active
              </span>
              <span class="task-due-date">${this.dueDate}</span>
              <span class="material-icons recurring-indicator">cached</span>
              <span class="material-icons description-indicator">notes</span>
            </div>
            <span class="task-more material-icons">more_vert</span>
          </a >
          ${this.firstChild ? `<button class="subtasks-toggle material-icons ${this.showSubtasks ? "" : "hide"}">
          expand_less
          </button>` : ""}
        </div >
        <ul class="subtasks ${this.showSubtasks ? "" : "hide"} class">
          <slot name = "task">
        </ul >
      </li >
    `;

    // Create
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // Data binding
    this.shadowRoot.querySelector(".task-name").onchange = (e) => {
      this.setAttribute("name", e.target.value);
    };

    if (this.shadowRoot.querySelector(".subtasks-toggle")) {
      this.shadowRoot.querySelector(".subtasks-toggle").onclick = (e) => {
        this.setAttribute("show-subtasks", !this.showSubtasks);
      };
    }

    this.shadowRoot.querySelector("link").onload = () => {
      document.querySelector(".task-list").style.removeProperty("display")
      document.querySelector(".task-list.placeholder").style.display = "none";
    };
  }

  // Attributes
  static get observedAttributes() {
    return ["complete", "name", "due-date", "has-reminder", "is-recurring", "show-subtasks"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "complete": this.completeChanged(oldValue, newValue); break;
      case "name": this.parentChangedName(oldValue, newValue); break;
      case "due-date": this.dueDateChanged(oldValue, newValue); break;
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

  // Due Date
  get hasDueDate() {
    return this.hasAttribute("due-date");
  }

  get dueDate() {
    const dueDate = new Date(this.getAttribute("due-date"))
    const today = new Date(Date());
    const ONE_DAY_MS = 1000 * 60 * 60 * 24;
    const daysLeft = Math.round((dueDate - today) / ONE_DAY_MS);
    let options;

    if (daysLeft < 0) {               // Due date has passed
      return `${-daysLeft} ${daysLeft === -1 ? "day" : "days"} ago`;
    } else if (daysLeft === 0) {      // Today
      return "Today";
    } else if (daysLeft === 1) {      // Tomorrow
      return "Tomorrow";
    } else if (daysLeft < 7) {        // Day of the week if less than a week away
      options = { weekday: 'long' }
    } else if (daysLeft < 365) {      // Month and day if less than a year away
      options = { month: 'short', day: 'numeric' };
    } else {
      options = { year: "numeric", month: 'short', day: 'numeric' };
    }
    return dueDate.toLocaleDateString(undefined, options)
  }

  dueDateChanged(oldValue, newValue) {
    if (newValue !== null) {
      this.shadowRoot.querySelector(".task").classList.add("has-due-date");
      this.shadowRoot.querySelector(".task-due-date").innerText = this.dueDate;
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
    let subtasks = this.shadowRoot.querySelector(".subtasks")
    const animTime = getComputedStyle(this).getPropertyValue("--anim-time").slice(0, -1) * 1000;

    // If there aren't any subtasks, just leave
    if (!this.firstChild) {
      return
    }

    if (newValue === null) {
      this.removeAttribute("show-subtasks");
    } else if (JSON.parse(newValue)) {
      this.shadowRoot.querySelector(".subtasks-toggle").classList.remove("hide");
      this.shadowRoot.querySelector(".subtasks").classList.remove("hide");
      subtasks.style.maxHeight = subtasks.scrollHeight + "px";
      setTimeout(() => {
        subtasks.style.removeProperty("max-height");
      }, animTime)
    } else {
      this.shadowRoot.querySelector(".subtasks-toggle").classList.add("hide");
      this.shadowRoot.querySelector(".subtasks").classList.add("hide");
      subtasks.style.removeProperty("max-height");
    }
  }
}

window.customElements.define("task-item", TaskItem);