import { keyframes } from "styled-components";

export const showDD = keyframes`
from {
    transform: translateY(-8px);
    opacity: 0.1;
  }
  to {
    transform: translateY(0px);
    opacity: 1;
  }
`;
