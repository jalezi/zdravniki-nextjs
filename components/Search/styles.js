import styled from "styled-components";

import CloseIconSVG from "../../assets/svg/icon-close.svg";

const scaleUpRatio = 16 / 14;
const scaleDownRatio = 14 / 16;
const scaleUp = (size) => size * scaleUpRatio;

export const SearchContainer = styled.div`
  position: relative;
  flex-grow: 1;
  height: 48px;
  border: 1px solid ${({ theme }) => theme.INPUTS.border};
  border-radius: 25px;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

  :focus-within {
    box-shadow: rgb(9 175 218 / 76%) 0px 0px 7px 0px;
  }
`;

const InputBase = styled.input`
  font-weight: 600;
`;

export const InputSearch = styled(InputBase).attrs(() => ({
  type: "search",
}))`
  padding-block: 0;
  padding-right: ${scaleUp(40)}px;
  padding-left: ${scaleUp(40)}px;
  width: ${scaleUp(100)}%;
  height: ${scaleUp(48)}px;
  margin-block: auto;

  transform: scale(${scaleDownRatio});
  transform-origin: left top;

  ::placeholder {
    font-size: 16px;
    color: ${({ theme }) => theme.INPUTS.placeholder};
  }
  ::-webkit-search-decoration,
  ::-webkit-search-cancel-button,
  ::-webkit-search-results-decoration,
  ::-webkit-search-results-button {
    display: none;
  }

  :focus {
    color: ${({ theme }) => theme.textColor1};
  }
`;

const IconButtonBase = styled.button.attrs({ type: "button" })`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  height: 32px;
  width: 32px;
  cursor: pointer;

  :hover {
    background: ${({ theme }) => theme.BUTTONS.backgroundHover};
  }
`;

export const SearchSuffixIcon = styled(IconButtonBase)`
  right: 10px;
`;

export const SearchPrefixIcon = styled(IconButtonBase).attrs(() => ({
  disabled: true,
}))`
  left: 5px;
`;

export const CloseIcon = styled(CloseIconSVG)`
  height: 12px;
`;
