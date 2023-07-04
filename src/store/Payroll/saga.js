import { takeLatest, put, call } from "redux-saga/effects";


import {
    ADD_COMPANY_ALLOWANCE,
    ADD_COMPANY_DEDUCTION,
    ADD_ALLOWANCE_GROUPS,
    GET_ALLOWANCE_GROUPS,
    GET_ALLOWANCE_GROUP_DETAILS,
    GET_COMPANY_ALLOWANCE,
    GET_COMPANY_DEDUCTIONS,
    ADD_EMPLOYEE_SALARY_DEFINITION,
    GET_EMPLOYEE_SALARY_DEFINITION,
    GET_ALLOWANCE_GROUPS_PAGINATED,
    GET_COMPANY_DEDUCTIONS_PAGINATED,
    GET_EARNINGS,
    SET_COMPANY_INCENTIVE,
    GET_COMPANY_INCENTIVE
} from "./actionTypes";

//  import {addWeeklyShiftSuccess,addWeeklyShiftFailure} './actions'
import {
    addCompanyAllowanceSuccess,
    addCompanyAllowanceFailure,

    addCompanyDeductionSuccess,
    addCompanyDeductionFailure,

    addAllowanceGroupSuccess,
    addAllowanceGroupFailure,

    getAllowanceGroupsSuccess,
    getAllowanceGroupsFailure,

    getAllowanceGroupDetailsSuccess,
    getAllowanceGroupDetailsFailure,

    getCompanyAllowanceSuccess,
    getCompanyAllowanceFailure,

    getCompanyDeductionsSuccess,
    getCompanyDeductionsFailure,

    addEmployeeSalaryDefinitionSuccess,
    addEmployeeSalaryDefinitionFailure,

    getEmployeeSalaryDefinitionSuccess,
    getEmployeeSalaryDefinitionFailure,

    getAllowanceGroupsPaginatedSuccess,
    getAllowanceGroupsPaginatedFailure,

    getCompanyDeductionsPaginatedSuccess,
    getCompanyDeductionsPaginatedFailure,
    getEmployeeEarningsSuccess,
    getEmployeeEarningsFailure,
    setCompanyIncentiveSuccess,
    setCompanyIncentiveFailure,
    getCompanyIncentiveSuccess,
    getCompanyIncentiveFailure
} from "./actions";

import {
    addCompanyAllowanceApi,
    addCompanyDeductionApi,

    addAllowanceGroupApi,
    fetchAllowanceGroupsApi,

    fetchAllowanceGroupDetailsApi,

    fetchCompanyAllowanceApi,

    fetchCompanyDeductionsApi,

    addEmployeeSalaryDefinitionApi,

    getEmployeeSalaryDefinitionApi,
    fetchEmployeeEarningsApi,
    postCompanyIncentiveApi,
    getCompanyIncentiveApi
} from "../../helpers/backend_helper";

import { showLoader, hideLoader } from "../loader/actions";

//Add company allowance

