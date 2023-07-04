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
  FETCH_MY_SHIFTS_FAILURE,
  RESET_REDUCER,
  GET_EMPLOYEE_WITH_SHIFTS,
  GET_EMPLOYEE_WITH_SHIFTS_SUCCESS,
  GET_EMPLOYEE_WITH_SHIFTS_FAILURE,
  POST_EMPLOYEE_SHIFT_CHANGE,
  POST_EMPLOYEE_SHIFT_CHANGE_SUCCESS,
  POST_EMPLOYEE_SHIFT_CHANGE_FAILURE,
  GET_SHIFT_REQUESTED_EMPLOYEES,
  GET_SHIFT_REQUESTED_EMPLOYEES_SUCCESS,
  GET_SHIFT_REQUESTED_EMPLOYEES_FAILURE,
  GET_SHIFT_REQUESTED_STATUS,
  GET_SHIFT_REQUESTED_STATUS_SUCCESS,
  GET_SHIFT_REQUESTED_STATUS_FAILURE,
  POST_REQUEST_SHIFT_CHANGE,
  POST_REQUEST_SHIFT_CHANGE_SUCCESS,
  POST_REQUEST_SHIFT_CHANGE_FAILURE,
  POST_CHANGE_SHIFT_CHANGE,
  POST_CHANGE_SHIFT_CHANGE_SUCCESS,
  POST_CHANGE_SHIFT_CHANGE_FAILURE,
  CURRENT_STATUS_TYPE,
  DESIGNATION_GROUP_DETAILS,
  GET_HFWS_BRANCH_SHIFT,
  GET_HFWS_BRANCH_SHIFT_SUCCESS,
  GET_HFWS_BRANCH_SHIFT_FAILURE
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


/**
* set Logout
*/

export const resetShiftManagement = () => {
  return {
    type: RESET_REDUCER,
  };
};

// get Employee with shifts

export const getEmployeeWithShift = (type) => {
  return {
    type: GET_EMPLOYEE_WITH_SHIFTS,
    payload: type,
  };
};

export const getEmployeeWithShiftSuccess = (response) => {
  return {
    type: GET_EMPLOYEE_WITH_SHIFTS_SUCCESS,
    payload: response,
  };
};

export const getEmployeeWithShiftFailure = (error) => {
  return {
    type: GET_EMPLOYEE_WITH_SHIFTS_FAILURE,
    payload: error,
  };
};


// Change Employee Shifts 

export const postEmployeeShiftChange = (type) => {
  return {
    type: POST_EMPLOYEE_SHIFT_CHANGE,
    payload: type,
  };
};

export const postEmployeeShiftChangeSuccess = (response) => {
  return {
    type: POST_EMPLOYEE_SHIFT_CHANGE_SUCCESS,
    payload: response,
  };
};

export const postEmployeeShiftChangeFailure = (error) => {
  return {
    type: POST_EMPLOYEE_SHIFT_CHANGE_FAILURE,
    payload: error,
  };
};

/**
 * employees Shift request
 */

export const getShiftRequestedEmployees = (type) => {
  return {
    type: GET_SHIFT_REQUESTED_EMPLOYEES,
    payload: type,
  };
};

export const getShiftRequestedEmployeesSuccess = (response) => {
  return {
    type: GET_SHIFT_REQUESTED_EMPLOYEES_SUCCESS,
    payload: response,
  };
};

export const getShiftRequestedEmployeesFailure = (error) => {
  return {
    type: GET_SHIFT_REQUESTED_EMPLOYEES_FAILURE,
    payload: error,
  };
};


/**
 * employee Shift request Status
 */

export const getShiftRequestedStatus = (type) => {
  return {
    type: GET_SHIFT_REQUESTED_STATUS,
    payload: type,
  };
};

export const getShiftRequestedStatusSuccess = (response) => {
  return {
    type: GET_SHIFT_REQUESTED_STATUS_SUCCESS,
    payload: response,
  };
};

export const getShiftRequestedStatusFailure = (error) => {
  return {
    type: GET_SHIFT_REQUESTED_STATUS_FAILURE,
    payload: error,
  };
};

/**
 POST_REQUEST_SHIFT_CHANGE
 * 
 */

export const postRequestShiftChange = (params) => {
  return {
    type: POST_REQUEST_SHIFT_CHANGE,
    payload: params,
  };
};

export const postRequestShiftChangeSuccess = (response) => {
  return {
    type: POST_REQUEST_SHIFT_CHANGE_SUCCESS,
    payload: response,
  };
};

export const postRequestShiftChangeFailure = (error) => {
  return {
    type: POST_REQUEST_SHIFT_CHANGE_FAILURE,
    payload: error,
  };
};


/**
 * CHANGE_SHIFT_CHANGE
 */

export const postChangeShiftChange = (params) => {
  return {
    type: POST_CHANGE_SHIFT_CHANGE,
    payload: params,
  };
};

export const postChangeShiftChangeSuccess = (response) => {
  return {
    type: POST_CHANGE_SHIFT_CHANGE_SUCCESS,
    payload: response,
  };
};

export const postChangeShiftChangeFailure = (error) => {
  return {
    type: POST_CHANGE_SHIFT_CHANGE_FAILURE,
    payload: error,
  };
};


/**
 * current status type in shift request
 */

export const setCurrentStatusType = (type) => {
  return {
    type: CURRENT_STATUS_TYPE,
    payload: type,
  };
};


// DESIGNATION_GROUP_DETAILS


export const getDesignationGroup = (data) => {
  return {
    type: DESIGNATION_GROUP_DETAILS,
    payload: data,
  };
};

// getHfwsStartEndTime

export const getHfwsBranchShift = (params) => {
  return {
    type: GET_HFWS_BRANCH_SHIFT,
    payload: params,
  };
};

export const getHfwsBranchShiftSuccess = (response) => {
  return {
    type: GET_HFWS_BRANCH_SHIFT_SUCCESS,
    payload: response,
  };
};

export const getHfwsBranchShiftFailure = (error) => {
  return {
    type: GET_HFWS_BRANCH_SHIFT_FAILURE,
    payload: error,
  };
};
