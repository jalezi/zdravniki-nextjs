import Papa from 'papaparse';

import {
  ALLOWED_HTTP_METHODS,
  RATE_LIMIT_ATTEMPTS,
  RATE_LIMIT_CACHE_TOKEN,
  RATE_LIMIT_INTERVAL,
  RATE_LIMIT_UNIQUE_TOKEN_PER_INTERVAL,
} from '../../../../constants/common';
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
import rateLimit from '../../../../lib/rateLimit';

const cache = new Map();

const limiter = rateLimit({
  interval: RATE_LIMIT_INTERVAL,
  uniqueTokenPerInterval: RATE_LIMIT_UNIQUE_TOKEN_PER_INTERVAL,
});

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
    limiter.check(req, res, RATE_LIMIT_ATTEMPTS, RATE_LIMIT_CACHE_TOKEN),
    withMethodsGuard(ALLOWED_HTTP_METHODS),
    doctorsHandler
  );

  return withExceptionFilter(req, res)(handler);
}
