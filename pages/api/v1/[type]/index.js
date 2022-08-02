import { DOCTOR_TYPES } from '../../../../constants/common';
import { getDoctorData } from '../../../../lib';

export default async function handler(req, res) {
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
}
