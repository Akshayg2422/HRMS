
import {
  URL_DELETE_USER,
  URL_DELETE_USER_SUCCESS,
  URL_DELETE_USER_FAIL,
  EDIT_PROFILE_PICTURE,
  EDIT_PROFILE_PICTURE_SUCCESS,
  EDIT_PROFILE_PICTURE_FAIL,
  FETCH_DEPARTMENT,
  FETCH_DEPARTMENT_SUCCESS,
  FETCH_DEPARTMENT_FAILURE,
  FETCH_DESIGNATION,
  FETCH_DESIGNATION_SUCCESS,
  FETCH_DESIGNATION_FAILURE,
  FETCH_ALL_BRANCHES_LIST,
  FETCH_ALL_BRANCHES_LIST_SUCCESS,
  FETCH_ALL_BRANCHES_LIST_FAILURE,
  FETCH_EMPLOYEE_DETAILS,
  FETCH_EMPLOYEE_DETAILS_SUCCESS,
  FETCH_EMPLOYEE_DETAILS_FAILURE,
  FETCH_EMPLOYEE_LIST,
  FETCH_EMPLOYEE_LIST_SUCCESS,
  FETCH_EMPLOYEE_LIST_FAILURE,
  POST_EMPLOYEE_ADDITION,
  POST_EMPLOYEE_ADDITION_SUCCESS,
  POST_EMPLOYEE_ADDITION_FAILURE,
  EDIT_EMPLOYEE,
  FETCH_EMPLOYEE_TIME_SHEETS,
  FETCH_EMPLOYEE_TIME_SHEETS_SUCCESS,
  FETCH_EMPLOYEE_TIME_SHEETS_FAILURE,
  FETCH_EMPLOYEE_CHECK_IN_LOGS,
  FETCH_EMPLOYEE_CHECK_IN_LOGS_SUCCESS,
  FETCH_EMPLOYEE_CHECK_IN_LOGS_FAILURE,
  FETCH_CHECK_IN_DETAILED_LOG_PER_DAY,
  FETCH_CHECK_IN_DETAILED_LOG_PER_DAY_SUCCESS,
  FETCH_CHECK_IN_DETAILED_LOG_PER_DAY_FAILURE,
  FETCH_EMPLOYEE_EACH_USER_TIME_SHEETS,
  FETCH_EMPLOYEE_EACH_USER_TIME_SHEETS_SUCCESS,
  FETCH_EMPLOYEE_EACH_USER_TIME_SHEETS_FAILURE,
  ADD_DEPARTMENT,
  ADD_DEPARTMENT_SUCCESS,
  ADD_DEPARTMENT_FAILURE,
  ADD_DESIGNATION,
  ADD_DESIGNATION_SUCCESS,
  ADD_DESIGNATION_FAILURE,
  ADD_FENCE_ADMIN,
  ADD_FENCE_ADMIN_SUCCESS,
  ADD_FENCE_ADMIN_FAILURE,
  FETCH_EMPLOYEE_ATTENDANCE_STATS,
  FETCH_EMPLOYEE_ATTENDANCE_STATS_FAILURE,
  FETCH_EMPLOYEE_ATTENDANCE_STATS_SUCCESS,
  FETCH_EMPLOYEE_TODAY_STATUS,
  FETCH_EMPLOYEE_TODAY_STATUS_SUCCESS,
  FETCH_EMPLOYEE_TODAY_STATUS_FAILURE,
  FETCH_CHECK_IN_DETAILED_LOG,
  FETCH_CHECK_IN_DETAILED_LOG_SUCCESS,
  FETCH_CHECK_IN_DETAILED_LOG_FAILURE,
  SELECTED_CARD_TYPE,
  SELECTED_DEPARTMENT_NAME,
  SELECTED_DEPARTMENT_ID,
  SELECTED_EMPLOYEE_ID,
  FETCH_ATTENDANCE_CONSOLIDATED_CARDS,
  FETCH_ATTENDANCE_CONSOLIDATED_CARDS_SUCCESS,
  FETCH_ATTENDANCE_CONSOLIDATED_CARDS_FAILURE,
  UPDATE_EMPLOYEE_STATUS,
  UPDATE_EMPLOYEE_STATUS_SUCCESS,
  UPDATE_EMPLOYEE_STATUS_FAILURE,
  RESET_REDUCER,
  FETCH_DOWNLOAD_TODAY_STATUS,
  FETCH_DOWNLOAD_TODAY_STATUS_SUCCESS,
  FETCH_DOWNLOAD_TODAY_STATUS_FAILURE,
  FETCH_LEAVE_TYPES,
  FETCH_LEAVE_TYPES_SUCCESS,
  FETCH_LEAVE_TYPES_FAILURE,
  APPLY_LEAVE,
  APPLY_LEAVE_SUCCESS,
  APPLY_LEAVE_FAILURE
} from "./actionTypes";

