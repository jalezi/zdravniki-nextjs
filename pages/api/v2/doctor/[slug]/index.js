import { BASE_URL } from '../../../../../config';
import { DOCTORS_TS_URL } from '../../../../../constants/csvURL';
import { getNowToLocaleString } from '../../../../../lib';

const cache = new Map();

const notExistCache = new Map();

const NOT_FOUND_MAP_VALUE = '404 - Not Found';

// TODO Error handling
export default async function handler(req, res) {
  const { slug } = req.query;
  const metadata = { url: req.url, time: getNowToLocaleString() };

  const responseTs = await fetch(DOCTORS_TS_URL);
  const ts = await responseTs.json();
  const isInNotExistCache = Boolean(notExistCache.get(slug)?.get(ts));

  if (isInNotExistCache) {
    const error = new Error("Doctor with this slug doesn't exist");
    return res.status(200).json({
      success: false,
      error: { code: 404, message: error.message },
      metadata: { ...metadata, cached: true },
    });
  }

  const cached = cache.get(slug)?.get(ts);

  if (cached?.length) {
    return res.status(200).json({
      data: cached,
      slug,
      success: true,
      updatedAt: ts,
      metadata: { ...metadata, cached: true, length: cached.length },
    });
  }

  const response = await fetch(`${BASE_URL}/api/v2/doctors`);
  const { data } = await response.json();
  const doctors = data.filter(doctor => doctor.nameSlug === slug);

  if (doctors.length === 0) {
    notExistCache.set(slug, new Map([[ts, NOT_FOUND_MAP_VALUE]]));

    const error = new Error("Doctor with this slug doesn't exist");
    return res.status(200).json({
      success: false,
      error: { code: 404, message: error.message },
      metadata: { ...metadata, cached: false },
    });
  }

  cache.set(slug, new Map([[ts, doctors]]));

  return res.status(200).json({
    data: doctors,
    success: true,
    updatedAt: ts,
    metadata: { ...metadata, cached: false, length: doctors.length },
  });
}
