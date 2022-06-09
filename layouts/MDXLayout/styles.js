import styled from "styled-components";

import * as animations from "./animations";
import * as styledCss from "./css";

export const H1 = styled.h1`
  margin-bottom: 32px;
  font-size: 28px;
  font-weight: 600;
  :not(:first-child) {
    margin-top: 48px;
  }
`;

export const H2 = styled.h2`
  margin-bottom: 24px;
  font-size: 21px;
  font-weight: 600;
  :not(:first-child) {
    margin-top: 48px;
  }
`;
export const H3 = styled.h3`
  margin-bottom: 24px;
  font-size: 18px;
  :not(:first-child) {
    margin-top: 48px;
  }
`;

export const P = styled.p`
  ${styledCss.paragraph}
`;

export const Ul = styled.ul`
  padding-inline-start: 40px;
  margin-bottom: 1rem;
`;

export const Strong = styled.strong`
  font-weight: 600;
`;

export const A = styled.a`
  ${styledCss.link}
`;

// Names of CustomContainer and StaticPageWrapper matches classes from 'style.scss' from https://covid-19.sledilnik.org/ website project
export const CustomContainer = styled("main")(({ theme }) => ({
  margin: "24px auto 0 auto",
  maxWidth: "730px",
  background: theme.white,
  lineHeight: 1.7,
  color: theme.MD.textColor,
  "@media only screen and (min-width: 768px)": {
    margin: "48px auto 65px auto",
    boxShadow: theme.MD.elementBoxShadow,
  },
}));

export const StaticPageWrapper = styled.div`
  font-size: 0.875rem;
  padding: 13px 17px 27px 17px;

  @media only screen and (min-width: 768px) {
    margin: 32px 32px 27px 32px;
  }

  strong {
    font-weight: 600;
  }

  span[data-term] {
    ${styledCss.spanDataTerm}
  }

  @media (pointer: coarse), (hover: none) {
    span[data-term] {
      ${styledCss.spanDataTermPointerCoarseNoHover}
    }
  }
`;

export const Details = styled.details`
  margin-bottom: 28px;

  > summary:first-of-type {
    display: list-item;
    counter-increment: list-item 0;
    list-style: inside disclosure-closed;
  }

  > *:not(summary) {
    display: block;
    width: 90%;
    animation: ${animations.showDD} 0.5s ease-out;
  }

  a {
    ${styledCss.link};
  }

  p {
    ${styledCss.paragraph}
  }

  tr + tr {
    margin-top: 27px;
  }

  table {
    width: 100%;
    table-layout: fixed;
    text-align: center;
    margin-bottom: 1rem;
    td {
      padding: 15px 0;
      width: 50%;
      border-top: 1px solid ${({ theme }) => theme.MD.tableBorderColor};
    }
  }
`;

export const Summary = styled.summary`
  cursor: pointer;
  font-weight: 600;
  color: ${({ theme }) => theme.MD.summaryColor};

  padding-right: 18%;

  h3 {
    display: inline;
  }

  + *:nth-of-type(1) {
    margin-top: 2px;
    padding-top: 12px;
  }
  @media only screen and (min-width: 768px) {
    padding-right: 10%;
  }

  /* ::marker,
  ::-webkit-details-marker {
    display: none;
    content: "";
  } */
`;
