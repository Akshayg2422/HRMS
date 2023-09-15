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
  UPDATE_LEAVE_TYPE_DETAILS,
  GET_EMPLOYEE_CHECK_IN_LOGS_REPORT,
  ENABLE_FIELD_CHECK_IN,
  ENABLE_OFFICE_CHECK_IN,
  POST_FACE_VALIDATION_STATUS,
  FETCH_EMPLOYEE_BASIC_INFO,
  FETCH_EMPLOYEE_ATTENDANCE_INFO,
  EMPLOYEE_MODIFY_REQUEST,
  ADMIN_MODIFY_LOG,
  CHANGE_MODIFY_LOG_STATUS,
  COMPANY_BASE_WEEKLY_CALENDAR,
  SET_COMPANY_BASE_WEEKLY_CALENDAR,
  GET_EMPLOYEE_BRANCH_WISE_LEAVES,
  GET_EMPLOYEE_LEAVE_TYPES,
  UPDATE_EMPLOYEE_ALLOCATED_DAYS,
  FETCH_SYNC_DATA,
  UPDATE_COMPANY_GENERIC_SHIFT,
  ADD_ESSL_DEVICE,
  GET_ESSL_DEVICE,
  REMOVE_ESSL_DEVICE,
  GET_EMPLOYEE_DEVICE_DETAILS,
  UPDATE_EMPLOYEE_DEVICE_DETAILS,
  GET_VENDERS,
  ADD_VENDERS

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
  updateLeaveTypeSuccess,
  updateLeaveTypeFailure,
  getDownloadEmployeeCheckinLogsSuccess,
  getDownloadEmployeeCheckinLogsFailure,
  postEnableFieldCheckInSuccess,
  postEnableFieldCheckInFailure,
  postEnableOfficeCheckInSuccess,
  postEnableOfficeCheckInFailure,
  changeAttendanceSettingsSuccess,
  changeAttendanceSettingsFailure,

  getEmployeeBasicInfoSuccess,
  getEmployeeBasicInfoFailure,

  getEmployeeAttendanceInfoSuccess,
  getEmployeeAttendanceInfoFailure,
  postEmployeeModifyRequestSuccess,
  postEmployeeModifyRequestFailure,
  postAdminModifyLogSuccess,
  postAdminModifyLogFailure,
  changeEmployeeModifyLogStatusSuccess,
  changeEmployeeModifyLogStatusFailure,
  CompanyBaseWeeklyCalendarSuccess,
  CompanyBaseWeeklyCalendarFailure,
  setCompanyBaseWeeklyCalendarSuccess,
  setCompanyBaseWeeklyCalendarFailure,
  getEmployeeBranchWiseLeavesSuccess,
  getEmployeeBranchWiseLeavesFailure,
  getEmployeeBranchLeaveTypeSuccess,
  getEmployeeBranchLeaveTypeFailure,
  updateEmployeeAllocatedDaysSuccess,
  updateEmployeeAllocatedDaysFailure,
  getSyncDataSuccess,
  getSyncDataFailure,
  updateCompanyGenericShiftSuccess,
  updateCompanyGenericShiftFailure,
  addEsslDeviceSuccess,
  addEsslDeviceFailure,
  getEsslDeviceSuccess,
  getEsslDeviceFailure,
  removeEsslDeviceSuccess,
  removeEsslDeviceFailure,
  updateEmployeeDeviceDetailsSuccess,
  updateEmployeeDeviceDetailsFailure,
  getEmployeeDeviceDetailsSuccess,
  getEmployeeDeviceDetailsFailure,
  getVenderSuccess,
  getVenderFailure,
  addVendorSuccess,
  addVenderFailure
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
  getBranchAdminsApi,
  updateLeaveTypeApi,
  getDownloadEmployeeCheckingLogReportApi,
  enableFieldCheckInApi,
  enableOfficeCheckInApi,
  changeAttendanceSettingsApi,

  fetchEmployeeBasicInfoApi,

  fetchEmployeeAttendanceInfoApi,
  employeeModifyRequestApi,
  adminModifyLogApi,
  postChangeEmployeeModifyLogStatus,
  fetchCompanyBaseWeeklyCalendarApi,
  postCompanyBaseWeeklyCalendarApi,
  postBranchWiseEmployeesLeavesApi,
  getEmployeeLeaveTypesApi,
  postUpdateEmployeeAllocatedDaysApi,
  getSyncDataApi,
  updateCompanyGenericShiftApi,
  addEsslDevicesApi,
  getEsslDevicesApi,
  removeEsslDevicesApi,
  updateEmployeesDeviceDetailApi,
  getEmployeesDeviceDetailApi,
  getVenderApi,
  addVendorApi
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
      yield call(action.payload.onError(response.error_message));
      yield put(hideLoader());
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getDesignationDataFailure("Invalid Request"));
    yield call(action.payload.onError(error));

  }
}

