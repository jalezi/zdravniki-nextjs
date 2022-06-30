import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';

import 'react-loading-skeleton/dist/skeleton.css';

import * as Styled from './styles';

const DetailsSkeleton = styled(Styled.Details)`
  &&&[open] > summary:first-of-type {
    display: list-item;
    counter-increment: none;
    list-style: none;
    list-style-type: none;
  }
`;

const wrapped = <Skeleton wrapper={Styled.SummaryContentContainer} />;

const WaitingMDX = function WaitingMDX() {
  const article = (
    <article>
      <DetailsSkeleton open>
        <Styled.Summary>{wrapped}</Styled.Summary>
        <Skeleton count={5} />
      </DetailsSkeleton>
    </article>
  );

  return (
    <section>
      <Styled.H2>
        <Skeleton />
      </Styled.H2>
      {article}
      {article}
      {article}
    </section>
  );
};

export default WaitingMDX;
