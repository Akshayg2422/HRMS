import { combineReducers } from "redux";

import AuthReducer from "./auth/reducer";
import EmployeeReducer from "./employee/reducer";
import LocationReducer from "./location/reducer";
import DashboardReducer from "./dashboard/reducer";
import AppReducer from "./app/reducer";
import ShiftManagementReducer from "./shiftManagement/reducer";
import PayrollReducer from './Payroll/reducer'


const rootReducer = combineReducers({
    AuthReducer,
    EmployeeReducer,
    LocationReducer,
    DashboardReducer,
    AppReducer,
    ShiftManagementReducer,
    PayrollReducer
});

export default rootReducer;