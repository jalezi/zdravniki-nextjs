import PropTypes from "prop-types";

import AboutEN from "../../content/en/about.mdx";
import AboutIT from "../../content/it/about.mdx";
import AboutSL from "../../content/sl/about.mdx";
import { mdComponents } from "../../layouts/MDXLayout/mdComponents";

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
  return <Page components={mdComponents} id="about-mdx" />;
};

export default LanguagePageMDX;

LanguagePageMDX.propTypes = {
  name: PropTypes.oneOf(Object.keys(AboutIntlMap)).isRequired,
  slug: PropTypes.oneOf(Object.keys(PagesIntlMap)).isRequired,
};
