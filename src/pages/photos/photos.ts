import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { styles } from "./photos.styles";
import { TranslationController } from "@veryan/lit-spa";

@customElement("wedding-photos")
class PhotosComponent extends LitElement {
  static styles = [styles];
  
  private i18n = new TranslationController(this);

  constructor() {
    super();
  }

  render() {
    return html`
      <div class="wrap">
          <div class="section" @click=${() => window.open('https://drive.google.com/drive/folders/1r5KizZZOiUM1WEcNELbwhR_Df9K2KZDr?usp=sharing','_blank')}>
            <div class="photo photo-location"></div>
            <div  class="section-text">
              <div class="title">${this.i18n.t('photos.location.title')}</div>
            </div>
          </div>
          <hr class="separator" />
          <div class="section" @click=${() => window.open('https://drive.google.com/drive/folders/103Tlk0PDw11nXVW9twWcPPgD4BaVhg5N?usp=sharing','_blank')}>
            <div class="photo photo-engagement"></div>
            <div  class="section-text">
              <div class="title">${this.i18n.t('photos.engagement.title')}</div>
              <div class="date">${this.i18n.t('photos.engagement.date')}</div>
            </div>
          </div>
          <hr class="separator" />
          <div class="section" @click=${() => window.open('https://drive.google.com/drive/folders/1G4aN1Eb-VFE63TnURULtBTvIVr0-dhaF?usp=sharing','_blank')}>
            <div class="photo photo-philippines"></div>
            <div  class="section-text">
              <div class="title">${this.i18n.t('photos.philippines.title')}</div>
              <div class="date">${this.i18n.t('photos.philippines.date')}</div>
            </div>
          </div>
      </div>
    `;
  }

}
