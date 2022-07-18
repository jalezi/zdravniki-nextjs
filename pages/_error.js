import Link from 'next/link';

import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';

import SEO from '../components/SEO';
import ErrorLayout from '../layouts/ErrorLayout';

function Error({ statusCode }) {
  const { t } = useTranslation('common');
  const { description } = t('seo', { returnObjects: true });
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

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res.statusCode ?? err.statusCode ?? 404;
  return { statusCode };
};

export default Error;

Error.propTypes = {
  statusCode: PropTypes.number.isRequired,
};
