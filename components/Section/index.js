import PropTypes from "prop-types";

import "rc-tooltip/assets/bootstrap.css";

import * as MDXLayoutStyles from "../../layouts/MDXLayout/styles";
import { GlossaryPropType, QuestionPropType } from "../../types";
import Collapsable from "../Collapsable";

const Section = function Section({ sectionData, title }) {
  const articles = sectionData.map((section) => {
    const key = `${section.position}-${section.slug}`;
    return (
      <article key={key}>
        <Collapsable section={section} />
      </article>
    );
  });
  return (
    <section>
      <MDXLayoutStyles.H2>{title}</MDXLayoutStyles.H2>
      {articles}
    </section>
  );
};

export default Section;

Section.propTypes = {
  sectionData: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape(QuestionPropType)),
    PropTypes.arrayOf(PropTypes.shape(GlossaryPropType)),
  ]).isRequired,
  title: PropTypes.string.isRequired,
};
