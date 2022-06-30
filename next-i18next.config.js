// https://nextjs.org/docs/advanced-features/i18n-routing#prefixing-the-default-locale
/**
 * For example, here's a next.config.js file with support for a few languages. Note the "default" locale has been added intentionally.
 */

module.exports = {
  i18n: {
    locales: ['default', 'sl', 'en', 'it'],
    defaultLocale: 'default',
    localeDetection: false,
    fallbackLng: 'sl',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    supportedLngs: ['sl', 'en', 'it'],
    preload: true,
  },
};
