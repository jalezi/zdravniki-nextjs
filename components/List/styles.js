import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 24px;
  /* border-bottom: 1px solid ${({ theme }) =>
    theme.LIST_HEADER.borderBottomColor}; */
  color: ${({ theme }) => theme.LIST_HEADER.color};
  font-size: 0.75rem;
  line-height: 0.75rem;

  height: 36px;
  width: 100%;
`;

export const DoctorsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 93px);
  overflow-y: auto;
`;

export const HeadingBase = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 24px;
  border-block: 1px solid ${({ theme }) => theme.LIST_HEADER.borderBottomColor};
  background: ${({ theme }) => theme.bgColor1};
  font-size: 0.875rem;
  line-height: 0.875rem;
  font-weight: 500;
`;
