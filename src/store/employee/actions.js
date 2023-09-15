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
  SELECTED_EVENT_ID,
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
  APPLY_LEAVE_FAILURE,
  ADD_LEAVE_FROM_DATE,
  FETCH_CALENDAR_DETAILS,
  FETCH_CALENDAR_DETAILS_SUCCESS,
  FETCH_CALENDAR_DETAILS_FAILURE,
  CHANGE_EMPLOYEE_LEAVE_STATUS,
  CHANGE_EMPLOYEE_LEAVE_STATUS_SUCCESS,
  CHANGE_EMPLOYEE_LEAVE_STATUS_FAILURE,
  ADD_HOLIDAY,
  ADD_HOLIDAY_SUCCESS,
  ADD_HOLIDAY_FAILURE,
  DELETE_HOLIDAY,
  DELETE_HOLIDAY_SUCCESS,
  DELETE_HOLIDAY_FAILURE,
  GET_LEAVES_BY_TYPES,
  GET_LEAVES_BY_TYPES_SUCCESS,
  GET_LEAVES_BY_TYPES_FAILURE,
  GET_EMPLOYEES_LEAVES,
  GET_EMPLOYEES_LEAVE_SUCCESS,
  GET_EMPLOYEES_LEAVES_FAILURE,
  GET_MODIFY_LOGS,
  GET_MODIFY_LOGS_SUCCESS,
  GET_MODIFY_LOGS_FAILURE,
  GET_MIS_REPORT,
  GET_MIS_REPORT_SUCCESS,
  GET_MIS_REPORT_FAILURE,
  RESET_MIS_REPORT_DATA,
  GET_MIS_REPORT_DOWNLOAD,
  GET_MIS_REPORT_DOWNLOAD_SUCCESS,
  GET_MIS_REPORT_DOWNLOAD_FAILURE,
  GET_MIS_REPORT_CLEAR,
  GET_EMPLOYEE_DOCUMENT,
  GET_EMPLOYEE_DOCUMENT_SUCCESS,
  GET_EMPLOYEE_DOCUMENT_FAILURE,
  ATTACH_USER_DOCUMENT,
  ATTACH_USER_DOCUMENT_SUCCESS,
  ATTACH_USER_DOCUMENT_FAILURE,
  GET_ADMIN_BRANCHES,
  GET_ADMIN_BRANCHES_SUCCESS,
  POST_UPDATED_ADMIN_BRANCHES,
  POST_UPDATED_ADMIN_BRANCHES_SUCCESS,
  POST_UPDATED_ADMIN_BRANCHES_FAILURE,
  GET_ADMIN_BRANCHES_FAILURE,
  IS_RENDER_ADMIN_BRANCHES,
  GET_BRANCHES_ADMIN,
  GET_BRANCHES_ADMIN_SUCCESS,
  GET_BRANCHES_ADMIN_FAILURE,
  GET_FILTERED_BRANCHES,
  GET_LEAVES_TYPE_DETAILS,
  GET_EDIT_LEAVES_DETAILS,
  UPDATE_LEAVE_TYPE_DETAILS,
  UPDATE_LEAVE_TYPE_DETAILS_SUCCESS,
  UPDATE_LEAVE_TYPE_DETAILS_FAILURE,
  CURRENT_LEAVE_TYPE,
  GET_EMPLOYEE_CHECK_IN_LOGS_REPORT,
  GET_EMPLOYEE_CHECK_IN_LOGS_REPORT_SUCCESS,
  GET_EMPLOYEE_CHECK_IN_LOGS_REPORT_FAILURE,
  ENABLE_FIELD_CHECK_IN,
  ENABLE_FIELD_CHECK_IN_SUCCESS,
  ENABLE_FIELD_CHECK_IN_FAILURE,
  ENABLE_OFFICE_CHECK_IN,
  ENABLE_OFFICE_CHECK_IN_SUCCESS,
  ENABLE_OFFICE_CHECK_IN_FAILURE,
  POST_FACE_VALIDATION_STATUS,
  POST_FACE_VALIDATION_STATUS_SUCCESS,
  POST_FACE_VALIDATION_STATUS_FAILURE,

  FETCH_EMPLOYEE_BASIC_INFO,
  FETCH_EMPLOYEE_BASIC_INFO_SUCCESS,
  FETCH_EMPLOYEE_BASIC_INFO_FAILURE,

  FETCH_EMPLOYEE_ATTENDANCE_INFO,
  FETCH_EMPLOYEE_ATTENDANCE_INFO_SUCCESS,
  FETCH_EMPLOYEE_ATTENDANCE_INFO_FAILURE,

  EMPLOYEE_VIEW_DETAILS_API_HANDLER,
  EMPLOYEE_MODIFY_REQUEST,
  EMPLOYEE_MODIFY_REQUEST_SUCCESS,
  EMPLOYEE_MODIFY_REQUEST_FAILURE,
  ADMIN_MODIFY_LOG,
  ADMIN_MODIFY_LOG_SUCCESS,
  ADMIN_MODIFY_LOG_FAILURE,
  CHANGE_MODIFY_LOG_STATUS,
  CHANGE_MODIFY_LOG_STATUS_SUCCESS,
  CHANGE_MODIFY_LOG_STATUS_FAILURE,
  COMPANY_BASE_WEEKLY_CALENDAR,
  COMPANY_BASE_WEEKLY_CALENDAR_SUCCESS,
  COMPANY_BASE_WEEKLY_CALENDAR_FAILURE,
  SET_COMPANY_BASE_WEEKLY_CALENDAR,
  SET_COMPANY_BASE_WEEKLY_CALENDAR_SUCCESS,
  SET_COMPANY_BASE_WEEKLY_CALENDAR_FAILURE,
  GET_EMPLOYEE_BRANCH_WISE_LEAVES,
  GET_EMPLOYEE_BRANCH_WISE_LEAVES_SUCCESS,
  GET_EMPLOYEE_BRANCH_WISE_LEAVES_FAILURE,
  GET_EMPLOYEE_LEAVE_HISTORY,
  GET_EMPLOYEE_LEAVE_TYPES,
  GET_EMPLOYEE_LEAVE_TYPES_SUCCESS,
  GET_EMPLOYEE_LEAVE_TYPES_FAILURE,
  UPDATE_EMPLOYEE_ALLOCATED_DAYS,
  UPDATE_EMPLOYEE_ALLOCATED_DAYS_SUCCESS,
  UPDATE_EMPLOYEE_ALLOCATED_DAYS_FAILURE,
  FETCH_SYNC_DATA,
  FETCH_SYNC_DATA_SUCCESS,
  FETCH_SYNC_DATA_FAILURE,
  UPDATE_COMPANY_GENERIC_SHIFT,
  UPDATE_COMPANY_GENERIC_SHIFT_SUCCESS,
  UPDATE_COMPANY_GENERIC_SHIFT_FAILURE,
  ADD_ESSL_DEVICE,
  ADD_ESSL_DEVICE_SUCCESS,
  ADD_ESSL_DEVICE_FAILURE,
  GET_ESSL_DEVICE,
  GET_ESSL_DEVICE_SUCCESS,
  GET_ESSL_DEVICE_FAILURE,
  REMOVE_ESSL_DEVICE,
  REMOVE_ESSL_DEVICE_SUCCESS,
  REMOVE_ESSL_DEVICE_FAILURE,
  UPDATE_EMPLOYEE_DEVICE_DETAILS,
  UPDATE_EMPLOYEE_DEVICE_DETAILS_SUCCESS,
  UPDATE_EMPLOYEE_DEVICE_DETAILS_FAILURE,
  GET_EMPLOYEE_DEVICE_DETAILS,
  GET_EMPLOYEE_DEVICE_DETAILS_SUCCESS,
  GET_EMPLOYEE_DEVICE_DETAILS_FAILURE,
  GET_VENDERS,
  GET_VENDERS_FAILURE,
  GET_VENDERS_SUCCESS,
  ADD_VENDERS,
  ADD_VENDERS_SUCCESS,
  ADD_VENDERS_FAILURE
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

