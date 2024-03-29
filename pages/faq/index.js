import dynamic from 'next/dynamic';

import { Suspense } from 'react';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PropTypes from 'prop-types';

import SEO from '../../components/SEO';
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
const FooterInfoCard = dynamic(() => import('../../components/FooterInfo'));

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
      ...(await serverSideTranslations(locale, [
        'common',
        'header',
        'faq',
        'seo',
      ])),
      // Will be passed to the page component as props
      data,
      errorCode,
    },
    revalidate: 1,
  };
}

export default function Faq({ data, errorCode }) {
  const { t: tFaq } = useTranslation('faq');
  const { t: tSEO } = useTranslation('seo');

  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }

  const titles = tSEO('title', { returnObjects: true });
  const title = titles.faq || titles.default;
  const description = tSEO('description');

  const noticeText = tFaq('notice');
  const headings = tFaq('headings', { returnObjects: true });

  return (
    <>
      <SEO title={title} description={description} />
      <MDXLayout>
        <Heading>{headings.title}</Heading>
        <Notice>{noticeText}</Notice>
        <Suspense fallback={<WaitingMDX />}>
          <Sections data={data} />
        </Suspense>
      </MDXLayout>
      <FooterInfoCard isDrPage />
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
