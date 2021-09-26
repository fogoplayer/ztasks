const template = document.createElement("template");
template.innerHTML = `
<label>
  <div class="skew-checkbox">
    <div class="clip">
      <span class="border"></span>
      <span class="border blue"></span>
    </div>
  </div>
  lorem
</label>

<link rel="stylesheet" href="/styles/main.css"/>
<style>
  .skew-checkbox {
    display: inline-block;
    width: 1em;
    height: 1em;
    position: relative;
    border-radius: 0.05em;
    overflow: hidden;
    top: 0.162em;
    --anim-time: .2s;
  }
  .skew-checkbox .clip {
    display: flex;
    justify-content: flex-end;
    position: absolute;
    width: 1.1em;
    height: 1em;
    top: 0;
    right: 0;
    overflow: hidden;
    transform-origin: top right;
    transition: transform var(--anim-time, 0.25s) ease-in-out;
  }
  .skew-checkbox .clip .border {
    position: absolute;
    bottom: 0;
    width: 1em;
    height: 1em;
    border: 0.1em solid darkgray;
    border-radius: 0.05em;
    transform-origin: top right;
    transition: transform var(--anim-time, 0.25s) ease-in-out, opacity var(--anim-time, 0.25s) ease-in-out;
  }
  .skew-checkbox .clip .border.blue {
    border: 0.11em solid #9ff;
    opacity: 0;
  }
  .skew-checkbox.checked .clip {
    transform: translate(-0.185em, 0.04em) rotate(-45deg) skew(15deg, 15deg) scale(1.2);
  }
  .skew-checkbox.checked .clip .border {
    transform: skew(-28deg, -28deg) translate(0.1em, calc(-100% + 0.1em));
  }
  .skew-checkbox.checked .clip .border.blue {
    opacity: 1;
  }
</style>`;

class CustomCheckbox extends HTMLElement {
  constructor() {
    super();
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