import Papa from "papaparse";

import { DOCTORS_CSV_URL, INSTITUTIONS_CSV_URL } from "../constants/csvURL";

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
