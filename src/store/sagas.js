import { all, fork } from "redux-saga/effects";

import AuthSaga from "./auth/saga";
import EmployeeSaga from "./employee/saga";
import LocationSaga from "./location/saga";
import DashboardSaga from "./dashboard/saga";



export default function* rootSaga() {
  yield all([fork(AuthSaga)]);
  yield all([fork(EmployeeSaga)]);
  yield all([fork(LocationSaga)]);
  yield all([fork(DashboardSaga)]);
}