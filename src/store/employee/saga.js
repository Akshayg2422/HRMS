import { takeLatest, put, call } from "redux-saga/effects";

import { FETCH_DESIGNATION, FETCH_DEPARTMENT, FETCH_ALL_BRANCHES_LIST, FETCH_EMPLOYEE_DETAILS, FETCH_EMPLOYEE_LIST, POST_EMPLOYEE_ADDITION, FETCH_EMPLOYEE_TIME_SHEETS, FETCH_EMPLOYEE_CHECK_IN_LOGS, FETCH_CHECK_IN_DETAILED_LOG_PER_DAY, FETCH_EMPLOYEE_EACH_USER_TIME_SHEETS,
ADD_DEPARTMENT,
ADD_DESIGNATION,
ADD_FENCE_ADMIN } from "./actionTypes";

import {
  getDepartmentDataSuccess,
  getDepartmentDataFailure,
  getDesignationDataSuccess,
  getDesignationDataFailure,
  getAllBranchesListSuccess,
  getAllBranchesListFailure,
  getEmployeeDetailsSuccess,
  getEmployeeDetailsFailure,
  getEmployeesListSuccess,
  getEmployeesListFailure,
  employeeAdditionSuccess,
  employeeAdditionFailure,
  getEmployeesCheckInLogsSuccess,
  getEmployeesCheckInLogsFailure,
  getEmployeesTimeSheetsSuccess,
  getEmployeesTimeSheetsFailure,
  getCheckInDetailedLogPerDaySuccess,
  getCheckInDetailedLogPerDayFailure,
  getEmployeeEachUserTimeSheetsFailure,
  getEmployeeEachUserTimeSheetsSuccess,
  addDepartmentSuccess,
  addDepartmentFailure,
  addDesignationSuccess,
  addDesignationFailure,
  addFenceAdminSuccess,
  addFenceAdminFailure

} from "./actions";

import {fetchDesignationData, fetchDepartmentData, fetchAllBranchesList, fetchEmployeeDetails, fetchEmployeeList, postEmployeeAddition , fetchEmployeeTimeSheets, fetchEmployeeCheckInLogs, fetchCheckInDetailedLogPerDay, fetchEmployeeEachUserTimeSheets,
postAddDepartment,
postAddDesignation,
postAddFenceAdmin} from "../../helpers/backend_helper";



function* getDesignation(action) {
  try {
    const response = yield call(fetchDesignationData, action.payload.params);
    if (response.success) {
      yield put(getDesignationDataSuccess(response.details));
    } else {
      yield put(getDesignationDataFailure(response.error_message));
    }
  } catch (error) {
    yield put(getDesignationDataFailure("Invalid Request"));
  }
}

function* getDepartments(action) {
  try {
    const response = yield call(fetchDepartmentData, action.payload.params);
    if (response.success) {
      yield put(getDepartmentDataSuccess(response.details));
    } else {
      yield put(getDepartmentDataFailure(response.error_message));
    }
  } catch (error) {
    yield put(getDepartmentDataFailure("Invalid Request"));
  }
}

function* getAllBranches(action) {
  try {
    const response = yield call(fetchAllBranchesList, action.payload.params);
    if (response.success) {
      yield put(getAllBranchesListSuccess(response.details));
    } else {
      yield put(getAllBranchesListFailure(response.error_message));
    }
  } catch (error) {
    yield put(getAllBranchesListFailure("Invalid Request"));
  }
}

function* getEmployeeDetails(action) {
  try {
    const response = yield call(fetchEmployeeDetails, action.payload.params);
    if (response.success) {
      yield put(getEmployeeDetailsSuccess(response.details));
      yield call(action.payload.onSuccess);
    } else {
      yield put(getEmployeeDetailsFailure(response.error_message));
      yield call(action.payload.onError);
    }
  } catch (error) {
    yield put(getEmployeeDetailsFailure("Invalid Request"));
  }
}

function* getEmployeesList(action) {
  try {
    const response = yield call(fetchEmployeeList, action.payload.params);
    if (response.success) {
      yield put(getEmployeesListSuccess(response.details));
    } else {
      yield put(getEmployeesListFailure(response.error_message));
    }
  } catch (error) {
    yield put(getEmployeesListFailure("Invalid Request"));
  }
}

function* employeeAddition(action) {
  try {
    const response = yield call(postEmployeeAddition, action.payload.params);
    if (response.success) {
      yield put(employeeAdditionSuccess(response.details));
      yield call(action.payload.onSuccess);
    } else {
      yield put(employeeAdditionFailure(response.error_message));
      yield call(action.payload.onError);
    }
  } catch (error) {
    yield put(employeeAdditionFailure("Invalid Request"));
  }
}