// Delete Account
export const deleteAccountUser = (params) => {
  return {
    type: URL_DELETE_USER,
    payload: params,

  };
};

export const deleteAccountUserSuccess = (response) => {
  return {
    type: URL_DELETE_USER_SUCCESS,
    payload: response,
  };
};

export const deleteAccountUserFail = (error) => {
  return {
    type: URL_DELETE_USER_FAIL,
    payload: error,
  };
};

// Edit Profile Picture
export const editProfilePicture = (params) => {
  return {
    type: EDIT_PROFILE_PICTURE,
    payload: params,

  };
};

export const editProfilePictureSuccess = (response) => {
  return {
    type: EDIT_PROFILE_PICTURE_SUCCESS,
    payload: response,
  };
};

export const editProfilePictureFail = (error) => {
  return {
    type: EDIT_PROFILE_PICTURE_FAIL,
    payload: error,
  };
};

//get designation

export const getDesignationData = (params) => {
  return {
    type: FETCH_DESIGNATION,
    payload: params,

  };
};

export const getDesignationDataSuccess = (response) => {
  return {
    type: FETCH_DESIGNATION_SUCCESS,
    payload: response,
  };
};

export const getDesignationDataFailure = (error) => {
  return {
    type: FETCH_DESIGNATION_FAILURE,
    payload: error,
  };
};

//get departments

export const getDepartmentData = (params) => {
  return {
    type: FETCH_DEPARTMENT,
    payload: params,

  };
};

export const getDepartmentDataSuccess = (response) => {
  return {
    type: FETCH_DEPARTMENT_SUCCESS,
    payload: response,
  };
};

export const getDepartmentDataFailure = (error) => {
  return {
    type: FETCH_DEPARTMENT_FAILURE,
    payload: error,
  };
};

// get all branches list

export const getAllBranchesList = (params) => {
  return {
    type: FETCH_ALL_BRANCHES_LIST,
    payload: params,

  };
};

export const getAllBranchesListSuccess = (response) => {
  return {
    type: FETCH_ALL_BRANCHES_LIST_SUCCESS,
    payload: response,
  };
};

export const getAllBranchesListFailure = (error) => {
  return {
    type: FETCH_ALL_BRANCHES_LIST_FAILURE,
    payload: error,
  };
};

//get employee details

export const getEmployeeDetails = (params) => {
  return {
    type: FETCH_EMPLOYEE_DETAILS,
    payload: params,

  };
};

export const getEmployeeDetailsSuccess = (response) => {
  return {
    type: FETCH_EMPLOYEE_DETAILS_SUCCESS,
    payload: response,
  };
};

export const getEmployeeDetailsFailure = (error) => {
  return {
    type: FETCH_EMPLOYEE_DETAILS_FAILURE,
    payload: error,
  };
};


//GET_EMPLOYEE_LIST

export const getEmployeesList = (params) => {
  return {
    type: FETCH_EMPLOYEE_LIST,
    payload: params,

  };
};

export const getEmployeesListSuccess = (response) => {
  return {
    type: FETCH_EMPLOYEE_LIST_SUCCESS,
    payload: response,
  };
};

export const getEmployeesListFailure = (error) => {
  return {
    type: FETCH_EMPLOYEE_LIST_FAILURE,
    payload: error,
  };
};

//employee addition

export const employeeAddition = (params) => {
  return {
    type: POST_EMPLOYEE_ADDITION,
    payload: params,

  };
};

export const employeeAdditionSuccess = (response) => {
  return {
    type: POST_EMPLOYEE_ADDITION_SUCCESS,
    payload: response,
  };
};

export const employeeAdditionFailure = (error) => {
  return {
    type: POST_EMPLOYEE_ADDITION_FAILURE,
    payload: error,
  };
};


export const employeeEdit = (id) => {
  return {
    type: EDIT_EMPLOYEE,
    payload: id,
  };
};

/**
 *  get Employee Time Sheet
 */

export const getEmployeesTimeSheets = (params) => {
  return {
    type: FETCH_EMPLOYEE_TIME_SHEETS,
    payload: params,

  };
};

