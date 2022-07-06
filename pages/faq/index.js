import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { Suspense } from 'react';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PropTypes from 'prop-types';

import SEO from '../../components/SEO';
import { NEXT_URL } from '../../config';
import { GlossaryPropType, QuestionPropType } from '../../types';

const Sections = dynamic(() => import('../../components/Sections'), {
  suspense: true,
});
const MDXLayout = dynamic(() => import('../../layouts/MDXLayout'));
const WaitingMDX = dynamic(() => import('../../layouts/MDXLayout/WaitingMDX'));
const Heading = dynamic(() =>
  import('../../layouts/MDXLayout/styles').then(mod => mod.H1)
);
const Notice = dynamic(() =>
  import('../../layouts/MDXLayout/styles').then(mod => mod.Notice)
);
const Error = dynamic(() => import('../_error'));

export async function getStaticProps({ locale }) {
  if (locale === 'default') {
    return { notFound: true };
  }

  const response = await fetch(
    `${process.env.CONTENT_ENDPOINT_BASE}/faq/3/?lang=${locale}`
  );
  const errorCode = response.ok ? false : response.statusCode;
  const data = await response.json();

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'header', 'faq'])),
      // Will be passed to the page component as props
      data,
      errorCode,
    },
    revalidate: 1,
  };
}

export default function Faq({ data, errorCode }) {
  const router = useRouter();
  const { t: tCommon } = useTranslation('common');
  const { t: tFaq } = useTranslation('faq');

  if (errorCode) {
    return <Error statusCode={errorCode} url={router.url} />;
  }

  const title = tFaq('seo.title');
  const description = tCommon('head.description');
  const noticeText = tFaq('notice');
  const headings = tFaq('headings', { returnObjects: true });

  return (
    <>
      <SEO title={title} description={description} url={NEXT_URL} />
      <MDXLayout>
        <Heading>{headings.title}</Heading>
        <Notice>{noticeText}</Notice>
        <Suspense fallback={<WaitingMDX />}>
          <Sections data={data} />
        </Suspense>
      </MDXLayout>
    </>
  );
}

Faq.propTypes = {
  data: PropTypes.shape({
    faq: PropTypes.arrayOf(PropTypes.shape(QuestionPropType)),
    glossary: PropTypes.arrayOf(PropTypes.shape(GlossaryPropType)),
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    resource_uri: PropTypes.string.isRequired,
  }).isRequired,
  errorCode: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]).isRequired,
};