function* getDepartments(action) {
  try {
    yield put(showLoader());
    const response = yield call(fetchDepartmentData, action.payload.params);
    if (response.success) {
      yield put(getDepartmentDataSuccess(response.details));
      yield call(action.payload.onSuccess(response.details));
      yield put(hideLoader());
    } else {
      yield put(hideLoader());
      yield put(getDepartmentDataFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getDepartmentDataFailure("Invalid Request"));
    yield call(action.payload.onError(error));

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
      yield put(getEmployeeDetailsFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));
      yield put(hideLoader());
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getEmployeeDetailsFailure("Invalid Request"));
    yield call(action.payload.onError(error));

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
      yield put(getEmployeesListFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));
      yield put(hideLoader());
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getEmployeesListFailure("Invalid Request"));
    yield call(action.payload.onError(error));

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
      yield put(employeeAdditionFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));
      yield put(hideLoader());
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(employeeAdditionFailure("Invalid Request"));
    yield call(action.payload.onError(error));

  }
}

function* getEmployeesTimeSheets(action) {
  try {
    yield put(showLoader());

    const response = yield call(fetchEmployeeTimeSheets, action.payload.params);

    if (response.success) {
      yield put(getEmployeesTimeSheetsSuccess(response.details));
      yield call(action.payload.onSuccess(response.details));
      yield put(hideLoader());
    } else {
      yield put(hideLoader());
      yield put(getEmployeesTimeSheetsFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));

    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getEmployeesTimeSheetsFailure("Invalid Request"));
    yield call(action.payload.onError(error));

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
      yield put(getEmployeesCheckInLogsSuccess(response.details));
      yield call(action.payload.onSuccess(response.details));
      yield put(hideLoader());
    } else {
      yield put(hideLoader());
      yield put(getEmployeesCheckInLogsFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));

    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getEmployeesCheckInLogsFailure("Invalid Request"));
    yield call(action.payload.onError(error));

  }
}

/**
 * CheckInDetailedLogPerDay
 *
 */

function* getCheckInDetailedLogPerDay(action) {
  try {
    yield put(showLoader());

    const response = yield call(fetchCheckInDetailedLogPerDay, action.payload.params);

    if (response.success) {
      yield put(getCheckInDetailedLogPerDaySuccess(response.details));
      yield call(action.payload.onSuccess(response.details));
      yield put(hideLoader());
    } else {
      yield put(hideLoader());
      yield put(getCheckInDetailedLogPerDayFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getCheckInDetailedLogPerDayFailure("Invalid Request"));
    yield call(action.payload.onError(error));

  }
}

function* getEmployeeEachUserTimeSheets(action) {
  try {
    yield put(showLoader());

    const response = yield call(
      fetchEmployeeEachUserTimeSheets,
      action.payload.params
    );

    if (response.success) {
      yield put(hideLoader());
      yield put(getEmployeeEachUserTimeSheetsSuccess(response.details));
      yield call(action.payload.onSuccess(response.details));

    } else {
      yield put(hideLoader());
      yield put(getEmployeeEachUserTimeSheetsFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));

    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getEmployeeEachUserTimeSheetsFailure("Invalid Request"));
    yield call(action.payload.onError(error));

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
    yield call(action.payload.onError(error));
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
    yield call(action.payload.onError(error));
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
      yield call(action.payload.onError(response.error_message));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(addFenceAdminFailure("Invalid Request"));
    yield call(action.payload.onError(error));

  }
}

