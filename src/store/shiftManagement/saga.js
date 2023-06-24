import { takeLatest, put, call } from "redux-saga/effects";

import {
    POST_ADD_WEEKLY_SHIFT,
    FETCH_BRANCH_SHIFTS,
    FETCH_BRANCH_WEEKLY_SHIFTS,
    POST_ADD_SHIFT,
    FETCH_WEEKLY_SHIFT_DETAILS,
    FETCH_SHIFT_EMPLOYEES,
    FETCH_MY_SHIFTS,
    GET_EMPLOYEE_WITH_SHIFTS,
    POST_EMPLOYEE_SHIFT_CHANGE,
    GET_SHIFT_REQUESTED_EMPLOYEES,
    GET_SHIFT_REQUESTED_STATUS,
    POST_REQUEST_SHIFT_CHANGE,
    POST_CHANGE_SHIFT_CHANGE,
    GET_HFWS_BRANCH_SHIFT
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
    getMyShiftsFailure,
    getEmployeeWithShiftSuccess,
    getEmployeeWithShiftFailure,
    postEmployeeShiftChangeSuccess,
    postEmployeeShiftChangeFailure,
    getShiftRequestedEmployeesSuccess,
    getShiftRequestedEmployeesFailure,
    getShiftRequestedStatusSuccess,
    getShiftRequestedStatusFailure,
    postRequestShiftChangeSuccess,
    postRequestShiftChangeFailure,
    postChangeShiftChangeSuccess,
    postChangeShiftChangeFailure,
    getHfwsBranchShiftSuccess,
    getHfwsBranchShiftFailure,
} from "./actions";

import {
    postAddWeeklyShift, fetchBranchShifts, fetchBranchWeeklyShifts, postAddShiftApi, fetchWeeklyShiftDetailsApi,
    fetchShiftEmployeesApi, fetchMyShiftsApi, fetchEmployeeWithShiftsApi, PostEmployeeWithChangeShiftApi,
    getShiftRequestedEmployeesApi, getShiftRequestedStatusApi, postRequestShiftChangeApi, postChangeEmployeeShiftApi, getHfwsBranchShiftApi
} from "../../helpers/backend_helper";
import { showLoader, hideLoader } from "../loader/actions";



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
        yield call(action.payload.onError(error));

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
            yield call(action.payload.onSuccess(response.details));
        } else {
            yield put(hideLoader());
            yield put(getBranchShiftsFailure(response.error_message));
            yield call(action.payload.onError(response.error_message));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(getBranchShiftsFailure("Invalid Request"));
        yield call(action.payload.onError(error));

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
            yield call(action.payload.onSuccess(response.details));
        } else {
            yield put(hideLoader());
            yield put(getBranchWeeklyShiftsFailure(response.error_message));
            yield call(action.payload.onError(response.error_message));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(getBranchWeeklyShiftsFailure("Invalid Request"));
        yield call(action.payload.onError(error));

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
        yield call(action.payload.onError(error));

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
            yield call(action.payload.onError(response.error_message));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(getWeeklyShiftDetailsFailure("Invalid Request"));
        yield call(action.payload.onError(error));

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
            yield call(action.payload.onError(response.error_message));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(getShiftEmployeesDetailsFailure("Invalid Request"));
        yield call(action.payload.onError(error));

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
            yield call(action.payload.onError(response.error_message));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(getMyShiftsFailure("Invalid Request"));
        yield call(action.payload.onError(error));

    }
}

// get Employee with shifts

