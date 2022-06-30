import PropTypes from 'prop-types';
import { createContext, useState, useContext, useMemo } from 'react';

import { ChildrenPropType } from '../types';

const toggleContext = createContext();

export const ToggleConsumer = toggleContext.Consumer;

export const ToggleProvider = function ToggleProvider({
  children,
  initialValue,
}) {
  const [state, setState] = useState(initialValue);

  const value = useMemo(() => [state, setState], [state]);
  return (
    <toggleContext.Provider value={value}>{children}</toggleContext.Provider>
  );
};

ToggleProvider.defaultProps = {
  initialValue: undefined,
};

ToggleProvider.propTypes = {
  children: ChildrenPropType.isRequired,
  initialValue: PropTypes.bool,
};

export function useToggleContext() {
  const context = useContext(toggleContext);

  if (!context) {
    throw new Error('useToggleContext must be used within a ToggleProvider');
  }
  return context;
}