function* getEmployeeAttendanceStats(action) {
  try {
    yield put(showLoader());

    const response = yield call(fetchEmployeeAttendanceStats, action.payload.params);

    if (response.success) {
      yield put(hideLoader());
      yield put(getEmployeeAttendanceStatsSuccess(response.details));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(getEmployeeAttendanceStatsFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));

    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getEmployeeAttendanceStatsFailure("Invalid Request"));
    yield call(action.payload.onError(error));

  }
}

function* getEmployeeTodayStatus(action) {
  try {
    yield put(showLoader());

    const response = yield call(fetchEmployeeTodayStatus, action.payload.params);
    if (response.success) {
      yield put(hideLoader());
      yield put(getEmployeeTodayStatusSuccess(response.details));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(getEmployeeTodayStatusFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getEmployeeTodayStatusFailure("Invalid Request"));
    yield call(action.payload.onError(error));

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
    yield put(getDownloadTodayStatusFailure("Invalid Request"));
    yield call(action.payload.onError(error));

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
      yield call(action.payload.onError(response.error_message));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getCheckInDetailedLogFailure("Invalid Request"));
    yield call(action.payload.onError(error));
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
    yield call(action.payload.onError(error));

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
    yield call(action.payload.onError(error));

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
    yield call(action.payload.onError(error));

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
    yield put(hideLoader());
    yield put(applyLeaveFailure("Invalid Request"));
    yield call(action.payload.onError(error));

  }
}


function* employeeModifyRequestSaga(action) {
  try {
    yield put(showLoader());

    const response = yield call(employeeModifyRequestApi, action.payload.params);

    if (response.success) {
      yield put(hideLoader());
      yield put(postEmployeeModifyRequestSuccess(response.details));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(postEmployeeModifyRequestFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(postEmployeeModifyRequestFailure("Invalid Request"));
    yield call(action.payload.onError(error));

  }
}


function* adminModifyLogSaga(action) {
  try {
    yield put(showLoader());

    const response = yield call(adminModifyLogApi, action.payload.params);

    if (response.success) {
      yield put(hideLoader());
      yield put(postAdminModifyLogSuccess(response.details));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(postAdminModifyLogFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(postAdminModifyLogFailure("Invalid Request"));
    yield call(action.payload.onError(error));

  }
}

function* FetchCalendardetails(action) {
  try {
    yield put(showLoader());

    const response = yield call(fetchCalendarDetails, action.payload.params);
    if (response.success) {
      yield put(hideLoader());
      yield put(fetchCalendardetailsSuccess(response.details));
      yield call(action.payload.onSuccess(response));

    } else {
      yield put(hideLoader());
      yield put(fetchCalendardetailsFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));

    }
  } catch (error) {
    yield put(hideLoader());
    yield put(fetchCalendardetailsFailure("Invalid Request"));
    yield call(action.payload.onError(error));

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
      yield call(action.payload.onError(response.error_message));

    }
  } catch (error) {
    yield put(hideLoader());
    yield put(changeEmployeeLeaveStatusFailure("Invalid Request"));
    yield call(action.payload.onError(error));
  }
}


function* changeSelectedEmployeeModifyLogStatus(action) {
  try {
    yield put(showLoader());

    const response = yield call(
      postChangeEmployeeModifyLogStatus,
      action.payload.params
    );
    if (response.success) {
      yield put(hideLoader());
      yield put(changeEmployeeModifyLogStatusSuccess(response.details));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(changeEmployeeModifyLogStatusFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));

    }
  } catch (error) {
    yield put(hideLoader());
    yield put(changeEmployeeModifyLogStatusFailure("Invalid Request"));
    yield call(action.payload.onError(error));
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
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(addHolidayFailure("Invalid Request"));
    yield call(action.payload.onError(error));

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
      yield call(action.payload.onError(response.error_message));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(deleteHolidayFailure("Invalid Request"));
    yield call(action.payload.onError(error));

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
      yield call(action.payload.onSuccess(response));

    } else {
      yield put(hideLoader());
      yield put(getLeavesByTypesFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));

    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getLeavesByTypesFailure("Invalid Request"));
    yield call(action.payload.onError(error));

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
      yield call(action.payload.onError(response.error_message));
      yield put(getEmployeeLeavesFailure(response.error_message));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getEmployeeLeavesFailure("Invalid Request"));
    yield call(action.payload.onError(error));

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
      yield call(action.payload.onError(response.error_message));
      yield put(getModifyLogsFailure(response.error_message));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getModifyLogsFailure("Invalid Request"));
    yield call(action.payload.onError(error));

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
      yield put(getMisReportSuccess(response.details));
      yield call(action.payload.onSuccess(response));
      yield put(hideLoader());
    } else {
      yield call(action.payload.onError(response));
      yield put(getMisReportFailure(response.error_message));
      yield put(hideLoader());
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getMisReportFailure("Invalid Request"));
    yield put(getMisReportFailure(error));
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
    yield put(getMisReportFailure(error));

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
      yield put(getEmployeeDocumentFailure(response.error_message));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getEmployeeDocumentFailure("Invalid Request"));
    yield put(getMisReportFailure(error));

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
      yield put(attachUserDocumentFailure(response.error_message));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(attachUserDocumentFailure("Invalid Request"));
    yield put(attachUserDocumentFailure(error));

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
    yield put(getAdminBranchesFailure(error));

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
    yield call(action.payload.onError(error));

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
      yield put(getBranchAdminsFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));

    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getBranchAdminsFailure("Invalid Request"));
    yield call(action.payload.onError(error));

  }
}

