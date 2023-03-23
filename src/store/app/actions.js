
import {
  SHOW_LOADER,
  HIDE_LOADER,
  SET_USER_LOGIN_DETAILS,
  RESET_REDUCER,
  NAV_INDEX,
  IS_LAUNCH,
  HIDE_OTP,
  LAUNCH_TIME,
  TIMER,
  API_CONTROL
} from "./actionsType"




export const apiControl = (action) => {
  return {
    type: API_CONTROL,
    payload: action
  };
};


// export const hideLoader = () => {
//   return {
//     type: HIDE_LOADER,
//   };
// };



export const setUserLoginDetails = (params) => {
  return {
    type: SET_USER_LOGIN_DETAILS,
    payload: params
  };
};


/**
 * 
 */

export const resetApp = () => {
  return {
    type: RESET_REDUCER,
  };
};

export const currentNavIndex = (index) => {
  return {
    type: NAV_INDEX,
    payload: index
  };
};


export const launchActive = (params) => {
  return {
    type: IS_LAUNCH,
    payload: params
  };
};


export const timerAction = (params) => {
  return {
    type: TIMER,
    payload: params
  };
};




