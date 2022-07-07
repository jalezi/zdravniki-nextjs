import Link from 'next/link';

import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';

import SEO from '../components/SEO';
import ErrorLayout from '../layouts/ErrorLayout';
import nextI18NextConfig from '../next-i18next.config';

function Error({ statusCode }) {
  const { t } = useTranslation('common');

  const { description } = t('head', { returnObjects: true });

  if (statusCode) {
    return (
      <>
        <SEO
          title="Error"
          description="Error - Something went terrible wrong"
        />
        <ErrorLayout>
          <h1>Error</h1>
          <p>Something went wrong on server!</p>
          <Link href="/">Home</Link>
        </ErrorLayout>
      </>
    );
  }

  if (!description) {
    return (
      <>
        <SEO title="Error" description="Error - translations not loaded" />
        <ErrorLayout>
          <h1>Error</h1>
          <p>Translations not loaded!</p>
          <Link href="/">Home</Link>
        </ErrorLayout>
      </>
    );
  }

  const { link, client, server, seoTitle, h1 } = t('_error', {
    returnObjects: true,
    statusCode,
  });

  return (
    <>
      <SEO title={seoTitle} description={description} />
      <ErrorLayout>
        <h1>{h1}</h1>
        <p>{statusCode ? server : client}</p>
        <Link href="/">{link}</Link>
      </ErrorLayout>
    </>
  );
}

Error.getInitialProps = async ({ res, err }) => {
  // eslint-disable-next-line no-nested-ternary
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return {
    statusCode,
    nextI18NextConfig,
  };
};

export default Error;

Error.propTypes = {
  statusCode: PropTypes.number.isRequired,
};
