import { css } from "lit";

export const styles = css`

  .wrap {
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width:40vw;
    font-family: var(--font-family);
  }

  .section {
    cursor: pointer;
    display: flex;
    width: 24rem;
  }

  .section-text {
    padding-left: 1rem; 
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .title {
    font-size: 1.5rem;
    font-family: var(--font-family-2);
  }

  .photo {
    aspect-ratio: 1.618;
    width: 10rem;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .photo.photo-location{
    background-image: url(/location.JPG);
  }
  .photo.photo-engagement{
    background-image: url(/engagement.jpg);
  }
  .photo.photo-philippines{
    background-image: url(/philippines.jpg);
  }

  hr.separator {
    width: 32rem;
    margin: 2rem 0;
    border-color: var(--color-1);
    border-width: 1px;
    border-style: double;
  }

  ::selection {
    color: black;
    background: white;
  }

  @media screen and (max-width: 780px) {
    hr.separator {
      width: 80vw;
    }
    .photo {
      width: 8rem;
    }
    .wrap {
      max-width: 75vw;
    }
    .section {
      width: 20rem;
    }
  }
`;