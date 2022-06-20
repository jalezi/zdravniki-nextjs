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

// just for reference, most likely it will be deletete
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

// just for reference, most likely it will be deleted
export const InstitutionFromCsvPropType = PropTypes.exact({
  id_inst: PropTypes.string,
  zzzsSt: PropTypes.string,
  name: PropTypes.string,
  unit: PropTypes.string,
  address: PropTypes.string,
  post: PropTypes.string,
  city: PropTypes.string,
  municipalityPart: PropTypes.string,
  municipality: PropTypes.string,
  lat: PropTypes.string,
  lon: PropTypes.string,
  phone: PropTypes.string,
  website: PropTypes.string,
});

export const DoctorPropType = PropTypes.shape({
  doctor: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id_inst: PropTypes.string.isRequired,
  accepts: PropTypes.string.isRequired,
  availability: PropTypes.string.isRequired,
  load: PropTypes.string.isRequired,
  date_overide: PropTypes.string,
  note_overide: PropTypes.string,
  accepts_overide: PropTypes.string,
  availability_overide: PropTypes.string,
  phone: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  orderform: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  post: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  municipalityPart: PropTypes.string.isRequired,
  lat: PropTypes.string.isRequired,
  lon: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
});
