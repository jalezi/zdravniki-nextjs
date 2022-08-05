import {
  ALLOWED_HTTP_METHODS,
  RATE_LIMIT_ATTEMPTS,
  RATE_LIMIT_CACHE_TOKEN,
  RATE_LIMIT_INTERVAL,
  RATE_LIMIT_UNIQUE_TOKEN_PER_INTERVAL,
} from '../../../../constants/common';
import { DOCTORS_TS_URL } from '../../../../constants/csvURL';
import { getNowToLocaleString, getDoctorData } from '../../../../lib';
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

    const { doctors: populatedDoctors } = await getDoctorData();

    cache.clear();
    cache.set(ts, populatedDoctors);

    return res.status(200).json({
      data: populatedDoctors,
      success: true,
      updatedAt: ts,
      metadata: { ...metadata, cache: false, length: populatedDoctors.length },
    });
  };

  const handler = withMiddleware(
    limiter.check(req, res, RATE_LIMIT_ATTEMPTS, RATE_LIMIT_CACHE_TOKEN),
    withMethodsGuard(ALLOWED_HTTP_METHODS),
    doctorsHandler
  );

  return withExceptionFilter(req, res)(handler);
}
