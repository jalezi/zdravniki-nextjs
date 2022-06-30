import { keyframes } from 'styled-components';

export const openBackdrop = keyframes`
  100% { 
    left: 0
    }
`;

export const closeBackdrop = keyframes`
  0% {
    left: 0
  }
  
  100% {
    left: 100%
  }
  `;
