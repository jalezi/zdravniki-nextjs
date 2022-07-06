/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import dynamic from 'next/dynamic';

import { appWithTranslation } from 'next-i18next';

// import Layout from '../layouts/Layout';
import nextI18NextConfig from '../next-i18next.config';

import '../styles/globals.css';

// ? maybe can be moved to faq
import 'rc-tooltip/assets/bootstrap.css';

const Layout = dynamic(() => import('../layouts/Layout'));

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default appWithTranslation(MyApp, nextI18NextConfig);