function* getEmployeesTimeSheets(action) {
  
  try {
    const response = yield call(fetchEmployeeTimeSheets, action.payload.params);
    if (response.success) {
      yield put(getEmployeesTimeSheetsSuccess(response.details));
    } else {
      yield put(getEmployeesTimeSheetsFailure(response.error_message));
    }
  } catch (error) {
    yield put(getEmployeesTimeSheetsFailure("Invalid Request"));
  }
}

/**
 * get Employee Check in logs
 * @param {*} action 
 */

function* getEmployeeCheckInLogs(action) {

  try {
    const response = yield call(fetchEmployeeCheckInLogs, action.payload.params);

    console.log(JSON.stringify(response)+'=========getEmployeeCheckInLogs');
    if (response.success) {
      yield put(getEmployeesCheckInLogsSuccess(response.details));
    } else {
      yield put(getEmployeesCheckInLogsFailure(response.error_message));
    }
  } catch (error) { 
    yield put(getEmployeesCheckInLogsFailure("Invalid Request"));
  }
}

/**
 * CheckInDetailedLogPerDay
 * 
 */


function* getCheckInDetailedLogPerDay(action) {

  console.log('2');
  try {
    const response = yield call(fetchCheckInDetailedLogPerDay, action.payload);
    console.log('3');
    if (response.success) {
      console.log('4');
      yield put(getCheckInDetailedLogPerDaySuccess(response.details));
    } else {
      yield put(getCheckInDetailedLogPerDayFailure(response.error_message));
    }
  } catch (error) {
    yield put(getCheckInDetailedLogPerDayFailure("Invalid Request"));
  }
}


function* getEmployeeEachUserTimeSheets(action) { 
  console.log(JSON.stringify(action.payload));
  try {
    const response = yield call(fetchEmployeeEachUserTimeSheets, action.payload);
    console.log(JSON.stringify(response)+"======getEmployeeEachUserTimeSheets");
    if (response.success) {
      yield put(getEmployeeEachUserTimeSheetsSuccess(response.details));
    } else {
      yield put(getEmployeeEachUserTimeSheetsFailure(response.error_message));
    }
  } catch (error) {
    yield put(getEmployeeEachUserTimeSheetsFailure("Invalid Request"));
  }
}

function* addDepartment(action) { 
  try {
    const response = yield call(postAddDepartment, action.payload);
    if (response.success) {
      yield put(addDepartmentSuccess(response.details));
    } else {
      yield put(addDepartmentFailure(response.error_message));
    }
  } catch (error) {
    yield put(addDepartmentFailure("Invalid Request"));
  }
}

function* addDesignation(action) { 
  try {
    const response = yield call(postAddDesignation, action.payload);
    if (response.success) {
      yield put(addDesignationSuccess(response.details));
    } else {
      yield put(addDesignationFailure(response.error_message));
    }
  } catch (error) {
    yield put(addDesignationFailure("Invalid Request"));
  }
}

function* addFenceAdmin(action) { 
  try {
    const response = yield call(postAddFenceAdmin, action.payload);
    if (response.success) {
      yield put(addFenceAdminSuccess(response.details));
    } else {
      yield put(addFenceAdminFailure(response.error_message));
    }
  } catch (error) {
    yield put(addFenceAdminFailure("Invalid Request"));
  }
}


function* EmployeeSaga() {
  yield takeLatest(FETCH_DESIGNATION, getDesignation);
  yield takeLatest(FETCH_DEPARTMENT, getDepartments);
  yield takeLatest(FETCH_ALL_BRANCHES_LIST, getAllBranches);
  yield takeLatest(FETCH_EMPLOYEE_DETAILS, getEmployeeDetails);
  yield takeLatest(FETCH_EMPLOYEE_LIST, getEmployeesList);
  yield takeLatest(POST_EMPLOYEE_ADDITION, employeeAddition);
  yield takeLatest(FETCH_EMPLOYEE_TIME_SHEETS, getEmployeesTimeSheets);
  yield takeLatest(FETCH_EMPLOYEE_CHECK_IN_LOGS, getEmployeeCheckInLogs);
  yield takeLatest(FETCH_CHECK_IN_DETAILED_LOG_PER_DAY, getCheckInDetailedLogPerDay);
  yield takeLatest(FETCH_EMPLOYEE_EACH_USER_TIME_SHEETS, getEmployeeEachUserTimeSheets);
  yield takeLatest(ADD_DEPARTMENT, addDepartment);
  yield takeLatest(ADD_DESIGNATION, addDesignation);
  yield takeLatest(ADD_FENCE_ADMIN, addFenceAdmin);
}

export default EmployeeSaga;
