import styled from 'styled-components';

export const Main = styled.main`
  display: grid;
  justify-content: center;
  align-content: center;
  grid-gap: 0.75em;

  height: calc(100% - ${({ theme }) => theme.mobileHeaderHeight});

  > * {
    margin-inline: auto;
  }

  div {
    border: 2px solid ${({ theme }) => theme.danger};
    border-radius: 16px;
    padding-inline: 8px;
  }

  h1,
  h2 {
    font-size: 1.7rem;
    font-weight: 600;
    text-align: center;
  }

  h3,
  h4 {
    font-size: 1.25rem;
    font-weight: 500;
  }

  p {
    font-size: 0.875rem;
  }

  a,
  button {
    text-size-adjust: 100%;
    font-size: 0.8rem;
    text-align: center;
    outline: none;
    background: rgb(33, 37, 41);
    font-weight: 700;
    color: rgb(255, 255, 255);
    border-radius: 100px;
    padding: 10px 40px;
    cursor: pointer;
    margin-block: 8px;
    margin-inline: 50%;
    transform: translateX(-50%);
    width: max-content;
  }

  pre {
    font-size: 0.8rem;
    white-space: pre-wrap;
  }

  details {
    margin-top: 8px;
    cursor: pointer;
  }

  @media only screen and (min-width: 380px) {
    font-size: 1rem;
    grid-gap: 1.4em;

    h1,
    h2 {
      font-size: 2rem;
    }
  }

  @media only screen and (max-height: 420px) and (orientation: landscape) {
    grid-gap: 0.7em;
    font-size: 0.8rem;
    h1,
    h2 {
      font-size: 1.5rem;
    }

    h3,
    h4 {
      font-size: 1.125rem;
    }

    p {
      font-size: 0.825rem;
    }

    a,
    button {
      font-size: 0.8rem;
      padding: 5px 20px;
    }

    pre {
      font-size: 0.75rem;
    }
  }

  @media only screen and (min-width: 768px) {
    max-height: calc(100% - ${({ theme }) => theme.headerHeight});
  }
`;

export const ImgWrapper = styled.div`
  max-width: 135px;
`;
