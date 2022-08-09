import { useRouter } from 'next/router';

import { createContext, useState, useContext, useMemo } from 'react';

import { ChildrenPropType } from '../types';

const toggleFiltersContext = createContext();

export const ToggleFiltersConsumer = toggleFiltersContext.Consumer;

export const ToggleFiltersProvider = function ToggleFiltersProvider({
  children,
}) {
  const { query } = useRouter();
  const { type } = query;

  const [drType, ageGroup = 'all'] = type.split('-');

  const [state, setState] = useState({
    drType,
    ageGroup,
    accepts: 'all',
    searchValue: '',
  });

  const memoState = useMemo(() => state, [state]);

  const value = useMemo(() => [memoState, setState], [memoState]);
  return (
    <toggleFiltersContext.Provider value={value}>
      {children}
    </toggleFiltersContext.Provider>
  );
};

ToggleFiltersProvider.propTypes = {
  children: ChildrenPropType.isRequired,
};

export function useToggleFiltersContext() {
  const context = useContext(toggleFiltersContext);

  if (!context) {
    throw new Error(
      'useToggleFiltersContext must be used within a ToggleFiltersProvider'
    );
  }
  return context;
}
