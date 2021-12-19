class CustomCheckbox extends HTMLElement {
  constructor() {
    super();

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

      <link rel="stylesheet" href="/styles/main.css"/>
      <link rel="stylesheet" href="/styles/components/CustomCheckbox.css"/>
    `;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.addEventListener('click', e => { this.checked = !this.checked })
  }

  // Attributes
  static get observedAttributes() {
    return ['checked'];
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
      this.setAttribute('checked', '');
    } else {
      this.removeAttribute('checked');
    }
  }

  checkedChanged(oldValue, newValue) {
    console.log(this.checked, oldValue, newValue);
    if (newValue !== null) {
      this.shadowRoot.querySelector(".skew-checkbox").classList.add("checked");
    } else {
      this.shadowRoot.querySelector(".skew-checkbox").classList.remove("checked");
    }
  }

}

window.customElements.define("custom-checkbox", CustomCheckbox);