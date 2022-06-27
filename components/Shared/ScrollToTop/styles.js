import styled from "styled-components";

export const Button = styled.button`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  bottom: 30px;
  right: -60px;
  background: ${({ theme }) => theme.brand};
  color: ${({ theme }) => theme.white};
  text-align: center;
  border-radius: 50%;
  opacity: 0.8;
  cursor: pointer;
  width: 40px;
  height: 40px;
  z-index: 99;

  animation: ${({ show }) =>
      show ? "show-scroll-to-top" : "hide-scroll-to-top"}
    0.5s ease-in forwards;

  &.first {
    animation: ${({ show }) => (show ? "show-scroll-to-top" : "none")} 0.5s
      ease-in forwards;
  }

  :hover,
  :focus {
    opacity: 1;
  }

  @keyframes show-scroll-to-top {
    100% {
      right: 30px;
    }
  }

  @keyframes hide-scroll-to-top {
    0% {
      right: 30px;
    }
    100% {
      right: -60px;
    }
  }
`;

export const IconContainer = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
`;
