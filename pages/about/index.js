import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { useEffect } from 'react';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PropTypes from 'prop-types';

const LanguagePageMDX = dynamic(() =>
  import('../../components/LanguagePageMDX')
);
const MDXLayout = dynamic(() => import('../../layouts/MDXLayout'));

export async function getStaticProps({ locale }) {
  const PUBLIC_URL = process.env.PUBLIC_URL ?? null;
  if (locale === 'default') {
    return { notFound: true };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'header', 'about'])),
      // Will be passed to the page component as props
      url: PUBLIC_URL,
    },
  };
}

export default function About({ url }) {
  const router = useRouter();
  const { t: tCommon } = useTranslation('common');
  const { t: tAbout } = useTranslation('about');
  const title = tAbout('seo.title');
  const description = tCommon('head.description');

  useEffect(() => {
    document.querySelectorAll('main a').forEach(el => {
      if (/^(https?:)?\/\//.test(el.getAttribute('href'))) {
        el.setAttribute('target', '_blank');
      }
    });
  }, []);

  return (
    <MDXLayout title={title} description={description} url={url}>
      <LanguagePageMDX slug="about" name={router.locale} />
    </MDXLayout>
  );
}

About.propTypes = { url: PropTypes.string.isRequired };
