import Papa from 'papaparse';

import {
  ALLOWED_HTTP_METHODS,
  RATE_LIMIT_ATTEMPTS,
  RATE_LIMIT_CACHE_TOKEN,
  RATE_LIMIT_ERROR_CODE,
  RATE_LIMIT_ERROR_MESSAGE,
  RATE_LIMIT_INTERVAL,
  RATE_LIMIT_UNIQUE_TOKEN_PER_INTERVAL,
} from '../../../../constants/common';
import {
  INSTITUTIONS_CSV_URL,
  INSTITUTIONS_TS_URL,
} from '../../../../constants/csvURL';
import { getNowToLocaleString } from '../../../../lib';
import {
  withMiddleware,
  withMethodsGuard,
  withExceptionFilter,
} from '../../../../lib/apiMiddlewarePiping';
import rateLimit from '../../../../lib/rateLimit';

const cache = new Map();

const limiter = rateLimit({
  interval: RATE_LIMIT_INTERVAL,
  uniqueTokenPerInterval: RATE_LIMIT_UNIQUE_TOKEN_PER_INTERVAL,
});

// TODO Error handling
export default async function institutions(req, res) {
  const institutionsHandler = async () => {
    const metadata = { url: req.url, time: getNowToLocaleString() };
    try {
      await limiter.check(res, RATE_LIMIT_ATTEMPTS, RATE_LIMIT_CACHE_TOKEN);
    } catch {
      return res.status(RATE_LIMIT_ERROR_CODE).json({
        success: false,
        error: {
          code: RATE_LIMIT_ERROR_CODE,
          message: RATE_LIMIT_ERROR_MESSAGE,
        },
        metadata,
      });
    }

    const responseTs = await fetch(INSTITUTIONS_TS_URL);
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

    const response = await fetch(INSTITUTIONS_CSV_URL);
    const text = await response.text();
    const result = Papa.parse(text, { header: true });
    const { data } = result;

    cache.clear();
    cache.set(ts, data);

    return res.status(200).json({
      data,
      success: true,
      updatedAt: ts,
      metadata: { ...metadata, cache: false, length: data.length },
    });
  };

  const handler = withMiddleware(
    withMethodsGuard(ALLOWED_HTTP_METHODS),
    institutionsHandler
  );

  return withExceptionFilter(req, res)(handler);
}
