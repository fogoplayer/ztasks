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

class PlaceholderTask extends HTMLElement {
  constructor() {
    super();

    // Shadow checkbox and label
    const template = document.createElement("template");
    template.innerHTML = `<li class="task">
      <div class="task-preview">
        <svg
          class="material-icons task-drag-handle"
          xmlns="http://www.w3.org/2000/svg"
          enable-background="new 0 0 24 24"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#FFFFFF"
        >
          <g><rect fill="none" height="24" width="24" /></g>
          <g>
            <g>
              <g><path d="M20,9H4v2h16V9z M4,15h16v-2H4V15z" /></g>
            </g>
          </g>
        </svg>
        <span class="task-check"></span>
        <span class="placeholder-input"></span>

        <div class="chip task-data"></div>
        <svg
          class="subtasks-toggle material-icons"
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="32"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"
            fill="#FFFFFF"
          />
        </svg>
      </div>
      <ul class="subtasks">
        <li class="task">
          <div class="task-preview">
            <svg
              class="material-icons task-drag-handle"
              xmlns="http://www.w3.org/2000/svg"
              enable-background="new 0 0 24 24"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#FFFFFF"
            >
              <g><rect fill="none" height="24" width="24" /></g>
              <g>
                <g>
                  <g><path d="M20,9H4v2h16V9z M4,15h16v-2H4V15z" /></g>
                </g>
              </g>
            </svg>
            <span class="task-check"></span>
            <span class="placeholder-input"></span>

            <div class="chip task-data"></div>
            <svg
              class="subtasks-toggle material-icons"
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="32"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"
                fill="#FFFFFF"
              />
            </svg>
          </div>
          <ul class="subtasks"></ul>
        </li>
      </ul>
    </li>`
    template.innerHTML += `<style>
        * {
          overflow: hidden;
          text-overflow: ellipsis;
          box-sizing: border-box;
        }

        .task .material-icons {
          font-size: inherit;
          line-height: 1.5em;
        }

        svg {
          width: 2em;
          padding-inline: .5em
        }

        .task-preview {
          /* display */
          display: flex;
          flex-flow: row nowrap;

          /* box-model */
          padding: 0.5em;
        }

        .task-preview>* {
          flex: 0 0 auto;
        }

        .task-preview .task-check {
          display: inline-block;
          width: 1em;
          height: 1em;
          line-height: 1.5em;
          margin: 0.25em 0.5em;
          background:currentColor;
          border: 0.1em solid currentColor;
          border-radius: 0.05em;
        }

        .task-preview .placeholder-input {
          /* display */
          flex: 1 1 10ch;

          /* box-model */
          margin-inline: 0.5em;
          border-radius: 0.20em;

          /* Animated background */
          --gradient: linear-gradient(90deg, var(--background-focus) 0%, hsl(var(--accent-hue), 100%, var(--accent-lightness)); 10% ,var(--background-focus) 20%);
          background: var(--gradient);
          background-size: 200%;
          animation: loading var(--anim-time) linear infinite;
        }

        @keyframes loading {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }

        .task > .task-preview button {
          display: inline-block;
          background: transparent;
          border: none;
          padding: 0;
          color: inherit;
          font-size: inherit;
          min-width: 2em;
        }

        .task>.task-preview>.task-data {
          /* display */
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          justify-content: center;
          column-gap: 0.25em;

          /* box-model */
          background: hsl(var(--accent-hue), 100%, var(--accent-lightness));
          border-radius: 1em;
          padding: 0.25em 0.5em;
          height: 1.5em;
          min-width: 4em;

          /* typography */
          color: var(--text-accent);
        }

        .subtasks {
          padding-left: 2em;
          max-height: 400px;
          transition: max-height var(--anim-time);
        }

        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
      </style>    
    `;

    // Create
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

window.customElements.define("placeholder-task", PlaceholderTask);