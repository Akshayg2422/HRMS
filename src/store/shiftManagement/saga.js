import { takeLatest, put, call } from "redux-saga/effects";

import {
    POST_ADD_WEEKLY_SHIFT,
    FETCH_BRANCH_SHIFTS,
    FETCH_BRANCH_WEEKLY_SHIFTS,
    POST_ADD_SHIFT,
    FETCH_WEEKLY_SHIFT_DETAILS,
    FETCH_SHIFT_EMPLOYEES,
    FETCH_MY_SHIFTS
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
    getWeeklyShiftDetailsFailure,
    getShiftEmployeesDetailsSuccess,
    getShiftEmployeesDetailsFailure,
    getMyShiftsSuccess,
    getMyShiftsFailure
} from "./actions";

import { postAddWeeklyShift, fetchBranchShifts, fetchBranchWeeklyShifts, postAddShiftApi, fetchWeeklyShiftDetailsApi, fetchShiftEmployeesApi,fetchMyShiftsApi } from "../../helpers/backend_helper";
import { showLoader, hideLoader } from "../app/actions";



function* fetchAddWeeklyShiftSaga(action) {
    try {
        yield put(showLoader());

        const response = yield call(postAddWeeklyShift, action.payload.params);
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
    try {
        yield put(showLoader());

        const response = yield call(fetchBranchShifts, action.payload.params);
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
    try {
        yield put(showLoader());

        const response = yield call(fetchBranchWeeklyShifts, action.payload.params);
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
    try {
        yield put(showLoader());

        const response = yield call(postAddShiftApi, action.payload.params);
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
    try {
        yield put(showLoader());

        const response = yield call(fetchWeeklyShiftDetailsApi, action.payload.params);
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

//Get shift employees group details

function* fetchShiftEmployeesGroupDetailsSaga(action) {
    try {
        yield put(showLoader());

        const response = yield call(fetchShiftEmployeesApi, action.payload.params);
        if (response.success) {
            yield put(hideLoader());
            yield put(getShiftEmployeesDetailsSuccess(response.details));
            yield call(action.payload.onSuccess(response.details));
        } else {
            yield put(hideLoader());
            yield put(getShiftEmployeesDetailsFailure(response.error_message));
            yield call(action.payload.onError);
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(getShiftEmployeesDetailsFailure("Invalid Request"));
    }
}


///MY SHIFTS

function* fetchMyShiftsSaga(action) {
    try {
        yield put(showLoader());
        const response = yield call(fetchMyShiftsApi, action.payload.params);
        if (response.success) {
            yield put(hideLoader());
            yield put(getMyShiftsSuccess(response.details));
            yield call(action.payload.onSuccess(response.details));
        } else {
            yield put(hideLoader());
            yield put(getMyShiftsFailure(response.error_message));
            yield call(action.payload.onError);
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(getMyShiftsFailure("Invalid Request"));
    }
}

//Watcher


function* ShiftManagementSaga() {
    yield takeLatest(POST_ADD_WEEKLY_SHIFT, fetchAddWeeklyShiftSaga);
    yield takeLatest(FETCH_BRANCH_SHIFTS, fetchBranchShiftsSaga);
    yield takeLatest(FETCH_BRANCH_WEEKLY_SHIFTS, fetchBranchWeeklyShiftsSaga);
    yield takeLatest(POST_ADD_SHIFT, postAddShiftSaga);
    yield takeLatest(FETCH_WEEKLY_SHIFT_DETAILS, fetchWeeklyShiftDetailsSaga);
    yield takeLatest(FETCH_SHIFT_EMPLOYEES, fetchShiftEmployeesGroupDetailsSaga);
    yield takeLatest(FETCH_MY_SHIFTS, fetchMyShiftsSaga);



}

export default ShiftManagementSaga;