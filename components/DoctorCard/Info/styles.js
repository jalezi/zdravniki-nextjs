import styled from 'styled-components';

export const CirclePercentContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: help;
`;

export const InfoContainer = styled.div`
  font-size: 1rem;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  overflow: hidden;
  box-shadow: none;
  letter-spacing: 0px;
  line-height: 1.2;
  justify-self: center;
  width: 100%;
  padding: 0px;
  background: rgb(244, 248, 248);
  border-bottom: 1px solid rgb(220, 232, 233);
  position: relative;
  display: flex;

  &::before {
    content: '';
    position: absolute;
    transition: all 0.1s ease 0s;
    left: 0px;
    top: 0px;
    bottom: 0px;
    width: 0px;
    background: rgb(220, 52, 53);
  }

  &:hover::before {
    width: 4px;
  }

  a:hover {
    color: ${({ theme }) => theme.brand};
  }
`;

export const InfoContent = styled.div`
  padding: 20px 24px 10px;
  -webkit-box-flex: 1;
  flex-grow: 1;
`;

export const InfoActions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  letter-spacing: 0px;
  line-height: 1.2;
  padding: 15px 10px;
`;

export const InfoSubContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Name = styled.p`
  line-height: 1.2;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 0px;
`;

export const Provider = styled.p`
  letter-spacing: 0px;
  line-height: 1.167;
  font-size: 0.75rem;
  font-weight: 700;
`;

export const Address = styled.address`
  color: ${({ theme }) => theme.CARDS.address};
  letter-spacing: 0px;
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 0.75rem;
`;

export const IconButtonBase = styled.button.attrs(
  ({ type, ariaLabel, ariaDisabled }) => ({
    type: type || 'button',
    'aria-label': ariaLabel ?? undefined,
    'aria-disabled': ariaDisabled ?? undefined,
  })
)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  cursor: pointer;

  &[aria-disabled='true'] {
    cursor: not-allowed;
    opacity: 0.3;
  }

  &:not(:disabled):hover {
    background: ${({ theme }) => theme.BUTTONS.backgroundHover};
  }
`;

export const AcceptsContainer = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 5px 7px 5px 5px;
  color: ${({ theme }) => theme.white};
  background: ${({ theme, accepts }) =>
    accepts === 'y' ? theme.CARDS.acceptsY : theme.CARDS.acceptsN};
  border-radius: 4px;
  cursor: help;

  line-height: 1.2;

  font-size: 10px;
  font-weight: 700;
  white-space: nowrap;
  letter-spacing: 0.3px;

  > svg {
    width: 14px;
    height: 14px;
    filter: brightness(10);
    opacity: 0.7;
    margin: 0px 5px 0px 0px;
  }
`;

export const AvailabilityText = styled.span`
  font-size: 0.75rem;
  line-height: 1.66;
  font-weight: 700;
  letter-spacing: 0px;
  color: inherit;
  white-space: nowrap;
  color: #000000aa;
`;
