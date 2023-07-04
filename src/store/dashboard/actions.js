import {
  FETCH_DASHBOARD,
  FETCH_DASHBOARD_SUCCESS,
  FETCH_DASHBOARD_FAIL,
  GET_CHECK_IN_DETAILED_LOG,
  GET_CHECK_IN_DETAILED_LOG_SUCCESS,
  GET_CHECK_IN_DETAILED_LOG_FAIL,
  URL_CHECK_IN,
  URL_CHECK_IN_SUCCESS,
  URL_CHECK_IN_FAIL,
  POST_DAILY_LOG,
  POST_DAILY_LOG_SUCCESS,
  POST_DAILY_LOG_FAIL,
  URL_DELETE_USER,
  URL_DELETE_USER_SUCCESS,
  URL_DELETE_USER_FAIL,
  EDIT_PROFILE_PICTURE,
  EDIT_PROFILE_PICTURE_SUCCESS,
  EDIT_PROFILE_PICTURE_FAIL,
  SET_HIERARCHICAL_BRANCH_IDS,
  SET_HIERARCHICAL_BRANCH_INCLUDE_CHILD,
  RESET_REDUCER,
  SET_HIERARCHICAL_ALL_BRANCH_IDS,
  SET_MULTISELECT_ALL_BRANCH_IDS,
  EMPLOYEE_FACE_FAILURE_LIST,
  EMPLOYEE_FACE_FAILURE_LIST_SUCCESS,
  EMPLOYEE_FACE_FAILURE_LIST_FAIL,
  CHANGE_EMPLOYEE_FACE_VALIDATION_REQUEST,
  CHANGE_EMPLOYEE_FACE_VALIDATION_REQUEST_SUCCESS,
  CHANGE_EMPLOYEE_FACE_VALIDATION_REQUEST_FAIL,
  CURRENT_FACE_STATUS_TYPE,
  FACE_RE_REGISTER_REQUEST,
  FACE_RE_REGISTER_REQUEST_SUCCESS,
  FACE_RE_REGISTER_REQUEST_FAIL,
  FACE_RE_REGISTER_CHANGE_STATUS,
  FACE_RE_REGISTER_CHANGE_STATUS_SUCCESS,
  FACE_RE_REGISTER_CHANGE_STATUS_FAIL,
  EMPLOYEE_FACE_RE_REGISTER_REQUEST,
  EMPLOYEE_FACE_RE_REGISTER_REQUEST_SUCCESS,
  EMPLOYEE_FACE_RE_REGISTER_REQUEST_FAIL,
  EMPLOYEE_ENABLE_FACE_RE_REGISTER_ACTION,
  EMPLOYEE_ENABLE_FACE_RE_REGISTER_ACTION_SUCCESS,
  EMPLOYEE_ENABLE_FACE_RE_REGISTER_ACTION_FAIL,
  TRIGGER_HIERARCHICAL

} from "./actionTypes";


export const getDashboard = (params) => {
  return {
    type: FETCH_DASHBOARD,
    payload: params,

  };
};



export const getDashboardSuccess = (response) => {
  return {
    type: FETCH_DASHBOARD_SUCCESS,
    payload: response,
  };
};

export const getDashboardFail = (error) => {
  return {
    type: FETCH_DASHBOARD_FAIL,
    payload: error,
  };
};

// CheckIn Detailed Log
export const checkInDetailedLog = (params) => {
  return {
    type: GET_CHECK_IN_DETAILED_LOG,
    payload: params,

  };
};

export const checkInDetailedLogSuccess = (response) => {
  return {
    type: GET_CHECK_IN_DETAILED_LOG_SUCCESS,
    payload: response,
  };
};

export const checkInDetailedLogFail = (error) => {
  return {
    type: GET_CHECK_IN_DETAILED_LOG_FAIL,
    payload: error,
  };
};

// CheckIn User
export const checkInUser = (params) => {
  return {
    type: URL_CHECK_IN,
    payload: params,

  };
};

export const checkInUserSuccess = (response) => {
  return {
    type: URL_CHECK_IN_SUCCESS,
    payload: response,
  };
};

export const checkInUserFail = (error) => {
  return {
    type: URL_CHECK_IN_FAIL,
    payload: error,
  };
};

// Daily Log
export const dailyLog = (params) => {
  return {
    type: POST_DAILY_LOG,
    payload: params,

  };
};

export const dailyLogSuccess = (response) => {
  return {
    type: POST_DAILY_LOG_SUCCESS,
    payload: response,
  };
};

export const dailyLogFail = (error) => {
  return {
    type: POST_DAILY_LOG_FAIL,
    payload: error,
  };
};

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


/**
 * Hierarchical branch set
 */

export const setBranchHierarchical = (params) => {
  return {
    type: SET_HIERARCHICAL_BRANCH_IDS,
    payload: params,
  };
};


