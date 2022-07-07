import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import { SWRConfig } from 'swr';

import { getDoctorData } from '../../lib';
import nextI18NextConfig from '../../next-i18next.config';
import { DoctorPropType } from '../../types';
// import { DOCTOR_TYPES } from '../../constants/common';

const DoctorCard = dynamic(() => import('../../components/DoctorCard'));
const Header = dynamic(() => import('../../components/Header'));
const SEO = dynamic(() => import('../../components/SEO'));

const StyledMain = styled.main`
  height: calc(100% - ${({ theme }) => theme.mobileHeaderHeight});

  @media only screen and (min-width: 768px) {
    height: calc(100% - ${({ theme }) => theme.headerHeight});
  }
`;

export async function getStaticPaths() {
  const { doctors } = await getDoctorData({
    type: '',
    field: '',
    value: '',
    isSlug: '',
  });

  const locales = ['sl', 'en', 'it'];

  const gp = doctors.filter(dr => dr.type === 'gp');
  const ped = doctors.filter(dr => dr.type === 'ped');
  const gyn = doctors.filter(dr => dr.type === 'gyn');
  const den = doctors.filter(dr => dr.type === 'den');
  const denS = doctors.filter(dr => dr.type === 'den-s');
  const denY = doctors.filter(dr => dr.type === 'den');

  const pathsGP = locales
    .map(locale => ({
      params: { type: 'gp', doctorName: gp[0].nameSlug },
      locale,
    }))
    .flat(Infinity);
  const pathsPED = locales
    .map(locale => ({
      params: { type: 'ped', doctorName: ped[0].nameSlug },
      locale,
    }))
    .flat(Infinity);
  const pathsGYN = locales
    .map(locale => ({
      params: { type: 'gyn', doctorName: gyn[0].nameSlug },
      locale,
    }))
    .flat(Infinity);
  const pathsDEN = locales
    .map(locale => ({
      params: { type: 'den', doctorName: den[0].nameSlug },
      locale,
    }))
    .flat(Infinity);
  const pathsDENS = locales
    .map(locale => ({
      params: { type: 'den-s', doctorName: denS[0].nameSlug },
      locale,
    }))
    .flat(Infinity);
  const pathsDENY = locales
    .map(locale => ({
      params: { type: 'den-y', doctorName: denY[0].nameSlug },
      locale,
    }))
    .flat(Infinity);

  const paths = [
    ...pathsGP,
    ...pathsPED,
    ...pathsGYN,
    ...pathsDENY,
    ...pathsDENS,
    ...pathsDEN,
  ].flat(Infinity);

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ locale, params }) {
  if (locale === 'default') {
    return { notFound: true };
  }

  const slug = params.doctorName;
  const { doctors, updatedAt } = await getDoctorData({
    type: params.type,
    field: 'doctor',
    value: slug,
    isSlug: true,
  });

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'header'])),
      // Will be passed to the page component as props
      fallback: {
        [`/api/${params.type}/${slug}`]: {
          doctors,
          updatedAt,
        },
      },
      nextI18NextConfig,
    },
    revalidate: 1,
  };
}

const fetcher = async (resource, init) => {
  const res = await fetch(resource, init);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data;
};

export default function DoctorName({ fallback }) {
  const { t } = useTranslation('common');
  const { title, description } = t('head', { returnObjects: true });
  const router = useRouter();

  if (!fallback) {
    // eslint-disable-next-line no-console
    console.log('FALLBACK NULL');
    return null;
  }

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const goBack = () => {
    router.back();
  };

  return (
    <>
      <SEO title={title} description={description} />
      <Header />
      <StyledMain>
        <SWRConfig value={{ fallback, fetcher, refreshInterval: 30_000 }}>
          <DoctorCard />
        </SWRConfig>
        <button type="button" onClick={goBack} style={{ cursor: 'pointer' }}>
          Nazaj
        </button>
      </StyledMain>
    </>
  );
}

DoctorName.defaultProps = { fallback: undefined };

DoctorName.propTypes = {
  fallback: PropTypes.shape({
    doctors: PropTypes.arrayOf(DoctorPropType),
    updatedAt: PropTypes.number,
  }),
};
