import { css } from "lit";

export const styles = css`

  md-filled-button {
    --md-sys-color-primary: var(--theme-color);
    --md-sys-color-on-primary: white;
    --_disabled-container-color: lightgrey;
    --_disabled-container-opacity: 1;
  }

  md-filled-text-field {
    width: 40vw;
    background-color: var(--input-fill);
    color: #2c2c2c;
    border-radius: 4px;
    --_caret-color: #2c2c2c;
    --md-sys-color-primary: var(--theme-color);
    --md-filled-text-field-container-shape: 4px;
    --md-filled-text-field-container-color: var(--input-fill);	
    --md-filled-text-field-focus-active-indicator-color: var(--theme-color);
    --md-filled-text-field-input-text-font: var(--font-family);
    --md-filled-text-field-label-text-font: var(--font-family);
  }

  md-filled-select {
    cursor: pointer;
    background-color: var(--input-fill);
    color: #2c2c2c;
    border-radius: 4px;
    height: 3.5rem;
    align-items: center;
    padding: 0 0.5rem;
    --_caret-color: #2c2c2c;
    --md-filled-select-text-field-input-text-font: var(--font-family);
  }

  .wrap {
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 50vw;
    font-family: var(--font-family);
    height: 100%;
    gap: 1rem;
  }
  .wrap.centered {
    height: 80dvh;
  }

  .title {
    font-size: 3rem;
    font-family: var(--font-family-2);
    display: flex;
    justify-content: center;
  }

  .text-center {
    text-align: center;
  }

  .couple-circle {
    margin-bottom: 1rem;
    border-radius: 50%;
    height: 15rem;
    width: 15rem;
    background-image: url(/stare.jpg);
    background-size: cover;
    background-position: 50% 10%;
    background-repeat: no-repeat;
  }

  .guest-name {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  .location, .stay {
    cursor: pointer;
    color: var(--color-3);
  }
  .location:hover, .stay:hover {
    border-bottom: 1px solid #967bb6;
    border-color: var(--color-3);
  }

  ::selection {
    color: black;
    background: white;
  }

  @media screen and (max-width: 780px) {
    .title {
      font-size: 2rem;
    }
    .wrap {
      max-width: 80vw;
    }
    md-filled-text-field {
      width: 80vw;
    }
    .location {
      text-align: center;
    }
  }
`;
