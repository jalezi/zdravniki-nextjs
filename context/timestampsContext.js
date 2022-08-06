import { createContext, useContext, useMemo } from 'react';

import useSWR from 'swr';

import { DOCTORS_TS_URL } from '../constants/csvURL';
import { fetchJson } from '../lib';
import { ChildrenPropType } from '../types';

const TimestampsContext = createContext();

export const TimestampsConsumer = TimestampsContext.Consumer;

const TimestampsProvider = function TimestampsProvider({ children }) {
  const { data: timestamp, error } = useSWR(DOCTORS_TS_URL, fetchJson);

  const tsInMilliseconds = timestamp ? timestamp * 1000 : 0;

  const value = useMemo(
    () => ({ timestamp: tsInMilliseconds, error }),
    [tsInMilliseconds, error]
  );

  return (
    <TimestampsContext.Provider value={value}>
      {children}
    </TimestampsContext.Provider>
  );
};

TimestampsProvider.propTypes = {
  children: ChildrenPropType.isRequired,
};

function useTimestamps() {
  const context = useContext(TimestampsContext);
  if (!context) {
    throw new Error(`useTimestamps must be used within a DoctorsProvider`);
  }
  return context;
}

export { TimestampsProvider, useTimestamps };
