import {
  ALLOWED_HTTP_METHODS,
  DOCTOR_TYPES,
  RATE_LIMIT_ATTEMPTS,
  RATE_LIMIT_CACHE_TOKEN,
  RATE_LIMIT_INTERVAL,
  RATE_LIMIT_UNIQUE_TOKEN_PER_INTERVAL,
} from '../../../../constants/common';
import { getDoctorData, getNowToLocaleString } from '../../../../lib';
import {
  withExceptionFilter,
  withMethodsGuard,
  withMiddleware,
} from '../../../../lib/apiMiddlewarePiping';
import rateLimit from '../../../../lib/rateLimit';

const limiter = rateLimit({
  interval: RATE_LIMIT_INTERVAL,
  uniqueTokenPerInterval: RATE_LIMIT_UNIQUE_TOKEN_PER_INTERVAL,
});

export default async function doctorTypeV1(req, res) {
  const doctorTypeV1Handler = async () => {
    const { query } = req;
    const { type } = query;

    if (!DOCTOR_TYPES.includes(type)) {
      const error = new Error('Invalid doctor type');
      return res.status(404).send({
        success: false,
        error: { code: 404, message: error.message },
        metadata: { url: req.url, time: getNowToLocaleString() },
      });
    }

    return res.status(200).json(
      await getDoctorData({
        type,
        field: '',
        value: '',
        isSlug: false,
      })
    );
  };

  const handler = withMiddleware(
    limiter.check(req, res, RATE_LIMIT_ATTEMPTS, RATE_LIMIT_CACHE_TOKEN),
    withMethodsGuard(ALLOWED_HTTP_METHODS),
    doctorTypeV1Handler
  );

  return withExceptionFilter(req, res)(handler);
}
