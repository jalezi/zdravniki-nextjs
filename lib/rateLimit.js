// https://github.com/vercel/next.js/blob/canary/examples/api-routes-rate-limit/utils/rate-limit.ts
import LRU from 'lru-cache';

import { RATE_LIMIT_RESET_TIME } from '../constants/common';

export default function rateLimit(options) {
  const tokenCache = new LRU({
    max: options?.uniqueTokenPerInterval || 500,
    ttl: options?.interval || 60000,
  });

  let timeout;
  return {
    check: (res, limit, token) =>
      new Promise((resolve, reject) => {
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
            tokenCache.set(token, [0]);
          }, RATE_LIMIT_RESET_TIME);
        }

        // eslint-disable-next-line no-promise-executor-return
        return isRateLimited ? reject() : resolve();
      }),
  };
}
