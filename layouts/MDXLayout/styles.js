import styled from "styled-components";

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
  letter-spacing: 0.007em;
  :not(:last-of-type) {
    margin-bottom: 28px;
  }
`;

export const Ul = styled.ul`
  padding-inline-start: 40px;
  margin-bottom: 1rem;
`;

export const Strong = styled.strong`
  font-weight: 600;
`;

export const A = styled.a`
  color: ${({ theme }) => theme.MD.linkColor};
  font-weight: 600;
  transition: all 0.35s ease-in-out;
  box-shadow: ${({ theme }) => theme.MD.linkBoxShadow};
  text-decoration: none;

  :hover {
    color: ${({ theme }) => theme.MD.linkColor};
    font-weight: 600;
    box-shadow: ${({ theme }) => theme.MD.linkBoxShadowHover};
    text-decoration: none;
  }
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
`;
