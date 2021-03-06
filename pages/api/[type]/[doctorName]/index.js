import { getDoctorData } from '../../../../lib';

export default async function handler(req, res) {
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
}