export const getEmployeesTimeSheetsSuccess = (response) => {
  return {
    type: FETCH_EMPLOYEE_TIME_SHEETS_SUCCESS,
    payload: response,
  };
};

export const getEmployeesTimeSheetsFailure = (error) => {
  return {
    type: FETCH_EMPLOYEE_TIME_SHEETS_FAILURE,
    payload: error,
  };
};

/**
 * get Employee Check in logs
 * @param {*} params 
 * @returns 
 */
 export const getEmployeesCheckInLogs = (params) => {
  console.log('getEmployeesCheckInLogs======action');
  return {
    type: FETCH_EMPLOYEE_CHECK_IN_LOGS,
    payload: params,

  };
};

export const getEmployeesCheckInLogsSuccess = (response) => {
  return {
    type: FETCH_EMPLOYEE_CHECK_IN_LOGS_SUCCESS,
    payload: response,
  };
};

export const getEmployeesCheckInLogsFailure = (error) => {
  return {
    type: FETCH_EMPLOYEE_CHECK_IN_LOGS_FAILURE,
    payload: error,
  };
};

/**
 *  Fetch Check In Detailed Logs Per Day
 */

 export const getCheckInDetailedLogPerDay = (params) => {
  return {
    type: FETCH_CHECK_IN_DETAILED_LOG_PER_DAY,
    payload: params,
  
  };
};

export const getCheckInDetailedLogPerDaySuccess = (response) => {
  return {
    type: FETCH_CHECK_IN_DETAILED_LOG_PER_DAY_SUCCESS,
    payload: response,
  };
};

export const getCheckInDetailedLogPerDayFailure = (error) => {
  return {
    type: FETCH_CHECK_IN_DETAILED_LOG_PER_DAY_FAILURE,
    payload: error,
  };
};


/**
 *  Fetch Check In Detailed Logs Per Day
 */

 export const getEmployeeEachUserTimeSheets = (params) => {
  return {
    type: FETCH_EMPLOYEE_EACH_USER_TIME_SHEETS,
    payload: params,
  
  };
};

export const getEmployeeEachUserTimeSheetsSuccess = (response) => {
  return {
    type: FETCH_EMPLOYEE_EACH_USER_TIME_SHEETS_SUCCESS,
    payload: response,
  };
};

export const getEmployeeEachUserTimeSheetsFailure = (error) => {
  return {
    type: FETCH_EMPLOYEE_EACH_USER_TIME_SHEETS_FAILURE,
    payload: error,
  };
};

/**
 * Add department
 */

 export const addDepartment = (params) => {
  return {
    type: ADD_DEPARTMENT,
    payload: params,
  
  };
};

export const addDepartmentSuccess = (response) => {
  return {
    type: ADD_DEPARTMENT_SUCCESS,
    payload: response,
  };
};

export const addDepartmentFailure = (error) => {
  return {
    type: ADD_DEPARTMENT_FAILURE,
    payload: error,
  };
};

/**
 * Add designation
 */

 export const addDesignation = (params) => {
  return {
    type: ADD_DESIGNATION,
    payload: params,
  
  };
};

export const addDesignationSuccess = (response) => {
  return {
    type: ADD_DESIGNATION_SUCCESS,
    payload: response,
  };
};

export const addDesignationFailure = (error) => {
  return {
    type: ADD_DESIGNATION_FAILURE,
    payload: error,
  };
};

/**
 * Add FENCE ADMIN
 */

 export const addFenceAdmin = (params) => {
  return {
    type: ADD_FENCE_ADMIN,
    payload: params,
  
  };
};

export const addFenceAdminSuccess = (response) => {
  return {
    type: ADD_FENCE_ADMIN_SUCCESS,
    payload: response,
  };
};

export const addFenceAdminFailure = (error) => {
  return {
    type: ADD_FENCE_ADMIN_FAILURE,
    payload: error,
  };
};



export const getEmployeeAttendanceStats =(params)=>{
  return{
    type: FETCH_EMPLOYEE_ATTENDANCE_STATS,
    payload: params
  }
}


export const getEmployeeAttendanceStatsSuccess = (response) => {
  return {
    type: FETCH_EMPLOYEE_ATTENDANCE_STATS_SUCCESS,
    payload: response,
  };
};

export const getEmployeeAttendanceStatsFailure = (error) => {
  return {
    type: FETCH_EMPLOYEE_ATTENDANCE_STATS_FAILURE,
    payload: error,
  };
};


