import Papa from 'papaparse';
import slugify from 'slugify';

import { DOCTOR_TYPES, DUMMY_INSTITUTION } from '../constants/common';
import {
  DOCTORS_CSV_URL,
  DOCTORS_TS_URL,
  INSTITUTIONS_CSV_URL,
} from '../constants/csvURL';

export const isOfType = (() => {
  // create a plain object with no prototype
  const type = Object.create(null);

  // check for null type
  type.null = x => x === null;
  // check for undefined type
  type.undefined = x => x === undefined;
  // check for nil type. Either null or undefined
  type.nil = x => type.null(x) || type.undefined(x);
  // check for strings and string literal type. e.g: 's', "s", `str`, new String()
  type.string = x =>
    !type.nil(x) && (typeof x === 'string' || x instanceof String);
  // check for number or number literal type. e.g: 12, 30.5, new Number()
  type.number = x =>
    !type.nil(x) && // NaN & Infinity have typeof "number" and this excludes that
    ((!Number.isNaN(x) && Number.isFinite(x) && typeof x === 'number') ||
      x instanceof Number);
  // check for boolean or boolean literal type. e.g: true, false, new Boolean()
  type.boolean = x =>
    !type.nil(x) && (typeof x === 'boolean' || x instanceof Boolean);
  // check for array type
  type.array = x => !type.nil(x) && Array.isArray(x);
  // check for object or object literal type. e.g: {}, new Object(), Object.create(null)
  type.object = x => ({}.toString.call(x) === '[object Object]');
  // check for provided type instance
  type.type = (x, X) => !type.nil(x) && x instanceof X;
  // check for set type
  type.set = x => type.type(x, Set);
  // check for map type
  type.map = x => type.type(x, Map);
  // check for date type
  type.date = x => type.type(x, Date);

  return type;
})();

export const toSlug = function toSlug(
  text = '',
  options = { lower: true, remove: /[*+~.()'"!:@]/g }
) {
  return slugify(text, options);
};

export const trimString = str => str.replace(/\s+/g, ' ').trim();

export const sortByField = field =>
  Intl.Collator
    ? (a, b) => new Intl.Collator('sl').compare(a[field], b[field])
    : (a, b) => a[field].localeCompare(b[field], 'sl');

export const createPopulateDoctorWithInstitution =
  function createPopulateDoctorWithInstitution(institutions = []) {
    if (institutions.length === 0) {
      // eslint-disable-next-line no-console
      console.warn('instituions is empty!');
      return null;
    }
    return dr => {
      const institution =
        institutions.find(inst => inst.id_inst === dr.id_inst) ??
        DUMMY_INSTITUTION;

      const populatedDr = Object.keys(dr).reduce(
        (acc, property) => {
          if (property === 'doctor') {
            acc.slug = toSlug(dr.doctor);
            acc.doctor = trimString(dr.doctor);
            return acc;
          }
          if (property in institution) {
            acc[property] =
              trimString(dr[property]) || trimString(institution[property]);
            return acc;
          }
          acc[property] = trimString(dr[property]);
          return acc;
        },
        { ...dr }
      );

      return populatedDr;
    };
  };

export const fetchJson = async function fetchJson(url = '') {
  if (!url) {
    throw new Error('url is endefined!');
  }
  const response = await fetch(url);
  return response.json();
};

/**
 * @typedef {object} FilterOptions
 * @property {string} type
 * @property {string} field
 * @property {string} value
 * @property {boolean} isSlug
 */

/**
 *
 * @param {string} url
 * @param {FilterOptions} filterOptions - type, field, value, isSlug
 * @param {*} parseOptions see papaparse config https://www.papaparse.com/docs#config
 * @returns
 */
export const fetchRawCsvAndParse = async function fetchRawCsvAndParse(
  url = '',
  filterOptions = { type: '', field: '', value: '', isSlug: false },
  parseOptions = { header: true }
) {
  if (!url) {
    throw new Error('url is endefined!');
  }

  if (!isOfType.object(filterOptions)) {
    throw new Error('filterOptions is not an object!');
  }

  const response = await fetch(url);
  const text = await response.text();
  const result = Papa.parse(text, parseOptions);
  const { data } = result;
  const { type, field, value = '', isSlug } = filterOptions;

  if (!type) {
    return data;
  }

  if (DOCTOR_TYPES.includes(type)) {
    if (!field) {
      return data.filter(item => item.type === type);
    }

    if (isSlug) {
      return data.filter(
        item => toSlug(item[field]) === value && item.type === type
      );
    }

    return data.filter(item => item[field] === value && item.type === type);
  }

  throw Error('type is not valid!');
};

export const getDoctorData = async function fetchAllRaw(
  doctorFilterOptions = { type: '', field: '', value: '', isSlug: false },
  institutionFilterOptions = { type: '', field: '', value: '', isSlug: false }
) {
  const [doctors, institutions, doctorsTS] = await Promise.all([
    fetchRawCsvAndParse(DOCTORS_CSV_URL, doctorFilterOptions),
    fetchRawCsvAndParse(INSTITUTIONS_CSV_URL, institutionFilterOptions),
    fetchJson(DOCTORS_TS_URL),
  ]);
  // TODO do something with errors

  return {
    doctors: doctors.map(createPopulateDoctorWithInstitution(institutions)),
    updatedAt: doctorsTS,
  };
};