function* addCompanyAllowanceSaga(action) {
    try {
        yield put(showLoader());

        const response = yield call(addCompanyAllowanceApi, action.payload.params);

        if (response.success) {
            yield put(hideLoader());
            yield put(addCompanyAllowanceSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            yield put(addCompanyAllowanceFailure(response.error_message));
            yield call(action.payload.onError(response.error_message));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(addCompanyAllowanceFailure("Invalid Request"));
        yield call(action.payload.onError(error));

    }
}

//Add company deduction

function* addCompanyDeductionSaga(action) {
    try {
        yield put(showLoader());

        const response = yield call(addCompanyDeductionApi, action.payload.params);

        if (response.success) {
            yield put(hideLoader());
            yield put(addCompanyDeductionSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            yield put(addCompanyDeductionFailure(response.error_message));
            yield call(action.payload.onError(response.error_message));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(addCompanyDeductionFailure("Invalid Request"));
        yield call(action.payload.onError(error));

    }
}

//Add allowance group

function* addAllowanceGroupSaga(action) {
    try {
        yield put(showLoader());

        const response = yield call(addAllowanceGroupApi, action.payload.params);

        if (response.success) {
            yield put(hideLoader());
            yield put(addAllowanceGroupSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            yield put(addAllowanceGroupFailure(response.error_message));
            yield call(action.payload.onError(response.error_message));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(addAllowanceGroupFailure("Invalid Request"));
        yield call(action.payload.onError(error));

    }
}

//Get allowance groups

function* getAllowanceGroupsSaga(action) {
    try {
        yield put(showLoader());

        const response = yield call(fetchAllowanceGroupsApi, action.payload.params);

        if (response.success) {
            yield put(hideLoader());
            yield put(getAllowanceGroupsSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            yield put(getAllowanceGroupsFailure(response.error_message));
            yield call(action.payload.onError(response.error_message));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(getAllowanceGroupsFailure("Invalid Request"));
        yield call(action.payload.onError(error));

    }
}

//Get allowance groups paginated

function* getAllowanceGroupsPaginatedSaga(action) {
    try {
        yield put(showLoader());

        const response = yield call(fetchAllowanceGroupsApi, action.payload.params);

        if (response.success) {
            yield put(hideLoader());
            yield put(getAllowanceGroupsPaginatedSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            yield put(getAllowanceGroupsPaginatedFailure(response.error_message));
            yield call(action.payload.onError(response.error_message));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(getAllowanceGroupsPaginatedFailure("Invalid Request"));
        yield call(action.payload.onError(error));

    }
}

//Get allowance group details

function* getAllowanceGroupDetailsSaga(action) {
    try {
        yield put(showLoader());

        const response = yield call(fetchAllowanceGroupDetailsApi, action.payload.params);

        if (response.success) {
            yield put(hideLoader());
            yield put(getAllowanceGroupDetailsSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            yield put(getAllowanceGroupDetailsFailure(response.error_message));
            yield call(action.payload.onError(response.error_message));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(getAllowanceGroupDetailsFailure("Invalid Request"));
        yield call(action.payload.onError(error));

    }
}

//Get company allowance 

function* getCompanyAllowanceApi(action) {
    try {
        yield put(showLoader());

        const response = yield call(fetchCompanyAllowanceApi, action.payload.params);

        if (response.success) {
            yield put(hideLoader());
            yield put(getCompanyAllowanceSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            yield put(getCompanyAllowanceFailure(response.error_message));
            yield call(action.payload.onError(response.error_message));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(getCompanyAllowanceFailure("Invalid Request"));
        yield call(action.payload.onError(error));

    }
}

//Get company deductions

function* getCompanyDeductionsApi(action) {
    try {
        yield put(showLoader());

        const response = yield call(fetchCompanyDeductionsApi, action.payload.params);

        if (response.success) {
            yield put(hideLoader());
            yield put(getCompanyDeductionsSuccess(response.details));
            yield call(action.payload.onSuccess(response.details));
        } else {
            yield put(hideLoader());
            yield put(getCompanyDeductionsFailure(response.error_message));
            yield call(action.payload.onError(response.error_message));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(getCompanyDeductionsFailure("Invalid Request"));
        yield call(action.payload.onError(error));

    }
}


//Get company deductions

function* getCompanyDeductionsPaginatedApi(action) {
    try {
        yield put(showLoader());

        const response = yield call(fetchCompanyDeductionsApi, action.payload.params);

        if (response.success) {
            yield put(hideLoader());
            yield put(getCompanyDeductionsPaginatedSuccess(response.details));
            yield call(action.payload.onSuccess(response.details));
        } else {
            yield put(hideLoader());
            yield put(getCompanyDeductionsPaginatedFailure(response.error_message));
            yield call(action.payload.onError(response.error_message));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(getCompanyDeductionsPaginatedFailure("Invalid Request"));
        yield call(action.payload.onError(error));

    }
}

//Add employee salary definition

function* addEmployeeSalaryDefinitionSaga(action) {
    try {
        yield put(showLoader());

        const response = yield call(addEmployeeSalaryDefinitionApi, action.payload.params);

        if (response.success) {
            yield put(hideLoader());
            yield put(addEmployeeSalaryDefinitionSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            yield put(addEmployeeSalaryDefinitionFailure(response.error_message));
            yield call(action.payload.onError(response.error_message));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(addEmployeeSalaryDefinitionFailure("Invalid Request"));
        yield call(action.payload.onError(error));

    }
}

//get employee salary definition

function* getEmployeeSalaryDefinitionSaga(action) {
    try {
        yield put(showLoader());

        const response = yield call(getEmployeeSalaryDefinitionApi, action.payload.params);

        if (response.success) {
            yield put(hideLoader());
            yield put(getEmployeeSalaryDefinitionSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            yield put(getEmployeeSalaryDefinitionFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(getEmployeeSalaryDefinitionFailure("Invalid Request"));
        yield call(action.payload.onError(error));

    }
}

/**
 * Employee Earnings
 */

function* getEmployeesEarningsSaga(action) {
    try {
        yield put(showLoader());
        const response = yield call(fetchEmployeeEarningsApi, action.payload.params);
        if (response.success) {
            yield put(hideLoader());
            yield put(getEmployeeEarningsSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            yield put(getEmployeeEarningsFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(getEmployeeEarningsFailure("Invalid Request"));
        yield call(action.payload.onError(error));

    }
}

// SET_COMPANY_INCENTIVE


function* setCompanyIncentiveSaga(action) {
    try {
        yield put(showLoader());
        const response = yield call(postCompanyIncentiveApi, action.payload.params);
        if (response.success) {
            yield put(hideLoader());
            yield put(setCompanyIncentiveSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            yield put(setCompanyIncentiveFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(setCompanyIncentiveFailure("Invalid Request"));
        yield call(action.payload.onError(error));

    }
}

// get_COMPANY_INCENTIVE

function* getCompanyIncentiveSaga(action) {
    try {
        yield put(showLoader());
        const response = yield call(getCompanyIncentiveApi, action.payload.params);
        if (response.success) {
            yield put(hideLoader());
            yield put(getCompanyIncentiveSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            yield put(getCompanyIncentiveFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(getCompanyIncentiveFailure("Invalid Request"));
        yield call(action.payload.onError(error));

    }
}

//Watcher


function* PayrollSaga() {
    yield takeLatest(ADD_COMPANY_ALLOWANCE, addCompanyAllowanceSaga);
    yield takeLatest(ADD_COMPANY_DEDUCTION, addCompanyDeductionSaga);
    yield takeLatest(ADD_ALLOWANCE_GROUPS, addAllowanceGroupSaga);
    yield takeLatest(GET_ALLOWANCE_GROUPS, getAllowanceGroupsSaga);
    yield takeLatest(GET_ALLOWANCE_GROUP_DETAILS, getAllowanceGroupDetailsSaga);
    yield takeLatest(GET_COMPANY_ALLOWANCE, getCompanyAllowanceApi);
    yield takeLatest(GET_COMPANY_DEDUCTIONS, getCompanyDeductionsApi);
    yield takeLatest(ADD_EMPLOYEE_SALARY_DEFINITION, addEmployeeSalaryDefinitionSaga);
    yield takeLatest(GET_EMPLOYEE_SALARY_DEFINITION, getEmployeeSalaryDefinitionSaga);
    yield takeLatest(GET_ALLOWANCE_GROUPS_PAGINATED, getAllowanceGroupsPaginatedSaga);
    yield takeLatest(GET_COMPANY_DEDUCTIONS_PAGINATED, getCompanyDeductionsPaginatedApi);
    yield takeLatest(GET_EARNINGS, getEmployeesEarningsSaga);
    yield takeLatest(SET_COMPANY_INCENTIVE, setCompanyIncentiveSaga);
    yield takeLatest(GET_COMPANY_INCENTIVE, getCompanyIncentiveSaga);
}

export default PayrollSaga;