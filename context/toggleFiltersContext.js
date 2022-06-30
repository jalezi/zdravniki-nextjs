import PropTypes from 'prop-types';
import { createContext, useState, useContext, useMemo } from 'react';

import { ChildrenPropType } from '../types';

const toggleFiltersContext = createContext();

export const ToggleFiltersConsumer = toggleFiltersContext.Consumer;

export const ToggleFiltersProvider = function ToggleFiltersProvider({
  children,
  initialValue,
}) {
  const [state, setState] = useState(initialValue);

  const memoState = useMemo(() => state, [state]);

  const value = useMemo(() => [memoState, setState], [memoState]);
  return (
    <toggleFiltersContext.Provider value={value}>
      {children}
    </toggleFiltersContext.Provider>
  );
};

ToggleFiltersProvider.defaultProps = {
  initialValue: undefined,
};

ToggleFiltersProvider.propTypes = {
  children: ChildrenPropType.isRequired,
  initialValue: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.exact({
      drType: PropTypes.string,
      ageGroup: PropTypes.string,
      accepts: PropTypes.string,
      searchValue: PropTypes.string,
    }),
  ]),
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
