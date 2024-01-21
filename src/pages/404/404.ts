import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("not-found")
class NotFound extends LitElement {
  static styles = [
    css`
      .full-height {
        height: 100dvh;
      }
      .flex-center {
        align-items: center;
        display: flex;
        justify-content: center;
      }
      .position-ref {
        position: relative;
      }
      .code {
        border-right: 2px solid;
        font-size: 26px;
        padding: 0 10px 0 15px;
        text-align: center;
        color: var(--color-2);
      }
      .message {
        font-size: 18px;
        text-align: center;
        padding: 10px;
        color: var(--color-2);
      }
    `,
  ];

  render() {
    return html`
      <div class="flex-center position-ref full-height">
        <div class="code">404</div>
        <div class="message">Not Found</div>
      </div>
    `;
  }
}