export const getEmployeeAttendanceStats = (params) => {
  return {
    type: FETCH_EMPLOYEE_ATTENDANCE_STATS,
    payload: params,
  };
};

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

export const getEmployeeTodayStatus = (params) => {
  return {
    type: FETCH_EMPLOYEE_TODAY_STATUS,
    payload: params,
  };
};

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
export const getDownloadTodayStatus = (params) => {
  return {
    type: FETCH_DOWNLOAD_TODAY_STATUS,
    payload: params,
  };
};

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

export const getCheckInDetailedLog = (params) => {
  return {
    type: FETCH_CHECK_IN_DETAILED_LOG,
    payload: params,
  };
};

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

//seleceted event id
export const getSelectedEventId = (id) => {
  return {
    type: SELECTED_EVENT_ID,
    payload: id,
  };
};
//attendance consolidated cards

export const getAttendanceConsolidatedCards = (params) => {
  return {
    type: FETCH_ATTENDANCE_CONSOLIDATED_CARDS,
    payload: params,
  };
};

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

export const getUpdateEmployeeStatus = (params) => {
  return {
    type: UPDATE_EMPLOYEE_STATUS,
    payload: params,
  };
};

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

export const getLeaveTypes = (params) => {
  return {
    type: FETCH_LEAVE_TYPES,
    payload: params,
  };
};

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

