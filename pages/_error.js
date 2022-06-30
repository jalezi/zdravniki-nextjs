import Link from 'next/link';

import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';

import ErrorLayout from '../layouts/ErrorLayout';

function Error({ statusCode, url }) {
  const { t } = useTranslation('common');
  const { description } = t('head', { returnObjects: true });
  const { link, client, server, seoTitle, h1 } = t('_error', {
    returnObjects: true,
    statusCode,
  });

  return (
    <ErrorLayout title={seoTitle} description={description} url={url}>
      <h1>{h1}</h1>
      <p>{statusCode ? server : client}</p>
      <Link href="/">{link}</Link>
    </ErrorLayout>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res.statusCode ?? err.statusCode ?? 404;
  return { statusCode };
};

export default Error;

Error.propTypes = {
  statusCode: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
};
