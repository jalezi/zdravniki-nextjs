import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { useEffect } from 'react';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SEO from '../../components/SEO';

const LanguagePageMDX = dynamic(() =>
  import('../../components/LanguagePageMDX')
);
const MDXLayout = dynamic(() => import('../../layouts/MDXLayout'));

export async function getStaticProps({ locale }) {
  if (locale === 'default') {
    return { notFound: true };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'header', 'seo'])),
      // Will be passed to the page component as props
    },
  };
}

export default function About() {
  const router = useRouter();
  const { t: tSEO } = useTranslation('seo');
  const titles = tSEO('title', { returnObjects: true });
  const title = titles.about || titles.default;
  const description = tSEO('description');

  useEffect(() => {
    document.querySelectorAll('main a').forEach(el => {
      if (/^(https?:)?\/\//.test(el.getAttribute('href'))) {
        el.setAttribute('target', '_blank');
      }
    });
  }, []);

  return (
    <>
      <SEO title={title} description={description} />
      <MDXLayout>
        <LanguagePageMDX slug="about" name={router.locale} />
      </MDXLayout>
    </>
  );
}
