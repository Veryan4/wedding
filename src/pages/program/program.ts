import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { styles } from "./program.styles";
import { TranslationController } from "@veryan/lit-spa";

@customElement("wedding-program")
class ProgramComponent extends LitElement {
  static styles = [styles];

  private i18n = new TranslationController(this);
  private numberOfSteps = 6;

  constructor() {
    super();
  }

  render() {
    const programSteps = Array.from(Array(this.numberOfSteps).keys()).map(i => i+1);
    return html`
      <div class="wrap">
        <div class="logo" title="Veryan and Kaye"></div>
        ${programSteps.map(((n) => html`
          <div class="title">${this.i18n.t('program.' + n + '.title')}</div>
          <div class="date">${this.i18n.t('program.' + n + '.time')}</div>
          ${n !== programSteps.length ? html`<hr class="separator" />` : ''}
        `))}
      </div>
    `;
  }

}
