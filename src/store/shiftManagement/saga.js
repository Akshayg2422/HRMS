import { takeLatest, put, call } from "redux-saga/effects";

import {
    POST_ADD_WEEKLY_SHIFT,
} from "./actionTypes";

//  import {addWeeklyShiftSuccess,addWeeklyShiftFailure} './actions'
import { addWeeklyShiftSuccess, addWeeklyShiftFailure } from "./actions";

import { postAddWeeklyShift } from "../../helpers/backend_helper";
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
            yield call(action.payload.onSuccess);
        } else {
            yield put(hideLoader());
            yield put(addWeeklyShiftFailure(response.error_message));
            yield call(action.payload.onError);
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(addWeeklyShiftFailure("Invalid Request"));
    }
}


//Watcher


function* ShiftManagementSaga() {
    yield takeLatest(POST_ADD_WEEKLY_SHIFT, fetchAddWeeklyShiftSaga);

}

export default ShiftManagementSaga;