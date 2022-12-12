import {
    POST_ADD_WEEKLY_SHIFT,
    POST_ADD_WEEKLY_SHIFT_SUCCESS,
    POST_ADD_WEEKLY_SHIFT_FAILURE,
    FETCH_BRANCH_SHIFTS,
    FETCH_BRANCH_SHIFTS_SUCCESS,
    FETCH_BRANCH_SHIFTS_FAILURE,
    FETCH_BRANCH_WEEKLY_SHIFTS,
    FETCH_BRANCH_WEEKLY_SHIFTS_SUCCESS,
    FETCH_BRANCH_WEEKLY_SHIFTS_FAILURE,
    SELECTED_BRANCH_SHIFT_GROUP_DETAILS,
    POST_ADD_SHIFT,
    POST_ADD_SHIFT_SUCCESS,
    POST_ADD_SHIFT_FAILURE,
    SELECTED_WEEKLY_SHIFT_ID,
    FETCH_WEEKLY_SHIFT_DETAILS,
    FETCH_WEEKLY_SHIFT_DETAILS_SUCCESS,
    FETCH_WEEKLY_SHIFT_DETAILS_FAILURE,
    SELECTED_WEEKLY_SHIFT_NAME,
    FETCH_SHIFT_EMPLOYEES,
    FETCH_SHIFT_EMPLOYEES_SUCCESS,
    FETCH_SHIFT_EMPLOYEES_FAILURE,
    FETCH_MY_SHIFTS,
    FETCH_MY_SHIFTS_SUCCESS,
    FETCH_MY_SHIFTS_FAILURE
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

  //get branch shifts

  export const getBranchShifts = (type) => {
    return {
        type: FETCH_BRANCH_SHIFTS,
        payload: type,
    };
};
  
  export const getBranchShiftsSuccess = (response) => {
    return {
      type: FETCH_BRANCH_SHIFTS_SUCCESS,
      payload: response,
    };
  };
  
  export const getBranchShiftsFailure = (error) => {
    return {
      type: FETCH_BRANCH_SHIFTS_FAILURE,
      payload: error,
    };
  };

  //GET branches weekly shifts

  export const getBranchWeeklyShifts = (type) => {
    return {
        type: FETCH_BRANCH_WEEKLY_SHIFTS,
        payload: type,
    };
};
  
  export const getBranchWeeklyShiftsSuccess = (response) => {
    return {
      type: FETCH_BRANCH_WEEKLY_SHIFTS_SUCCESS,
      payload: response,
    };
  };
  
  export const getBranchWeeklyShiftsFailure = (error) => {
    return {
      type: FETCH_BRANCH_WEEKLY_SHIFTS_FAILURE,
      payload: error,
    };
  };

//set selected group name

  export const selectedShiftGroupDetails = (type) => {
    return {
      type: SELECTED_BRANCH_SHIFT_GROUP_DETAILS,
      payload: type,
    };
  };

  //add shift

  export const postAddShift = (type) => {
    return {
        type: POST_ADD_SHIFT,
        payload: type,
    };
};
  
  export const postAddShiftSuccess = (response) => {
    return {
      type: POST_ADD_SHIFT_SUCCESS,
      payload: response,
    };
  };
  
  export const postAddShiftFailure = (error) => {
    return {
      type: POST_ADD_SHIFT_FAILURE,
      payload: error,
    };
  };

  //set selected weekly shift id

  export const selectedWeeklyShiftIdAction = (type) => {
    return {
      type: SELECTED_WEEKLY_SHIFT_ID,
      payload: type,
    };
  };

  //set selected weekly shift name

  export const selectedWeeklyShiftNameAction = (type) => {
    return {
      type: SELECTED_WEEKLY_SHIFT_NAME,
      payload: type,
    };
  };

  //get weekly shift details

  export const getWeeklyShiftDetails = (type) => {
    return {
        type: FETCH_WEEKLY_SHIFT_DETAILS,
        payload: type,
    };
};
  
  export const getWeeklyShiftDetailsSuccess = (response) => {
    return {
      type: FETCH_WEEKLY_SHIFT_DETAILS_SUCCESS,
      payload: response,
    };
  };
  
  export const getWeeklyShiftDetailsFailure = (error) => {
    return {
      type: FETCH_WEEKLY_SHIFT_DETAILS_FAILURE,
      payload: error,
    };
  };

  //get shift employees group details

  export const getShiftEmployeesDetails = (type) => {
    return {
        type: FETCH_SHIFT_EMPLOYEES,
        payload: type,
    };
};
  
  export const getShiftEmployeesDetailsSuccess = (response) => {
    return {
      type: FETCH_SHIFT_EMPLOYEES_SUCCESS,
      payload: response,
    };
  };
  
  export const getShiftEmployeesDetailsFailure = (error) => {
    return {
      type: FETCH_SHIFT_EMPLOYEES_FAILURE,
      payload: error,
    };
  };

  ///get My Shifts

  export const getMyShifts = (type) => {
    return {
        type: FETCH_MY_SHIFTS,
        payload: type,
    };
};
  
  export const getMyShiftsSuccess = (response) => {
    return {
      type: FETCH_MY_SHIFTS_SUCCESS,
      payload: response,
    };
  };
  
  export const getMyShiftsFailure = (error) => {
    return {
      type: FETCH_MY_SHIFTS_FAILURE,
      payload: error,
    };
  };