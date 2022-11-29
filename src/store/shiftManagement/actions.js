import {
    POST_ADD_WEEKLY_SHIFT,
    POST_ADD_WEEKLY_SHIFT_SUCCESS,
    POST_ADD_WEEKLY_SHIFT_FAILURE
} from "./actionTypes";


export const addWeeklyShift = (type) => {
    return {
        type: POST_ADD_WEEKLY_SHIFT,
        payload: type,
    };
};
  
  export const addWeeklyShiftSuccess = (response) => {
    return {
      type: POST_ADD_WEEKLY_SHIFT_SUCCESS,
      payload: response,
    };
  };
  
  export const addWeeklyShiftFailure = (error) => {
    return {
      type: POST_ADD_WEEKLY_SHIFT_FAILURE,
      payload: error,
    };
  };