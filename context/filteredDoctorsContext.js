import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import PropTypes from 'prop-types';
import useSWR from 'swr';

import { fetchJson, sortByField } from '../lib';
import { ChildrenPropType, DoctorPropType } from '../types';

const FilteredDoctorsContext = createContext();

export const FilteredDoctorsConsumer = FilteredDoctorsContext.Consumer;

const FilteredDoctorsProvider = function FilteredDoctorsProvider({
  children,
  type,
  doctors,
}) {
  const [filteredDoctors, setFilteredDoctors] = useState([]);

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
    setFilteredDoctors(sortedDoctors);
  }, [sortedDoctors]);

  const value = useMemo(
    () => ({
      doctors: sortedDoctors,
      filteredDoctors,
      setFilteredDoctors,
      error,
    }),
    [sortedDoctors, filteredDoctors, error]
  );

  return (
    <FilteredDoctorsContext.Provider value={value}>
      {children}
    </FilteredDoctorsContext.Provider>
  );
};

FilteredDoctorsProvider.propTypes = {
  children: ChildrenPropType.isRequired,
  type: PropTypes.string.isRequired,
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
