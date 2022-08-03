import {
  ALLOWED_HTTP_METHODS,
  RATE_LIMIT_ATTEMPTS,
  RATE_LIMIT_CACHE_TOKEN,
  RATE_LIMIT_INTERVAL,
  RATE_LIMIT_UNIQUE_TOKEN_PER_INTERVAL,
} from '../../../../../constants/common';
import { getDoctorData } from '../../../../../lib';
import {
  withExceptionFilter,
  withMethodsGuard,
  withMiddleware,
} from '../../../../../lib/apiMiddlewarePiping';
import rateLimit from '../../../../../lib/rateLimit';

const limiter = rateLimit({
  interval: RATE_LIMIT_INTERVAL,
  uniqueTokenPerInterval: RATE_LIMIT_UNIQUE_TOKEN_PER_INTERVAL,
});

export default async function doctorNameV1(req, res) {
  const doctorNameV1Handler = async () => {
    const { query } = req;
    const { doctorName, type } = query;

    res.status(200).json(
      await getDoctorData({
        type,
        field: 'doctor',
        value: doctorName,
        isSlug: true,
      })
    );
  };

  const handler = withMiddleware(
    limiter.check(req, res, RATE_LIMIT_ATTEMPTS, RATE_LIMIT_CACHE_TOKEN),
    withMethodsGuard(ALLOWED_HTTP_METHODS),
    doctorNameV1Handler
  );

  return withExceptionFilter(req, res)(handler);
}