export const applyLeave = (params) => {
  return {
    type: APPLY_LEAVE,
    payload: params,
  };
};

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

///Apply Leave From Date

export const getLeaveFromDate = (params) => {
  return {
    type: ADD_LEAVE_FROM_DATE,
    payload: params,
  };
};

//fetch calendar events

export const fetchCalendardetails = (params) => {
  return {
    type: FETCH_CALENDAR_DETAILS,
    payload: params,
  };
};

export const fetchCalendardetailsSuccess = (response) => {
  return {
    type: FETCH_CALENDAR_DETAILS_SUCCESS,
    payload: response,
  };
};

export const fetchCalendardetailsFailure = (error) => {
  return {
    type: FETCH_CALENDAR_DETAILS_FAILURE,
    payload: error,
  };
};

//change leave status

export const changeEmployeeLeaveStatus = (params) => {
  return {
    type: CHANGE_EMPLOYEE_LEAVE_STATUS,
    payload: params,
  };
};

export const changeEmployeeLeaveStatusSuccess = (response) => {
  return {
    type: CHANGE_EMPLOYEE_LEAVE_STATUS_SUCCESS,
    payload: response,
  };
};

export const changeEmployeeLeaveStatusFailure = (error) => {
  return {
    type: CHANGE_EMPLOYEE_LEAVE_STATUS_FAILURE,
    payload: error,
  };
};


// modify log change status

export const changeEmployeeModifyLogStatus = (params) => {
  return {
    type: CHANGE_MODIFY_LOG_STATUS,
    payload: params,
  };
};

export const changeEmployeeModifyLogStatusSuccess = (response) => {
  return {
    type: CHANGE_MODIFY_LOG_STATUS_SUCCESS,
    payload: response,
  };
};

export const changeEmployeeModifyLogStatusFailure = (error) => {
  return {
    type: CHANGE_MODIFY_LOG_STATUS_FAILURE,
    payload: error,
  };
};


/**
 *
 * ADD holidays
 */
export const addHoliday = (params) => {
  return {
    type: ADD_HOLIDAY,
    payload: params,
  };
};

export const addHolidaySuccess = (response) => {
  return {
    type: ADD_HOLIDAY_SUCCESS,
    payload: response,
  };
};

