import { ALLOWED_HTTP_METHODS } from '../../../../../constants/common';
import { getDoctorData } from '../../../../../lib';
import {
  withExceptionFilter,
  withMethodsGuard,
  withMiddleware,
} from '../../../../../lib/apiMiddlewarePiping';

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
    withMethodsGuard(ALLOWED_HTTP_METHODS),
    doctorNameV1Handler
  );

  return withExceptionFilter(req, res)(handler);
}
