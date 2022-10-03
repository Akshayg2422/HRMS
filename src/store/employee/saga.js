import { takeLatest, put, call } from "redux-saga/effects";

import {
  FETCH_DESIGNATION,
  FETCH_DEPARTMENT,
  FETCH_ALL_BRANCHES_LIST,
  FETCH_EMPLOYEE_DETAILS,
  FETCH_EMPLOYEE_LIST,
  POST_EMPLOYEE_ADDITION,
  FETCH_EMPLOYEE_TIME_SHEETS,
  FETCH_EMPLOYEE_CHECK_IN_LOGS,
  FETCH_CHECK_IN_DETAILED_LOG_PER_DAY,
  FETCH_EMPLOYEE_EACH_USER_TIME_SHEETS,
  ADD_DEPARTMENT,
  ADD_DESIGNATION,
  ADD_FENCE_ADMIN,
  FETCH_EMPLOYEE_ATTENDANCE_STATS,
  FETCH_EMPLOYEE_TODAY_STATUS,
  FETCH_CHECK_IN_DETAILED_LOG,
  FETCH_ATTENDANCE_CONSOLIDATED_CARDS,
  UPDATE_EMPLOYEE_STATUS,
  FETCH_DOWNLOAD_TODAY_STATUS,
  FETCH_LEAVE_TYPES,
  APPLY_LEAVE,
  FETCH_CALENDAR_DETAILS,
  PENDING_LEAVE,
  FETCH_APPROVED_DETAILS
} from "./actionTypes";

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
  getUpdateEmployeeStatusFailure,
  getDownloadTodayStatusSuccess,
  getDownloadTodayStatusFailure,
  getLeaveTypesSuccess,
  getLeaveTypesFailure,
  applyLeaveSuccess,
  applyLeaveFailure,
  getPendingLeaveDetailsSuccess,
  getPendingLeaveDetailsFailure,
  getApprovedLeavesSuccess,
  getApprovedLeavesFailure,
  fetchCalendardetailsSuccess,
  fetchCalendardetailsFailure,
} from "./actions";

import {
  fetchDesignationData,
  fetchDepartmentData,
  fetchAllBranchesList,
  fetchEmployeeDetails,
  fetchEmployeeList,
  postEmployeeAddition,
  fetchEmployeeTimeSheets,
  fetchEmployeeCheckInLogs,
  fetchCheckInDetailedLogPerDay,
  fetchEmployeeEachUserTimeSheets,
  postAddDepartment,
  postAddDesignation,
  fetchDownloadTodayStatus,
  postAddFenceAdmin,
  fetchEmployeeAttendanceStats,
  fetchEmployeeTodayStatus,
  fetchCheckInDetailedLog,
  fetchAttendanceConsolidatedCards,
  postUpdateEmployeeStatus,
  fetchLeaveTypes,
  postApplyLeave,
  fetchEmployeePendingLeaves,
  postChangeEmployeeLeaveStatus,
  fetchEmployeeApprovedLeaves,
  fetchEmployeeRejectedLeaves,
  fetchCalendarDetails,
} from "../../helpers/backend_helper";

import { showLoader, hideLoader } from "../app/actions";

function* getDesignation(action) {
  try {
    yield put(showLoader());

    const response = yield call(fetchDesignationData, action.payload.params);

    if (response.success) {
      yield put(hideLoader());
      yield put(getDesignationDataSuccess(response.details));
      yield call(action.payload.onSuccess);
    } else {
      yield put(hideLoader());
      yield put(getDesignationDataFailure(response.error_message));
      yield call(action.payload.onError);
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getDesignationDataFailure("Invalid Request"));
  }
}

function* getDepartments(action) {
  try {
    yield put(showLoader());

    const response = yield call(fetchDepartmentData, action.payload.params);

    if (response.success) {
      yield put(hideLoader());
      yield put(getDepartmentDataSuccess(response.details));
      yield call(action.payload.onSuccess);
    } else {
      yield put(hideLoader());
      yield put(getDepartmentDataFailure(response.error_message));
      yield call(action.payload.onError);
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getDepartmentDataFailure("Invalid Request"));
  }
}

function* getAllBranches(action) {
  try {
    yield put(showLoader());

    const response = yield call(fetchAllBranchesList, action.payload.params);

    if (response.success) {
      yield put(hideLoader());
      yield put(getAllBranchesListSuccess(response.details));
      yield call(action.payload.onSuccess);
    } else {
      yield put(hideLoader());
      yield put(getAllBranchesListFailure(response.error_message));
      yield call(action.payload.onError);
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getAllBranchesListFailure("Invalid Request"));
  }
}

