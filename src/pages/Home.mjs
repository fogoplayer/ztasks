import { LitElement, html, css } from "../libs/lit-all@2.7.6.js";
import globalCss from "../global-styles/global.css.mjs";
import "../components/ListItem.mjs"

export default class Home extends LitElement {
  static get properties() {
    return {};
  }

  constructor() {
    super();
  }

  render() {
    return html`<header><h1>%project-name%</h1></header>
      <main>Welcome to my app!
        <list-item title="title" checked="${true}"><list-item>
      </main>`;
  }

  static styles = [globalCss, css``];
}

customElements.define("home-", Home);
