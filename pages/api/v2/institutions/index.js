import Papa from 'papaparse';

import { ALLOWED_HTTP_METHODS } from '../../../../constants/common';
import {
  INSTITUTIONS_CSV_URL,
  INSTITUTIONS_TS_URL,
} from '../../../../constants/csvURL';
import { getNowToLocaleString } from '../../../../lib';
import {
  withMiddleware,
  withMethodsGuard,
  withExceptionFilter,
} from '../../../../lib/apiMiddlewarePiping';

const cache = new Map();

// TODO Error handling
export default async function institutions(req, res) {
  const institutionsHandler = async () => {
    const metadata = { url: req.url, time: getNowToLocaleString() };

    const responseTs = await fetch(INSTITUTIONS_TS_URL);
    const ts = await responseTs.json();

    const cached = cache.get(ts);

    if (cached?.length) {
      return res.status(200).json({
        data: cached,
        success: true,
        updatedAt: ts,
        metadata: { ...metadata, cached: true, length: cached.length },
      });
    }

    const response = await fetch(INSTITUTIONS_CSV_URL);
    const text = await response.text();
    const result = Papa.parse(text, { header: true });
    const { data } = result;

    cache.clear();
    cache.set(ts, data);

    return res.status(200).json({
      data,
      success: true,
      updatedAt: ts,
      metadata: { ...metadata, cache: false, length: data.length },
    });
  };

  const handler = withMiddleware(
    withMethodsGuard(ALLOWED_HTTP_METHODS),
    institutionsHandler
  );

  return withExceptionFilter(req, res)(handler);
}