export const addHolidayFailure = (error) => {
  return {
    type: ADD_HOLIDAY_FAILURE,
    payload: error,
  };
};

/**
 * Delete Holidays
 */

export const deleteHoliday = (params) => {
  return {
    type: DELETE_HOLIDAY,
    payload: params,
  };
};

export const deleteHolidaySuccess = (response) => {
  return {
    type: DELETE_HOLIDAY_SUCCESS,
    payload: response,
  };
};

export const deleteHolidayFailure = (error) => {
  return {
    type: DELETE_HOLIDAY_FAILURE,
    payload: error,
  };
};

/**
 * my-portfolio leaves
 */

export const getLeavesByTypes = (params) => {
  return {
    type: GET_LEAVES_BY_TYPES,
    payload: params,
  };
};

export const getLeavesByTypesSuccess = (response) => {
  return {
    type: GET_LEAVES_BY_TYPES_SUCCESS,
    payload: response,
  };
};

export const getLeavesByTypesFailure = (error) => {
  return {
    type: GET_LEAVES_BY_TYPES_FAILURE,
    payload: error,
  };
};

/**
 * get employees leaves
 */

export const getEmployeeLeaves = (params) => {
  return {
    type: GET_EMPLOYEES_LEAVES,
    payload: params,
  };
};

export const getEmployeeLeavesSuccess = (response) => {
  return {
    type: GET_EMPLOYEES_LEAVE_SUCCESS,
    payload: response,
  };
};

export const getEmployeeLeavesFailure = (error) => {
  return {
    type: GET_EMPLOYEES_LEAVES_FAILURE,
    payload: error,
  };
};

/**
 * get modify logs
 */

export const getModifyLogs = (params) => {
  return {
    type: GET_MODIFY_LOGS,
    payload: params,
  };
};

export const getModifyLogsSuccess = (response) => {
  return {
    type: GET_MODIFY_LOGS_SUCCESS,
    payload: response,
  };
};

export const getModifyLogsFailure = (error) => {
  return {
    type: GET_MODIFY_LOGS_FAILURE,
    payload: error,
  };
};

/**
 * 
 * Mis Report
 * 
 */

export const getMisReport = (params) => {
  return {
    type: GET_MIS_REPORT,
    payload: params,
  };
};

export const getMisReportSuccess = (response) => {
  return {
    type: GET_MIS_REPORT_SUCCESS,
    payload: response,
  };
};

export const getMisReportFailure = (error) => {
  return {
    type: GET_MIS_REPORT_FAILURE,
    payload: error,
  };
};

/**
 * Reset mis report 
 */

export const resetMisReportData = (params) => {
  return {
    type: RESET_MIS_REPORT_DATA,
    payload: params,
  };
};

/**
   * get E-locker Document
   */

export const getEmployeeDocument = (params) => {
  return {
    type: GET_EMPLOYEE_DOCUMENT,
    payload: params,
  };
}


export const getEmployeeDocumentSuccess = (response) => {
  return {
    type: GET_EMPLOYEE_DOCUMENT_SUCCESS,
    payload: response,
  };
};



export const getEmployeeDocumentFailure = (error) => {
  return {
    type: GET_EMPLOYEE_DOCUMENT_FAILURE,
    payload: error,
  };
};



export const getDownloadMisReport = (params) => {
  return {
    type: GET_MIS_REPORT_DOWNLOAD,
    payload: params,
  };
};

export const getDownloadMisReportSuccess = (response) => {
  return {
    type: GET_MIS_REPORT_DOWNLOAD_SUCCESS,
    payload: response,
  };
};
export const getDownloadMisReportFailure = (error) => {
  return {
    type: GET_MIS_REPORT_DOWNLOAD_FAILURE,
    payload: error,
  };
};
/**
 * Attach user Document e-Locker
 */

export const attachUserDocument = (params) => {
  return {
    type: ATTACH_USER_DOCUMENT,
    payload: params,
  };
};

