
import { SHOW_LOADER, HIDE_LOADER } from "./actionsType"


export const showLoader = () => {
  console.log('showLoader=====');
  return {
    type: SHOW_LOADER,
  };
};


export const hideLoader = () => {
  return {
    type: HIDE_LOADER,
  };
};