export const setBranchHierarchicalIncludeChild = (params) => {
  return {
    type: SET_HIERARCHICAL_BRANCH_INCLUDE_CHILD,
    payload: params,
  };
};

// SET_HIERARCHICAL_ALL_BRANCH_IDS

export const setBranchAllHierarchical = (params) => {
  return {
    type: SET_HIERARCHICAL_ALL_BRANCH_IDS,
    payload: params,
  };
};


/**
 * setLogout
 */

export const resetDashboard = () => {
  return {
    type: RESET_REDUCER,
  };
};

// export const matchRouteName=(params)=>{
//   return{
//     type: MATCH_ROUTE_NAME,
//     payload:params
//   }
// }

export const multiSelectBranch = (branches) => {
  return {
    type: SET_MULTISELECT_ALL_BRANCH_IDS,
    payload: branches
  }
}



export const getEmployeesLoginFaceFailureAction = (params) => {
  return {
    type: EMPLOYEE_FACE_FAILURE_LIST,
    payload: params,

  };
};

export const getEmployeesLoginFaceFailureActionSuccess = (response) => {
  return {
    type: EMPLOYEE_FACE_FAILURE_LIST_SUCCESS,
    payload: response,
  };
};

export const getEmployeesLoginFaceFailureActionFail = (error) => {
  return {
    type: EMPLOYEE_FACE_FAILURE_LIST_FAIL,
    payload: error,
  };
};



export const changeEmployeeFaceValidationRequestAction = (params) => {
  return {
    type: CHANGE_EMPLOYEE_FACE_VALIDATION_REQUEST,
    payload: params,

  };
};

export const changeEmployeeFaceValidationRequestActionSuccess = (response) => {
  return {
    type: CHANGE_EMPLOYEE_FACE_VALIDATION_REQUEST_SUCCESS,
    payload: response,
  };
};

export const changeEmployeeFaceValidationRequestActionFail = (error) => {
  return {
    type: CHANGE_EMPLOYEE_FACE_VALIDATION_REQUEST_FAIL,
    payload: error,
  };
};


export const setFaceCurrentStatusType = (type) => {
  return {
    type: CURRENT_FACE_STATUS_TYPE,
    payload: type,
  };
};

//Face Re-Register Request

export const faceReRegisterRequestAction = (params) => {
  return {
    type: FACE_RE_REGISTER_REQUEST,
    payload: params,

  };
};

export const faceReRegisterRequestActionSuccess = (response) => {
  return {
    type: FACE_RE_REGISTER_REQUEST_SUCCESS,
    payload: response,
  };
};

export const faceReRegisterRequestActionFail = (error) => {
  return {
    type: FACE_RE_REGISTER_REQUEST_FAIL,
    payload: error,
  };
};

// Face Re-Register Change Status

export const faceReRegisterRequestChangeStatus = (params) => {
  return {
    type: FACE_RE_REGISTER_CHANGE_STATUS,
    payload: params,

  };
};

export const faceReRegisterRequestChangeStatusSuccess = (response) => {
  return {
    type: FACE_RE_REGISTER_CHANGE_STATUS_SUCCESS,
    payload: response,
  };
};

export const faceReRegisterRequestChangeStatusFail = (error) => {
  return {
    type: FACE_RE_REGISTER_CHANGE_STATUS_FAIL,
    payload: error,
  };
};

//face Re-register Employee Request 

export const employeeFaceReRegisterRequest = (params) => {
  return {
    type: EMPLOYEE_FACE_RE_REGISTER_REQUEST,
    payload: params,

  };
};

export const employeeFaceReRegisterRequestSuccess = (response) => {
  return {
    type: EMPLOYEE_FACE_RE_REGISTER_REQUEST_SUCCESS,
    payload: response,
  };
};

export const employeeFaceReRegisterRequestFail = (error) => {
  return {
    type: EMPLOYEE_FACE_RE_REGISTER_REQUEST_FAIL,
    payload: error,
  };
};

//employee enable Face ReRegister


export const employeeEnableFaceReRegister = (params) => {
  return {
    type: EMPLOYEE_ENABLE_FACE_RE_REGISTER_ACTION,
    payload: params,

  };
};

export const employeeEnableFaceReRegisterSuccess = (response) => {
  return {
    type: EMPLOYEE_ENABLE_FACE_RE_REGISTER_ACTION_SUCCESS,
    payload: response,
  };
};


export const employeeEnableFaceReRegisterFail = (error) => {
  return {
    type: EMPLOYEE_ENABLE_FACE_RE_REGISTER_ACTION_FAIL,
    payload: error,
  };
};


export const activeBranchTriggerHierarchical = (params) => {
  return {
    type: TRIGGER_HIERARCHICAL,
    payload: params,
  };
};