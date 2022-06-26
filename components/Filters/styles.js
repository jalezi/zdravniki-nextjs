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
`;

export const FlexBase = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Info = styled(FlexBase)`
  opacity: 0.5;
`;

export const Filter = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  padding: 4px;
  border-radius: 25px;
  background-color: ${({ theme }) => theme.FILTER.backgroundColor3};
`;

export const FilterItem = styled.span`
  display: flex;
  align-items: center;
  margin: 2px;
  padding: 2px;
  height: 100%;
  border-radius: 25px;
  background-color: ${({ theme }) => theme.FILTER.backgroundColor4};
  color: ${({ theme }) => theme.white};
  font-size: 0.75rem;
  font-weight: 600;
  padding-inline: 6px;
`;
