import { takeLatest, put, call } from "redux-saga/effects";

import { FETCH_DASHBOARD, GET_CHECK_IN_DETAILED_LOG, URL_CHECK_IN, POST_DAILY_LOG, EMPLOYEE_FACE_FAILURE_LIST, CHANGE_EMPLOYEE_FACE_VALIDATION_REQUEST, URL_DELETE_USER, EDIT_PROFILE_PICTURE, FACE_RE_REGISTER_REQUEST, FACE_RE_REGISTER_CHANGE_STATUS, EMPLOYEE_FACE_RE_REGISTER_REQUEST, EMPLOYEE_ENABLE_FACE_RE_REGISTER_ACTION } from "./actionTypes";

import { getDashboardFail, getDashboardSuccess, checkInDetailedLogSuccess, checkInDetailedLogFail, checkInUserFail, checkInUserSuccess, dailyLogFail, dailyLogSuccess, getEmployeesLoginFaceFailureActionSuccess, getEmployeesLoginFaceFailureActionFail, changeEmployeeFaceValidationRequestActionSuccess, changeEmployeeFaceValidationRequestActionFail, faceReRegisterRequestActionSuccess, faceReRegisterRequestActionFail, faceReRegisterRequestChangeStatusSuccess, faceReRegisterRequestChangeStatusFail, employeeFaceReRegisterRequestSuccess, employeeFaceReRegisterRequestFail, employeeEnableFaceReRegisterSuccess, employeeEnableFaceReRegisterFail } from "./actions";

import { deleteAccountUser, fetchDashboard, fetchCheckInDetailedLogPerDay, postCheckInUser, postDailyLog, postEditProfilePicture, postGetEmployeesLoginFaceFailureApi, postChangeEmployeeFaceValidationRequestApi, faceReRegisterRequestApi, faceReRegisterRequestChangeStatusApi, getEmployeeReRegisterRequestApi, employeeEnableFaceReRegisterApi } from "../../helpers/backend_helper";
import { deleteAccountUserFail, deleteAccountUserSuccess, editProfilePictureFail, editProfilePictureSuccess } from "../dashboard/actions";


import {
  showLoader,
  hideLoader
} from '../loader/actions'



function* getDashboard(action) {

  try {

    yield put(showLoader());

    const response = yield call(fetchDashboard, action.payload.params);

    if (response.success) {
      yield put(getDashboardSuccess(response.details));
      yield call(action.payload.onSuccess(response.details));
      yield put(hideLoader());

    } else {

      yield put(getDashboardFail(response.error_message));
      yield call(action.payload.onError(response.error_message));
      yield put(hideLoader());

    }
  } catch (error) {

    yield put(getDashboardFail("Invalid Request"));
    yield call(action.payload.onError(error));
    yield put(hideLoader());

  }
}

function* checkInLog(action) {

  try {
    yield put(showLoader());

    const response = yield call(fetchCheckInDetailedLogPerDay, action.payload.params);

    if (response.success) {

      yield put(hideLoader());
      yield put(checkInDetailedLogSuccess(response));
      yield call(action.payload.onSuccess(response));

    } else {

      yield put(hideLoader());
      yield put(checkInDetailedLogFail(response.error_message));
      yield call(action.payload.onError(response.error_message));

    }
  } catch (error) {

    yield put(hideLoader());
    yield put(checkInDetailedLogFail("Invalid Request"));
    yield call(action.payload.onError(error));

  }
}

