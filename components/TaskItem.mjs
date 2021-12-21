import "../components/CustomCheckbox.mjs";

class TaskItem extends HTMLElement {
  constructor() {
    super();

    // Shadow checkbox and label
    const template = document.createElement("template");
    template.innerHTML = `<li class="task 
        ${this.getAttribute("has-due-date") ? "has-due-date" : ""}
        ${this.getAttribute("has-reminder") ? "has-reminder" : ""}
        ${this.getAttribute("is-recurring") ? "is-recurring" : ""}
        ${this.getAttribute("has-description") ? "has-description" : ""}
        "
      >
        <div class="task-preview">
          <span class="material-icons task-drag-handle"> drag_handle </span>
          <custom-checkbox class="task-check"></custom-checkbox>
          <input type="text" class="task-name" />
          <a class="details-link" href="../task-details"
            ><div class="chip task-data">
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
          </a>
        </div>
        <ul class="subtasks"></ul>
      </li>
      <link rel="stylesheet" href="/styles/components/TaskItem.css" />
    `;




    // Create
    this.attachShadow({ mode: "open" });

    this.shadowRoot.appendChild(template.content.cloneNode(true));

  }

  // Attributes
  static get observedAttributes() {
    return ["checked"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "checked":
        this.checkedChanged(oldValue, newValue);
        break;

      default:
        break;
    }
  }

  // Checked
  get checked() {
    return this.hasAttribute("checked");
  }

  set checked(val) {
    if (val) {
      this.setAttribute("checked", "");
    } else {
      this.removeAttribute("checked");
    }
  }

  checkedChanged(oldValue, newValue) {
    console.log("Checked changed:", this.checked, oldValue, newValue);

    // Displayed checkbox
    if (newValue !== null) {
      this.shadowRoot.querySelector(".skew-checkbox").classList.add("checked");
    } else {
      this.shadowRoot
        .querySelector(".skew-checkbox")
        .classList.remove("checked");
    }

    // Hidden Checkbox
    this.querySelector("input").checked = (newValue !== null);
  }
}

window.customElements.define("task-item", TaskItem);