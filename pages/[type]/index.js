import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { PropTypes } from 'prop-types';

import { DOCTOR_TYPES } from '../../constants/common';
import { DoctorPropType } from '../../types';

const SEO = dynamic(() => import('../../components/SEO'));
const Doctors = dynamic(() => import('../../components/Doctors'));
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
const FilteredDoctorsProvider = dynamic(() =>
  import('../../context/filteredDoctorsContext').then(
    mod => mod.FilteredDoctorsProvider
  )
);

export async function getStaticPaths() {
  const paths = ['sl', 'en', 'it']
    .map(locale => DOCTOR_TYPES.map(type => ({ params: { type }, locale })))
    .flat(Infinity);

  return { paths, fallback: false };
}
export async function getStaticProps({ locale }) {
  if (locale === 'default') {
    return { notFound: true };
  }

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
    },
    revalidate: 1,
  };
}

export default function DoctorsByTpe({ doctors }) {
  const MapWithNoSSR = dynamic(() => import('../../components/Map'), {
    ssr: false,
  });

  const { query } = useRouter();
  const { type } = query;

  // eslint-disable-next-line no-console
  console.log(query);

  const { t: tSEO } = useTranslation('seo');

  const titles = tSEO('title', { returnObjects: true });
  const title = titles[type] || titles.default;
  const description = tSEO('description');

  const [drType, ageGroup = ''] = type.split('-');

  return (
    <>
      <SEO title={title} description={description} />
      <HomeLayout>
        <FilteredDoctorsProvider type={drType} doctors={doctors}>
          <MapContainer>
            <MapWithNoSSR />
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
              <Doctors />
            </ToggleFiltersProvider>
          </ToggleProvider>
        </FilteredDoctorsProvider>
      </HomeLayout>
    </>
  );
}

DoctorsByTpe.propTypes = {
  doctors: PropTypes.arrayOf(DoctorPropType.isRequired).isRequired,
};
