import { takeLatest, put, call } from "redux-saga/effects";

import {
    POST_ADD_WEEKLY_SHIFT,
    FETCH_BRANCH_SHIFTS,
    FETCH_BRANCH_WEEKLY_SHIFTS,
    POST_ADD_SHIFT,
    FETCH_WEEKLY_SHIFT_DETAILS
} from "./actionTypes";

//  import {addWeeklyShiftSuccess,addWeeklyShiftFailure} './actions'
import {
    addWeeklyShiftSuccess,
    addWeeklyShiftFailure,
    getBranchShiftsSuccess,
    getBranchShiftsFailure,
    getBranchWeeklyShiftsSuccess,
    getBranchWeeklyShiftsFailure,
    postAddShiftSuccess,
    postAddShiftFailure,
    getWeeklyShiftDetailsSuccess,
    getWeeklyShiftDetailsFailure
} from "./actions";

import { postAddWeeklyShift, fetchBranchShifts, fetchBranchWeeklyShifts, postAddShiftApi, fetchWeeklyShiftDetailsApi } from "../../helpers/backend_helper";
import { showLoader, hideLoader } from "../app/actions";



function* fetchAddWeeklyShiftSaga(action) {
    console.log("saga function called-->", action.payload.params);
    try {
        yield put(showLoader());

        const response = yield call(postAddWeeklyShift, action.payload.params);
        console.log("response---------->", response)
        if (response.success) {
            yield put(hideLoader());
            yield put(addWeeklyShiftSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            yield put(addWeeklyShiftFailure(response.error_message));
            yield call(action.payload.onError(response.error_message));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(addWeeklyShiftFailure("Invalid Request"));
    }
}

//get branch shifts

function* fetchBranchShiftsSaga(action) {
    console.log("saga function called-->", action.payload.params);
    try {
        yield put(showLoader());

        const response = yield call(fetchBranchShifts, action.payload.params);
        console.log("response---------->", JSON.stringify(response))
        if (response.success) {
            yield put(hideLoader());
            yield put(getBranchShiftsSuccess(response.details));
            yield call(action.payload.onSuccess);
        } else {
            yield put(hideLoader());
            yield put(getBranchShiftsFailure(response.error_message));
            yield call(action.payload.onError);
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(getBranchShiftsFailure("Invalid Request"));
    }
}

//get branches weekly shifts

function* fetchBranchWeeklyShiftsSaga(action) {
    console.log("saga function called-->", action.payload.params);
    try {
        yield put(showLoader());

        const response = yield call(fetchBranchWeeklyShifts, action.payload.params);
        console.log("response---------->", JSON.stringify(response))
        if (response.success) {
            yield put(hideLoader());
            yield put(getBranchWeeklyShiftsSuccess(response.details));
            yield call(action.payload.onSuccess);
        } else {
            yield put(hideLoader());
            yield put(getBranchWeeklyShiftsFailure(response.error_message));
            yield call(action.payload.onError);
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(getBranchWeeklyShiftsFailure("Invalid Request"));
    }
}

//add shift group

function* postAddShiftSaga(action) {
    console.log("saga function called-->", action.payload.params);
    try {
        yield put(showLoader());

        const response = yield call(postAddShiftApi, action.payload.params);
        console.log("response---------->", JSON.stringify(response))
        if (response.success) {
            yield put(hideLoader());
            yield put(postAddShiftSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            yield put(postAddShiftFailure(response.error_message));
            yield call(action.payload.onError(response.error_message));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(postAddShiftFailure("Invalid Request"));
    }
}

//GET weekly shift details

function* fetchWeeklyShiftDetailsSaga(action) {
    console.log("saga function called-->", action.payload.params);
    try {
        yield put(showLoader());

        const response = yield call(fetchWeeklyShiftDetailsApi, action.payload.params);
        console.log("response---------->", JSON.stringify(response))
        if (response.success) {
            yield put(hideLoader());
            yield put(getWeeklyShiftDetailsSuccess(response.details));
            yield call(action.payload.onSuccess(response.details));
        } else {
            yield put(hideLoader());
            yield put(getWeeklyShiftDetailsFailure(response.error_message));
            yield call(action.payload.onError);
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(getWeeklyShiftDetailsFailure("Invalid Request"));
    }
}


//Watcher


function* ShiftManagementSaga() {
    yield takeLatest(POST_ADD_WEEKLY_SHIFT, fetchAddWeeklyShiftSaga);
    yield takeLatest(FETCH_BRANCH_SHIFTS, fetchBranchShiftsSaga);
    yield takeLatest(FETCH_BRANCH_WEEKLY_SHIFTS, fetchBranchWeeklyShiftsSaga);
    yield takeLatest(POST_ADD_SHIFT, postAddShiftSaga);
    yield takeLatest(FETCH_WEEKLY_SHIFT_DETAILS, fetchWeeklyShiftDetailsSaga);

}

export default ShiftManagementSaga;