import styled from 'styled-components';

export const HeadQuotientContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;

  margin: 0.35em;

  > hr ~ p {
    text-align: left;
  }
`;

export const P = styled.p`
  color: inherit;
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 1.66;
  letter-spacing: 0.03333em;
`;

export const Load = styled.p`
  color: inherit;
  font-weight: 400;
  font-size: 1rem;
  letter-spacing: 0.01071em;

  margin: 0.35em 0;
`;

export const TooltipDivider = styled.hr`
  width: 100%;
  margin: 5px 0;

  border-width: 0;
  border-style: solid;
  border-color: rgba(255, 255, 255, 0.5);
  border-bottom-width: thin;
`;
