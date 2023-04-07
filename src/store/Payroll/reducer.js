import {
    ADD_ALLOWANCE_GROUPS, ADD_ALLOWANCE_GROUPS_FAILURE, ADD_ALLOWANCE_GROUPS_SUCCESS,
    ADD_EMPLOYEE_SALARY, ADD_EMPLOYEE_SALARY_FAILURE, ADD_EMPLOYEE_SALARY_SUCCESS,

    ADD_COMPANY_ALLOWANCE,
    ADD_COMPANY_ALLOWANCE_FAILURE,
    ADD_COMPANY_ALLOWANCE_SUCCESS,

    ADD_COMPANY_DEDUCTION,
    ADD_COMPANY_DEDUCTION_SUCCESS,
    ADD_COMPANY_DEDUCTION_FAILURE,

    GET_ALLOWANCE_GROUP_DETAILS,
    GET_ALLOWANCE_GROUP_DETAILS_SUCCESS,
    GET_ALLOWANCE_GROUP_DETAILS_FAILURE,

    GET_COMPANY_ALLOWANCE,
    GET_COMPANY_ALLOWANCE_SUCCESS,
    GET_COMPANY_ALLOWANCE_FAILURE,

    SETTING_SELECTED_ALLOWANCE_GROUP_DETAILS,

    GET_COMPANY_DEDUCTIONS,
    GET_COMPANY_DEDUCTIONS_SUCCESS,
    GET_COMPANY_DEDUCTIONS_FAILURE,

    SETTING_SELECTED_DEDUCTION_DETAILS,

    CREATE_GROUP, GET_ALLOWANCE_GROUPS, GET_ALLOWANCE_GROUPS_FAILURE, GET_ALLOWANCE_GROUPS_SUCCESS,
    GET_EMPLOYEE_SALARY, GET_EMPLOYEE_SALARY_FAILURE, GET_EMPLOYEE_SALARY_SUCCESS,
    GET_SALARY_ALLOWANCE, GET_SALARY_ALLOWANCE_FAILURE, GET_SALARY_ALLOWANCE_SUCCESS,
    GET_TAX_SECTIONS, GET_TAX_SECTIONS_FAILURE, GET_TAX_SECTIONS_SUCCESS, RESET_REDUCER
} from './actionTypes'

const initialState = {
    loading: false,
    error: '',
    numOfPages: 0,
    currentPage: 1,
    groupFor: '',
    allowanceGroupsList: [],
    allowanceGroupDetails: [],
    companyAllowanceList: [],
    selectedAllowanceGroupDetails: undefined,
    companyDeductionsList: [],
    selectedDeductionDetails: undefined
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
        case ADD_COMPANY_ALLOWANCE:
            state = {
                ...state,
                loading: true,
            };
            break;
        case ADD_COMPANY_ALLOWANCE_SUCCESS:
            state = {
                ...state,
                loading: false,
            };
            break;

        case ADD_COMPANY_ALLOWANCE_FAILURE:
            state = {
                ...state,
                error: action.payload,
                loading: false,
            };
            break;

        /**
     * Add company deduction
     */
        case ADD_COMPANY_DEDUCTION:
            state = {
                ...state,
                loading: true,
            };
            break;
        case ADD_COMPANY_DEDUCTION_SUCCESS:
            state = {
                ...state,
                loading: false,
            };
            break;

        case ADD_COMPANY_DEDUCTION_FAILURE:
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
        * get Allowance Groups
        */

        case GET_ALLOWANCE_GROUPS:
            state = {
                ...state,
                allowanceGroupsList: [],
                numOfPages: 0,
                currentPage: 1,
            };
            break;
        case GET_ALLOWANCE_GROUPS_SUCCESS:
            state = {
                ...state,
                loading: false,
                allowanceGroupsList: action.payload,
                numOfPages: action.payload.num_pages,
                currentPage:
                    action.payload.next_page === -1
                        ? action.payload.num_pages
                        : action.payload.next_page - 1,
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
         * get Allowance Group details
         */

        case GET_ALLOWANCE_GROUP_DETAILS:
            state = {
                ...state,
                loading: true,
            };
            break;
        case GET_ALLOWANCE_GROUP_DETAILS_SUCCESS:

            state = {
                ...state,
                loading: false,
                allowanceGroupDetails: action.payload
            };
            break;
        case GET_ALLOWANCE_GROUP_DETAILS_FAILURE:
            state = {
                ...state,
                error: action.payload,
                loading: false,
            };
            break;


        /**
         * get company Allowance 
         */

        case GET_COMPANY_ALLOWANCE:
            state = {
                ...state,
                loading: true,
            };
            break;
        case GET_COMPANY_ALLOWANCE_SUCCESS:

            state = {
                ...state,
                loading: false,
                companyAllowanceList: action.payload
            };
            break;
        case GET_COMPANY_ALLOWANCE_FAILURE:
            state = {
                ...state,
                error: action.payload,
                loading: false,
            };
            break;

        /**
         * setting selected allowance group details
         */

        case SETTING_SELECTED_ALLOWANCE_GROUP_DETAILS:
            console.log("reducer---->", action.payload);
            state = {
                ...state,
                selectedAllowanceGroupDetails: action.payload
            };
            break;

        /**
     * get company deductions
     */

        case GET_COMPANY_DEDUCTIONS:
            state = {
                ...state,
                companyDeductionsList: [],
                numOfPages: 0,
                currentPage: 1,
            };
            break;
        case GET_COMPANY_DEDUCTIONS_SUCCESS:

            state = {
                ...state,
                loading: false,
                companyDeductionsList: action.payload,
                numOfPages: action.payload.num_pages,
                currentPage:
                    action.payload.next_page === -1
                        ? action.payload.num_pages
                        : action.payload.next_page - 1,
            };
            break;
        case GET_COMPANY_DEDUCTIONS_FAILURE:
            state = {
                ...state,
                error: action.payload,
                loading: false,
            };
            break;


        /**
         * setting selected deduction details
         */

        case SETTING_SELECTED_DEDUCTION_DETAILS:
            console.log("reducer-===--->", action.payload);

            state = {
                ...state,
                selectedDeductionDetails: action.payload
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