export const attachUserDocumentSuccess = (response) => {
  return {
    type: ATTACH_USER_DOCUMENT_SUCCESS,
    payload: response,
  };
};


export const attachUserDocumentFailure = (error) => {
  return {
    type: ATTACH_USER_DOCUMENT_FAILURE,
    payload: error,
  };
};

/**
 * Admin My Branches
 */

export const getAdminBranches = (params) => {
  return {
    type: GET_ADMIN_BRANCHES,
    payload: params,
  };
};

export const getAdminBranchesSuccess = (response) => {
  return {
    type: GET_ADMIN_BRANCHES_SUCCESS,
    payload: response,
  };
};

export const getAdminBranchesFailure = (error) => {
  return {
    type: GET_ADMIN_BRANCHES_FAILURE,
    payload: error,
  };
};

/**
 * 
 * Update Admin Branch
 */
export const postAdminUpdateBranches = (params) => {
  return {
    type: POST_UPDATED_ADMIN_BRANCHES,
    payload: params,
  };
};

export const postAdminUpdateBranchesSuccess = (response) => {
  return {
    type: POST_UPDATED_ADMIN_BRANCHES_SUCCESS,
    payload: response,
  };
};

export const postAdminUpdateBranchesFailure = (error) => {
  return {
    type: POST_UPDATED_ADMIN_BRANCHES_FAILURE,
    payload: error,
  };
};

//for render the admin branches

export const isRenderAdminBranches = (params) => {
  return {
    type: IS_RENDER_ADMIN_BRANCHES,
    payload: params,
  };
};

/**
 * get Branch Admin 
 */

export const getBranchAdmins = (params) => {
  return {
    type: GET_BRANCHES_ADMIN,
    payload: params,
  };
};

export const getBranchAdminsSuccess = (response) => {
  return {
    type: GET_BRANCHES_ADMIN_SUCCESS,
    payload: response,
  };
};


export const getBranchAdminsFailure = (error) => {
  return {
    type: GET_BRANCHES_ADMIN_FAILURE,
    payload: error,
  };
};


export const getFIlteredBranch = (branches) => {
  return {
    type: GET_FILTERED_BRANCHES,
    payload: branches,
  };
};


export const getLeaveTypesDetails = (types) => {
  return {
    type: GET_LEAVES_TYPE_DETAILS,
    payload: types,
  };
};


export const getEditLeaveTypesDetails = (params) => {
  return {
    type: GET_EDIT_LEAVES_DETAILS,
    payload: params,
  };
};

/**
 * Update leave type
 */

export const updateLeaveType = (params) => {
  return {
    type: UPDATE_LEAVE_TYPE_DETAILS,
    payload: params,
  };
};

export const updateLeaveTypeSuccess = (response) => {
  return {
    type: UPDATE_LEAVE_TYPE_DETAILS_SUCCESS,
    payload: response,
  };
};


export const updateLeaveTypeFailure = (error) => {
  return {
    type: UPDATE_LEAVE_TYPE_DETAILS_FAILURE,
    payload: error,
  };
};


export const getCurrentLeaveType = (type) => {
  return {
    type: CURRENT_LEAVE_TYPE,
    payload: type,
  };
};

// Download Employee Checkin loGS
export const getDownloadEmployeeCheckinLogs = (params) => {
  return {
    type: GET_EMPLOYEE_CHECK_IN_LOGS_REPORT,
    payload: params,
  };
};

export const getDownloadEmployeeCheckinLogsSuccess = (response) => {
  return {
    type: GET_EMPLOYEE_CHECK_IN_LOGS_REPORT_SUCCESS,
    payload: response,
  };
};
export const getDownloadEmployeeCheckinLogsFailure = (error) => {
  return {
    type: GET_EMPLOYEE_CHECK_IN_LOGS_REPORT_FAILURE,
    payload: error,
  };
};


// enableFieldCheckIn

