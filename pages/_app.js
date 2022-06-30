/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import Head from 'next/head';

import { appWithTranslation } from 'next-i18next';
import { ThemeProvider } from 'styled-components';

import { theme } from '../constants/theme';

import '../styles/globals.css';

// ? maybe can be moved to faq
import 'rc-tooltip/assets/bootstrap.css';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <style>
          @import
          url(https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap);
        </style>
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default appWithTranslation(MyApp);
