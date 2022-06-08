import PropTypes from "prop-types";

import Header from "../../components/Header";
import SEO from "../../components/SEO";
import { ChildrenPropType } from "../../types";

import * as Styled from "./styles";

export default function MDXLayout({ children, url }) {
  return (
    <>
      <SEO title="About" description="Some description" url={url} />
      <Header />
      <Styled.CustomContainer>
        <Styled.StaticPageWrapper>{children}</Styled.StaticPageWrapper>
      </Styled.CustomContainer>
    </>
  );
}

MDXLayout.propTypes = {
  url: PropTypes.string.isRequired,
  children: ChildrenPropType.isRequired,
};