function* fetchEmployeeWithShiftsSaga(action) {
    try {
        yield put(showLoader());
        const response = yield call(fetchEmployeeWithShiftsApi, action.payload.params);
        if (response.success) {
            yield put(hideLoader());
            yield put(getEmployeeWithShiftSuccess(response.details));
            yield call(action.payload.onSuccess(response.details));
        } else {
            yield put(hideLoader());
            yield put(getEmployeeWithShiftFailure(response.error_message));
            yield call(action.payload.onError(response.error_message));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(getEmployeeWithShiftFailure("Invalid Request"));
        yield call(action.payload.onError(error));

    }
}



// Change Employee Shifts 

function* postEmployeeShiftChangeSaga(action) {
    try {
        yield put(showLoader());
        const response = yield call(PostEmployeeWithChangeShiftApi, action.payload.params);
        if (response.success) {
            yield put(hideLoader());
            yield put(postEmployeeShiftChangeSuccess(response.details));
            yield call(action.payload.onSuccess(response.status));
        } else {
            yield put(hideLoader());
            yield put(postEmployeeShiftChangeFailure(response.error_message));
            yield call(action.payload.onError(response.error_message));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(postEmployeeShiftChangeFailure("Invalid Request"));
        yield call(action.payload.onError(error));

    }
}

/**
 * employees Shift request
 */

function* shiftRequestedEmployeesSaga(action) {
    try {
        yield put(showLoader());
        const response = yield call(getShiftRequestedEmployeesApi, action.payload.params);
        if (response.success) {
            yield put(hideLoader());
            yield put(getShiftRequestedEmployeesSuccess(response.details));
            yield call(action.payload.onSuccess(response.details));
        } else {
            yield put(hideLoader());
            yield put(getShiftRequestedEmployeesFailure(response.error_message));
            yield call(action.payload.onError(response.error_message));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(getShiftRequestedEmployeesFailure("Invalid Request"));
        yield call(action.payload.onError(error));

    }
}

/**
 * employee Shift request Status
 */

function* shiftRequestedStatusSaga(action) {
    try {
        yield put(showLoader());
        const response = yield call(getShiftRequestedStatusApi, action.payload.params);
        if (response.success) {
            yield put(hideLoader());
            yield put(getShiftRequestedStatusSuccess(response.details));
            yield call(action.payload.onSuccess(response.details));
        } else {
            yield put(hideLoader());
            yield put(getShiftRequestedStatusFailure(response.error_message));
            yield call(action.payload.onError(response.error_message));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(getShiftRequestedStatusFailure("Invalid Request"));
        yield call(action.payload.onError(error));

    }
}

/**
    * POST_REQUEST_SHIFT_CHANGE
    */
function* shiftRequestShiftChangeSaga(action) {
    try {
        yield put(showLoader());
        const response = yield call(postRequestShiftChangeApi, action.payload.params);
        if (response.success) {
            yield put(hideLoader());
            yield put(postRequestShiftChangeSuccess(response.details));
            yield call(action.payload.onSuccess(response.details));
        } else {
            yield put(hideLoader());
            yield put(postRequestShiftChangeFailure(response.error_message));
            yield call(action.payload.onError(response.error_message));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(postRequestShiftChangeFailure("Invalid Request"));
        yield call(action.payload.onError(error));

    }
}

/**
 * POST_CHANGE_SHIFT_CHANGE
 */

function* changeShiftChangeSaga(action) {
    try {
        yield put(showLoader());
        const response = yield call(postChangeEmployeeShiftApi, action.payload.params);
        if (response.success) {
            yield put(hideLoader());
            yield put(postChangeShiftChangeSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            yield put(postChangeShiftChangeFailure(response.error_message));
            yield call(action.payload.onError(response.error_message));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(postChangeShiftChangeFailure("Invalid Request"));
        yield call(action.payload.onError(error));

    }
}

// hfwsBranchShifts

function* getHfwsBranchShiftsSaga(action) {
    try {
        yield put(showLoader());
        const response = yield call(getHfwsBranchShiftApi, action.payload.params);
        if (response.success) {
            yield put(hideLoader());
            yield put(getHfwsBranchShiftSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            yield put(getHfwsBranchShiftFailure(response.error_message));
            yield call(action.payload.onError(response.error_message));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(getHfwsBranchShiftFailure("Invalid Request"));
        yield call(action.payload.onError(error));

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
    yield takeLatest(GET_EMPLOYEE_WITH_SHIFTS, fetchEmployeeWithShiftsSaga);
    yield takeLatest(POST_EMPLOYEE_SHIFT_CHANGE, postEmployeeShiftChangeSaga);
    yield takeLatest(GET_SHIFT_REQUESTED_EMPLOYEES, shiftRequestedEmployeesSaga);
    yield takeLatest(GET_SHIFT_REQUESTED_STATUS, shiftRequestedStatusSaga);
    yield takeLatest(POST_REQUEST_SHIFT_CHANGE, shiftRequestShiftChangeSaga);
    yield takeLatest(POST_CHANGE_SHIFT_CHANGE, changeShiftChangeSaga);
    yield takeLatest(GET_HFWS_BRANCH_SHIFT, getHfwsBranchShiftsSaga);

}

export default ShiftManagementSaga;