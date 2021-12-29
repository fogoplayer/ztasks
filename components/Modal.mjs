
/**
 * @param show a boolean for whether or not to show the modal
  */
class Modal extends HTMLElement {
  constructor() {
    super();

    // Shadow checkbox and label
    const template = document.createElement("template");
    template.innerHTML = `
      <link rel="stylesheet" href="/styles/components/Modal.css" />
      <div class="scrim hide"></div>
      <section class="modal hide">
      ${this.children}
        <slot name="modal-content"></slot>
        <footer class="modal-footer">
          <slot name="modal-btn"></slot>
          <button id="close">Close</button>
        </footer>
      </section>
    `;

    // Create
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // Close modal
    this.shadowRoot.querySelector(".scrim").onclick = this.toggleShow.bind(this);
    this.shadowRoot.querySelector("#close").onclick = this.toggleShow.bind(this);
  }

  // Attributes
  static get observedAttributes() {
    return ["show"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "show": this.showChanged(oldValue, newValue); break;
      default: break;
    }
  }

  // Show Subtasks
  get show() {
    return this.hasAttribute("show")
  }

  set show(val) {
    if (newValue === null)
      this.removeAttribute("show")
    else
      this.setAttribute("show", "");
  }

  showChanged(oldValue, newValue) {
    if (newValue === null) {
      this.shadowRoot.querySelector(".scrim").classList.add("hide");
      this.shadowRoot.querySelector(".modal").classList.add("hide");
    } else {
      this.shadowRoot.querySelector(".scrim").classList.remove("hide");
      this.shadowRoot.querySelector(".modal").classList.remove("hide");
    }
  }

  toggleShow() {
    console.log("show");
    this.toggleAttribute("show")
  }
}

window.customElements.define("modal-component", Modal);