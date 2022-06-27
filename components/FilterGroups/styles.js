import styled from "styled-components";

export const Filters = styled.nav`
  display: ${({ open }) => (open ? "flex" : "none")};
  flex-direction: column;
  gap: 8px;
  padding: 0 16px;
  height: 100%;
  width: 100%;
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
  padding-top: 16px;
  padding-bottom: 8px;

  @media only screen and (min-width: 768px) {
    display: flex;
    position: initial;
    flex-direction: row;
    flex-wrap: nowrap;
    padding: 0;
  }
`;

export const Summary = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  height: 100%;
  width: 100%;
  padding-bottom: ${({ open }) => (open ? "14px" : "0")};
  padding-top: ${({ open }) => (open ? "8px" : "0")};
  border-bottom-right-radius: 25px;
  border-bottom-left-radius: 25px;

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export const OuterContainer = styled.div.attrs({ tabIndex: 0 })`
  display: flex;
  justify-content: center;
  flex-direction: column;

  min-height: 48px;
  margin-inline: 16px;
  background-color: ${({ theme }) => theme.FILTER.backgroundColor2};
  border: 1px solid transparent;
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
  border-bottom-right-radius: 25px;
  border-bottom-left-radius: 25px;
  font-size: 0.875rem;
  cursor: pointer;
  line-height: 21px;

  @media screen and (min-width: 768px) {
    /* display: none; */
  }
`;

export const FlexBase = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const VerticalSeparator = styled.hr`
  margin: 0px;
  flex-shrink: 0;
  border-style: solid;
  height: auto;
  align-self: stretch;
  border-width: 1px;
  border-color: rgb(193, 212, 215);
`;

export const Info = styled(FlexBase)`
  opacity: 0.5;
`;

export const Filter = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  min-width: 48px;
  padding: 2px;
  border-radius: 25px;
  background-color: ${({ theme }) => theme.FILTER.backgroundColor3};

  @media screen and (min-width: 768px) {
    display: ${({ upMediumHide }) => (upMediumHide ? "none" : "flex")};
  }
`;

export const FilterItem = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2px;
  padding: 2px;
  height: 100%;
  min-width: 48px;
  border-radius: 25px;
  background-color: ${({ theme }) => theme.FILTER.backgroundColor5};
  color: ${({ theme }) => theme.white};
  font-size: 0.75rem;
  font-weight: 600;
  padding-inline: 6px;
  cursor: pointer;

  svg > path {
    fill: ${({ theme }) => theme.white};
    opacity: 0.56;
  }

  :hover {
    background-color: ${({ theme }) => theme.FILTER.backgroundColor4};

    svg > path {
      fill: ${({ theme }) => theme.white};
    }
  }
`;
