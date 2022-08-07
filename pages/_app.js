/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import dynamic from 'next/dynamic';

import { useState } from 'react';

import { appWithTranslation } from 'next-i18next';
import { ErrorBoundary } from 'react-error-boundary';

import nextI18NextConfig from '../next-i18next.config';

import '../styles/globals.css';

// ? maybe can be moved to faq
import 'rc-tooltip/assets/bootstrap.css';

const Layout = dynamic(() => import('../layouts/Layout'));
const TimestampsProvider = dynamic(() =>
  import('../context/timestampsContext').then(mod => mod.TimestampsProvider)
);
const AppErrorFallback = dynamic(() =>
  import('../components/Shared/ErrorBoundary/AppErrorFallback')
);

function MyApp({ Component, pageProps }) {
  const [errorInfo, setErrorInfo] = useState(null);
  return (
    <ErrorBoundary
      onError={(error, info) => {
        if (process.env.NODE_ENV === 'production') {
          // eslint-disable-next-line no-console
          console.error(error.stack);
          // eslint-disable-next-line no-console
          console.log(info);
        }
        setErrorInfo(info);
      }}
      // eslint-disable-next-line react/no-unstable-nested-components
      fallbackRender={fallbackProps => (
        <AppErrorFallback {...fallbackProps} errorInfo={errorInfo} />
      )}
    >
      <TimestampsProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </TimestampsProvider>
    </ErrorBoundary>
  );
}

export default appWithTranslation(MyApp, nextI18NextConfig);
