import {
    ADD_ALLOWANCE_GROUPS, ADD_ALLOWANCE_GROUPS_FAILURE, ADD_ALLOWANCE_GROUPS_SUCCESS,


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

    GET_COMPANY_DEDUCTIONS_PAGINATED,
    GET_COMPANY_DEDUCTIONS_PAGINATED_SUCCESS,
    GET_COMPANY_DEDUCTIONS_PAGINATED_FAILURE,

    SETTING_SELECTED_DEDUCTION_DETAILS,

    ADD_EMPLOYEE_SALARY_DEFINITION,
    ADD_EMPLOYEE_SALARY_DEFINITION_SUCCESS,
    ADD_EMPLOYEE_SALARY_DEFINITION_FAILURE,

    SETTING_SELECTED_EMPLOYEE_DETAILS,

    CREATE_GROUP,

    GET_ALLOWANCE_GROUPS,
    GET_ALLOWANCE_GROUPS_FAILURE,
    GET_ALLOWANCE_GROUPS_SUCCESS,

    GET_EMPLOYEE_SALARY_DEFINITION,
    GET_EMPLOYEE_SALARY_DEFINITION_FAILURE,
    GET_EMPLOYEE_SALARY_DEFINITION_SUCCESS,

    IS_EDIT_SALARY_DEFINITION,

    GET_SALARY_ALLOWANCE, GET_SALARY_ALLOWANCE_FAILURE, GET_SALARY_ALLOWANCE_SUCCESS,
    GET_TAX_SECTIONS, GET_TAX_SECTIONS_FAILURE, GET_TAX_SECTIONS_SUCCESS, RESET_REDUCER,

    GET_ALLOWANCE_GROUPS_PAGINATED,
    GET_ALLOWANCE_GROUPS_PAGINATED_SUCCESS,
    GET_ALLOWANCE_GROUPS_PAGINATED_FAILURE,
    GET_EARNINGS,
    GET_EARNINGS_SUCCESS,
    GET_EARNINGS_FAILURE,
    SET_COMPANY_INCENTIVE,
    SET_COMPANY_INCENTIVE_SUCCESS,
    SET_COMPANY_INCENTIVE_FAILURE,
    GET_COMPANY_INCENTIVE,
    GET_COMPANY_INCENTIVE_SUCCESS,
    GET_COMPANY_INCENTIVE_FAILURE,
    SETTING_SELECTED_INCENTIVE_DETAILS
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
    selectedDeductionDetails: undefined,
    selectedEmployeeDetails: undefined,
    employeeSalaryDefinition: undefined,
    isEditSalary: false,
    companyIncentiveList: [],
    selectedIncentiveDetails: undefined,

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

            };
            break;
        case GET_ALLOWANCE_GROUPS_SUCCESS:
            state = {
                ...state,
                allowanceGroupsList: action.payload,

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
        * get Allowance Groups Paginated
        */

        case GET_ALLOWANCE_GROUPS_PAGINATED:
            state = {
                ...state,
                allowanceGroupsList: [],
                numOfPages: 0,
                currentPage: 1,
            };
            break;
        case GET_ALLOWANCE_GROUPS_PAGINATED_SUCCESS:
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
        case GET_ALLOWANCE_GROUPS_PAGINATED_FAILURE:
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
            };
            break;
        case GET_COMPANY_DEDUCTIONS_SUCCESS:

            state = {
                ...state,
                companyDeductionsList: action.payload,
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
     * get company deductions paginated
     */

        case GET_COMPANY_DEDUCTIONS_PAGINATED:
            state = {
                ...state,
                companyDeductionsList: [],
                numOfPages: 0,
                currentPage: 1,
            };
            break;
        case GET_COMPANY_DEDUCTIONS_PAGINATED_SUCCESS:

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
        case GET_COMPANY_DEDUCTIONS_PAGINATED_FAILURE:
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
        case ADD_EMPLOYEE_SALARY_DEFINITION:
            state = {
                ...state,
                loading: true,
            };
            break;
        case ADD_EMPLOYEE_SALARY_DEFINITION_SUCCESS:
            state = {
                ...state,
                loading: false,
            };
            break;
        case ADD_EMPLOYEE_SALARY_DEFINITION_FAILURE:
            state = {
                ...state,
                error: action.payload,
                loading: false,
            };
            break;

        /**
         * setting selected employee details
         */

        case SETTING_SELECTED_EMPLOYEE_DETAILS:
            state = {
                ...state,
                selectedEmployeeDetails: action.payload
            };
            break;

        /**
* get Employee Salary DEFINITION
*/
        case GET_EMPLOYEE_SALARY_DEFINITION:
            state = {
                ...state,
                loading: true,
            };
            break;
        case GET_EMPLOYEE_SALARY_DEFINITION_SUCCESS:
            state = {
                ...state,
                loading: false,
                employeeSalaryDefinition: action.payload
            };
            break;
        case GET_EMPLOYEE_SALARY_DEFINITION_FAILURE:
            state = {
                ...state,
                error: action.payload,
                loading: false,
            };
            break;

        /**
         * is edit salary definition
         */

        case IS_EDIT_SALARY_DEFINITION:
            state = {
                ...state,
                isEditSalary: action.payload
            };
            break;

        /**
         * Total Earnings
         */

        case GET_EARNINGS:
            state = {
                ...state,
                loading: true,
            };
            break;
        case GET_EARNINGS_SUCCESS:
            state = {
                ...state,
                loading: false,
            };
            break;
        case GET_EARNINGS_FAILURE:
            state = {
                ...state,
                error: action.payload,
                loading: false,
            };
            break;

        // SET_COMPANY_INCENTIVE

        case SET_COMPANY_INCENTIVE:
            state = {
                ...state,
                loading: true,
            };
            break;
        case SET_COMPANY_INCENTIVE_SUCCESS:
            state = {
                ...state,
                loading: false,
            };
            break;
        case SET_COMPANY_INCENTIVE_FAILURE:
            state = {
                ...state,
                error: action.payload,
                loading: false,
            };
            break;

        // get COMPANY_INCENTIVE

        case GET_COMPANY_INCENTIVE:
            state = {
                ...state,
                companyIncentiveList: [],
                numOfPages: 0,
                currentPage: 1,
                loading: true,
            };
            break;
        case GET_COMPANY_INCENTIVE_SUCCESS:
            state = {
                ...state,
                loading: false,
                companyIncentiveList: action.payload.data,
                numOfPages: action.payload.num_pages,
                currentPage:
                    action.payload.next_page === -1
                        ? action.payload.num_pages
                        : action.payload.next_page - 1,
            };
            break;
        case GET_COMPANY_INCENTIVE_FAILURE:
            state = {
                ...state,
                error: action.payload,
                loading: false,
            };
            break;

        // SETTING_SELECTED_INCENTIVE_DETAILS

        case SETTING_SELECTED_INCENTIVE_DETAILS:
            state = {
                ...state,
                selectedIncentiveDetails: action.payload
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
