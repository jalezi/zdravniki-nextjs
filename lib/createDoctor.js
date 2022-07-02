import { toSlug, trimString } from './helpers';

/**
 * @typedef {object} DoctorObject represents a doctor object coming from csv file
 * @property {string} accepts
 * @property {string} accepts_override
 * @property {string} address
 * @property {string} availability
 * @property {string} availability_overide
 * @property {string} city
 * @property {string} date_override
 * @property {string} doctor
 * @property {string} email
 * @property {string} id_inst
 * @property {string} lat
 * @property {string} lon
 * @property {string} load
 * @property {string} municipalityPart
 * @property {string} note_override
 * @property {string} orderform
 * @property {string} phone
 * @property {string} post
 * @property {string} type
 * @property {string} website
 */

/**
 * @typedef {object} InstitutionObject
 * @property {string} address
 * @property {string} city
 * @property {string} id_inst
 * @property {string} lat
 * @property {string} lon
 * @property {string} municipalityPart
 * @property {string} municipality
 * @property {string} name
 * @property {string} phone
 * @property {string} post
 * @property {string} unit
 * @property {string} website
 * @property {string} zzzsSt
 */

/**
 * @param {DoctorObject} doctorObject
 * @param {InstitutionObject} institution
 * @returns
 */
const getAddressObject = (doctor, institution) => {
  const post = doctor.post || institution.post;
  const [postalCode, ...postalName] = post.split(' ');
  return {
    street: doctor.address || institution.address,
    city: doctor.city || institution.city,
    municipalityPart: doctor.municipalityPart || institution.municipalityPart,
    municipality: doctor.municipality || institution.municipality,
    postalCode,
    post: postalName.join(' '),
  };
};

/**
 *
 * @param {DoctorObject} doctorObject
 * @param {InstitutionObject} institution
 * @returns
 */
export default function createDoctor(doctorObject, institution) {
  const addressObject = getAddressObject(doctorObject, institution);

  const doctor = Object.freeze({
    get accepts() {
      return this.acceptsOverride || this.acceptsZZZS;
    },

    get acceptsOverride() {
      return doctorObject.accepts_override;
    },

    get acceptsZZZS() {
      return doctorObject.accepts;
    },

    get availability() {
      // TODO parse float?
      return this.availabilityOverride || this.availabilityZZZS;
    },

    get availabilityOverride() {
      return doctorObject.availability_overide || '';
    },

    get availabilityZZZS() {
      return doctorObject.availability;
    },

    get email() {
      return doctorObject.email;
    },

    get fullAddress() {
      return `${addressObject.street}, ${addressObject.postalCode} ${addressObject.post}`;
    },

    get geoLocation() {
      return {
        lat: parseFloat(doctorObject.lat || institution.lat),
        lon: parseFloat(doctorObject.lon || institution.lon),
      };
    },

    get instId() {
      return trimString(doctorObject.id_inst);
    },

    get load() {
      return doctorObject.load;
    },

    get name() {
      return trimString(doctorObject.doctor);
    },

    get nameSlug() {
      return toSlug(this.name);
    },

    get note() {
      return doctorObject.note_override || '';
    },

    get orderForm() {
      return doctorObject.orderform;
    },

    get phone() {
      return doctorObject.phone;
    },

    get provider() {
      return institution.name;
    },

    get searchAddress() {
      return `${addressObject.street}, ${addressObject.postalCode} ${addressObject.city} ${addressObject.municipalityPart} ${addressObject.municipality}`;
    },

    get type() {
      return doctorObject.type;
    },

    get updatedAt() {
      return doctorObject.date_override || '';
    },

    get website() {
      return doctorObject.website;
    },
  });

  return doctor;
}
