import Markdown from "markdown-to-jsx";
import PropTypes from "prop-types";

import * as MDXLayoutStyles from "../../layouts/MDXLayout/styles";
import { GlossaryPropType, QuestionPropType } from "../../types";

const Section = function Section({ sectionData }) {
  return sectionData.map((section) => (
    <MDXLayoutStyles.Details key={`${section.position}-faq`}>
      <MDXLayoutStyles.Summary>
        <h3>{section.question ?? section.term}</h3>
      </MDXLayoutStyles.Summary>
      <Markdown>{section.answer ?? section.definition}</Markdown>
    </MDXLayoutStyles.Details>
  ));
};

export default Section;

Section.propTypes = {
  sectionData: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape(QuestionPropType)),
    PropTypes.arrayOf(PropTypes.shape(GlossaryPropType)),
  ]),
};
