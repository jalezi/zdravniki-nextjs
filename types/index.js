import PropTypes from 'prop-types';
import StyleProp from 'react-style-proptype';
/*
 ? remove proptypes from production
 see: https://www.npmjs.com/package/babel-plugin-transform-react-remove-prop-types
 see: https://nextjs.org/docs/advanced-features/customizing-babel-config

 I have tried. Atm it removes only 3kB from the bundle. But with declaring ".babelrc" we are loosing SWC compiler.
 */

export const StylePropType = StyleProp;

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

// just for reference, most likely it will be deleted
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

export const AcceptsPropType = PropTypes.oneOf(['y', 'n']);

export const GeoLocationType = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.number),
  PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
    alt: PropTypes.number,
  }),
]);

export const DoctorPropType = PropTypes.exact({
  accepts: AcceptsPropType.isRequired,
  acceptsOverride: PropTypes.string.isRequired,
  acceptsZZZS: PropTypes.string.isRequired,
  availability: PropTypes.string.isRequired,
  availabilityOverride: PropTypes.string,
  availabilityZZZS: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  fullAddress: PropTypes.string.isRequired,
  geoLocation: GeoLocationType.isRequired,
  instId: PropTypes.string.isRequired,
  load: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  nameSlug: PropTypes.string.isRequired,
  note: PropTypes.string,
  orderForm: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  provider: PropTypes.string.isRequired,
  searchAddress: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  updatedAt: PropTypes.string,
  website: PropTypes.string.isRequired,
});