export const postEnableFieldCheckIn = (params) => {
  return {
    type: ENABLE_FIELD_CHECK_IN,
    payload: params,
  };
};

export const postEnableFieldCheckInSuccess = (response) => {
  return {
    type: ENABLE_FIELD_CHECK_IN_SUCCESS,
    payload: response,
  };
};
export const postEnableFieldCheckInFailure = (error) => {
  return {
    type: ENABLE_FIELD_CHECK_IN_FAILURE,
    payload: error,
  };
};

//enableOfficeCheckIn

export const postEnableOfficeCheckIn = (params) => {
  return {
    type: ENABLE_OFFICE_CHECK_IN,
    payload: params,
  };
};

export const postEnableOfficeCheckInSuccess = (response) => {
  return {
    type: ENABLE_OFFICE_CHECK_IN_SUCCESS,
    payload: response,
  };
};
export const postEnableOfficeCheckInFailure = (error) => {
  return {
    type: ENABLE_OFFICE_CHECK_IN_FAILURE,
    payload: error,
  };
};

// changeAttendanceSettings

export const changeAttendanceSettings = (params) => {
  return {
    type: POST_FACE_VALIDATION_STATUS,
    payload: params,
  };
};

export const changeAttendanceSettingsSuccess = (response) => {
  return {
    type: POST_FACE_VALIDATION_STATUS_SUCCESS,
    payload: response,
  };
};
export const changeAttendanceSettingsFailure = (error) => {
  return {
    type: POST_FACE_VALIDATION_STATUS_FAILURE,
    payload: error,
  };
};

//get employee basic info

export const getEmployeeBasicInfo = (params) => {
  return {
    type: FETCH_EMPLOYEE_BASIC_INFO,
    payload: params,
  };
};

export const getEmployeeBasicInfoSuccess = (response) => {
  return {
    type: FETCH_EMPLOYEE_BASIC_INFO_SUCCESS,
    payload: response,
  };
};

export const getEmployeeBasicInfoFailure = (error) => {
  return {
    type: FETCH_EMPLOYEE_BASIC_INFO_FAILURE,
    payload: error,
  };
};

//get employee Attendance info

export const getEmployeeAttendanceInfo = (params) => {
  return {
    type: FETCH_EMPLOYEE_ATTENDANCE_INFO,
    payload: params,
  };
};

export const getEmployeeAttendanceInfoSuccess = (response) => {
  return {
    type: FETCH_EMPLOYEE_ATTENDANCE_INFO_SUCCESS,
    payload: response,
  };
};

export const getEmployeeAttendanceInfoFailure = (error) => {
  return {
    type: FETCH_EMPLOYEE_ATTENDANCE_INFO_FAILURE,
    payload: error,
  };
};


//Employee View details api handler


export const employeeViewDetailsApiHandler = (value) => {
  return {
    type: EMPLOYEE_VIEW_DETAILS_API_HANDLER,
    payload: value,
  };
};


// api for modify log for employee

export const postEmployeeModifyRequest = (params) => {
  return {
    type: EMPLOYEE_MODIFY_REQUEST,
    payload: params,
  };
};

export const postEmployeeModifyRequestSuccess = (response) => {
  return {
    type: EMPLOYEE_MODIFY_REQUEST_SUCCESS,
    payload: response,
  };
};

export const postEmployeeModifyRequestFailure = (error) => {
  return {
    type: EMPLOYEE_MODIFY_REQUEST_FAILURE,
    payload: error,
  };
};


/// api for modify admin

export const postAdminModifyLog = (params) => {
  return {
    type: ADMIN_MODIFY_LOG,
    payload: params,
  };
};

export const postAdminModifyLogSuccess = (response) => {
  return {
    type: ADMIN_MODIFY_LOG_SUCCESS,
    payload: response,
  };
};

export const postAdminModifyLogFailure = (error) => {
  return {
    type: ADMIN_MODIFY_LOG_FAILURE,
    payload: error,
  };
};

