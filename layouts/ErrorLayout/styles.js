import styled from "styled-components";

export const Main = styled.main`
  display: grid;
  justify-content: center;
  align-content: center;
  grid-gap: 0.75em;

  height: calc(100% - 56px);

  text-align: center;

  > * {
    margin-inline: auto;
  }

  > h1 {
    font-size: 1.7rem;
    font-weight: 600;
  }

  > a {
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
  }

  @media only screen and (min-width: 380px) {
    font-size: 1rem;
    grid-gap: 1.4em;

    > h1 {
      font-size: 2rem;
    }
  }

  @media only screen and (max-height: 420px) and (orientation: landscape) {
    grid-gap: 0.7em;
    font-size: 0.8rem;
    > h1 {
      font-size: 1.5rem;
    }

    > a {
      font-size: 0.8rem;
      padding: 5px 20px;
    }
  }

  @media only screen and (min-width: 768px) {
    max-height: calc(100% - 64px);
  }
`;

export const ImgWrapper = styled.div`
  max-width: 135px;
`;
