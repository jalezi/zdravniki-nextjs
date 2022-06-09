import PropTypes from "prop-types";

export const ChildrenPropType = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node,
]);

export const QuestionPropType = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  position: PropTypes.number.isRequired,
};

export const GlossaryPropType = {
  definition: PropTypes.string,
  term: PropTypes.string,
  slug: PropTypes.string,
  position: PropTypes.number,
};