// getCompanyBaseWeeklyCalendar

export const CompanyBaseWeeklyCalendar = (params) => {
  return {
    type: COMPANY_BASE_WEEKLY_CALENDAR,
    payload: params,
  };
};

export const CompanyBaseWeeklyCalendarSuccess = (response) => {
  return {
    type: COMPANY_BASE_WEEKLY_CALENDAR_SUCCESS,
    payload: response,
  };
};

export const CompanyBaseWeeklyCalendarFailure = (error) => {
  return {
    type: COMPANY_BASE_WEEKLY_CALENDAR_FAILURE,
    payload: error,
  };
};

// SetCompanyBaseWeeklyCalendar


export const setCompanyBaseWeeklyCalendar = (params) => {
  return {
    type: SET_COMPANY_BASE_WEEKLY_CALENDAR,
    payload: params,
  };
};

export const setCompanyBaseWeeklyCalendarSuccess = (response) => {
  return {
    type: SET_COMPANY_BASE_WEEKLY_CALENDAR_SUCCESS,
    payload: response,
  };
};

export const setCompanyBaseWeeklyCalendarFailure = (error) => {
  return {
    type: SET_COMPANY_BASE_WEEKLY_CALENDAR_FAILURE,
    payload: error,
  };
};


//branchWiseEmployeesLeaves


export const getEmployeeBranchWiseLeaves = (params) => {
  return {
    type: GET_EMPLOYEE_BRANCH_WISE_LEAVES,
    payload: params,
  };
};

export const getEmployeeBranchWiseLeavesSuccess = (response) => {
  return {
    type: GET_EMPLOYEE_BRANCH_WISE_LEAVES_SUCCESS,
    payload: response,
  };
};

export const getEmployeeBranchWiseLeavesFailure = (error) => {
  return {
    type: GET_EMPLOYEE_BRANCH_WISE_LEAVES_FAILURE,
    payload: error,
  };
};

//set employee leave history
export const getEmployeeLeaveHistory = (item) => {
  return {
    type: GET_EMPLOYEE_LEAVE_HISTORY,
    payload: item,
  };
};




//getEmployeeLeaveType 

export const getEmployeeBranchLeaveType = (params) => {
  return {
    type: GET_EMPLOYEE_LEAVE_TYPES,
    payload: params,
  };
};

export const getEmployeeBranchLeaveTypeSuccess = (response) => {
  return {
    type: GET_EMPLOYEE_LEAVE_TYPES_SUCCESS,
    payload: response,
  };
};

export const getEmployeeBranchLeaveTypeFailure = (error) => {
  return {
    type: GET_EMPLOYEE_LEAVE_TYPES_FAILURE,
    payload: error,
  };
};


// updateEmployeeAllocatedDays

export const updateEmployeeAllocatedDays = (params) => {
  return {
    type: UPDATE_EMPLOYEE_ALLOCATED_DAYS,
    payload: params,
  };
};

export const updateEmployeeAllocatedDaysSuccess = (response) => {
  return {
    type: UPDATE_EMPLOYEE_ALLOCATED_DAYS_SUCCESS,
    payload: response,
  };
};

export const updateEmployeeAllocatedDaysFailure = (error) => {
  return {
    type: UPDATE_EMPLOYEE_ALLOCATED_DAYS_FAILURE,
    payload: error,
  };
};

// syncData

export const getSyncData = (params) => {
  return {
    type: FETCH_SYNC_DATA,
    payload: params,
  };
};

export const getSyncDataSuccess = (response) => {
  return {
    type: FETCH_SYNC_DATA_SUCCESS,
    payload: response,
  };
};

export const getSyncDataFailure = (error) => {
  return {
    type: FETCH_SYNC_DATA_FAILURE,
    payload: error,
  };
};

// UPDATE_COMPANY_GENERIC_SHIFT

