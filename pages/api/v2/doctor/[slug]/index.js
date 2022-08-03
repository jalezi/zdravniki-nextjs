import { BASE_URL } from '../../../../../config';
import {
  ALLOWED_HTTP_METHODS,
  RATE_LIMIT_ATTEMPTS,
  RATE_LIMIT_CACHE_TOKEN,
  RATE_LIMIT_INTERVAL,
  RATE_LIMIT_UNIQUE_TOKEN_PER_INTERVAL,
} from '../../../../../constants/common';
import { DOCTORS_TS_URL } from '../../../../../constants/csvURL';
import { getNowToLocaleString } from '../../../../../lib';
import {
  withExceptionFilter,
  withMethodsGuard,
  withMiddleware,
} from '../../../../../lib/apiMiddlewarePiping';
import rateLimit from '../../../../../lib/rateLimit';

const cache = new Map();

const notExistCache = new Map();

const NOT_FOUND_MAP_VALUE = '404 - Not Found';

const limiter = rateLimit({
  interval: RATE_LIMIT_INTERVAL,
  uniqueTokenPerInterval: RATE_LIMIT_UNIQUE_TOKEN_PER_INTERVAL,
});

export default async function doctor(req, res) {
  const doctorHandler = async () => {
    const { slug } = req.query;
    const metadata = { url: req.url, time: getNowToLocaleString() };

    const responseTs = await fetch(DOCTORS_TS_URL);
    const ts = await responseTs.json();
    const isInNotExistCache = Boolean(notExistCache.get(slug)?.get(ts));

    if (isInNotExistCache) {
      const error = new Error("Doctor with this slug doesn't exist");
      return res.status(200).json({
        success: false,
        error: { code: 404, message: error.message },
        metadata: { ...metadata, cached: true },
      });
    }

    const cached = cache.get(slug)?.get(ts);

    if (cached?.length) {
      return res.status(200).json({
        data: cached,
        slug,
        success: true,
        updatedAt: ts,
        metadata: { ...metadata, cached: true, length: cached.length },
      });
    }

    const response = await fetch(`${BASE_URL}/api/v2/doctors`);
    const { data } = await response.json();
    const doctors = data.filter(dr => dr.nameSlug === slug);

    if (doctors.length === 0) {
      notExistCache.set(slug, new Map([[ts, NOT_FOUND_MAP_VALUE]]));

      const error = new Error("Doctor with this slug doesn't exist");
      return res.status(200).json({
        success: false,
        error: { code: 404, message: error.message },
        metadata: { ...metadata, cached: false },
      });
    }

    cache.set(slug, new Map([[ts, doctors]]));

    return res.status(200).json({
      data: doctors,
      success: true,
      updatedAt: ts,
      metadata: { ...metadata, cached: false, length: doctors.length },
    });
  };

  const handler = withMiddleware(
    limiter.check(req, res, RATE_LIMIT_ATTEMPTS, RATE_LIMIT_CACHE_TOKEN),
    withMethodsGuard(ALLOWED_HTTP_METHODS),
    doctorHandler
  );

  return withExceptionFilter(req, res)(handler);
}
