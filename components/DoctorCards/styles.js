import styled from 'styled-components';

export const Header = styled.header`
  position: sticky;
  top: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 24px;
  color: ${({ theme }) => theme.LIST_HEADER.color};
  font-size: 0.75rem;
  line-height: 0.75rem;
  background: ${({ theme }) => theme.bgColor1};

  z-index: 2;

  height: 36px;
  width: 100%;
`;

export const DoctorsContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.bgColor1};
  height: calc(100% - 36px); // 36px height Header

  @media screen and (min-width: 768px) {
    height: fit-content;
  }
`;

export const HeadingBase = styled.div`
  position: sticky;
  top: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding: 10px 24px;
  border-block: 1px solid ${({ theme }) => theme.LIST_HEADER.borderBottomColor};
  background: ${({ theme }) => theme.bgColor1};
  font-size: 0.875rem;
  line-height: 0.875rem;
  font-weight: 500;

  z-index: 1;

  a {
    opacity: 0.56;
    cursor: pointer;
    &:hover {
      opacity: 0.85;
    }
  }
`;
