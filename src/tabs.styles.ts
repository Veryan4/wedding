import { css } from "lit";

export const tabStyles = css`
    .material-icons {
        font-family: "Material Icons";
        font-weight: normal;
        font-style: normal;
        font-size: 24px;
        line-height: 1;
        letter-spacing: normal;
        text-transform: none;
        display: inline-block;
        white-space: nowrap;
        word-wrap: normal;
        direction: ltr;
        -webkit-font-feature-settings: "liga";
        -webkit-font-smoothing: antialiased;
    }

    .tabs {
        display: flex;
        margin-bottom: 1rem;
        gap: 3rem;
        padding-top: 2rem;
    }

    .tab {
        cursor: pointer;
        font-size: 1.5rem;
        color: var(--color-3);
    }

    .tab.selected, .tab:hover{
        border-bottom: 4px solid white;
        border-color: var(--color-3);
    }

    @media only screen and (max-width: 752px) {
        .tabs {
            gap: 1rem;
        }
        .tab {
            font-size: 1.3rem;
        }
    }
`;
