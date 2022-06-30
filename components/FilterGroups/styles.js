import styled from "styled-components";

export const Filters = styled.nav`
  display: ${({ open }) => (open ? "flex" : "none")};
  flex-direction: row;
  flex-wrap: wrap;
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
    flex-wrap: nowrap;
    padding: 0;
  }
`;

export const Summary = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  min-height: 48px;
  height: 100%;
  width: 100%;
  border-bottom-right-radius: 25px;
  border-bottom-left-radius: 25px;
  border-top: 1px solid
    ${({ theme, open }) =>
      open ? theme.FILTER.backgroundColor3 : "transparent"};

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
    background-color: ${({ theme }) => theme.white};
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

  > span {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    max-width: 160px;

    @media screen and (min-width: 370px) {
      max-width: initial;
    }
  }
`;

export const Filter = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  height: 48px;
  min-width: 48px;
  max-width: max-content;
  padding: 4px;
  border-radius: 25px;
  background-color: ${({ theme }) => theme.FILTER.backgroundColor3};

  @media screen and (min-width: 768px) {
    display: ${({ upMediumHide }) => (upMediumHide ? "none" : "flex")};
  }
`;

export const FilterItem = styled.span.attrs(({ as }) => ({
  type: as === "button" ? "button" : undefined,
}))`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 8px;
  height: 100%;
  min-width: 44px;
  border-radius: 25px;
  background-color: ${({ theme }) => theme.FILTER.backgroundColor5};
  color: ${({ theme }) => theme.white};
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;

  > span {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  svg > path {
    fill: ${({ theme }) => theme.white};
    opacity: 0.56;
  }

  &[aria-pressed="false"] {
    background: transparent;

    > svg > path {
      fill: ${({ theme }) => theme.SVG.default};
    }

    > span {
      display: none;
    }

    :hover {
      background-color: ${({ theme }) => theme.white};

      svg > path {
        fill: ${({ theme }) => theme.SVG.default};
      }
    }
  }

  :hover {
    background-color: ${({ theme }) => theme.FILTER.backgroundColor4};

    svg > path {
      fill: ${({ theme }) => theme.white};
    }
  }
`;

export const NoTextOverflow = styled.span`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
