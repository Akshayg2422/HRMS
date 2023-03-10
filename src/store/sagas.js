import { all, fork } from "redux-saga/effects";

import AuthSaga from "./auth/saga";
import EmployeeSaga from "./employee/saga";
import LocationSaga from "./location/saga";
import DashboardSaga from "./dashboard/saga";
import ShiftManagementSaga from "./shiftManagement/saga";
import PayrollSaga from './Payroll/saga'
import NotificationSaga from "./notifications/saga";



export default function* rootSaga() {
  yield all([fork(AuthSaga)]);
  yield all([fork(EmployeeSaga)]);
  yield all([fork(LocationSaga)]);
  yield all([fork(DashboardSaga)]);
  yield all([fork(ShiftManagementSaga)]);
  yield all([fork(PayrollSaga)]);
  yield all([fork(NotificationSaga)]);
}