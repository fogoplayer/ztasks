import "../components/CustomCheckbox.mjs";

/**
 * @param name the name of the task
 * @param show-subtasks a boolean for whether or not to show the subtasks
  */


class TitleTask extends HTMLElement {
  constructor() {
    super();

    // Shadow checkbox and label
    const template = document.createElement("template");
    template.innerHTML = `
      <link rel="stylesheet" href="/styles/components/TaskItem.css" />
      <link rel="stylesheet" href="/styles/icon-font.css" />
      <li class="task title">
        <div class="task-preview">
          <span class="material-icons task-drag-handle"> drag_handle </span>
          <h2 class="task-name" contenteditable>${this.name}</h2>
          <a class="details-link" href = "../task-details">
            <span class="task-more material-icons">more_vert</span>
          </a >
          <button class="subtasks-toggle material-icons ${this.showSubtasks ? "" : "hide"}">
            expand_less
          </button>
        </div >
        <ul class="subtasks ${this.showSubtasks ? "" : "hide"}">
          <slot name = "task">
        </ul >
      </li >
    `;

    // Create
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // Data binding
    this.shadowRoot.querySelector(".task-name").addEventListener("input", (e) => {
      this.setAttribute("name", this.shadowRoot.querySelector(".task-name").innerText);
    });

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

  connectedCallback() {
    console.log("Connected");
    this.showSubtasks = this.showSubtasks
  }

  // Attributes
  static get observedAttributes() {
    return ["name", "show-subtasks"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "name": this.parentChangedName(oldValue, newValue); break;
      case "show-subtasks": this.showSubtasksChanged(oldValue, newValue); break;
      default: break;
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
    this.shadowRoot.querySelector(".task-name").innerText = this.name;
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
      return;
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

window.customElements.define("title-task", TitleTask);