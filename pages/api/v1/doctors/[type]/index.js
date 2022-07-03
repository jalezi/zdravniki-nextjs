import { DOCTOR_TYPES } from '../../../../../constants/common';
import { DOCTORS_TS_URL } from '../../../../../constants/csvURL';
import { getNowToLocaleString } from '../../../../../lib';

const cache = new Map(DOCTOR_TYPES.map(type => [type, new Map()]));

export default async function handler(req, res) {
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

    const response = await fetch(`${process.env.PUBLIC_URL}/api/v1/doctors`);
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
}
