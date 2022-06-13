import { keyframes } from "styled-components";

/* MENU OPEN ANIMATIONS */
export const line1 = keyframes`
  0% {
    transform: translateZ(0) rotate(0deg);
  }

  50% {
    transform: translate3d(0, 9px, 0) rotate(0deg);
  }

  100% {
    transform: translate3d(0, 9px, 0) rotate(-45deg);
  }
`;

export const line2 = keyframes`
  0% {
    opacity: 1;
  }

  49% {
    opacity: 0;
  }
`;

export const line3 = keyframes`
  0% {
    transform: translateZ(0) rotate(0deg);
  }

  50% {
    transform: translate3d(0, -9px, 0) rotate(0deg);
  }

  100% {
    transform: translate3d(0, -9px, 0) rotate(45deg);
  }
`;

/* CLOSING MENU ANIMATIONS */
export const line1Close = keyframes`
  0% {
    transform: translate3d(0, 9px, 0) rotate(-45deg);
  }
  50% {
    transform: translate3d(0, 9px, 0) rotate(0deg);
  }
  100% {
    transform: translateZ(0) rotate(0deg);
  }
`;

export const line2Close = keyframes`
  0% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }
`;

export const line3Close = keyframes`
  0% {
    transform: translate3d(0, -9px, 0) rotate(45deg);
  }
  50% {
    transform: translate3d(0, -9px, 0) rotate(0deg);
  }
  100% {
    transform: translateZ(0) rotate(0deg);
  }
`;
