import { takeLatest, put, call } from "redux-saga/effects";

import { FETCH_DASHBOARD ,GET_CHECK_IN_DETAILED_LOG ,URL_CHECK_IN ,POST_DAILY_LOG} from "./actionTypes";

import { dashboardSuccess, dashboardFail,checkInDetailedLogSuccess,checkInDetailedLogFail,checkInUserFail, checkInUserSuccess, dailyLogFail, dailyLogSuccess } from "./actions";

import {deleteAccountUser, fetchDashboard,fetchCheckInDetailedLogPerDay, postCheckInUser, postDailyLog, postEditProfilePicture } from "../../helpers/backend_helper";
import { deleteAccountUserFail, deleteAccountUserSuccess, editProfilePictureFail, editProfilePictureSuccess } from "../dashboard/actions";

function* dashboard(action) {
  try {
    const response = yield call(fetchDashboard, action.payload.params);
    if (response.success) {
      yield put(dashboardSuccess(response));
      yield call(action.payload.onSuccess);
    } else {
      yield put(dashboardFail(response.error_message));
      yield call(action.payload.onError);
    }
  } catch (error) {
    yield put(dashboardFail("Invalid Request"));
    yield call(action.payload.onError);
  }
}

function* checkInLog(action) {
  try {
    const response = yield call(fetchCheckInDetailedLogPerDay, action.payload.params);
    if (response.success) {
      yield put(checkInDetailedLogSuccess(response));
      yield call(action.payload.onSuccess);
    } else {
      yield put(checkInDetailedLogFail(response.error_message));
      yield call(action.payload.onError);
    }
  } catch (error) {
    yield put(checkInDetailedLogFail("Invalid Request"));
    yield call(action.payload.onError);
  }
}

function* checkIn(action) {
  try {
    const response = yield call(postCheckInUser, action.payload.params);
    if (response.success) {
      yield put(checkInUserSuccess(response));
      yield call(action.payload.onSuccess);
    } else {
      yield put(checkInUserFail(response.error_message));
      yield call(action.payload.onError);
    }
  } catch (error) {
    yield put(checkInUserFail("Invalid Request"));
    yield call(action.payload.onError);
  }
}

function* dailyLog(action) {
  try {
    const response = yield call(postDailyLog, action.payload.params);
    if (response.success) {
      yield put(dailyLogSuccess(response));
      yield call(action.payload.onSuccess);
    } else {
      yield put(dailyLogFail(response.error_message));
      yield call(action.payload.onError);
    }
  } catch (error) {
    yield put(dailyLogFail("Invalid Request"));
    yield call(action.payload.onError);
  }
}


function* deleteAccount(action) {
  try {
    const response = yield call(deleteAccountUser, action.payload.params);
    if (response.success) {
      yield put(deleteAccountUserSuccess(response));
      yield call(action.payload.onSuccess);
    } else {
      yield put(deleteAccountUserFail(response.error_message));
      yield call(action.payload.onError);
    }
  } catch (error) {
    yield put(deleteAccountUserFail("Invalid Request"));
    yield call(action.payload.onError);
  }
}

function* editProfilePicture(action) {
  try {
    const response = yield call(postEditProfilePicture, action.payload.params);
    if (response.success) {
      yield put(editProfilePictureSuccess(response));
      yield call(action.payload.onSuccess);
    } else {
      yield put(editProfilePictureFail(response.error_message));
      yield call(action.payload.onError);
    }
  } catch (error) {
    yield put(editProfilePictureFail("Invalid Request"));
    yield call(action.payload.onError);
  }
}

///watcher///
function* DashboardSaga() {
  yield takeLatest(FETCH_DASHBOARD, dashboard);
  yield takeLatest(GET_CHECK_IN_DETAILED_LOG, checkInLog);
  yield takeLatest(URL_CHECK_IN, checkIn);
  yield takeLatest(POST_DAILY_LOG, dailyLog);
  yield takeLatest(POST_DAILY_LOG, deleteAccount);
  yield takeLatest(POST_DAILY_LOG, editProfilePicture);
}

export default DashboardSaga;