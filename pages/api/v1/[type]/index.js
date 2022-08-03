import {
  ALLOWED_HTTP_METHODS,
  DOCTOR_TYPES,
} from '../../../../constants/common';
import { getDoctorData } from '../../../../lib';
import {
  withExceptionFilter,
  withMethodsGuard,
  withMiddleware,
} from '../../../../lib/apiMiddlewarePiping';

export default async function doctorTypeV1(req, res) {
  const doctorTypeV1Handler = async () => {
    const { query } = req;
    const { type } = query;

    if (!DOCTOR_TYPES.includes(type)) {
      const error = new Error('Invalid doctor type');
      return res.status(404).send({
        success: false,
        error: { code: 404, message: error.message },
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
    withMethodsGuard(ALLOWED_HTTP_METHODS),
    doctorTypeV1Handler
  );

  return withExceptionFilter(req, res)(handler);
}
