import styled from "styled-components";

import * as hamburgerCss from "./Hamburger/css";

export const Header = styled.header`
  height: 56px;
  color: ${({ theme }) => theme.textColor2};
  background-color: ${({ theme }) => theme.brand};

  display: flex;
  justify-content: start;
  align-items: center;

  padding-inline: 0.5rem;
  overflow: auto;

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

    .nav-heading,
    .🍔 {
      display: none;
    }
  }
`;

export const Nav = styled.nav`
  width: max-content;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 0.875rem;
`;

export const List = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
`;
export const SocialIcons = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

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

export const A = styled.a`
  position: relative;
  top: 0;
  left: auto;
  right: 0;
  display: flex;
  flex-shrink: 0;
  flex-grow: 1;

  padding: 0;

  color: ${({ theme }) => theme.textColor2};
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
