import PropTypes from 'prop-types';

import Header from '../../components/Header';
import SEO from '../../components/SEO';
import ScrollToTop from '../../components/Shared/ScrollToTop';
import { Button } from '../../components/Shared/ScrollToTop/styles';
import { ChildrenPropType } from '../../types';
import * as Styled from './styles';

export default function MDXLayout({ children, title, description }) {
  return (
    <>
      <SEO title={title} description={description} />
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
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  children: ChildrenPropType.isRequired,
};
