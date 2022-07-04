import PropTypes from 'prop-types';

import Header from '../../components/Header';
import SEO from '../../components/SEO';
import { NEXT_URL } from '../../config';
import { ChildrenPropType } from '../../types';
import * as Styled from './styles';

export default function ErrorLayout({ children, title, description }) {
  return (
    <>
      <SEO title={title} description={description} url={NEXT_URL} />
      <Header />
      <Styled.Main>{children}</Styled.Main>
    </>
  );
}

ErrorLayout.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  children: ChildrenPropType.isRequired,
};
