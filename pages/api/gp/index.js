import { getDoctorData } from '../../../lib';

export default async function handler(req, res) {
  const { url } = req;

  const type = url.split('/')[2];
  res.status(200).json(
    await getDoctorData({
      type,
      field: '',
      value: '',
      isSlug: false,
    })
  );
}
