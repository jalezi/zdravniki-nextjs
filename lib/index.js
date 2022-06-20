import Papa from "papaparse";
import slugify from "slugify";

import { DOCTORS_CSV_URL, INSTITUTIONS_CSV_URL } from "../constants/csvURL";

export const toSlug = function toSlug(
  text = "",
  options = { lower: true, remove: /[*+~.()'"!:@]/g }
) {
  return slugify(text, options);
};

export const fetchJson = async function fetchJson(url = "") {
  if (!url) {
    throw new Error("url is endefined!");
  }
  const response = await fetch(url);
  return response.json();
};

export const fetchRawCsv = async function fetchRawCsv(url = "") {
  if (!url) {
    throw new Error("url is endefined!");
  }
  const response = await fetch(url);
  const text = await response.text();
  return Papa.parse(text, { header: true });
};

export const fetchAllRaw = async function fetchAllRaw() {
  const [doctors, institutions] = await Promise.all([
    fetchRawCsv(DOCTORS_CSV_URL),
    fetchRawCsv(INSTITUTIONS_CSV_URL),
  ]);
  // TODO do something with errors
  const { data: doctorsData } = doctors;
  const { data: institutionsData } = institutions;
  return [doctorsData, institutionsData];
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

  return doctors.filter((doctor) => doctor.type === type);
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
          if (property in institution) {
            acc[property] = dr[property] || institution[property];
            return acc;
          }
          return acc;
        },
        { ...dr }
      );

      return populatedDr;
    };
  };
