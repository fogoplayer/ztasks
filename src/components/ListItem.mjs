import { LitElement, html, css } from "lit";

export class ListItem extends LitElement {
    static properties = {
        title: { reflect: true, type: String, attribute: true },
        subtasks: { reflect: true, type: Array, attribute: true },
        checked: { reflect: true, type: Boolean, attribute: true }
    };

    static styles = css``;

    render() {
        return html`<details>
            <summary>
                <button class="toggle-subtasks"></button>
                <span class="drag-handle"></span>
                <input type="checkbox" ?checked=${this.checked} />
                <input type="text" class="task-title" value="${this.title}">
                <a href="" class="details-link"></a>
            </summary>
            <ul class="subtasks">subtasks</ul>
        </details>`;
    }
}

customElements.define('list-item', ListItem);
