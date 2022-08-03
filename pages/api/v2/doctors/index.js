import Papa from 'papaparse';

import { ALLOWED_HTTP_METHODS } from '../../../../constants/common';
import {
  DOCTORS_CSV_URL,
  DOCTORS_TS_URL,
  INSTITUTIONS_CSV_URL,
} from '../../../../constants/csvURL';
import {
  populateDoctorWithInstitution,
  getNowToLocaleString,
} from '../../../../lib';
import {
  withExceptionFilter,
  withMethodsGuard,
  withMiddleware,
} from '../../../../lib/apiMiddlewarePiping';

const cache = new Map();

// TODO Error handling
export default async function doctors(req, res) {
  const doctorsHandler = async () => {
    const metadata = { url: req.url, time: getNowToLocaleString() };

    const responseTs = await fetch(DOCTORS_TS_URL);
    const ts = await responseTs.json();
    const cached = cache.get(ts);

    if (cached?.length) {
      return res.status(200).json({
        data: cached,
        success: true,
        updatedAt: ts,
        metadata: { ...metadata, cached: true, length: cached.length },
      });
    }

    const response = await fetch(DOCTORS_CSV_URL);
    const text = await response.text();
    const result = Papa.parse(text, { header: true });
    const { data } = result;

    const responseInstitutions = await fetch(INSTITUTIONS_CSV_URL);
    const textInstitutions = await responseInstitutions.text();
    const resultInstitutions = Papa.parse(textInstitutions, { header: true });

    const { data: institutions } = resultInstitutions;

    const doctorsWithInstitutions = data
      .filter(dr => dr.doctor) // doctors' csv file has last entry with empty name
      .map(populateDoctorWithInstitution(institutions));

    cache.clear();
    cache.set(ts, doctorsWithInstitutions);

    return res.status(200).json({
      data: doctorsWithInstitutions,
      success: true,
      updatedAt: ts,
      metadata: { ...metadata, cache: false, length: data.length },
    });
  };

  const handler = withMiddleware(
    withMethodsGuard(ALLOWED_HTTP_METHODS),
    doctorsHandler
  );

  return withExceptionFilter(req, res)(handler);
}
