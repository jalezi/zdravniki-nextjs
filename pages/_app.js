/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import dynamic from 'next/dynamic';

import { appWithTranslation } from 'next-i18next';

import nextI18NextConfig from '../next-i18next.config';

import '../styles/globals.css';

// ? maybe can be moved to faq
import 'rc-tooltip/assets/bootstrap.css';

const Layout = dynamic(() => import('../layouts/Layout'));
const TimestampsProvider = dynamic(() =>
  import('../context/timestampsContext').then(mod => mod.TimestampsProvider)
);

function MyApp({ Component, pageProps }) {
  return (
    <TimestampsProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </TimestampsProvider>
  );
}

export default appWithTranslation(MyApp, nextI18NextConfig);
