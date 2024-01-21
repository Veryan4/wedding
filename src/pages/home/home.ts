import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { TranslationController, routerService } from "@veryan/lit-spa";
import { MdFilledSelect } from "@material/web/select/filled-select";
import { formService } from "../../services/form.service";
import { guestService } from "../../services/guest.service";
import { Guest } from "../../models/guest.model";
import { styles } from "./home.styles";

import "@material/web/textfield/filled-text-field";
import "@material/web/button/filled-button";
import "@material/web/select/filled-select";
import "@material/web/select/select-option";

@customElement("wedding-home")
class HomeComponent extends LitElement {
  static styles = [styles];

  private i18n = new TranslationController(this);

  @state()
  isFormValid = false;

  @state()
  isLoading = true;

  @state()
  guest?: Guest;

  numbersOfInvites: number[] = [];
  selectedNumber = 0;
  isInvitesEnabled = true;

  constructor() {
    super();
    const urlSearchParams = new URLSearchParams(location.search);
    const email = urlSearchParams.get("email");
    if (email) {
      guestService.getGuest(decodeURIComponent(email)).then((guest) => {
        if (guest) {
          if (guest.maxInvites) {
            this.isInvitesEnabled = guest.maxInvites > 1;
            this.numbersOfInvites = [
              ...[...Array(guest.maxInvites).keys()].map((i) => i + 1),
            ];
            this.selectedNumber = guest.maxInvites;
          }
          this.guest = guest;
          this.isLoading = false;
          setTimeout(() => this.checkFormValidity());
        }
      });
    } else {
      this.isLoading = false;
    }
  }

  render() {
    if (this.isLoading) {
      return html` <div class="wrap centered">
        <lit-spa-loader></lit-spa-loader>
      </div>`;
    }
    return this.guest
      ? this.renderRSVP()
      : html`
          <div class="wrap">
            <div alt="Couple" class="couple-circle"></div>
            <div class="title">${this.i18n.t("wedding.title")}</div>
            <div class="date">${this.i18n.t("wedding.time")}</div>
            <div
              class="location"
              @click=${() =>
                window.open(
                  "https://maps.app.goo.gl/iYPxwoSHX8qz68Lb6",
                  "_blank"
                )}
            >
              ${this.i18n.t("wedding.address")}
            </div>
            ${this.i18n.language == "en"
              ? html`<div
                  class="stay"
                  @click=${() =>
                    window.open(
                      "https://www.google.com/search?q=places+to+stay+near+J2K+3G8",
                      "_blank"
                    )}
                >
                  ${this.i18n.t("wedding.stay")}
                </div>`
              : ""}
          </div>
        `;
  }

  renderRSVP() {
    if (!this.guest) {
      return html`<div class="wrap">
        <div class="description">${this.i18n.t("rsvp.error")}</div>
      </div>`;
    }
    return this.guest.hasRegistered
      ? html`<div class="wrap centered">
          <div class="title">${this.i18n.t("rsvp.completed.title")}</div>
          <div class="description">
            ${this.i18n.t("rsvp.completed.description")}
          </div>
          <md-filled-button @click=${this.toHomePage}
            >${this.i18n.t("rsvp.completed.button")}</md-filled-button
          >
        </div>`
      : html`
          <div class="wrap">
            <div class="title">${this.i18n.t("rsvp.title")}</div>
            <div class="description">
              ${this.i18n.t("rsvp.description", { name: this.guest.name })}
            </div>
            ${this.guest.maxInvites && this.isInvitesEnabled
              ? html`
                  <div class="label">${this.i18n.t("rsvp.label.guests")}</div>
                  <div class="guest-name">
                    <div class="label">
                      ${this.i18n.t("rsvp.label.numbersOfInvites")}
                    </div>
                    <md-filled-select
                      name="numbersOfInvites"
                      @closed=${this.inviteNumberSelected}
                      required
                    >
                      <md-select-option selected value="${this.selectedNumber}">
                        <div slot="headline">${this.selectedNumber}</div>
                      </md-select-option>
                      ${this.numbersOfInvites.map((i) =>
                        i != this.selectedNumber
                          ? html`
                              <md-select-option value="${i}">
                                <div slot="headline">${i}</div>
                              </md-select-option>
                            `
                          : ""
                      )}
                    </md-filled-select>
                  </div>
                  ${[...Array(this.selectedNumber).keys()].map(
                    (i) => html`
                      <div class="guest-name">
                        <div class="label">${i + 1}.</div>
                        <md-filled-text-field
                          label="${this.i18n.t("rsvp.name")}"
                          id="name-${i + 1}"
                          type="text"
                          name="guest-${i}"
                          value=${this.guest!.invites[i]}
                          required
                          ?error=${!this.guest?.invites?.[i]?.trim()}
                          error-text="${this.i18n.t("rsvp.name.error")}"
                          @input=${(el: any) => {
                            this.guest!.invites![i] = el.target.value;
                            this.checkFormValidity();
                            this.requestUpdate();
                          }}
                        ></md-filled-text-field>
                      </div>
                    `
                  )}
                `
              : ""}
            <div class="label">${this.i18n.t("rsvp.label.diet")}</div>
            <md-filled-text-field
              name="diet"
              type="textarea"
              rows="3"
              value=${this.guest.diet}
            >
            </md-filled-text-field>
            <md-filled-button
              ?disabled=${!this.isFormValid}
              @click=${this.submitRSVP}
              >${this.i18n.t("rsvp.button")}</md-filled-button
            >
          </div>
        `;
  }

  inviteNumberSelected() {
    const field = this.shadowRoot?.querySelector(
      "md-filled-select"
    ) as MdFilledSelect;
    this.selectedNumber = Number(field.value);
    this.requestUpdate();
    setTimeout(() => this.checkFormValidity());
  }

  checkFormValidity() {
    this.isFormValid = formService.checkFormValidity(this.shadowRoot!);
  }

  collectFormData(): Record<string, any> {
    if (this.isFormValid) {
      return formService.collectFormData(this.shadowRoot!);
    }
    return {};
  }

  submitRSVP(): void {
    this.checkFormValidity();
    if (!this.isFormValid || !this.guest) {
      return;
    }
    const formData = this.collectFormData();
    const invites: string[] = [];
    Object.entries(formData).forEach(([key, val]) => {
      if (key.includes("guest")) {
        invites.push(val);
      }
    });
    const guest = {
      ...this.guest,
      diet: formData.diet,
      invites,
      hasRegistered: true,
    };
    guestService.setGuest(guest).then(() => {
      this.guest = guest;
    });
  }

  toHomePage() {
    routerService.navigate("home");
    this.guest = undefined;
  }
}
