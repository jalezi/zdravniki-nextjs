import styled from "styled-components";

export const Container = styled.div.attrs({ role: "button" })`
  width: 36px;
  height: 30px;
  padding: 5px 6px;
  margin-right: -3px;
  position: absolute;
  right: 15px;
  z-index: 500;
  cursor: pointer;
`;

export const Line = styled.div`
  height: 2px;
  width: 24px;
  background: ${({ theme }) => theme.textColor1};

  :not(:first-of-type) {
    margin-top: 7px;
  }
`;