function* checkIn(action) {
  try {
    yield put(showLoader());
    const response = yield call(postCheckInUser, action.payload.params);
    if (response.success) {
      yield put(hideLoader());
      yield put(checkInUserSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(checkInUserFail(response.error_message));
      yield call(action.payload.onError(response.error_message));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(checkInUserFail("Invalid Request"));
    yield call(action.payload.onError(error));
  }
}

function* dailyLog(action) {
  try {
    yield put(showLoader());
    const response = yield call(postDailyLog, action.payload.params);
    if (response.success) {
      yield put(hideLoader());
      yield put(dailyLogSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(dailyLogFail(response.error_message));
      yield call(action.payload.onError(response.error_message));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(dailyLogFail("Invalid Request"));
    yield call(action.payload.onError(error));
  }
}

function* deleteAccount(action) {
  try {
    yield put(showLoader());
    const response = yield call(deleteAccountUser, action.payload.params);
    if (response.success) {
      yield put(hideLoader());
      yield put(deleteAccountUserSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(deleteAccountUserFail(response.error_message));
      yield call(action.payload.onError(response.error_message));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(deleteAccountUserFail("Invalid Request"));
    yield call(action.payload.onError(error));
  }
}

function* editProfilePicture(action) {
  try {
    yield put(showLoader());
    const response = yield call(postEditProfilePicture, action.payload.params);
    if (response.success) {
      yield put(hideLoader());
      yield put(editProfilePictureSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(editProfilePictureFail(response.error_message));
      yield call(action.payload.onError(response.error_message));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(editProfilePictureFail("Invalid Request"));
    yield call(action.payload.onError(error));
  }
}


function* getEmployeesLoginFaceFailureSaga(action) {
  try {
    yield put(showLoader());

    const response = yield call(postGetEmployeesLoginFaceFailureApi, action.payload.params);

    if (response.success) {
      yield put(hideLoader());
      yield put(getEmployeesLoginFaceFailureActionSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {

      yield put(hideLoader());
      yield put(getEmployeesLoginFaceFailureActionFail(response.error_message));
      yield call(action.payload.onError(response.error_message));
    }
  } catch (error) {
    yield put(getEmployeesLoginFaceFailureActionFail("Invalid Request"));
    yield put(hideLoader());
    yield call(action.payload.onError(error));
  }
}

/**
 * changeEmployeeFaceValidationRequest
 */

function* changeEmployeeFaceValidationRequestSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(postChangeEmployeeFaceValidationRequestApi, action.payload.params);
    if (response.success) {
      yield put(hideLoader());
      yield put(changeEmployeeFaceValidationRequestActionSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(changeEmployeeFaceValidationRequestActionFail(response.error_message));
      yield call(action.payload.onError(response.error_message));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(changeEmployeeFaceValidationRequestActionFail("Invalid Request"));
    yield call(action.payload.onError(error));

  }
}

//Face Re-Register Request

function* FaceReRegisterRequestSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(faceReRegisterRequestApi, action.payload.params);
    if (response.success) {
      yield put(hideLoader());
      yield put(faceReRegisterRequestActionSuccess(response));
      yield call(action.payload.onSuccess(response.data));
    } else {
      yield put(hideLoader());
      yield put(faceReRegisterRequestActionFail(response.error_message));
      yield call(action.payload.onError(response.error_message));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(faceReRegisterRequestActionFail(error));
    yield call(action.payload.onError(error));

  }
}

//// Face Re-Register Change Status

function* FaceReRegisterRequestChangeStatusSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(faceReRegisterRequestChangeStatusApi, action.payload.params);
    if (response.success) {
      yield put(hideLoader());
      yield put(faceReRegisterRequestChangeStatusSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(faceReRegisterRequestChangeStatusFail(response.error_message));
      yield call(action.payload.onError(response.error_message));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(faceReRegisterRequestChangeStatusFail(error));
    yield call(action.payload.onError(error));

  }
}

//face Re-register Employee Request 

function* EmployeeFaceReRegisterRequestSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(getEmployeeReRegisterRequestApi, action.payload.params);
    if (response.success) {
      yield put(hideLoader());
      yield put(employeeFaceReRegisterRequestSuccess(response.details));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(employeeFaceReRegisterRequestFail(response.error_message));
      yield call(action.payload.onError(response.error_message));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(employeeFaceReRegisterRequestFail(error));
    yield call(action.payload.onError(error));

  }
}

//employee enable Face ReRegister


function* EmployeeEnableFaceRequestSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(employeeEnableFaceReRegisterApi, action.payload.params);
    if (response.success) {
      yield put(hideLoader());
      yield put(employeeEnableFaceReRegisterSuccess(response.details));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(employeeEnableFaceReRegisterFail(response.error_message));
      yield call(action.payload.onError(response.error_message));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(employeeEnableFaceReRegisterFail(error));
    yield call(action.payload.onError(error));

  }
}

function* DashboardSaga() {
  yield takeLatest(FETCH_DASHBOARD, getDashboard);
  yield takeLatest(GET_CHECK_IN_DETAILED_LOG, checkInLog);
  yield takeLatest(URL_CHECK_IN, checkIn);
  yield takeLatest(POST_DAILY_LOG, dailyLog);
  yield takeLatest(URL_DELETE_USER, deleteAccount);
  yield takeLatest(EDIT_PROFILE_PICTURE, editProfilePicture);
  yield takeLatest(EMPLOYEE_FACE_FAILURE_LIST, getEmployeesLoginFaceFailureSaga);
  yield takeLatest(CHANGE_EMPLOYEE_FACE_VALIDATION_REQUEST, changeEmployeeFaceValidationRequestSaga);
  yield takeLatest(FACE_RE_REGISTER_REQUEST, FaceReRegisterRequestSaga);
  yield takeLatest(FACE_RE_REGISTER_CHANGE_STATUS, FaceReRegisterRequestChangeStatusSaga);
  yield takeLatest(EMPLOYEE_FACE_RE_REGISTER_REQUEST, EmployeeFaceReRegisterRequestSaga);
  yield takeLatest(EMPLOYEE_ENABLE_FACE_RE_REGISTER_ACTION, EmployeeEnableFaceRequestSaga);
}

export default DashboardSaga;

