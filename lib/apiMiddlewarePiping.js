// credits:
// https://giancarlobuomprisco.com/next/handling-api-errors-in-nextjs
// https://giancarlobuomprisco.com/next/middleware-pipes-nextjs

/* eslint-disable no-console */
import { getNowToLocaleString } from '.';
import {
  getExceptionMessage,
  getExceptionStack,
  getExceptionStatus,
} from './exceptions';

export function withMethodsGuard(methods = ['GET']) {
  return function methodsGuard(req, res) {
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

export function withExceptionFilter(req, res) {
  return async function expections(handler) {
    try {
      return await handler(req, res);
    } catch (exception) {
      const { url, headers } = req;

      const statusCode = getExceptionStatus(exception);
      const message = getExceptionMessage(exception);
      const stack = getExceptionStack(exception);

      // eslint-disable-next-line prefer-destructuring, dot-notation
      const referer = headers['referer'];
      const userAgent = headers['user-agent'];

      // this is the context being logged
      const requestContext = {
        url,
        referer,
        userAgent,
        message,
      };

      // edit the message according to your preferences
      const exceptionMessage = `An unhandled exception occurred.`;

      console.error(requestContext, exceptionMessage);

      // if we are able to retrieve the stack, we add it to the debugging logs
      if (stack) {
        console.log(stack);
      }

      const timestamp = new Date().toISOString();
      const metadata = { url: req.url, time: getNowToLocaleString() };

      // return just enough information without leaking any data
      const responseBody = {
        statusCode,
        timestamp,
        metadata,
      };

      return res.status(statusCode).send(responseBody);
    }
  };
}
