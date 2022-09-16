
import { SHOW_LOADER, HIDE_LOADER , SET_USER_LOGIN_DETAILS} from "./actionsType"


export const showLoader = () => {
  return {
    type: SHOW_LOADER,
  };
};


export const hideLoader = () => {
  return {
    type: HIDE_LOADER,
  };
};



export const setUserLoginDetails = (params) => {
  return {
    type: SET_USER_LOGIN_DETAILS,
    payload: params
  };
};
