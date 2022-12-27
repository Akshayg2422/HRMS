import { takeLatest, put, call } from "redux-saga/effects";


import { showLoader, hideLoader } from "../app/actions";

// function* fetchAddWeeklyShiftSaga(action) {
//     try {
//         yield put(showLoader());

//         const response = yield call(postAddWeeklyShift, action.payload.params);
//         if (response.success) {
//             yield put(hideLoader());
//             yield put(addWeeklyShiftSuccess(response.details));
//             yield call(action.payload.onSuccess(response));
//         } else {
//             yield put(hideLoader());
//             yield put(addWeeklyShiftFailure(response.error_message));
//             yield call(action.payload.onError(response.error_message));
//         }
//     } catch (error) {
//         yield put(hideLoader());
//         yield put(addWeeklyShiftFailure("Invalid Request"));
//     }
// }




//Watcher


function* PayrollSaga() {
    // yield takeLatest(POST_ADD_WEEKLY_SHIFT, fetchAddWeeklyShiftSaga);
   
}

export default PayrollSaga;