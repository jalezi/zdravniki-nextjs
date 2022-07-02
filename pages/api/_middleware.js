import { NextResponse } from 'next/server';

import { getNowToLocaleString } from '../../lib';

export default async function middleware(req) {
  const response = NextResponse.next();

  const logData = {
    time: getNowToLocaleString(),
    url: req.url,
    ip: req.ip,
    ua: req.ua,
    geo: req.geo,
  };

  // eslint-disable-next-line no-console
  console.log(logData);

  return response;
}
