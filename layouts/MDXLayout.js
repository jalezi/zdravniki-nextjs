import PropTypes from "prop-types";

import Header from "../components/Header";
import SEO from "../components/SEO";
import { ChildrenPropType } from "../types";

export default function MDXLayout({ children, url }) {
  return (
    <>
      <SEO title="About" description="Some description" url={url} />
      <Header />
      <main>{children}</main>
    </>
  );
}

MDXLayout.propTypes = {
  url: PropTypes.string.isRequired,
  children: ChildrenPropType.isRequired,
};
