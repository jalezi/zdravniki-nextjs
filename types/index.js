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

export const DoctorFromCsvPropType = PropTypes.shape({
  doctor: PropTypes.string,
  type: PropTypes.string,
  id_inst: PropTypes.string,
  accepts: PropTypes.string,
  availability: PropTypes.string,
  load: PropTypes.string,
  date_overide: PropTypes.string,
  note_overide: PropTypes.string,
  accepts_overide: PropTypes.string,
  availability_overide: PropTypes.string,
  phone: PropTypes.string,
  website: PropTypes.string,
  email: PropTypes.string,
  orderform: PropTypes.string,
  address: PropTypes.string,
  post: PropTypes.string,
  city: PropTypes.string,
  municipalityPart: PropTypes.string,
  lat: PropTypes.string,
  lon: PropTypes.string,
});
