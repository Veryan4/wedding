import { css } from "lit";

export const styles = css`

  .wrap {
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width:40vw;
    font-family: var(--font-family);
    height: 100%;
    padding: 4rem;
  }

  .warning {
    font-style: italic;
    margin: 3rem;
  }

  .title{
    font-size: 1.5rem;
    font-family: var(--font-family-2);
    color: var(--color-2);
  }

  hr.separator {
    width: 12rem;
    margin: 2rem 0;
    border-color: var(--color-1);
    border-width: 0.25rem;
    border-style: double;
  }

  ::selection {
    color: black;
    background: white;
  }

  @media screen and (max-width: 780px) {
    .wrap {
      max-width: 80vw;
      padding: 0;
    }
  }
`;
