import { LitElement, html, css } from "lit";

class CustomCheckbox extends LitElement {
  static properties = {
    name: { reflect: true, type: String, attribute: true },
    checked: { reflect: true, type: Boolean, attribute: true },
    disabled: { reflect: true, type: Boolean, attribute: true },
  };

  constructor() {
    super();
    this.name = "";
    this.checked = false;
    this.disabled = false;
  }

  render() {
    return html`<div
        class="skew-checkbox${this.checked ? " checked" : ""}"
        @click="${() => {
          if (!this.disabled) this.checked = !this.checked;
        }}"
      >
        <div class="clip">
          <span class="border"></span>
          <span class="border blue"></span>
        </div>
      </div>
      <input type="checkbox" name="${this.name}" hidden ?disabled="${this.disabled}" />`;
  }

  // constructor() {
  //   const checkbox = document.createElement("input");
  //   checkbox.hidden = true;
  //   checkbox.type = "text";
  //   checkbox.checked = this.checked;
  //   checkbox.name = this.getAttribute("name") || "";
  // }

  static styles = css`
    * {
      box-sizing: border-box;
    }

    :host {
      cursor: pointer;
    }

    .skew-checkbox {
      display: inline-block;
      position: relative;
      top: 0.162em;
      width: 1em;
      height: 1em;
      border-radius: 0.05em;
      overflow: hidden;
    }
    .skew-checkbox .clip {
      display: flex;
      justify-content: flex-end;
      position: absolute;
      top: 0;
      right: 0;
      width: 1.1em;
      height: 1em;
      overflow: hidden;
      transform-origin: top right;
      transition: transform var(--anim-time, 0.25s) ease-in-out;
    }
    .skew-checkbox .clip .border {
      position: absolute;
      bottom: 0;
      width: 1em;
      height: 1em;
      border: 0.1em solid currentColor;
      border-radius: 0.05em;
      transform-origin: top right;
      transition:
        transform var(--anim-time, 0.25s) ease-in-out,
        opacity var(--anim-time, 0.25s) ease-in-out;
    }
    .skew-checkbox .clip .border.blue {
      border: 0.11em solid hsl(var(--accent-hue, 0), 100%, var(--accent-lightness, 0));
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
  `;
}

window.customElements.define("custom-checkbox", CustomCheckbox);
