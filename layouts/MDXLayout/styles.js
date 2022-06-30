import styled from 'styled-components';

import * as animations from './animations';
import * as styledCss from './css';

export const H1 = styled.h1`
  margin-bottom: 32px;
  font-size: 28px;
  font-weight: 600;
`;

export const H2 = styled.h2`
  margin-bottom: 24px;
  font-size: 21px;
  font-weight: 600;
`;
export const H3 = styled.h3`
  margin-bottom: 24px;
  font-size: 18px;
`;

export const P = styled.p`
  ${styledCss.paragraph}
`;

export const Notice = styled(P)`
  font-size: 1rem;
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
export const CustomContainer = styled('main')(({ theme }) => ({
  margin: '48px auto 0 auto',
  maxWidth: '730px',
  background: theme.white,
  lineHeight: 1.7,
  color: theme.MD.textColor,
  '@media only screen and (min-width: 768px)': {
    margin: '48px auto 65px auto',
    boxShadow: theme.MD.elementBoxShadow,
  },
}));

export const StaticPageWrapper = styled.div`
  font-size: 0.875rem;
  padding: 13px 17px 27px 17px;

  @media only screen and (min-width: 768px) {
    margin: 32px 32px 27px 32px;
  }

  *:where(h2, section):not(:first-child) {
    margin-top: 48px;
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

  details > summary:first-of-type {
    display: list-item;
    counter-increment: list-item 0;
    list-style: inside disclosure-closed;
  }

  details[open] > summary:first-of-type {
    list-style-type: disclosure-open;
  }

  details > summary + * {
    visibility: hidden;
  }

  details[open] > summary + * {
    visibility: visible;
  }
`;

export const Details = styled.details`
  margin-bottom: 24px;

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

  ul,
  ol {
    list-style-type: disc;
    padding-inline-start: 40px;
    margin-bottom: 1rem;
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
  display: inline-flex;
  cursor: pointer;
  font-weight: 600;
  color: ${({ theme }) => theme.MD.summaryColor};

  h3 {
    display: inline;
    max-width: 90%;
  }

  + *:nth-of-type(1) {
    margin-top: 2px;
    padding-top: 12px;
  }
`;

export const SummaryContentContainer = styled.div`
  display: inline-flex;
  justify-content: space-between;
  align-items: start;
  width: 93%;

  @media only screen and (min-width: 330px) {
    width: 95%;
  }
  @media only screen and (min-width: 404px) {
    width: 96%;
  }
  @media only screen and (min-width: 526px) {
    width: 97%;
  }
`;
export const ButtonsContainer = styled.div`
  display: inline-flex;
  margin-left: auto;
  gap: 1rem;
  cursor: initial;
  align-items: center;
`;

export const IconButton = styled.button`
  width: 23px;
  height: 23px;
  cursor: pointer;

  &.make-smaller {
    width: 21px;
    height: 21px;
  }
`;
