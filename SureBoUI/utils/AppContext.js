import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children, version }) => {
  const [appData, setAppData] = useState({
    version: version, // Include version in initial state
  });

  const value = {
    appData,
    setAppData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
