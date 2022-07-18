import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import { SWRConfig } from 'swr';

import { DOCTOR_TYPES } from '../../constants/common';
import { getDoctorData } from '../../lib';
import nextI18NextConfig from '../../next-i18next.config';
import { DoctorPropType } from '../../types';

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
  return { paths: [], fallback: 'blocking' };
}

export async function getStaticProps({ locale, params }) {
  if (locale === 'default') {
    return { notFound: true };
  }

  const drType = params.type;

  if (!DOCTOR_TYPES.includes(drType)) {
    return { notFound: true };
  }

  const slug = params.doctorName;
  const { doctors, updatedAt } = await getDoctorData({
    type: drType,
    field: 'doctor',
    value: slug,
    isSlug: true,
  });

  if (!doctors) {
    return { notFound: true };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'header', 'seo'])),
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
  const { t: tSEO } = useTranslation('seo');
  const title = tSEO('title.default');
  const description = tSEO('description');

  const router = useRouter();

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
