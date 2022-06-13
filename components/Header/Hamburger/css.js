import { css } from "styled-components";

import * as animations from "./animations";

export const openLine1 = css`
  div:nth-child(1) {
    animation-name: ${animations.line1};
    animation-duration: 0.6s;
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    animation-delay: 0s;
    transform: translate3d(0, 9px, 0) rotate(-45deg);
    will-change: transform;
  }
`;
export const openLine2 = css`
  div:nth-child(2) {
    opacity: 0;
    animation-name: ${animations.line2};
    animation-duration: 0.6s;
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    animation-delay: 0s;
    will-change: opacity;
  }
`;
export const openLine3 = css`
  div:nth-child(3) {
    animation-name: ${animations.line3};
    animation-duration: 0.6s;
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    animation-delay: 0s;
    transform: translate3d(0, -9px, 0) rotate(45deg);
    will-change: transform;
  }
`;

export const closeLine1 = css`
  div:nth-child(1) {
    animation-name: ${animations.line1Close};
    animation-duration: 0.6s;
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    animation-delay: 0s;
    transform: translateZ(0) rotate(0deg);
    will-change: transform;
  }
`;
export const closeLine2 = css`
  div:nth-child(2) {
    opacity: 1;
    animation-name: ${animations.line2Close};
    animation-duration: 0.6s;
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    animation-delay: 0s;
    will-change: opacity;
  }
`;
export const closeLine3 = css`
  div:nth-child(3) {
    animation-name: ${animations.line3Close};
    animation-duration: 0.6s;
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    animation-delay: 0s;
    transform: translateZ(0) rotate(0deg);
    will-change: transform;
  }
`;
