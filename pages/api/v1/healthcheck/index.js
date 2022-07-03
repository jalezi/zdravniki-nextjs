import {
  DOCTORS_CSV_URL,
  DOCTORS_TS_URL,
  INSTITUTIONS_CSV_URL,
  INSTITUTIONS_TS_URL,
} from '../../../../constants/csvURL';
import getPerformance from '../../../../lib/getPerformance';

export default async function handler(_req, res) {
  const responses = await Promise.all([
    fetch(DOCTORS_TS_URL),
    fetch(INSTITUTIONS_TS_URL),
    fetch(DOCTORS_CSV_URL),
    fetch(INSTITUTIONS_CSV_URL),
  ]);

  const externalEndpoints = responses.map(response => ({
    url: response.url,
    ok: response.ok,
  }));

  let performanceResults;
  if (performance !== undefined) {
    performance.clearMarks();
    performance.clearMeasures();
    performanceResults = await getPerformance();
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self'"
  );
  res.setHeader('Content-Type', ['application/json', 'charset=utf-8']);
  res.setHeader('Strict-Transport-Security', 'max-age=31536000');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'deny');
  res.setHeader('Pragma', 'no-cache');

  res.status(200).json({
    status: 'ok',
    externalEndpoints,
    performance: performanceResults,
  });
}