/**
 * Update Leave Status
 */

function* updateLeaveTypeSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(updateLeaveTypeApi, action.payload.params);
    if (response.success) {
      yield put(hideLoader());
      yield put(updateLeaveTypeSuccess(response.details));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(updateLeaveTypeFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));

    }
  } catch (error) {
    yield put(hideLoader());
    yield put(updateLeaveTypeFailure("Invalid Request"));
    yield call(action.payload.onError(error));

  }
}

/**
 * Download Employee CheckIn Logs
 */

function* getDownloadEmployeeCheckInLogsSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(getDownloadEmployeeCheckingLogReportApi, action.payload.params);
    if (response) {
      yield put(getDownloadEmployeeCheckinLogsSuccess(response.data));
      yield call(action.payload.onSuccess(response));
      yield put(hideLoader());

    } else {
      yield put(getDownloadEmployeeCheckinLogsFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));
      yield put(hideLoader());

    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getDownloadEmployeeCheckinLogsFailure("Invalid Request"));
    yield call(action.payload.onError(error));

  }
}

//enableFieldCheckIn

function* enableFieldCheckInSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(enableFieldCheckInApi, action.payload.params);
    if (response.success) {
      yield put(postEnableFieldCheckInSuccess(response));
      yield call(action.payload.onSuccess(response));
      yield put(hideLoader());

    } else {
      yield put(postEnableFieldCheckInFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));
      yield put(hideLoader());

    }
  } catch (error) {
    yield put(hideLoader());
    yield put(postEnableFieldCheckInFailure("Invalid Request"));
  }
}

// enableOfficeCheckIn

function* enableOfficeCheckInSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(enableOfficeCheckInApi, action.payload.params);
    if (response.success) {
      yield put(postEnableOfficeCheckInSuccess(response));
      yield call(action.payload.onSuccess(response));
      yield put(hideLoader());

    } else {
      yield put(postEnableOfficeCheckInFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));
      yield put(hideLoader());

    }
  } catch (error) {
    yield put(hideLoader());
    yield put(postEnableOfficeCheckInFailure("Invalid Request"));
  }
}

