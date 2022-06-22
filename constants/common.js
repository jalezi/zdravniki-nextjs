// DOCTORS
export const PER_PAGE = 20;
export const INSTITUTION_KEY = "id_inst";
export const DOCTOR_TYPES = ["gp", "ped", "gyn", "den", "den-y", "den-s"];

// LOCATION
const ZOOM = 8;
const MIN_ZOOM = 6;
const MAX_ZOOM = 16;

const LATITUDE = 46.16;
const LONGITUDE = 14.8276214;
const SL_CENTER = [LATITUDE, LONGITUDE];

// options for navigator.geolocation.getCurrentPosition(success, error, [options])
const MAX_AGE = 3_600_000; // default is 0
const TIMEOUT = Infinity; // default is Infinity
const ENABLE_HIGH_ACCURACY = false; // default is false

const GET_CURRENT_POSITION_OPTIONS = {
  maxAge: MAX_AGE,
  timeout: TIMEOUT,
  enableHighAccuracy: ENABLE_HIGH_ACCURACY,
};

// http://bboxfinder.com/#45.421,13.355,46.895,16.638
const BOUNDS = {
  southWest: {
    lat: 45.421,
    lng: 13.355,
  },
  northEast: {
    lat: 46.894,
    lng: 16.637,
  },
};

export const MAP = {
  ZOOM,
  MIN_ZOOM,
  MAX_ZOOM,
  GEO_LOCATION: { SL_CENTER, GET_CURRENT_POSITION_OPTIONS },
  BOUNDS,
};

// INSTITUTIONS
export const DUMMY_INSTITUTION = {
  unit: "",
  name: "",
  website: "",
  phone: "",
  lat: SL_CENTER[0],
  lon: SL_CENTER[1],
  address: "",
  city: "",
  post: "0000 Neznan",
  municipalityPart: "",
  municipality: "",
};
