import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { useMemo } from 'react';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { PropTypes } from 'prop-types';
import useSWR from 'swr';

import { DOCTOR_TYPES } from '../../constants/common';
import { getDoctorData, sortByField } from '../../lib';
import { DoctorPropType } from '../../types';

const SEO = dynamic(() => import('../../components/SEO'));
const Doctors = dynamic(() => import('../../components/Doctors'));
const Error = dynamic(() => import('../_error'));
const Filters = dynamic(() => import('../../components/Filters'));
const HomeLayout = dynamic(() => import('../../layouts/HomeLayout'));
const MapContainer = dynamic(() =>
  import('../../layouts/HomeLayout/styles').then(mod => mod.MapContainer)
);
const ToggleProvider = dynamic(() =>
  import('../../context/toggleContext').then(mod => mod.ToggleProvider)
);
const ToggleFiltersProvider = dynamic(() =>
  import('../../context/toggleFiltersContext').then(
    mod => mod.ToggleFiltersProvider
  )
);

export async function getStaticPaths() {
  const paths = ['sl', 'en', 'it']
    .map(locale => DOCTOR_TYPES.map(type => ({ params: { type }, locale })))
    .flat(Infinity);

  return { paths, fallback: false };
}
export async function getStaticProps({ locale, params }) {
  if (locale === 'default') {
    return { notFound: true };
  }

  const { updatedAt } = await getDoctorData({ type: params.type });

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'header',
        'map',
        'seo',
      ])),
      // Will be passed to the page component as props
      doctors: [],
      updatedAt,
    },
    revalidate: 1,
  };
}

const fetcher = async fetchUrl => {
  const res = await fetch(fetchUrl);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data;
};

export default function DoctorsByTpe({ doctors, updatedAt }) {
  const MapWithNoSSR = dynamic(() => import('../../components/Map'), {
    ssr: false,
  });

  const { query } = useRouter();
  const { type } = query;

  const { t: tSEO } = useTranslation('seo');

  const { data, error } = useSWR(`/api/v1/${type}`, fetcher, {
    fallbackData: { doctors, updatedAt },
    // refreshInterval: 30_000,
    // ? use onErrorRetry
  });

  const sortedDoctors = useMemo(
    () => data.doctors.sort(sortByField('name')),
    [data.doctors]
  );

  if (error) {
    // TODO use some kind of logger for error.status
    return <Error statusCode={error.status || 500} />;
  }

  const titles = tSEO('title', { returnObjects: true });
  const title = titles[type] || titles.default;
  const description = tSEO('description');

  const [drType, ageGroup = ''] = type.split('-');

  return (
    <>
      <SEO title={title} description={description} />
      <HomeLayout>
        <MapContainer>
          <MapWithNoSSR doctors={sortedDoctors} />
        </MapContainer>
        <ToggleProvider initialValue={false}>
          <ToggleFiltersProvider
            initialValue={{
              drType,
              ageGroup,
              accepts: '',
              searchValue: '',
            }}
          >
            <Filters />
            <Doctors doctors={sortedDoctors} />
          </ToggleFiltersProvider>
        </ToggleProvider>
      </HomeLayout>
    </>
  );
}

DoctorsByTpe.propTypes = {
  doctors: PropTypes.arrayOf(DoctorPropType.isRequired).isRequired,
  updatedAt: PropTypes.number.isRequired,
};
