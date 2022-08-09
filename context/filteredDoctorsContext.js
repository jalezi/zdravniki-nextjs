import { useRouter } from 'next/router';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import PropTypes from 'prop-types';
import useSWR from 'swr';

import { fetchJson, sortByField } from '../lib';
import filterBySearchValueInMapBounds from '../lib/filterBySearchValueInMapBounds';
import { ChildrenPropType, DoctorPropType } from '../types';

const FilteredDoctorsContext = createContext();

export const FilteredDoctorsConsumer = FilteredDoctorsContext.Consumer;

const FilteredDoctorsProvider = function FilteredDoctorsProvider({
  children,
  doctors,
}) {
  const { query } = useRouter();
  const { type } = query;

  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [map, setMap] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [accepts, setAccepts] = useState('');

  const { data, error } = useSWR(`/api/v1/${type}`, fetchJson, {
    fallbackData: { doctors },
    // refreshInterval: 30_000,
    // ? use onErrorRetry
  });

  const sortedDoctors = useMemo(
    () => data.doctors.sort(sortByField('name')),
    [data.doctors]
  );

  useEffect(() => {
    const bounds = map?.getBounds();
    if (!bounds) {
      return;
    }

    let filteredByAccepts = sortedDoctors;
    if (accepts) {
      filteredByAccepts = filteredByAccepts.filter(
        doctor => doctor.accepts === accepts
      );
    }

    setFilteredDoctors(
      filterBySearchValueInMapBounds({
        searchValue,
        filtered: filteredByAccepts,
        bounds,
      })
    );
  }, [map, searchValue, sortedDoctors, accepts]);

  const value = useMemo(
    () => ({
      doctors: sortedDoctors,
      filteredDoctors,
      setFilteredDoctors,
      error,
      map,
      setMap,
      searchValue,
      setSearchValue,
      accepts,
      setAccepts,
    }),
    [
      sortedDoctors,
      filteredDoctors,
      error,
      map,
      setMap,
      searchValue,
      setSearchValue,
      accepts,
      setAccepts,
    ]
  );

  return (
    <FilteredDoctorsContext.Provider value={value}>
      {children}
    </FilteredDoctorsContext.Provider>
  );
};

FilteredDoctorsProvider.propTypes = {
  children: ChildrenPropType.isRequired,
  doctors: PropTypes.arrayOf(DoctorPropType.isRequired).isRequired,
};

function useFilteredDoctors() {
  const context = useContext(FilteredDoctorsContext);
  if (!context) {
    throw new Error(
      `useFilteredDoctors must be used within a FilteredDoctorsProvider`
    );
  }
  return context;
}

export { FilteredDoctorsProvider, useFilteredDoctors };
