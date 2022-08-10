import { ApiError } from 'next/dist/server/api-utils';
import Papa from 'papaparse';

import { DOCTOR_TYPES, DUMMY_INSTITUTION } from '../constants/common';
import {
  DOCTORS_CSV_URL,
  DOCTORS_TS_URL,
  INSTITUTIONS_CSV_URL,
} from '../constants/csvURL';
import createDoctor from './createDoctor';
import { isOfType, toSlug } from './helpers';

export { isOfType, toSlug, trimString } from './helpers';

export const getNowToLocaleString = function getNowToLocaleString() {
  const time = Date.now();
  return new Date(time).toLocaleString();
};

export const sortByField = field =>
  Intl.Collator
    ? (a, b) => new Intl.Collator('sl').compare(a[field], b[field])
    : (a, b) => a[field].localeCompare(b[field], 'sl');

export function populateDoctorWithInstitution(institutions = []) {
  if (institutions.length === 0) {
    // eslint-disable-next-line no-console
    console.warn('instituions is empty!');
    return null;
  }
  return dr => {
    const institution = institutions.find(inst => inst.id_inst === dr.id_inst);

    return createDoctor(dr, { ...DUMMY_INSTITUTION, ...institution });
  };
}
export const fetchJson = async function fetchJson(url = '') {
  if (!url) {
    const error = new ApiError(400, 'Bad Request');
    error.info = {
      success: false,
      error: { code: 400, message: 'Bad Request' },
      metadata: { url, time: getNowToLocaleString() },
    };
    error.status = 400;
    throw error;
  }
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    const error = new ApiError(data.error.code, data.message);
    error.info = data.message;
    error.status = res.status;
    throw error;
  }
  return data;
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
  parseOptions = { header: true, skipEmptyLines: true }
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
    doctors: doctors
      .filter(dr => dr.doctor)
      .map(populateDoctorWithInstitution(institutions)),
    updatedAt: doctorsTS,
  };
};
