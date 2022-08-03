import { BASE_URL } from '../../../../../config';
import {
  ALLOWED_HTTP_METHODS,
  DOCTOR_TYPES,
} from '../../../../../constants/common';
import { DOCTORS_TS_URL } from '../../../../../constants/csvURL';
import { getNowToLocaleString } from '../../../../../lib';
import {
  withExceptionFilter,
  withMethodsGuard,
  withMiddleware,
} from '../../../../../lib/apiMiddlewarePiping';

const cache = new Map(DOCTOR_TYPES.map(type => [type, new Map()]));

// TODO Error handling
export default async function doctorsTypeV2(req, res) {
  const doctorsTypeHandlerV2 = async () => {
    const { type } = req.query;
    const metadata = { url: req.url, time: getNowToLocaleString() };

    if (DOCTOR_TYPES.includes(type)) {
      const responseTs = await fetch(DOCTORS_TS_URL);
      const ts = await responseTs.json();
      const cached = cache.get(type)?.get(ts);

      if (cached?.length) {
        return res.status(200).json({
          data: cached,
          type,
          success: true,
          updatedAt: ts,
          metadata: { ...metadata, cached: true, length: cached.length },
        });
      }

      const response = await fetch(`${BASE_URL}/api/v2/doctors`);
      const { data } = await response.json();
      const doctors = data.filter(doctor => doctor.type === type);

      cache.set(type, new Map([[ts, doctors]]));

      return res.status(200).json({
        data: doctors,
        type,
        success: true,
        updatedAt: ts,
        metadata: { ...metadata, cached: false, length: doctors.length },
      });
    }

    const error = new Error('Invalid doctor type');
    return res.status(200).send({
      success: false,
      error: { code: 404, message: error.message },
      metadata,
    });
  };

  const handler = withMiddleware(
    withMethodsGuard(ALLOWED_HTTP_METHODS),
    doctorsTypeHandlerV2
  );

  return withExceptionFilter(req, res)(handler);
}
