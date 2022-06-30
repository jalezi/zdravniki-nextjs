import { keyframes } from 'styled-components';

export const showDD = keyframes`
  0% {
    transform: translateY(-8px);
    opacity: 0.1;
  }
  100%  {
    transform: translateY(0px);
    opacity: 1;
  }
`;
