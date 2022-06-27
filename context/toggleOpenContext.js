import { createContext, useState, useContext, useMemo } from "react";

import { ChildrenPropType } from "../types";

const toggleOpenContext = createContext();

export const ToggleOpenConsumer = toggleOpenContext.Consumer;

export const ToggleOpenProvider = function LeafletProvider({ children }) {
  const [open, setOpen] = useState(null);

  const value = useMemo(() => ({ open, setOpen }), [open]);
  return (
    <toggleOpenContext.Provider value={value}>
      {children}
    </toggleOpenContext.Provider>
  );
};

ToggleOpenProvider.propTypes = {
  children: ChildrenPropType.isRequired,
};

export function useToggleOpenContext() {
  const context = useContext(toggleOpenContext);

  if (!context) {
    throw new Error("useLeafletContext must be used within a LeafletProvider");
  }
  return context;
}
