import { getNowToLocaleString } from '.';

export function withMethodsGuard(methods = ['GET']) {
  return function neki(req, res) {
    if (!methods.includes(req.method)) {
      const metadata = { url: req.url, time: getNowToLocaleString() };
      return res.status(405).json({
        success: false,
        error: { code: 405, message: 'Method not allowed' },
        metadata,
      });
    }
    return undefined;
  };
}

