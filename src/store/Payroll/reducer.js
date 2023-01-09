import { ADD_ALLOWANCE_GROUPS, ADD_ALLOWANCE_GROUPS_FAILURE, ADD_ALLOWANCE_GROUPS_SUCCESS, ADD_EMPLOYEE_SALARY, ADD_EMPLOYEE_SALARY_FAILURE, ADD_EMPLOYEE_SALARY_SUCCESS, ADD_SALARY_ALLOWANCE, ADD_SALARY_ALLOWANCE_FAILURE, ADD_SALARY_ALLOWANCE_SUCCESS, CREATE_GROUP, GET_ALLOWANCE_GROUPS, GET_ALLOWANCE_GROUPS_FAILURE, GET_ALLOWANCE_GROUPS_SUCCESS, GET_EMPLOYEE_SALARY, GET_EMPLOYEE_SALARY_FAILURE, GET_EMPLOYEE_SALARY_SUCCESS, GET_SALARY_ALLOWANCE, GET_SALARY_ALLOWANCE_FAILURE, GET_SALARY_ALLOWANCE_SUCCESS, GET_TAX_SECTIONS, GET_TAX_SECTIONS_FAILURE, GET_TAX_SECTIONS_SUCCESS, RESET_REDUCER } from './actionTypes'

const initialState = {
    loading: false,
    error: '',
    numOfPages: 0,
    currentPage: 1,
    groupFor: ''
};



const PayrollReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_GROUP:
            state = {
                ...state,
                loading: true,
                groupFor: action.payload
            };
            break;
        case RESET_REDUCER:
            state = initialState;
            break;
        /**
         * Add salary Allowance
         */
        case ADD_SALARY_ALLOWANCE:
            state = {
                ...state,
                loading: true,
            };
            break;
        case ADD_SALARY_ALLOWANCE_SUCCESS:
            state = {
                ...state,
                loading: false,
                // branchesWeeklyShifts: action.payload
            };
            break;

        case ADD_SALARY_ALLOWANCE_FAILURE:
            state = {
                ...state,
                error: action.payload,
                loading: false,
            };
            break;
        /**
         * get Tax Sections
          */
        case GET_TAX_SECTIONS:
            state = {
                ...state,
                loading: true,
            };
            break;
        case GET_TAX_SECTIONS_SUCCESS:
            state = {
                ...state,
                loading: false,
                // branchesWeeklyShifts: action.payload
            };
            break;
        case GET_TAX_SECTIONS_FAILURE:
            state = {
                ...state,
                error: action.payload,
                loading: false,
            };
            break;
        /**
* get Allowance Groups
*/
        case GET_ALLOWANCE_GROUPS:
            state = {
                ...state,
                loading: true,
            };
            break;
        case GET_ALLOWANCE_GROUPS_SUCCESS:
            state = {
                ...state,
                loading: false,
                // branchesWeeklyShifts: action.payload
            };
            break;
        case GET_ALLOWANCE_GROUPS_FAILURE:
            state = {
                ...state,
                error: action.payload,
                loading: false,
            };
            break;
        /**
* get salary Allowance
*/
        case GET_SALARY_ALLOWANCE:
            state = {
                ...state,
                loading: true,
            };
            break;
        case GET_SALARY_ALLOWANCE_SUCCESS:
            state = {
                ...state,
                loading: false,
                // branchesWeeklyShifts: action.payload
            };
            break;
        case GET_SALARY_ALLOWANCE_FAILURE:
            state = {
                ...state,
                error: action.payload,
                loading: false,
            };
            break;
        /**
* add Allowance Group
*/
        case ADD_ALLOWANCE_GROUPS:
            state = {
                ...state,
                loading: true,
            };
            break;
        case ADD_ALLOWANCE_GROUPS_SUCCESS:
            state = {
                ...state,
                loading: false,
                // branchesWeeklyShifts: action.payload
            };
            break;
        case ADD_ALLOWANCE_GROUPS_FAILURE:
            state = {
                ...state,
                error: action.payload,
                loading: false,
            };
            break;
        /**
* add Employee Salary
*/
        case ADD_EMPLOYEE_SALARY:
            state = {
                ...state,
                loading: true,
            };
            break;
        case ADD_EMPLOYEE_SALARY_SUCCESS:
            state = {
                ...state,
                loading: false,
                // branchesWeeklyShifts: action.payload
            };
            break;
        case ADD_EMPLOYEE_SALARY_FAILURE:
            state = {
                ...state,
                error: action.payload,
                loading: false,
            };
            break;
        /**
* get Employee Salary
*/
        case GET_EMPLOYEE_SALARY:
            state = {
                ...state,
                loading: true,
            };
            break;
        case GET_EMPLOYEE_SALARY_SUCCESS:
            state = {
                ...state,
                loading: false,
                // branchesWeeklyShifts: action.payload
            };
            break;
        case GET_EMPLOYEE_SALARY_FAILURE:
            state = {
                ...state,
                error: action.payload,
                loading: false,
            };
            break;

        /**
         * default
         */
        default:
            state = state;
            break;
    }
    return state;
}

export default PayrollReducer;
