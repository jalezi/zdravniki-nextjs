// https://github.com/vercel/next.js/blob/canary/examples/api-routes-rate-limit/utils/rate-limit.ts
import LRU from 'lru-cache';

import { getNowToLocaleString } from '.';
import {
  RATE_LIMIT_ERROR_CODE,
  RATE_LIMIT_ERROR_MESSAGE,
  RATE_LIMIT_RESET_TIME,
} from '../constants/common';

export default function rateLimit(options) {
  const tokenCache = new LRU({
    max: options?.uniqueTokenPerInterval || 500,
    ttl: options?.interval || 60000,
  });

  let timeout;
  return {
    check: (req, res, limit, token) => async () => {
      const tokenCount = tokenCache.get(token) || [0];
      if (tokenCount[0] === 0) {
        tokenCache.set(token, tokenCount);
      }
      tokenCount[0] += 1;

      const currentUsage = tokenCount[0];
      const isRateLimited = currentUsage >= limit;
      res.setHeader('X-RateLimit-Limit', limit);
      res.setHeader(
        'X-RateLimit-Remaining',
        isRateLimited ? 0 : limit - currentUsage
      );

      if (isRateLimited) {
        if (timeout) {
          clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
          tokenCache.set(token, [-1]);
        }, RATE_LIMIT_RESET_TIME);

        const metadata = { url: req.url, time: getNowToLocaleString() };

        return res.status(RATE_LIMIT_ERROR_CODE).json({
          success: false,
          error: {
            code: RATE_LIMIT_ERROR_CODE,
            message: RATE_LIMIT_ERROR_MESSAGE,
          },
          metadata,
        });
      }

      return undefined;
    },
  };
}