export const updateCompanyGenericShift = (params) => {
  return {
    type: UPDATE_COMPANY_GENERIC_SHIFT,
    payload: params,
  };
};

export const updateCompanyGenericShiftSuccess = (response) => {
  return {
    type: UPDATE_COMPANY_GENERIC_SHIFT_SUCCESS,
    payload: response,
  };
};

export const updateCompanyGenericShiftFailure = (error) => {
  return {
    type: UPDATE_COMPANY_GENERIC_SHIFT_FAILURE,
    payload: error,
  };
};

// Add Devices


export const addEsslDevice = (params) => {
  return {
    type: ADD_ESSL_DEVICE,
    payload: params,
  };
};

export const addEsslDeviceSuccess = (response) => {
  return {
    type: ADD_ESSL_DEVICE_SUCCESS,
    payload: response,
  };
};

export const addEsslDeviceFailure = (error) => {
  return {
    type: ADD_ESSL_DEVICE_FAILURE,
    payload: error,
  };
};

// get Devices

export const getEsslDevice = (params) => {
  return {
    type: GET_ESSL_DEVICE,
    payload: params,
  };
};

export const getEsslDeviceSuccess = (response) => {
  return {
    type: GET_ESSL_DEVICE_SUCCESS,
    payload: response,
  };
};

export const getEsslDeviceFailure = (error) => {
  return {
    type: GET_ESSL_DEVICE_FAILURE,
    payload: error,
  };
};

// remove Devices

export const removeEsslDevice = (params) => {
  return {
    type: REMOVE_ESSL_DEVICE,
    payload: params,
  };
};

export const removeEsslDeviceSuccess = (response) => {
  return {
    type: REMOVE_ESSL_DEVICE_SUCCESS,
    payload: response,
  };
};

export const removeEsslDeviceFailure = (error) => {
  return {
    type: REMOVE_ESSL_DEVICE_FAILURE,
    payload: error,
  };
};

//  UPDATE_EMPLOYEE_DEVICE_DETAILS


export const updateEmployeeDeviceDetails = (params) => {
  return {
    type: UPDATE_EMPLOYEE_DEVICE_DETAILS,
    payload: params,
  };
};

export const updateEmployeeDeviceDetailsSuccess = (response) => {
  return {
    type: UPDATE_EMPLOYEE_DEVICE_DETAILS_SUCCESS,
    payload: response,
  };
};

export const updateEmployeeDeviceDetailsFailure = (error) => {
  return {
    type: UPDATE_EMPLOYEE_DEVICE_DETAILS_FAILURE,
    payload: error,
  };
};

// getEmployeeDeviceDetails

export const getEmployeeDeviceDetails = (params) => {
  return {
    type: GET_EMPLOYEE_DEVICE_DETAILS,
    payload: params,
  };
};

export const getEmployeeDeviceDetailsSuccess = (response) => {
  return {
    type: GET_EMPLOYEE_DEVICE_DETAILS_SUCCESS,
    payload: response,
  };
};

export const getEmployeeDeviceDetailsFailure = (error) => {
  return {
    type: GET_EMPLOYEE_DEVICE_DETAILS_FAILURE,
    payload: error,
  };
};

//GET VENDER

export const getVender = (params) => {
  return {
    type: GET_VENDERS,
    payload: params,
  }
}
export const getVenderSuccess = (response) => {
  return {
    type: GET_VENDERS_SUCCESS,
    payload: response,
  }
}
export const getVenderFailure = (error) => {
  return {
    type: GET_VENDERS_FAILURE,
    payload: error,
  }
}


export const addVender = (params) => {
  return {
    type: ADD_VENDERS,
    payload: params,
  }
}
export const addVendorSuccess = (response) => {
  return {
    type: ADD_VENDERS_SUCCESS,
    payload: response,
  }
}

export const addVenderFailure = (error) => {
  return {
    type: ADD_VENDERS_FAILURE,
    payload: error,
  }
}