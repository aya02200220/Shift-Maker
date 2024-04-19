// DataContext.js
import React, { createContext, useState, useContext } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [orderData, setOrderData] = useState({});

  return (
    <DataContext.Provider value={{ orderData, setOrderData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
