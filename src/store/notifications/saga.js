import { takeLatest, put, call } from "redux-saga/effects";

import {
    CREATE_BROADCAST_MESSAGE,
    FETCH_BROADCAST_MESSAGE
} from "./actionTypes";

import {
createBroadcastMessageSuccess,
createBroadcastMessageFailure,

getBroadcastMessageSuccess,
getBroadcastMessageFailure
} from "./actions";

import {
createBroadcastMessageApi,
fetchBroadcastMessageApi
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
            yield put(getBroadcastMessageSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            yield put(getBroadcastMessageFailure(response.error_message));
            yield call(action.payload.onError(response.error_message));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(getBroadcastMessageFailure("Invalid Request"));
    }
}

//Watcher

function* NotificationSaga() {
    yield takeLatest(CREATE_BROADCAST_MESSAGE, createBroadcastMessageSaga);
    yield takeLatest(FETCH_BROADCAST_MESSAGE, getBroadcastMessageSaga);


}

export default NotificationSaga;