export const getEmployeeTodayStatus =(params)=>{
  return{
    type: FETCH_EMPLOYEE_TODAY_STATUS,
    payload: params
  }
}


export const getEmployeeTodayStatusSuccess = (response) => {
  return {
    type: FETCH_EMPLOYEE_TODAY_STATUS_SUCCESS,
    payload: response,
  };
};

export const getEmployeeTodayStatusFailure = (error) => {
  return {
    type: FETCH_EMPLOYEE_TODAY_STATUS_FAILURE,
    payload: error,
  };
};
 //download
export const getDownloadTodayStatus =(params)=>{
  return{
    type: FETCH_DOWNLOAD_TODAY_STATUS,
    payload: params
  }
}


export const getDownloadTodayStatusSuccess = (response) => {
  return {
    type: FETCH_DOWNLOAD_TODAY_STATUS_SUCCESS,
    payload: response,
  };
};

export const getDownloadTodayStatusFailure = (error) => {
  return {
    type: FETCH_DOWNLOAD_TODAY_STATUS_FAILURE,
    payload: error,
  };
};

export const getCheckInDetailedLog=(params)=>{
  return{
    type: FETCH_CHECK_IN_DETAILED_LOG,
    payload: params
  }
}


export const getCheckInDetailedLogSuccess = (response) => {
  return {
    type: FETCH_CHECK_IN_DETAILED_LOG_SUCCESS,
    payload: response,
  };
};

export const getCheckInDetailedLogFailure = (error) => {
  return {
    type: FETCH_CHECK_IN_DETAILED_LOG_FAILURE,
    payload: error,
  };
};

//get selected card type

export const getSelectedCardType = (type) => {
  return {
    type: SELECTED_CARD_TYPE,
    payload: type,
  };
};

//get selected card type

export const getSelectedDepartmentName = (type) => {
  return {
    type: SELECTED_DEPARTMENT_NAME,
    payload: type,
  };
};

//get selected card type

export const getSelectedDepartmentId = (type) => {
  return {
    type: SELECTED_DEPARTMENT_ID,
    payload: type,
  };
};

//selected employee id for view employee details

export const getSelectedEmployeeId = (id) => {
  return {
    type: SELECTED_EMPLOYEE_ID,
    payload: id,
  };
};

//attendance consolidated cards

export const getAttendanceConsolidatedCards=(params)=>{
  return{
    type: FETCH_ATTENDANCE_CONSOLIDATED_CARDS,
    payload: params
  }
}


export const getAttendanceConsolidatedCardsSuccess = (response) => {
  return {
    type: FETCH_ATTENDANCE_CONSOLIDATED_CARDS_SUCCESS,
    payload: response,
  };
};

export const getAttendanceConsolidatedCardsFailure = (error) => {
  return {
    type: FETCH_ATTENDANCE_CONSOLIDATED_CARDS_FAILURE,
    payload: error,
  };
};

//delete employee

export const getUpdateEmployeeStatus=(params)=>{
  return{
    type: UPDATE_EMPLOYEE_STATUS,
    payload: params
  }
}


export const getUpdateEmployeeStatusSuccess = (response) => {
  return {
    type: UPDATE_EMPLOYEE_STATUS_SUCCESS,
    payload: response,
  };
};

export const getUpdateEmployeeStatusFailure = (error) => {
  return {
    type: UPDATE_EMPLOYEE_STATUS_FAILURE,
    payload: error,
  };
};


/**
 * set Logout
 */

export const resetEmployee = () => {
  return {
    type: RESET_REDUCER,
  };
};

/**
 *  get leave types
 */

 export const getLeaveTypes=(params)=>{
  return{
    type: FETCH_LEAVE_TYPES,
    payload: params
  }
}


export const getLeaveTypesSuccess = (response) => {
  return {
    type: FETCH_LEAVE_TYPES_SUCCESS,
    payload: response,
  };
};

export const getLeaveTypesFailure = (error) => {
  return {
    type: FETCH_LEAVE_TYPES_FAILURE,
    payload: error,
  };
};

/**
 * apply leave
 */

 export const applyLeave=(params)=>{
  return{
    type: APPLY_LEAVE,
    payload: params
  }
}


export const applyLeaveSuccess = (response) => {
  return {
    type: APPLY_LEAVE_SUCCESS,
    payload: response,
  };
};

export const applyLeaveFailure = (error) => {
  return {
    type: APPLY_LEAVE_FAILURE,
    payload: error,
  };
};