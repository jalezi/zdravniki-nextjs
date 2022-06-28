import { createContext, useState, useContext, useMemo } from "react";

import { ChildrenPropType } from "../types";

const toggleContext = createContext();

export const ToggleConsumer = toggleContext.Consumer;

export const ToggleProvider = function LeafletProvider({ children }) {
  const [open, setOpen] = useState(null);

  const value = useMemo(() => [open, setOpen], [open]);
  return (
    <toggleContext.Provider value={value}>{children}</toggleContext.Provider>
  );
};

ToggleProvider.propTypes = {
  children: ChildrenPropType.isRequired,
};

export function useToggleContext() {
  const context = useContext(toggleContext);

  if (!context) {
    throw new Error("useToggleContext must be used within a ToggleProvider");
  }
  return context;
}
