import { LitElement, html, css } from 'lit';

export class Collapsible extends LitElement {
  static get properties() {
    return {
      open: { type: Boolean, reflect: true, attribute: true },
    };
  }

  render() {
    return html`<div class="outer ${this.open ? "open" : ""}">
      <div class="inner">
        <slot></slot>
      </div>
    </div>`;
  }

  static styles = [
    css`
      .outer {
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows 0.3s ease-in-out;
      
        &.open {
          display: grid;
          grid-template-rows: 1fr;
        }
      }

      .inner {
        min-height:0;
        overflow: hidden;
      }
    `
  ];
}

customElements.define('collapsible-', Collapsible);
