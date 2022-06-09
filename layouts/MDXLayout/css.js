import { css } from "styled-components";

export const link = css`
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

export const paragraph = css`
  letter-spacing: 0.007em;
  :not(:last-of-type) {
    margin-bottom: 28px;
  }
`;

export const spanDataTermHoverAfter = css`
  content: attr(data-definition);
  position: absolute;
  top: 90%;
  width: 100px;
  background-color: ${({ theme }) => theme.MD.dataTermBcgColor};
  color: ${({ theme }) => theme.white};
  border: 1px solid;
  padding: 3px 6px;
  margin: 10px;
  font-size: 10px;
  font-weight: 200;
  line-height: 1.4;
  z-index: 2;
`;

export const spanDataTerm = css`
  position: relative;
  display: inline-flex;
  justify-content: center;

  color: ${({ theme }) => theme.MD.textColor};
  font-weight: 600;

  outline: none;
  transition: all 0.35s ease-in-out;
  cursor: help;

  ::before {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    top: -2px;
    border-bottom-width: 2px;
    border-bottom-style: dotted;
    border-bottom-color: ${({ theme }) => theme.brand};
    z-index: 1;
  }

  :hover::after {
    ${spanDataTermHoverAfter}
  }
`;

export const spanDataTermPointerCoarseNoHover = css`
  :focus::after {
    ${spanDataTermHoverAfter}
  }
`;
