
import Header from '../../components/Header';
import ScrollToTop from '../../components/Shared/ScrollToTop';
import { Button } from '../../components/Shared/ScrollToTop/styles';
import { ChildrenPropType } from '../../types';
import * as Styled from './styles';

export default function MDXLayout({ children }) {
  return (
    <>
      <Header />
      <Styled.CustomContainer>
        <Styled.StaticPageWrapper>
          {children}
          <ScrollToTop Component={Button} />
        </Styled.StaticPageWrapper>
      </Styled.CustomContainer>
    </>
  );
}

MDXLayout.propTypes = {
  children: ChildrenPropType.isRequired,
};
