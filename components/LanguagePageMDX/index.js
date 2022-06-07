import PropTypes from "prop-types";
import styled from "styled-components";

import AboutEN from "../../content/en/about.mdx";
import AboutIT from "../../content/it/about.mdx";
import AboutSL from "../../content/sl/about.mdx";

const Heading = styled.h1`
  color: green;
`;

const mdComponents = {
  // eslint-disable-next-line react/jsx-props-no-spreading
  h1: (props) => <Heading {...props} />,
  // eslint-disable-next-line react/jsx-props-no-spreading
  h2: (props) => <Heading as="h2" {...props} />,
  // eslint-disable-next-line react/jsx-props-no-spreading
  h3: (props) => <Heading as="h3" {...props} />,
};

const AboutIntlMap = {
  it: AboutIT,
  sl: AboutSL,
  en: AboutEN,
};

const PagesIntlMap = {
  about: AboutIntlMap,
};

const LanguagePageMDX = function LanguagePageMDX({ slug, name }) {
  const Page = PagesIntlMap[slug][name];
  return <Page components={mdComponents} />;
};

export default LanguagePageMDX;

LanguagePageMDX.propTypes = {
  name: PropTypes.oneOf(Object.keys(AboutIntlMap)).isRequired,
  slug: PropTypes.oneOf(Object.keys(PagesIntlMap)).isRequired,
};
