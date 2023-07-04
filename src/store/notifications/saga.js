import { takeLatest, put, call } from "redux-saga/effects";

import {
    CREATE_BROADCAST_MESSAGE,
    FETCH_BROADCAST_MESSAGE,
    FETCH_NOTIFICATIONS
} from "./actionTypes";

import {
    createBroadcastMessageSuccess,
    createBroadcastMessageFailure,

    getBroadcastMessageSuccess,
    getBroadcastMessageFailure,

    getNotificationsSuccess,
    getNotificationsFailure
} from "./actions";

import {
    createBroadcastMessageApi,
    fetchBroadcastMessageApi,
    getNotificationsApi
} from "../../helpers/backend_helper";
import { showLoader, hideLoader } from "../loader/actions";


/**
 * create broadcast message
 */

function* createBroadcastMessageSaga(action) {
    try {
        yield put(showLoader());

        const response = yield call(createBroadcastMessageApi, action.payload.params);
        if (response.success) {
            yield put(hideLoader());
            yield put(createBroadcastMessageSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            yield put(createBroadcastMessageFailure(response.error_message));
            yield call(action.payload.onError(response.error_message));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(createBroadcastMessageFailure("Invalid Request"));
        yield call(action.payload.onError(error));

    }
}

/**
 * get broadcast message
 */

function* getBroadcastMessageSaga(action) {
    try {
        yield put(showLoader());

        const response = yield call(fetchBroadcastMessageApi, action.payload.params);
        if (response.success) {
            yield put(hideLoader());
            yield put(getBroadcastMessageSuccess(response?.details));
            yield call(action.payload.onSuccess(response.details));
        } else {
            yield put(hideLoader());
            yield put(getBroadcastMessageFailure(response.error_message));
            yield call(action.payload.onError(response.error_message));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(getBroadcastMessageFailure("Invalid Request"));
        yield call(action.payload.onError(error));

    }
}

/**
 * get broadcast message
 */

function* getNotificationsSaga(action) {
    try {
        yield put(showLoader());

        const response = yield call(getNotificationsApi, action.payload.params);
        if (response.success) {
            yield put(hideLoader());
            yield put(getNotificationsSuccess(response?.details));
            yield call(action.payload.onSuccess(response.details));
        } else {
            yield put(hideLoader());
            yield put(getNotificationsFailure(response.error_message));
            yield call(action.payload.onError(response.error_message));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(getNotificationsFailure("Invalid Request"));
        yield call(action.payload.onError(error));

    }
}

//Watcher

function* NotificationSaga() {
    yield takeLatest(CREATE_BROADCAST_MESSAGE, createBroadcastMessageSaga);
    yield takeLatest(FETCH_BROADCAST_MESSAGE, getBroadcastMessageSaga);
    yield takeLatest(FETCH_NOTIFICATIONS, getNotificationsSaga);



}

export default NotificationSaga;