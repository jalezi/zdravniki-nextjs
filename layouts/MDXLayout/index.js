import PropTypes from 'prop-types';

import Header from '../../components/Header';
import SEO from '../../components/SEO';
import ScrollToTop from '../../components/Shared/ScrollToTop';
import { Button } from '../../components/Shared/ScrollToTop/styles';
import { ChildrenPropType } from '../../types';
import * as Styled from './styles';

export default function MDXLayout({ children, url, title, description }) {
  return (
    <>
      <SEO title={title} description={description} url={url} />
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
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  children: ChildrenPropType.isRequired,
};
