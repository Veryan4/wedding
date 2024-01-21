import { Route } from "@veryan/lit-spa";
import { html } from "lit";


export const routes: Route[] = [
    {
      name: "home",
      pattern: ["", "home", "wedding"],
      component: () =>
        import("./pages/home/home").then(() => html`<wedding-home></wedding-home>`),
    },
    {
      name: "rsvp",
      pattern: ["rsvp"],
      component: () =>
        import("./pages/home/home").then(() => html`<wedding-home></wedding-home>`),
    },
    {
      name: "program",
      pattern: "program",
      component: () =>
        import("./pages/program/program").then(() => html`<wedding-program></wedding-program>`),
    },
    {
      name: "photos",
      pattern: "photos",
      component: () =>
        import("./pages/photos/photos").then(() => html`<wedding-photos></wedding-photos>`),
    },
    {
      name: "not-found",
      pattern: "*",
      component: () =>
        import("./pages/404/404").then(() => html`<not-found></not-found>`),
    },
  ];