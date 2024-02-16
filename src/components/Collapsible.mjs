import { LitElement, html, css } from 'lit';

export class Collapsible extends LitElement {
  static get properties() {
    return {
      open: { type: Boolean, reflect: true, attribute: true },
    };
  }

  render() {
    return html`<div class="${this.open ? "open" : ""}">
      <div>
        <slot></slot>
      </div>
    </div>`;
  }

  static styles = [
    css`
      :host > div {
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows 0.3s ease-in-out;
      }

      :host > div.open {
        display: grid;
        grid-template-rows: 1fr;
      }

      div div {
        min-height:0;
        overflow: hidden;
      }
    `
  ];
}

customElements.define('collapsible-', Collapsible);
