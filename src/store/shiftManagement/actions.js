import { SELECTED_DAY_OBJECT } from "./actionTypes";
  
  
  export const getSelectedDayObject = (type) => {
    return {
      type: SELECTED_DAY_OBJECT,
      payload: type,
    };
  };