import { LitElement, html, css, PropertyValueMap } from "lit";
import { customElement } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { classMap } from "lit-html/directives/class-map.js";
import {
  RouteController,
  TranslationController,
  routerService,
  translateService,
} from "@veryan/lit-spa";
import { routes } from "./app.routes";
import { tabStyles } from "./tabs.styles";
import { Tab } from "./models";

@customElement("my-wedding")
class Wedding extends LitElement {
  static styles = [
    css`
      .main {
        height: 100dvh;
        width: 100vw;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0;
      }
      .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-y: scroll;
        height: 100%;
        width: 100%;
        padding: 2rem 0;
      }
      .centered {
        justify-content: center;
      }
      @media only screen and (max-width: 752px) {
        .centered {
          justify-content: start;
        }
      }
      @media screen and (min-width: 780px) {
        ::-webkit-scrollbar {
          background-color: var(--secondary-background-color);
          width: 16px;
        }
        ::-webkit-scrollbar-track {
          background-color: var(--secondary-background-color);
        }
        ::-webkit-scrollbar-thumb {
          background-color: var(--color-1);
          border-radius: 16px;
          border: 4px solid var(--secondary-background-color);
        }
        ::-webkit-scrollbar-button {
          display: none;
        }
      }
    `,
    tabStyles
  ];

  private router = new RouteController(this, routes);
  private i18n = new TranslationController(this);

  constructor() {
    super();
    const urlSearchParams = new URLSearchParams(location.search);
    const lang = urlSearchParams.get("lang");
    if (lang) {
      translateService.useLanguage(lang);
    } else {
      translateService.useLanguage("en");
    }
  }

  render() {
    return html`
      <div class="main">
        <div class="tabs" style=${styleMap({
            display: this.router.activeRoute?.name == "rsvp" ? "none" : "flex",
          })}>
        <div
          class="tab ${classMap({selected: this.router.activeRoute?.name == Tab.home || this.router.activeRoute?.name == "rsvp"})}"
          @click=${() => this.toggleTab(Tab.home)}
        >
          ${this.i18n.t("tabs.wedding")}
        </div>
        <div
          class="tab ${classMap({selected: this.router.activeRoute?.name == Tab.program})}"
          @click=${() => this.toggleTab(Tab.program)}
        >
          ${this.i18n.t("tabs.program")}
        </div>
        <div
          class="tab ${classMap({selected: this.router.activeRoute?.name == Tab.photos})}"
          @click=${() => this.toggleTab(Tab.photos)}
        >
          ${this.i18n.t("tabs.photos")}
        </div>
      </div>
        <div
          class="content ${classMap({
            centered: this.router.activeRoute?.name != "rsvp",
          })}"
        >
          ${this.router.navigation()}
        </div>
      </div>
    `;
  }

  protected shouldUpdate(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): boolean {
    return this.i18n.hasLoadedTranslations;
  }

  toggleTab(tab: Tab) {
    if (this.router.activeRoute?.name !== tab) {
      routerService.navigate(tab);
      this.requestUpdate();
    }
  }
}