// changeAttendanceSettings

function* changeAttendanceSettingsSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(changeAttendanceSettingsApi, action.payload.params);
    if (response.success) {
      yield put(changeAttendanceSettingsSuccess(response));
      yield call(action.payload.onSuccess(response));
      yield put(hideLoader());

    } else {
      yield put(changeAttendanceSettingsFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));
      yield put(hideLoader());

    }
  } catch (error) {
    yield put(hideLoader());
    yield put(changeAttendanceSettingsFailure("Invalid Request"));
  }
}

//get employee basic info

function* getEmployeeBasicInfo(action) {
  try {
    yield put(showLoader());

    const response = yield call(fetchEmployeeBasicInfoApi, action.payload.params);

    if (response.success) {
      yield put(getEmployeeBasicInfoSuccess(response.details));
      yield call(action.payload.onSuccess(response.details));
      yield put(hideLoader());
    } else {
      yield put(getEmployeeBasicInfoFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));
      yield put(hideLoader());
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getEmployeeBasicInfoFailure("Invalid Request"));
    yield call(action.payload.onError(error));

  }
}

//get employee attendance info

function* getEmployeeAttendanceInfo(action) {
  try {
    yield put(showLoader());

    const response = yield call(fetchEmployeeAttendanceInfoApi, action.payload.params);

    if (response.success) {
      yield put(getEmployeeAttendanceInfoSuccess(response.details));
      yield call(action.payload.onSuccess(response.details));
      yield put(hideLoader());
    } else {
      yield put(getEmployeeAttendanceInfoFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));
      yield put(hideLoader());
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getEmployeeAttendanceInfoFailure("Invalid Request"));
    yield call(action.payload.onError(error));

  }
}

// getCompanyBaseWeeklyCalendar

function* getCompanyBaseWeeklyCalendarSaga(action) {
  try {
    yield put(showLoader());

    const response = yield call(fetchCompanyBaseWeeklyCalendarApi, action.payload.params);

    if (response.success) {
      yield put(CompanyBaseWeeklyCalendarSuccess(response.details));
      yield call(action.payload.onSuccess(response));
      yield put(hideLoader());
    } else {
      yield put(CompanyBaseWeeklyCalendarFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));
      yield put(hideLoader());
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(CompanyBaseWeeklyCalendarFailure("Invalid Request"));
    yield call(action.payload.onError(error));

  }
}

// SetCompanyBaseWeeklyCalendar

function* setCompanyBaseWeeklyCalendarSaga(action) {
  try {
    yield put(showLoader());

    const response = yield call(postCompanyBaseWeeklyCalendarApi, action.payload.params);

    if (response.success) {
      yield put(setCompanyBaseWeeklyCalendarSuccess(response.details));
      yield call(action.payload.onSuccess(response));
      yield put(hideLoader());
    } else {
      yield put(setCompanyBaseWeeklyCalendarFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));
      yield put(hideLoader());
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(setCompanyBaseWeeklyCalendarFailure("Invalid Request"));
    yield call(action.payload.onError(error));

  }
}

// 
function* getEmployeeBranchWiseLeavesSaga(action) {
  try {
    yield put(showLoader());

    const response = yield call(postBranchWiseEmployeesLeavesApi, action.payload.params);

    if (response.success) {
      yield put(getEmployeeBranchWiseLeavesSuccess(response.details));
      yield call(action.payload.onSuccess(response));
      yield put(hideLoader());
    } else {
      yield put(getEmployeeBranchWiseLeavesFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));
      yield put(hideLoader());
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getEmployeeBranchWiseLeavesFailure("Invalid Request"));
    yield call(action.payload.onError(error));

  }
}

// getEmployeeLeaveTypes

