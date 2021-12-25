import "../components/CustomCheckbox.mjs";

/**
 * @param complete whether the task is completed or not
 * @param name the name of the task
 * @param due-date the due date of the task
 * @param has-reminder if the user has opted into reminder notifications
 * @param is-recurring whether or not the task is recurring
 * @param has-description whether or not the task has a description
 * @param show-subtasks a boolean for whether or not to show the subtasks
*/

class App extends HTMLElement {
  constructor() {
    super();

    this.closed = true;

    // Shadow checkbox and label
    const template = document.createElement("template");
    template.innerHTML = `
      <header class="app-header">
        <button class="nav-toggle">
          <span class="material-icons">menu</span>
        </button>
        <h1><slot name="app-header"></slot></h1>
      </header>
      <main class="app-content"><slot name="app-content"></slot></main>
      <nav id="side-menu">
        <h3>Lists</h3>
        <ul>  
          <li>List 1</li>
          <li>List 1</li>
          <li>List 1</li>
          <li>List 1</li>
          <li>List 1</li>
        </ul>
        <ul class="nav-footer">
          <li>Settings</li>
        </li>
      </nav>
      <div class="nav-scrim"></div>
      <link rel="stylesheet" href="../styles/components/App.css"/>
      <link rel="stylesheet" href="/styles/icon-font.css" />
    `;

    // Create
    this.attachShadow({ mode: "open" })
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // Publicize Styles
    let publicStyles = document.createElement("link");
    publicStyles.rel = "stylesheet";
    publicStyles.href = "../styles/components/App.css";
    this.appendChild(publicStyles)

    // Data binding
    console.log(this.shadowRoot.querySelector(".nav-toggle"));
    this.shadowRoot.querySelector(".nav-toggle").onclick = () => { this.toggleNav(this.shadowRoot) }
    this.shadowRoot.querySelector(".nav-scrim").onclick = () => { this.toggleNav(this.shadowRoot) }
  }

  toggleNav(shadowRoot) {
    this.closed = !this.closed;
    console.log(this.closed)
    if (this.closed) {
      shadowRoot.querySelector("#side-menu").classList.remove("open")
    } else {
      shadowRoot.querySelector("#side-menu").classList.add("open")
    }
  }
}

window.customElements.define("app-shell", App);