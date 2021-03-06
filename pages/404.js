import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SEO from '../components/SEO';
import * as Styled from '../layouts/ErrorLayout/styles';
import image from '../public/doctor-404.png';

const ErrorLayout = dynamic(() => import('../layouts/ErrorLayout'));

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'header',
        'pageNotFound',
        'seo',
      ])),
      // Will be passed to the page component as props
    },
  };
}

export default function Custom404() {
  const { t: tPageNotFound } = useTranslation('pageNotFound');
  const { t: tSEO } = useTranslation('seo');

  const titles = tSEO('title', { returnObjects: true });
  const title = titles.pageNotFound || titles.default;
  const description = tSEO('description');

  return (
    <>
      <SEO title={title} description={description} />
      <ErrorLayout>
        <h1>{tPageNotFound('h1')}</h1>
        <p>{tPageNotFound('text')}</p>
        <Styled.ImgWrapper>
          <Image
            alt="not found"
            src={image}
            srcSet="/doctor-404.png 1x,/doctor-404@2x.png 2x"
          />
        </Styled.ImgWrapper>
        <Link href="/">{tPageNotFound('link')}</Link>
      </ErrorLayout>
    </>
  );
}
