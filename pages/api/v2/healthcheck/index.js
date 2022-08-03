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
  INSTITUTIONS_TS_URL,
} from '../../../../constants/csvURL';
import {
  withExceptionFilter,
  withMethodsGuard,
  withMiddleware,
} from '../../../../lib/apiMiddlewarePiping';
import getPerformance from '../../../../lib/getPerformance';
import rateLimit from '../../../../lib/rateLimit';

const limiter = rateLimit({
  interval: RATE_LIMIT_INTERVAL,
  uniqueTokenPerInterval: RATE_LIMIT_UNIQUE_TOKEN_PER_INTERVAL,
});

export default async function healthcheck(req, res) {
  const healthcheckHandler = async () => {
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

    return res.status(200).json({
      status: 'ok',
      externalEndpoints,
      performance: performanceResults,
    });
  };

  const handler = withMiddleware(
    limiter.check(req, res, RATE_LIMIT_ATTEMPTS, RATE_LIMIT_CACHE_TOKEN),
    withMethodsGuard(ALLOWED_HTTP_METHODS),
    healthcheckHandler
  );

  return withExceptionFilter(req, res)(handler);
}
