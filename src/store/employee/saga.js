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
  CHANGE_EMPLOYEE_LEAVE_STATUS,
  ADD_HOLIDAY,
  DELETE_HOLIDAY,
  GET_EMPLOYEES_LEAVES,
  GET_LEAVES_BY_TYPES,
  GET_MODIFY_LOGS,
  GET_MIS_REPORT,
  GET_MIS_REPORT_DOWNLOAD,
  GET_EMPLOYEE_DOCUMENT,
  ATTACH_USER_DOCUMENT,
  GET_ADMIN_BRANCHES,
  POST_UPDATED_ADMIN_BRANCHES,
  GET_BRANCHES_ADMIN,
  
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
  fetchCalendardetailsSuccess,
  fetchCalendardetailsFailure,
  changeEmployeeLeaveStatusSuccess,
  changeEmployeeLeaveStatusFailure,
  addHolidaySuccess,
  addHolidayFailure,
  deleteHoliday,
  deleteHolidaySuccess,
  deleteHolidayFailure,
  getLeavesByTypes,
  getLeavesByTypesSuccess,
  getLeavesByTypesFailure,
  getEmployeeLeaves,
  getEmployeeLeavesSuccess,
  getEmployeeLeavesFailure,
  getModifyLogsSuccess,
  getModifyLogsFailure,
  getMisReportSuccess,
  getMisReportFailure,
  getDownloadMisReportSuccess,
  getDownloadMisReportFailure,
  getEmployeeDocument,
  getEmployeeDocumentSuccess,
  getEmployeeDocumentFailure,
  attachUserDocument,
  attachUserDocumentSuccess,
  attachUserDocumentFailure,
  getAdminBranchesSuccess,
  getAdminBranchesFailure,
  postAdminUpdateBranchesSuccess,
  postAdminUpdateBranchesFailure,
  getBranchAdminsSuccess,
  getBranchAdminsFailure,

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
  postChangeEmployeeLeaveStatus,
  fetchCalendarDetails,
  postAddHolidays,
  postDeleteHolidays,
  fetchEmployeesleaves,
  fetchMyleaves,
  fetchModifyEmployeesLeaves,
  fetchMisReportsLog,
  fetchDownloadMisReportsLog,
  fetchEmployeeDocuments,
  attachUserDocuments,
  fetchAdminBranches,
  PostUpdatedAdminBranches,
  getBranchAdminsApi
} from "../../helpers/backend_helper";

import { showLoader, hideLoader } from "../loader/actions";

