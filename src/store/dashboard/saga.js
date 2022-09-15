import { takeLatest, put, call } from "redux-saga/effects";

import { FETCH_DASHBOARD, GET_CHECK_IN_DETAILED_LOG, URL_CHECK_IN, POST_DAILY_LOG } from "./actionTypes";

import { getDashboardFail, getDashboardSuccess, checkInDetailedLogSuccess, checkInDetailedLogFail, checkInUserFail, checkInUserSuccess, dailyLogFail, dailyLogSuccess } from "./actions";

import { deleteAccountUser, fetchDashboard, fetchCheckInDetailedLogPerDay, postCheckInUser, postDailyLog, postEditProfilePicture } from "../../helpers/backend_helper";
import { deleteAccountUserFail, deleteAccountUserSuccess, editProfilePictureFail, editProfilePictureSuccess } from "../dashboard/actions";


import {
  showLoader,
  hideLoader
} from '../app/actions'

function* getDashboard(action) {

  try {

    yield put(showLoader());

    const response = yield call(fetchDashboard, action.payload.params);

    if (response.success) {

      yield put(getDashboardSuccess(response.details));
      yield put(hideLoader());

    } else {

      yield put(getDashboardFail(response.error_message));
      yield put(hideLoader());

    }
  } catch (error) {

    yield put(getDashboardFail("Invalid Request"));
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
      yield call(action.payload.onSuccess);

    } else {

      yield put(hideLoader());
      yield put(checkInDetailedLogFail(response.error_message));
      yield call(action.payload.onError);

    }
  } catch (error) {

    yield put(hideLoader());
    yield put(checkInDetailedLogFail("Invalid Request"));
    yield call(action.payload.onError);
    
  }
}

function* checkIn(action) {
  try {
    yield put(showLoader());
    const response = yield call(postCheckInUser, action.payload.params);
    if (response.success) {
      yield put(hideLoader());
      yield put(checkInUserSuccess(response));
      yield call(action.payload.onSuccess);
    } else {
      yield put(hideLoader());
      yield put(checkInUserFail(response.error_message));
      yield call(action.payload.onError);
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(checkInUserFail("Invalid Request"));
    yield call(action.payload.onError);
  }
}

function* dailyLog(action) {
  try {
    yield put(showLoader());
    const response = yield call(postDailyLog, action.payload.params);
    if (response.success) {
      yield put(hideLoader());
      yield put(dailyLogSuccess(response));
      yield call(action.payload.onSuccess);
    } else {
      yield put(hideLoader());
      yield put(dailyLogFail(response.error_message));
      yield call(action.payload.onError);
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(dailyLogFail("Invalid Request"));
    yield call(action.payload.onError);
  }
}

function* deleteAccount(action) {
  try {
    yield put(showLoader());
    const response = yield call(deleteAccountUser, action.payload.params);
    if (response.success) {
      yield put(hideLoader());
      yield put(deleteAccountUserSuccess(response));
      yield call(action.payload.onSuccess);
    } else {
      yield put(hideLoader());
      yield put(deleteAccountUserFail(response.error_message));
      yield call(action.payload.onError);
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(deleteAccountUserFail("Invalid Request"));
    yield call(action.payload.onError);
  }
}

function* editProfilePicture(action) {
  try {
    yield put(showLoader());
    const response = yield call(postEditProfilePicture, action.payload.params);
    if (response.success) {
      yield put(hideLoader());
      yield put(editProfilePictureSuccess(response));
      yield call(action.payload.onSuccess);
    } else {
      yield put(hideLoader());
      yield put(editProfilePictureFail(response.error_message));
      yield call(action.payload.onError);
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(editProfilePictureFail("Invalid Request"));
    yield call(action.payload.onError);
  }
}

function* DashboardSaga() {
  yield takeLatest(FETCH_DASHBOARD, getDashboard);
  yield takeLatest(GET_CHECK_IN_DETAILED_LOG, checkInLog);
  yield takeLatest(URL_CHECK_IN, checkIn);
  yield takeLatest(POST_DAILY_LOG, dailyLog);
  yield takeLatest(POST_DAILY_LOG, deleteAccount);
  yield takeLatest(POST_DAILY_LOG, editProfilePicture);
}

export default DashboardSaga;