function* getEmployeeLeaveTypesSaga(action) {
  try {
    yield put(showLoader());

    const response = yield call(getEmployeeLeaveTypesApi, action.payload.params);

    if (response.success) {
      yield put(getEmployeeBranchLeaveTypeSuccess(response.details));
      yield call(action.payload.onSuccess(response));
      yield put(hideLoader());
    } else {
      yield put(getEmployeeBranchLeaveTypeFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));
      yield put(hideLoader());
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getEmployeeBranchLeaveTypeFailure("Invalid Request"));
    yield call(action.payload.onError(error));

  }
}

// updateEmployeeAllocatedDays
function* updateEmployeeAllocatedDaysSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(postUpdateEmployeeAllocatedDaysApi, action.payload.params);

    if (response.success) {
      yield put(updateEmployeeAllocatedDaysSuccess(response.details));
      yield call(action.payload.onSuccess(response));
      yield put(hideLoader());
    } else {
      yield put(updateEmployeeAllocatedDaysFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));
      yield put(hideLoader());
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(updateEmployeeAllocatedDaysFailure("Invalid Request"));
    yield call(action.payload.onError(error));

  }
}

// syncData

function* getSyncDataSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(getSyncDataApi, action.payload.params);

    if (response.success) {
      yield put(getSyncDataSuccess(response.details));
      yield call(action.payload.onSuccess(response.details));
      yield put(hideLoader());
    } else {
      yield put(getSyncDataFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));
      yield put(hideLoader());
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getSyncDataFailure("Invalid Request"));
    yield call(action.payload.onError(error));

  }
}

// UPDATE_COMPANY_GENERIC_SHIFT

function* updateCompanyGenericShiftSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(updateCompanyGenericShiftApi, action.payload.params);

    if (response.success) {
      yield put(updateCompanyGenericShiftSuccess(response.details));
      yield call(action.payload.onSuccess(response.details));
      yield put(hideLoader());
    } else {
      yield put(updateCompanyGenericShiftFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));
      yield put(hideLoader());
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(updateCompanyGenericShiftFailure("Invalid Request"));
    yield call(action.payload.onError(error));

  }
}

// Add Devices

function* addEsslDevicesSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(addEsslDevicesApi, action.payload.params);
    if (response.success) {
      yield put(addEsslDeviceSuccess(response.details));
      yield call(action.payload.onSuccess(response.details));
      yield put(hideLoader());
    } else {
      yield put(addEsslDeviceFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));
      yield put(hideLoader());
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(addEsslDeviceFailure("Invalid Request"));
    yield call(action.payload.onError(error));

  }
}

// get Devices 

function* getEsslDevicesSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(getEsslDevicesApi, action.payload.params);
    if (response.success) {
      yield put(getEsslDeviceSuccess(response.details));
      yield call(action.payload.onSuccess(response.details));
      yield put(hideLoader());
    } else {
      yield put(getEsslDeviceFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));
      yield put(hideLoader());
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getEsslDeviceFailure("Invalid Request"));
    yield call(action.payload.onError(error));

  }
}

// remove Devices

function* removeEsslDevicesSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(removeEsslDevicesApi, action.payload.params);
    if (response.success) {
      yield put(removeEsslDeviceSuccess(response.details));
      yield call(action.payload.onSuccess(response.details));
      yield put(hideLoader());
    } else {
      yield put(removeEsslDeviceFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));
      yield put(hideLoader());
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(removeEsslDeviceFailure("Invalid Request"));
    yield call(action.payload.onError(error));

  }
}

// UPDATE_EMPLOYEE_DEVICE_DETAILS

function* updateEmployeeDeviceSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(updateEmployeesDeviceDetailApi, action.payload.params);
    if (response.success) {
      yield put(updateEmployeeDeviceDetailsSuccess(response.details));
      yield call(action.payload.onSuccess(response));
      yield put(hideLoader());
    } else {
      yield put(updateEmployeeDeviceDetailsFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));
      yield put(hideLoader());
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(updateEmployeeDeviceDetailsFailure("Invalid Request"));
    yield call(action.payload.onError(error));

  }
}

// GET_EMPLOYEE_DEVICE_DETAILS

function* getEmployeeDeviceSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(getEmployeesDeviceDetailApi, action.payload.params);
    if (response.success) {
      yield put(getEmployeeDeviceDetailsSuccess(response.details));
      yield call(action.payload.onSuccess(response.details));
      yield put(hideLoader());
    } else {
      yield put(getEmployeeDeviceDetailsFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));
      yield put(hideLoader());
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getEmployeeDeviceDetailsFailure("Invalid Request"));
    yield call(action.payload.onError(error));

  }
}


// GET_VENDER

function* getVenderSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(getVenderApi, action.payload.params);
    if (response.success) {
      yield put(getVenderSuccess(response.details));
      yield call(action.payload.onSuccess(response.details));
      yield put(hideLoader());
    } else {
      yield put(getVenderFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));
      yield put(hideLoader());
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getVenderFailure("Invalid Request"));
    yield call(action.payload.onError(error));

  }
}



function* addVenderSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(addVendorApi, action.payload.params);
    if (response.success) {
      yield put(addVendorSuccess(response.details));
      yield call(action.payload.onSuccess(response.details));
      yield put(hideLoader());
    } else {
      yield put(addVenderFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));
      yield put(hideLoader());
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(addVenderFailure("Invalid Request"));
    yield call(action.payload.onError(error));

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
  yield takeLatest(UPDATE_LEAVE_TYPE_DETAILS, updateLeaveTypeSaga);
  yield takeLatest(GET_EMPLOYEE_CHECK_IN_LOGS_REPORT, getDownloadEmployeeCheckInLogsSaga);
  yield takeLatest(ENABLE_FIELD_CHECK_IN, enableFieldCheckInSaga);
  yield takeLatest(ENABLE_OFFICE_CHECK_IN, enableOfficeCheckInSaga);
  yield takeLatest(POST_FACE_VALIDATION_STATUS, changeAttendanceSettingsSaga);
  yield takeLatest(FETCH_EMPLOYEE_BASIC_INFO, getEmployeeBasicInfo);
  yield takeLatest(FETCH_EMPLOYEE_ATTENDANCE_INFO, getEmployeeAttendanceInfo);
  yield takeLatest(EMPLOYEE_MODIFY_REQUEST, employeeModifyRequestSaga);
  yield takeLatest(ADMIN_MODIFY_LOG, adminModifyLogSaga);
  yield takeLatest(CHANGE_MODIFY_LOG_STATUS, changeSelectedEmployeeModifyLogStatus);
  yield takeLatest(COMPANY_BASE_WEEKLY_CALENDAR, getCompanyBaseWeeklyCalendarSaga);
  yield takeLatest(SET_COMPANY_BASE_WEEKLY_CALENDAR, setCompanyBaseWeeklyCalendarSaga);
  yield takeLatest(GET_EMPLOYEE_BRANCH_WISE_LEAVES, getEmployeeBranchWiseLeavesSaga);
  yield takeLatest(GET_EMPLOYEE_LEAVE_TYPES, getEmployeeLeaveTypesSaga);
  yield takeLatest(UPDATE_EMPLOYEE_ALLOCATED_DAYS, updateEmployeeAllocatedDaysSaga);
  yield takeLatest(FETCH_SYNC_DATA, getSyncDataSaga);
  yield takeLatest(UPDATE_COMPANY_GENERIC_SHIFT, updateCompanyGenericShiftSaga);
  yield takeLatest(ADD_ESSL_DEVICE, addEsslDevicesSaga);
  yield takeLatest(GET_ESSL_DEVICE, getEsslDevicesSaga);
  yield takeLatest(REMOVE_ESSL_DEVICE, removeEsslDevicesSaga);
  yield takeLatest(GET_EMPLOYEE_DEVICE_DETAILS, getEmployeeDeviceSaga);
  yield takeLatest(UPDATE_EMPLOYEE_DEVICE_DETAILS, updateEmployeeDeviceSaga);

  yield takeLatest(GET_VENDERS, getVenderSaga);
  yield takeLatest(ADD_VENDERS, addVenderSaga);
}

export default EmployeeSaga;
