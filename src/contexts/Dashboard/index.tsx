import React, {useContext, createContext, useState} from "react";

export const DashboardContext = createContext({});

export const useDashboard = () => useContext<{
  dashboardDetails?: object;
  setDashboardDetails?: (text: object) => void;
}>(DashboardContext);


type DashboardProviderProps = {
  children?: React.ReactNode;
};

export const DashboardProvider: React.FC<DashboardProviderProps> = ({children}) => {

  const [dashboardDetails, setDashboardDetails] = useState({});

  return (
    <DashboardContext.Provider
      value={{
        dashboardDetails,
        setDashboardDetails,
      }}>
      {children}
    </DashboardContext.Provider>
  );
};

