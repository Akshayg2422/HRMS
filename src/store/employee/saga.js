import { takeLatest, put, call } from "redux-saga/effects";

import { FETCH_DESIGNATION, FETCH_DEPARTMENT, FETCH_ALL_BRANCHES_LIST, FETCH_EMPLOYEE_DETAILS, FETCH_EMPLOYEE_LIST, POST_EMPLOYEE_ADDITION, FETCH_EMPLOYEE_TIME_SHEETS, FETCH_EMPLOYEE_CHECK_IN_LOGS, FETCH_CHECK_IN_DETAILED_LOG_PER_DAY, FETCH_EMPLOYEE_EACH_USER_TIME_SHEETS,
ADD_DEPARTMENT,
ADD_DESIGNATION,
ADD_FENCE_ADMIN,FETCH_EMPLOYEE_ATTENDANCE_STATS, FETCH_EMPLOYEE_TODAY_STATUS, FETCH_CHECK_IN_DETAILED_LOG,FETCH_ATTENDANCE_CONSOLIDATED_CARDS,
UPDATE_EMPLOYEE_STATUS } from "./actionTypes";

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
  addFenceAdminFailure,
  getEmployeeAttendanceStatsSuccess,
  getEmployeeAttendanceStatsFailure,
  getEmployeeTodayStatusSuccess,
  getEmployeeTodayStatusFailure,
  getCheckInDetailedLogFailure,
  getCheckInDetailedLogSuccess,
  getAttendanceConsolidatedCardsSuccess,
  getAttendanceConsolidatedCardsFailure,
  getUpdateEmployeeStatusSuccess,
  getUpdateEmployeeStatusFailure
} from "./actions";

import {fetchDesignationData, fetchDepartmentData, fetchAllBranchesList, fetchEmployeeDetails, fetchEmployeeList, postEmployeeAddition , fetchEmployeeTimeSheets, fetchEmployeeCheckInLogs, fetchCheckInDetailedLogPerDay, fetchEmployeeEachUserTimeSheets,
postAddDepartment,
postAddDesignation,
postAddFenceAdmin,fetchEmployeeAttendanceStats,fetchEmployeeTodayStatus,fetchCheckInDetailedLog,fetchAttendanceConsolidatedCards,postUpdateEmployeeStatus} from "../../helpers/backend_helper";



function* getDesignation(action) {
  try {
    const response = yield call(fetchDesignationData, action.payload.params);
    if (response.success) {
      yield put(getDesignationDataSuccess(response.details));
      yield call(action.payload.onSuccess);
    } else {
      yield put(getDesignationDataFailure(response.error_message));
      yield call(action.payload.onError);
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
      yield call(action.payload.onSuccess);
    } else {
      yield put(getDepartmentDataFailure(response.error_message));
      yield call(action.payload.onError);
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
      yield call(action.payload.onSuccess);
    } else {
      yield put(getAllBranchesListFailure(response.error_message));
      yield call(action.payload.onError);
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
      yield call(action.payload.onSuccess(response.details));
    } else {
      yield put(getEmployeeDetailsFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));
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
      yield call(action.payload.onSuccess(response.details));
    } else {
      yield put(getEmployeesListFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));
    }
  } catch (error) {
    yield put(getEmployeesListFailure("Invalid Request"));
  }
}

function* employeeAddition(action) {
  try {
    const response = yield call(postEmployeeAddition, action.payload.params);
    console.log(JSON.stringify(response));
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
    const response = yield call(postAddDepartment, action.payload.params);
    if (response.success) {
      yield put(addDepartmentSuccess(response.details));
      yield call(action.payload.onSuccess);
    } else {
      yield put(addDepartmentFailure(response.error_message));
      yield call(action.payload.onError);
    }
  } catch (error) {
    yield put(addDepartmentFailure("Invalid Request"));
    yield call(action.payload.onError);
  }
}

