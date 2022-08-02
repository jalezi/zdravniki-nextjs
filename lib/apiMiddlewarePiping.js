import { getNowToLocaleString } from '.';

export function withMethodsGuard(methods = ['GET']) {
  return function neki(req, res) {
    if (!methods.includes(req.method)) {
      const metadata = { url: req.url, time: getNowToLocaleString() };
      return res.status(405).json({
        success: false,
        error: { code: 405, message: 'Method not allowed' },
        metadata,
      });
    }
    return undefined;
  };
}

/**
 * @name withMiddleware
 * @description combine multiple middleware before handling your API endpoint
 * @param middlewares
 */
export function withMiddleware(...middlewares) {
  return async function withMiddlewareHandler(req, res) {
    async function evaluateHandler(middleware, innerMiddleware) {
      // return early when the request has
      // been ended by a previous middleware
      if (res.headersSent) {
        return;
      }

      if (typeof middleware === 'function') {
        const handler = await middleware(req, res);

        if (typeof handler === 'function') {
          if (innerMiddleware) {
            await handler(innerMiddleware);

            const index = middlewares.indexOf(innerMiddleware);

            // remove inner middleware
            if (index >= 0) {
              middlewares.splice(index, 1);
            }
          } else {
            await handler();
          }
        }
      }
    }

    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < middlewares.length; index++) {
      const middleware = middlewares[index];
      const nextMiddleware = middlewares[index + 1];

      // eslint-disable-next-line no-await-in-loop
      await evaluateHandler(middleware, nextMiddleware);
    }
  };
}
