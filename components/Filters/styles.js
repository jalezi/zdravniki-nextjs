import styled from 'styled-components';

export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-inline: 16px;

  @media screen and (min-width: 768px) {
    flex-grow: 1;
  }
`;
