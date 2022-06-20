import Papa from "papaparse";
import slugify from "slugify";

import {
  DOCTORS_CSV_URL,
  DOCTORS_TS_URL,
  INSTITUTIONS_CSV_URL,
} from "../constants/csvURL";

export const isOfType = (() => {
  // create a plain object with no prototype
  const type = Object.create(null);

  // check for null type
  type.null = (x) => x === null;
  // check for undefined type
  type.undefined = (x) => x === undefined;
  // check for nil type. Either null or undefined
  type.nil = (x) => type.null(x) || type.undefined(x);
  // check for strings and string literal type. e.g: 's', "s", `str`, new String()
  type.string = (x) =>
    !type.nil(x) && (typeof x === "string" || x instanceof String);
  // check for number or number literal type. e.g: 12, 30.5, new Number()
  type.number = (x) =>
    !type.nil(x) && // NaN & Infinity have typeof "number" and this excludes that
    ((!Number.isNaN(x) && Number.isFinite(x) && typeof x === "number") ||
      x instanceof Number);
  // check for boolean or boolean literal type. e.g: true, false, new Boolean()
  type.boolean = (x) =>
    !type.nil(x) && (typeof x === "boolean" || x instanceof Boolean);
  // check for array type
  type.array = (x) => !type.nil(x) && Array.isArray(x);
  // check for object or object literal type. e.g: {}, new Object(), Object.create(null)
  type.object = (x) => ({}.toString.call(x) === "[object Object]");
  // check for provided type instance
  type.type = (x, X) => !type.nil(x) && x instanceof X;
  // check for set type
  type.set = (x) => type.type(x, Set);
  // check for map type
  type.map = (x) => type.type(x, Map);
  // check for date type
  type.date = (x) => type.type(x, Date);

  return type;
})();

export const toSlug = function toSlug(
  text = "",
  options = { lower: true, remove: /[*+~.()'"!:@]/g }
) {
  return slugify(text, options);
};

export const trimString = (str) => str.replace(/\s+/g, " ").trim();

export const createPopulateDoctorWithInstitution =
  function createPopulateDoctorWithInstitution(institutions = []) {
    if (institutions.length === 0) {
      // eslint-disable-next-line no-console
      console.warn("doctors is empty!");
      return null;
    }
    return (dr) => {
      const institution = institutions.find(
        (inst) => inst.id_inst === dr.id_inst
      );

      if (!institution) return dr;

      const populatedDr = Object.keys(dr).reduce(
        (acc, property) => {
          if (property === "doctor") {
            acc.slug = toSlug(dr.doctor);
            return acc;
          }
          if (property in institution) {
            acc[property] = dr[property] || institution[property];
            return acc;
          }
          return acc;
        },
        { ...dr, institution: null }
      );

      return populatedDr;
    };
  };

export const fetchJson = async function fetchJson(url = "") {
  if (!url) {
    throw new Error("url is endefined!");
  }
  const response = await fetch(url);
  return response.json();
};

export const fetchRawCsvAndParse = async function fetchRawCsvAndParse(
  url = "",
  filterOptions = { field: "", value: "", isSlug: false },
  parseOptions = { header: true }
) {
  if (!url) {
    throw new Error("url is endefined!");
  }

  if (!isOfType.object(filterOptions)) {
    throw new Error("filterOptions is not an object!");
  }

  const response = await fetch(url);
  const text = await response.text();
  const result = Papa.parse(text, parseOptions);
  const { data } = result;
  const { field, value = "", isSlug } = filterOptions;

  if (!field) {
    return data;
  }

  if (isSlug) {
    return data.filter((item) => toSlug(item[field]) === value);
  }

  return data.filter((item) => item[field] === value);
};

export const getDoctorData = async function fetchAllRaw(
  doctorFilterOptions = { field: "", value: "", isSlug: false },
  institutionFilterOptions = { field: "", value: "", isSlug: false }
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

export const findDoctorBySlugifyName = function findDoctorBySlugifyName(
  doctors = [],
  name = ""
) {
  if (doctors.length === 0) {
    // eslint-disable-next-line no-console
    console.warn("doctors is empty!");
    return null;
  }
  if (!name) {
    // eslint-disable-next-line no-console
    console.warn("name is empty!");
    return null;
  }

  return doctors.filter((doctor) => toSlug(doctor.doctor) === name);
};

export const findDoctorByType = function findDoctorByType(
  doctors = [],
  type = ""
) {
  if (doctors.length === 0) {
    // eslint-disable-next-line no-console
    console.warn("doctors is empty!");
    return null;
  }
  if (!type) {
    // eslint-disable-next-line no-console
    console.warn("type is empty!");
    return null;
  }

  return doctors
    .filter((doctor) => doctor.type === type)
    .map(createPopulateDoctorWithInstitution());
};

export const findDoctorByTypeAndSlugifyName =
  function findDoctorByTypeAndSlugifyName(doctors = [], type = "", name = "") {
    if (doctors.length === 0) {
      // eslint-disable-next-line no-console
      console.warn("doctors is empty!");
      return null;
    }
    if (!type) {
      // eslint-disable-next-line no-console
      console.warn("type is empty!");
      return null;
    }
    if (!name) {
      // eslint-disable-next-line no-console
      console.warn("name is empty!");
      return null;
    }

    return doctors.filter(
      (doctor) =>
        slugify(doctor.doctor, { lower: true, remove: /[*+~.()'"!:@]/g }) ===
          name && doctor.type === type
    );
  };