function* addDesignation(action) { 
  try {
    console.log(JSON.stringify(action.payload.params)+"======addDesignation");
    const response = yield call(postAddDesignation, action.payload.params);
    console.log(JSON.stringify(response));
    if (response.success) {
      yield put(addDesignationSuccess(response.details));
      yield call(action.payload.onSuccess);
    } else {
      yield put(addDesignationFailure(response.error_message));
      yield call(action.payload.onError);
    }
  } catch (error) {
    yield put(addDesignationFailure("Invalid Request"));
    yield call(action.payload.onError);
  }
}

function* addFenceAdmin(action) { 
  try {
    const response = yield call(postAddFenceAdmin, action.payload.params);
    console.log(JSON.stringify(response)+"=====addFenceAdmin");
    if (response.success) {
      yield put(addFenceAdminSuccess(response.details));
      yield call(action.payload.onSuccess);
    } else {
      yield put(addFenceAdminFailure(response.error_message));
      yield call(action.payload.onError);
    }
  } catch (error) {
    yield put(addFenceAdminFailure("Invalid Request"));
  }
}

function* getEmployeeAttendanceStats(action) {
  try{
    const response = yield call(fetchEmployeeAttendanceStats,action.payload);
    if(response.success) {
      yield put(getEmployeeAttendanceStatsSuccess(response.details));
    } else {
      yield put(getEmployeeAttendanceStatsFailure(response.error_message));
    }
  }
  catch (error) {
    yield put(getEmployeeAttendanceStatsFailure("Invalid Request"))
  }
}

function* getEmployeeTodayStatus(action) {
try{
  const response = yield call(fetchEmployeeTodayStatus,action.payload)
  console.log("fffffff---------->",response);
  if(response.success){
    yield put(getEmployeeTodayStatusSuccess(response.details))
  }
  else{
    yield put(getEmployeeTodayStatusFailure(response.error_message))
  }
}
catch (error) {
  yield put(getEmployeeTodayStatusFailure("Invalid Request"))
}
}

function* getCheckInDetailedLog(action) {
 
  try{
    const response= yield call(fetchCheckInDetailedLog(action.payload))
    if(response.success)
    {
      yield put(getCheckInDetailedLogSuccess(response.details))
    }
    else{
      yield put(getCheckInDetailedLogFailure(response.error_message))
    }
  }
  catch(error){
    yield put(getCheckInDetailedLogFailure("Invalid Request"))
  }
}

function* getAttendanceConsolidatedCardsData(action) { 
  try {
    const response = yield call(fetchAttendanceConsolidatedCards, action.payload.params);

    if (response.success) {
      yield put(getAttendanceConsolidatedCardsSuccess(response.details));
      yield call(action.payload.onSuccess(response.details));
    } else {
      yield put(getAttendanceConsolidatedCardsFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));
    }
  } catch (error) {
    yield put(getAttendanceConsolidatedCardsFailure("Invalid Request"));
  }
}

function* getUpdateEmployeeStatus(action) { 
  try {
    const response = yield call(postUpdateEmployeeStatus, action.payload.params);
    if (response.success) {
      yield put(getUpdateEmployeeStatusSuccess(response.details));
      yield call(action.payload.onSuccess);
    } else {
      yield put(getUpdateEmployeeStatusFailure(response.error_message));
      yield call(action.payload.onError);
    }
  } catch (error) {
    yield put(getUpdateEmployeeStatusFailure("Invalid Request"));
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
  yield takeLatest(FETCH_EMPLOYEE_ATTENDANCE_STATS,getEmployeeAttendanceStats)
  yield takeLatest(FETCH_EMPLOYEE_TODAY_STATUS,getEmployeeTodayStatus)
  yield takeLatest(FETCH_CHECK_IN_DETAILED_LOG,getCheckInDetailedLog)
  yield takeLatest(FETCH_ATTENDANCE_CONSOLIDATED_CARDS,getAttendanceConsolidatedCardsData)
  yield takeLatest(UPDATE_EMPLOYEE_STATUS,getUpdateEmployeeStatus)
}

export default EmployeeSaga;
