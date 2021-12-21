/**
 * @param label the text to label the checkbox
 * @param name the name of the group the checkbox belongs to
 * @param checked if the checkbox should be initially checked
 */
class CustomCheckbox extends HTMLElement {
  constructor() {
    super();

    // Shadow checkbox and label
    const template = document.createElement("template");
    template.innerHTML = `
        <label>
          <div class="skew-checkbox">
            <div class="clip">
              <span class="border"></span>
              <span class="border blue"></span>
            </div>
          </div>
          ${this.getAttribute("label") || ""}
        </label>

        <link rel="stylesheet" href="/styles/components/CustomCheckbox.css"/>
      `;


    // Exposed, hidden checkbox for compatibility
    const checkbox = document.createElement("input");
    checkbox.hidden = true;
    checkbox.type = "text";
    checkbox.checked = this.checked;
    checkbox.name = this.getAttribute("name") || "";

    // Create
    this.attachShadow({ mode: "open" });

    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.appendChild(checkbox);

    this.addEventListener("click", (e) => {
      e.preventDefault();
      this.checked = !this.checked;
    });
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

window.customElements.define("custom-checkbox", CustomCheckbox);