function* getDesignation(action) {
  try {
    yield put(showLoader());
    const response = yield call(fetchDesignationData, action.payload.params);
    if (response.success) {
      yield put(getDesignationDataSuccess(response.details));
      yield call(action.payload.onSuccess(response.details));
      yield put(hideLoader());
    } else {
      yield put(getDesignationDataFailure(response.error_message));
      yield call(action.payload.onError);
      yield put(hideLoader());
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
      yield call(action.payload.onSuccess(response.details));
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

// function* getAllBranches(action) {
//   try {
//     yield put(showLoader());
//     const response = yield call(fetchAllBranchesList, action.payload.params);
//     if (response.success) {
//       yield put(hideLoader());
//       yield put(getAllBranchesListSuccess(response.details));
//       yield call(action.payload.onSuccess((response.details)));
//     } else {
//       yield put(hideLoader());
//       yield put(getAllBranchesListFailure(response.error_message));
//       yield call(action.payload.onError);
//     }
//   } catch (error) {
//     yield put(hideLoader());
//     yield put(getAllBranchesListFailure("Invalid Request"));
//   }
// }

function* getEmployeeDetails(action) {
  try {
    yield put(showLoader());

    const response = yield call(fetchEmployeeDetails, action.payload.params);

    if (response.success) {
      yield put(getEmployeeDetailsSuccess(response.details));
      yield call(action.payload.onSuccess(response.details));
      yield put(hideLoader());
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
      yield put(getEmployeesListSuccess(response.details));
      yield call(action.payload.onSuccess(response.details));
      yield put(hideLoader());
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
      yield put(employeeAdditionSuccess(response.details));
      yield call(action.payload.onSuccess(response));
      yield put(hideLoader());
    } else {
      yield put(hideLoader());
      yield put(employeeAdditionFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));
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
      yield call(action.payload.onSuccess(response.details));
    } else {
      yield put(hideLoader());
      yield put(getEmployeesCheckInLogsFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));

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
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(addDepartmentFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));
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
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(addDesignationFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));
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
      yield call(action.payload.onSuccess(response));
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
      yield put(getDownloadTodayStatusSuccess(response.data));
      yield call(action.payload.onSuccess(response));
      yield put(hideLoader());

    } else {
      yield put(getDownloadTodayStatusFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));
      yield put(hideLoader());

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
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(getUpdateEmployeeStatusFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));
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
      yield call(action.payload.onError(response.error_message));
    }
  } catch (error) {
    console.log("error-->", error);
    yield put(hideLoader());
    yield put(applyLeaveFailure("Invalid Request"));
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

function* changeSelectedEmployeeLeaveStatus(action) {
  try {
    yield put(showLoader());

    const response = yield call(
      postChangeEmployeeLeaveStatus,
      action.payload.params
    );
    if (response.success) {
      yield put(hideLoader());
      yield put(changeEmployeeLeaveStatusSuccess(response.details));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(changeEmployeeLeaveStatusFailure(response.error_message));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(changeEmployeeLeaveStatusFailure("Invalid Request"));
    yield call(action.payload.onError);
  }
}

/**
 *
 *Add Holidays
 */
function* addHolidayEvents(action) {
  try {
    yield put(showLoader());

    const response = yield call(postAddHolidays, action.payload.params);
    if (response.success) {
      yield put(hideLoader());
      yield put(addHolidaySuccess(response.details));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(addHolidayFailure(response.error_message));
      yield call(action.payload.onError);
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(addHolidayFailure("Invalid Request"));
  }
}

/**
 * Delete Holidays
 */
function* deleteHolidayEvents(action) {
  try {
    yield put(showLoader());

    const response = yield call(postDeleteHolidays, action.payload.params);
    if (response.success) {
      yield put(hideLoader());
      yield put(deleteHolidaySuccess(response.details));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(deleteHolidayFailure(response.error_message));
      yield call(action.payload.onError);
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(deleteHolidayFailure("Invalid Request"));
  }
}

/**
 * get Employee leaves
 */

function* FetchLeaveByTypes(action) {
  try {
    yield put(showLoader());

    const response = yield call(fetchMyleaves, action.payload.params);
    if (response.success) {
      yield put(hideLoader());
      yield put(getLeavesByTypesSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(getLeavesByTypesFailure(response.error_message));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getLeavesByTypesFailure("Invalid Request"));
  }
}

/**
 * employees Leaves
 */

function* FetchEmployeesLeaves(action) {
  try {
    yield put(showLoader());

    const response = yield call(fetchEmployeesleaves, action.payload.params);
    if (response.success) {
      yield put(hideLoader());
      yield put(getEmployeeLeavesSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield call(action.payload.onError);
      yield put(getEmployeeLeavesFailure(response.error_message));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getEmployeeLeavesFailure("Invalid Request"));
  }
}

/**
 * get modify logs
 */

function* getModifyLogsSaga(action) {
  try {
    yield put(showLoader());

    const response = yield call(fetchModifyEmployeesLeaves, action.payload.params);
    if (response.success) {
      yield put(hideLoader());
      yield put(getModifyLogsSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield call(action.payload.onError);
      yield put(getModifyLogsFailure(response.error_message));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getModifyLogsFailure("Invalid Request"));
  }
}


/**
 * get MisReport
 */

function* getReportsSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(fetchMisReportsLog, action.payload.params);
    if (response.success) {
      yield put(hideLoader());
      yield put(getMisReportSuccess(response.details));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield call(action.payload.onError(response));
      yield put(getMisReportFailure(response.error_message));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getMisReportFailure("Invalid Request"));
  }
}

// **MISreportsDownload***//

function* getDownloadMisReport(action) {
  try {
    yield put(showLoader());
    const response = yield call(fetchDownloadMisReportsLog, action.payload.params);
    if (response) {
      yield put(getDownloadMisReportSuccess(response.data));
      yield call(action.payload.onSuccess(response));
      yield put(hideLoader());

    } else {
      yield put(getDownloadMisReportFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));
      yield put(hideLoader());

    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getDownloadMisReportFailure("Invalid Request"));
  }
}



/**
 * get Employee Document
 */

function* FetchUserDocument(action) {
  try {
    yield put(showLoader());

    const response = yield call(fetchEmployeeDocuments, action.payload.params);
    if (response.success) {
      yield put(hideLoader());
      yield put(getEmployeeDocumentSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield call(action.payload.onError);
      yield put(getEmployeeDocumentSuccess(response.error_message));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getEmployeeDocumentFailure("Invalid Request"));
  }
}


/**
 * Attach user Documents
 */

function* AttachUserDocument(action) {
  try {
    yield put(showLoader());

    const response = yield call(attachUserDocuments, action.payload.params);
    if (response.success) {
      yield put(hideLoader());
      yield put(attachUserDocumentSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield call(action.payload.onError(response.error_message));
      yield put(attachUserDocumentSuccess(response.error_message));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(attachUserDocumentFailure("Invalid Request"));
  }
}
/**
 * GET ADMIN BRANCHES
 */
function* fetchAdminBranchSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(fetchAdminBranches, action.payload.params);
    if (response.success) {
      yield put(hideLoader());
      yield call(action.payload.onSuccess(response.details));
      yield put(getAdminBranchesSuccess(response.details));
    } else {
      yield put(hideLoader());
      yield call(action.payload.onError(response.error_message));
      yield put(getAdminBranchesFailure(response.error_message));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getAdminBranchesFailure("Invalid Request"));
  }
}

/**
 * Updated Admin Branch
 */

function* postUpdateAdminBranchesSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(PostUpdatedAdminBranches, action.payload.params);
    if (response.success) {
      yield put(hideLoader());
      yield put(postAdminUpdateBranchesSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield call(action.payload.onError(response.error_message));
      yield put(postAdminUpdateBranchesFailure(response.error_message));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(postAdminUpdateBranchesFailure("Invalid Request"));
  }
}

function* getBranchAdminsSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(getBranchAdminsApi, action.payload.params);
    if (response.success) {
      yield put(hideLoader());
      yield put(getBranchAdminsSuccess(response.details));
      yield call(action.payload.onSuccess(response.details));
    } else {
      yield put(hideLoader());
      yield call(action.payload.onError(response.error_message));
      yield put(getBranchAdminsFailure(response.error_message));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getBranchAdminsFailure("Invalid Request"));
  }
}

// *** WATCHER*** //

function* EmployeeSaga() {
  yield takeLatest(FETCH_DESIGNATION, getDesignation);
  yield takeLatest(FETCH_DEPARTMENT, getDepartments);
  // yield takeLatest(FETCH_ALL_BRANCHES_LIST, getAllBranches);
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
  yield takeLatest(APPLY_LEAVE, applyLeave);
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
  yield takeLatest(FETCH_CALENDAR_DETAILS, FetchCalendardetails);
  yield takeLatest(
    CHANGE_EMPLOYEE_LEAVE_STATUS,
    changeSelectedEmployeeLeaveStatus
  );
  yield takeLatest(ADD_HOLIDAY, addHolidayEvents);
  yield takeLatest(DELETE_HOLIDAY, deleteHolidayEvents);
  yield takeLatest(GET_EMPLOYEES_LEAVES, FetchEmployeesLeaves);
  yield takeLatest(GET_LEAVES_BY_TYPES, FetchLeaveByTypes);
  yield takeLatest(GET_MODIFY_LOGS, getModifyLogsSaga);
  yield takeLatest(GET_MIS_REPORT, getReportsSaga);
  yield takeLatest(GET_MIS_REPORT_DOWNLOAD, getDownloadMisReport);
  yield takeLatest(GET_EMPLOYEE_DOCUMENT, FetchUserDocument);
  yield takeLatest(ATTACH_USER_DOCUMENT, AttachUserDocument);
  yield takeLatest(GET_ADMIN_BRANCHES, fetchAdminBranchSaga);
  yield takeLatest(POST_UPDATED_ADMIN_BRANCHES, postUpdateAdminBranchesSaga);
  yield takeLatest(GET_BRANCHES_ADMIN, getBranchAdminsSaga);


}

export default EmployeeSaga;
