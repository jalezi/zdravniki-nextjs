import styled from "styled-components";

import * as hamburgerCss from "./Hamburger/css";

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: start;
  position: fixed;
  top: 0;
  right: -100%;
  bottom: 0;
  left: 100%;
  z-index: 400;
  background: ${({ theme }) => theme.brand};
  padding: 20px 0 0 15px;
  transition: all 0.4s ease-in-out;
  will-change: transform;
  margin-left: auto;
  height: 100%;
`;

export const Heading = styled.h2`
  margin-bottom: 18px;
  font-size: 1.25rem;
  font-weight: 700;
`;

export const List = styled.ul`
  display: flex;
  justify-content: start;
  flex-direction: column;
  flex-grow: 1;
  gap: 0.5rem;

  max-width: 33%;

  margin-top: 1rem;
`;

export const SocialAndLangContainer = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: auto;
  margin-bottom: 1rem;
`;

export const SocialIcons = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  width: fit-content;
  margin-right: auto;

  path {
    fill: ${({ theme }) => theme.textColor2};
  }

  li {
    max-height: 24px;
  }

  a svg {
    border-radius: 50%;
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }

  a path {
    transition: color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }

  a:hover svg,
  a:focus svg {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.bgColor2};
  }

  a:hover path,
  a:focus path {
    fill: ${({ theme }) => theme.textColor1};
  }
`;

export const Header = styled.header`
  height: 56px;
  color: ${({ theme }) => theme.textColor2};
  background-color: ${({ theme }) => theme.brand};

  display: flex;
  justify-content: start;
  align-items: center;

  padding-inline: 0.5rem;

  z-index: 100;

  &.menuOpen ${Nav} {
    transform: translateZ(0);
    animation: open-nav-container 1s 0.05s ease-out forwards;
    will-change: transform;
  }

  &.menuOpen .🍔 {
    ${hamburgerCss.openLine1}
    ${hamburgerCss.openLine2}
    ${hamburgerCss.openLine3}
  }

  &.closingMenu .🍔 {
    ${hamburgerCss.closeLine1}
    ${hamburgerCss.closeLine2}
    ${hamburgerCss.closeLine3}
  }

  /* MEDIA QUERIES */
  @media only screen and (min-width: 768px) {
    height: 64px;

    ${Nav} {
      height: 64px;
    }

    ${Nav}, ${List}, ${SocialAndLangContainer} {
      position: unset;
      display: flex;
      align-items: center;
      gap: 1.125rem;

      flex-direction: row;
      padding: 0;
      margin-bottom: 0;
    }

    ${Nav} ${Heading},
    .🍔 {
      display: none;
    }

    ${List} {
      margin-top: 0;
      flex-grow: 0;
    }

    ${SocialAndLangContainer} {
      margin-right: 0.5rem;
    }
  }

  @keyframes open-nav-container {
    100% {
      left: 33%;
    }
  }
`;

export const Logo = styled.a`
  margin-left: 1em;
`;

export const A = styled.a`
  position: relative;
  top: 0;
  right: 0;
  display: flex;
  flex-shrink: 0;

  width: fit-content;
  padding: 0;

  color: ${({ theme }) => theme.textColor2};
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 30px;
  white-space: nowrap;

  transition: color, box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

  &:hover,
  &:focus {
    box-shadow: inset 0px -10px 0 ${({ theme }) => theme.bgColor2};
    color: ${({ theme }) => theme.textColor1};
  }

  &.active {
    box-shadow: inset 0px -10px 0 ${({ theme }) => theme.white};
    color: ${({ theme }) => theme.textColor1};
  }
`;
