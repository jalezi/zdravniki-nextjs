import PropTypes from "prop-types";

import Header from "../../components/Header";
import SEO from "../../components/SEO";
import { ChildrenPropType } from "../../types";

import * as Styled from "./styles";

export default function ErrorLayout({ children, url, title, description }) {
  return (
    <>
      <SEO title={title} description={description} url={url} />
      <Header />
      <Styled.Main>{children}</Styled.Main>
    </>
  );
}

ErrorLayout.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  children: ChildrenPropType.isRequired,
};
