import React, { useContext, createContext, useState, useEffect } from "react";
import { ASYN_USER_AUTH } from '@utils'

export const AppContext = createContext({});

export const useApp = () => useContext<{
  mobileNumber?: string;
  setMobileNumber?: (text: string) => void;

  userLoggedIn?: boolean;
  setUserLoggedIn?: (text: boolean) => void;

  userDetails?: object;
  setUserDetails?: (obj: object) => void;

  isLoading?: boolean;
  setLoading?: (obj: boolean) => void;

}>(AppContext);


type AppProviderProps = {
  children?: React.ReactNode;
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {

  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [mobileNumber, setMobileNumber] = useState('');
  const [isLoading, setLoading] = useState<boolean>(false);

  // 9008313018
  /**
   * getter
   */
  useEffect(() => {
    // const localData = localStorage.getItem(ASYN_USER_AUTH);
    // const valueJ = localData != null ? JSON.parse(localData) : null;

    // if (valueJ) {
    //   setUserLoggedIn(valueJ.userLoggedIn);
    //   setUserDetails(valueJ.userDetails);
    //   setMobileNumber(valueJ.mobileNumber);
    // }
  }, []);

  /**
   * setter
   */
  // useEffect(() => {
  //   const value = {userLoggedIn, userDetails, mobileNumber};
  //   const jsonValue = JSON.stringify(value);
  //   localStorage.setItem(ASYN_USER_AUTH, jsonValue);
  // }, [mobileNumber, userDetails, userLoggedIn]);

  return (
    <AppContext.Provider
      value={{
        mobileNumber,
        setMobileNumber,
        userDetails,
        setUserDetails,
        userLoggedIn,
        setUserLoggedIn,
        isLoading,
        setLoading
      }}>
      {children}
    </AppContext.Provider>
  );
};