function* getEmployeeDetails(action) {
  try {
    yield put(showLoader());

    const response = yield call(fetchEmployeeDetails, action.payload.params);

    if (response.success) {
      yield put(hideLoader());
      yield put(getEmployeeDetailsSuccess(response.details));
      yield call(action.payload.onSuccess(response.details));
    } else {
      yield put(hideLoader());
      yield put(getEmployeeDetailsFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getEmployeeDetailsFailure("Invalid Request"));
  }
}

function* getEmployeesList(action) {
  try {
    yield put(showLoader());

    const response = yield call(fetchEmployeeList, action.payload.params);

    if (response.success) {
      yield put(hideLoader());
      yield put(getEmployeesListSuccess(response.details));
      yield call(action.payload.onSuccess(response.details));
    } else {
      yield put(hideLoader());
      yield put(getEmployeesListFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getEmployeesListFailure("Invalid Request"));
  }
}

function* employeeAddition(action) {
  try {
    yield put(showLoader());

    const response = yield call(postEmployeeAddition, action.payload.params);

    if (response.success) {
      yield put(hideLoader());
      yield put(employeeAdditionSuccess(response.details));
      yield call(action.payload.onSuccess);
    } else {
      yield put(hideLoader());
      yield put(employeeAdditionFailure(response.error_message));
      yield call(action.payload.onError);
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(employeeAdditionFailure("Invalid Request"));
  }
}

function* getEmployeesTimeSheets(action) {
  try {
    yield put(showLoader());

    const response = yield call(fetchEmployeeTimeSheets, action.payload.params);

    if (response.success) {
      yield put(hideLoader());
      yield put(getEmployeesTimeSheetsSuccess(response.details));
    } else {
      yield put(hideLoader());
      yield put(getEmployeesTimeSheetsFailure(response.error_message));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getEmployeesTimeSheetsFailure("Invalid Request"));
  }
}

/**
 * get Employee Check in logs
 * @param {*} action
 */

function* getEmployeeCheckInLogs(action) {
  try {
    yield put(showLoader());

    const response = yield call(
      fetchEmployeeCheckInLogs,
      action.payload.params
    );

    if (response.success) {
      yield put(hideLoader());
      yield put(getEmployeesCheckInLogsSuccess(response.details));
    } else {
      yield put(hideLoader());
      yield put(getEmployeesCheckInLogsFailure(response.error_message));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getEmployeesCheckInLogsFailure("Invalid Request"));
  }
}

/**
 * CheckInDetailedLogPerDay
 *
 */

function* getCheckInDetailedLogPerDay(action) {
  try {
    yield put(showLoader());

    const response = yield call(fetchCheckInDetailedLogPerDay, action.payload);

    if (response.success) {
      yield put(hideLoader());
      yield put(getCheckInDetailedLogPerDaySuccess(response.details));
    } else {
      yield put(hideLoader());
      yield put(getCheckInDetailedLogPerDayFailure(response.error_message));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getCheckInDetailedLogPerDayFailure("Invalid Request"));
  }
}

function* getEmployeeEachUserTimeSheets(action) {
  try {
    yield put(showLoader());

    const response = yield call(
      fetchEmployeeEachUserTimeSheets,
      action.payload
    );

    if (response.success) {
      yield put(hideLoader());
      yield put(getEmployeeEachUserTimeSheetsSuccess(response.details));
    } else {
      yield put(hideLoader());
      yield put(getEmployeeEachUserTimeSheetsFailure(response.error_message));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getEmployeeEachUserTimeSheetsFailure("Invalid Request"));
  }
}

function* addDepartment(action) {
  try {
    yield put(showLoader());

    const response = yield call(postAddDepartment, action.payload.params);

    if (response.success) {
      yield put(hideLoader());
      yield put(addDepartmentSuccess(response.details));
      yield call(action.payload.onSuccess);
    } else {
      yield put(hideLoader());
      yield put(addDepartmentFailure(response.error_message));
      yield call(action.payload.onError);
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(addDepartmentFailure("Invalid Request"));
    yield call(action.payload.onError);
  }
}

function* addDesignation(action) {
  try {
    yield put(showLoader());

    const response = yield call(postAddDesignation, action.payload.params);

    if (response.success) {
      yield put(hideLoader());
      yield put(addDesignationSuccess(response.details));
      yield call(action.payload.onSuccess);
    } else {
      yield put(hideLoader());
      yield put(addDesignationFailure(response.error_message));
      yield call(action.payload.onError);
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(addDesignationFailure("Invalid Request"));
    yield call(action.payload.onError);
  }
}

function* addFenceAdmin(action) {
  try {
    yield put(showLoader());

    const response = yield call(postAddFenceAdmin, action.payload.params);

    if (response.success) {
      yield put(hideLoader());
      yield put(addFenceAdminSuccess(response.details));
      yield call(action.payload.onSuccess);
    } else {
      yield put(hideLoader());
      yield put(addFenceAdminFailure(response.error_message));
      yield call(action.payload.onError);
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(addFenceAdminFailure("Invalid Request"));
  }
}

function* getEmployeeAttendanceStats(action) {
  try {
    yield put(showLoader());

    const response = yield call(fetchEmployeeAttendanceStats, action.payload);

    if (response.success) {
      yield put(hideLoader());
      yield put(getEmployeeAttendanceStatsSuccess(response.details));
    } else {
      yield put(hideLoader());
      yield put(getEmployeeAttendanceStatsFailure(response.error_message));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getEmployeeAttendanceStatsFailure("Invalid Request"));
  }
}

function* getEmployeeTodayStatus(action) {
  try {
    yield put(showLoader());

    const response = yield call(fetchEmployeeTodayStatus, action.payload);
    console.log("response data--->", response);
    if (response.success) {
      yield put(hideLoader());
      yield put(getEmployeeTodayStatusSuccess(response.details));
      yield call(action.payload.onSuccess(response));
    } else {
      console.log("error");
      yield put(hideLoader());
      yield put(getEmployeeTodayStatusFailure(response.error_message));
      yield call(action.payload.onError);
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getEmployeeTodayStatusFailure("Invalid Request"));
  }
}

//download

function* getDownloadTodayStatus(action) {
  try {
    yield put(showLoader());
    const response = yield call(fetchDownloadTodayStatus, action.payload);
    if (response) {
      yield put(hideLoader());
      yield put(getDownloadTodayStatusSuccess(response.data));
      yield call(action.payload.onSuccess(response));
    } else {
      console.log("error");
      yield put(hideLoader());
      yield put(getDownloadTodayStatusFailure(response.error_message));
      yield call(action.payload.onError);
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getEmployeeTodayStatusFailure("Invalid Request"));
  }
}

function* getCheckInDetailedLog(action) {
  try {
    yield put(showLoader());

    const response = yield call(fetchCheckInDetailedLog(action.payload));

    if (response.success) {
      yield put(hideLoader());
      yield put(getCheckInDetailedLogSuccess(response.details));
    } else {
      yield put(hideLoader());
      yield put(getCheckInDetailedLogFailure(response.error_message));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getCheckInDetailedLogFailure("Invalid Request"));
  }
}

function* getAttendanceConsolidatedCardsData(action) {
  try {
    yield put(showLoader());

    const response = yield call(
      fetchAttendanceConsolidatedCards,
      action.payload.params
    );

    if (response.success) {
      yield put(hideLoader());
      yield put(getAttendanceConsolidatedCardsSuccess(response.details));
      yield call(action.payload.onSuccess(response.details));
    } else {
      yield put(hideLoader());
      yield put(getAttendanceConsolidatedCardsFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getAttendanceConsolidatedCardsFailure("Invalid Request"));
  }
}

function* getUpdateEmployeeStatus(action) {
  try {
    yield put(showLoader());

    const response = yield call(
      postUpdateEmployeeStatus,
      action.payload.params
    );

    if (response.success) {
      yield put(hideLoader());
      yield put(getUpdateEmployeeStatusSuccess(response.details));
      yield call(action.payload.onSuccess);
    } else {
      yield put(hideLoader());
      yield put(getUpdateEmployeeStatusFailure(response.error_message));
      yield call(action.payload.onError);
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getUpdateEmployeeStatusFailure("Invalid Request"));
  }
}

function* getLeaveTypes(action) {
  try {
    yield put(showLoader());

    const response = yield call(fetchLeaveTypes, action.payload.params);

    if (response.success) {
      yield put(hideLoader());
      yield put(getLeaveTypesSuccess(response.details));
      yield call(action.payload.onSuccess(response.details));
    } else {
      yield put(hideLoader());
      yield put(getLeaveTypesFailure(response.error_message));
      yield call(action.payload.onError);
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getLeaveTypesFailure("Invalid Request"));
  }
}

function* applyLeave(action) {
  try {
    yield put(showLoader());

    const response = yield call(postApplyLeave, action.payload.params);

    if (response.success) {
      yield put(hideLoader());
      yield put(applyLeaveSuccess(response.details));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(applyLeaveFailure(response.error_message));
      yield call(action.payload.onError);
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(applyLeaveFailure("Invalid Request"));
  }
}

function* getEmployeePendingLeaves(action) {
  try {
    yield put(showLoader());

    const response = yield call(
      fetchEmployeePendingLeaves,
      action.payload.params
    );

    if (response.success) {
      yield put(hideLoader());
      yield put(getPendingLeaveDetailsSuccess(response.details));
      yield call(action.payload.onSuccess(response));
      console.log("pending-->", response);
    } else {
      yield put(hideLoader());
      yield put(getPendingLeaveDetailsFailure(response.error_message));
      yield call(action.payload.onError);
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getPendingLeaveDetailsFailure("Invalid Request"));
  }
}

function* getEmployeeApprovedLeaves(action) {
  try {
    yield put(showLoader());

    const response = yield call(
      fetchEmployeeApprovedLeaves,
      action.payload.params
    );

    if (response.success) {
      yield put(hideLoader());
      yield put(getApprovedLeavesSuccess(response.details));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(getApprovedLeavesFailure(response.error_message));
      yield call(action.payload.onError);
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getApprovedLeavesFailure("Invalid Request"));
  }
}

function* FetchCalendardetails(action) {
  try {
    yield put(showLoader());

    const response = yield call(fetchCalendarDetails, action.payload.params);
    if (response.success) {
      yield put(hideLoader());
      yield put(fetchCalendardetailsSuccess(response.details));
    } else {
      yield put(hideLoader());
      yield put(fetchCalendardetailsFailure(response.error_message));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(fetchCalendardetailsFailure("Invalid Request"));
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
  yield takeLatest(
    FETCH_CHECK_IN_DETAILED_LOG_PER_DAY,
    getCheckInDetailedLogPerDay
  );
  yield takeLatest(
    FETCH_EMPLOYEE_EACH_USER_TIME_SHEETS,
    getEmployeeEachUserTimeSheets
  );
  yield takeLatest(ADD_DEPARTMENT, addDepartment);
  yield takeLatest(ADD_DESIGNATION, addDesignation);
  yield takeLatest(ADD_FENCE_ADMIN, addFenceAdmin);
  yield takeLatest(FETCH_EMPLOYEE_ATTENDANCE_STATS, getEmployeeAttendanceStats);
  yield takeLatest(FETCH_EMPLOYEE_TODAY_STATUS, getEmployeeTodayStatus);
  yield takeLatest(FETCH_CHECK_IN_DETAILED_LOG, getCheckInDetailedLog);
  yield takeLatest(
    FETCH_ATTENDANCE_CONSOLIDATED_CARDS,
    getAttendanceConsolidatedCardsData
  );
  yield takeLatest(UPDATE_EMPLOYEE_STATUS, getUpdateEmployeeStatus);
  yield takeLatest(FETCH_DOWNLOAD_TODAY_STATUS, getDownloadTodayStatus);
  yield takeLatest(FETCH_LEAVE_TYPES, getLeaveTypes);
  yield takeLatest(APPLY_LEAVE, applyLeave);
  yield takeLatest(PENDING_LEAVE, getEmployeePendingLeaves);
  yield takeLatest(FETCH_APPROVED_DETAILS, getEmployeeApprovedLeaves);
  yield takeLatest(FETCH_EMPLOYEE_ATTENDANCE_STATS, getEmployeeAttendanceStats);
  yield takeLatest(FETCH_EMPLOYEE_TODAY_STATUS, getEmployeeTodayStatus);
  yield takeLatest(FETCH_CHECK_IN_DETAILED_LOG, getCheckInDetailedLog);
  yield takeLatest(
    FETCH_ATTENDANCE_CONSOLIDATED_CARDS,
    getAttendanceConsolidatedCardsData
  );
  yield takeLatest(UPDATE_EMPLOYEE_STATUS, getUpdateEmployeeStatus);
  yield takeLatest(FETCH_DOWNLOAD_TODAY_STATUS, getDownloadTodayStatus);
  yield takeLatest(FETCH_LEAVE_TYPES, getLeaveTypes);
  yield takeLatest(APPLY_LEAVE, applyLeave);
  yield takeLatest(FETCH_CALENDAR_DETAILS, FetchCalendardetails);
}

export default EmployeeSaga;
