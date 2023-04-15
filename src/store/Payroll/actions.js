import {

  ADD_COMPANY_ALLOWANCE,
  ADD_COMPANY_ALLOWANCE_FAILURE,
  ADD_COMPANY_ALLOWANCE_SUCCESS,

  ADD_COMPANY_DEDUCTION,
  ADD_COMPANY_DEDUCTION_SUCCESS,
  ADD_COMPANY_DEDUCTION_FAILURE,

  CREATE_GROUP,

  ADD_ALLOWANCE_GROUPS,
  ADD_ALLOWANCE_GROUPS_FAILURE,
  ADD_ALLOWANCE_GROUPS_SUCCESS,

  GET_ALLOWANCE_GROUPS,
  GET_ALLOWANCE_GROUPS_FAILURE,
  GET_ALLOWANCE_GROUPS_SUCCESS,

  GET_ALLOWANCE_GROUPS_PAGINATED,
  GET_ALLOWANCE_GROUPS_PAGINATED_FAILURE,
  GET_ALLOWANCE_GROUPS_PAGINATED_SUCCESS,

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

  ADD_EMPLOYEE_SALARY_DEFINITION,
  ADD_EMPLOYEE_SALARY_DEFINITION_SUCCESS,
  ADD_EMPLOYEE_SALARY_DEFINITION_FAILURE,

  SETTING_SELECTED_EMPLOYEE_DETAILS,

  GET_EMPLOYEE_SALARY_DEFINITION,
  GET_EMPLOYEE_SALARY_DEFINITION_FAILURE,
  GET_EMPLOYEE_SALARY_DEFINITION_SUCCESS,

  IS_EDIT_SALARY_DEFINITION,

  GET_SALARY_ALLOWANCE, GET_SALARY_ALLOWANCE_FAILURE, GET_SALARY_ALLOWANCE_SUCCESS,
  GET_TAX_SECTIONS, GET_TAX_SECTIONS_FAILURE, GET_TAX_SECTIONS_SUCCESS, RESET_REDUCER

} from './actionTypes'

/**
* set Logout
* 
*/

export const resetPayroll = () => {
  return {
    type: RESET_REDUCER,
  };
};


export const CreateGroup = (payload) => {
  return {
    type: CREATE_GROUP,
    payload: payload,
  };
};

/**
* Add company Allowance
*/
export const addCompanyAllowance = (type) => {
  return {
    type: ADD_COMPANY_ALLOWANCE,
    payload: type,
  };
};

export const addCompanyAllowanceSuccess = (response) => {
  return {
    type: ADD_COMPANY_ALLOWANCE_SUCCESS,
    payload: response,
  };
};

export const addCompanyAllowanceFailure = (error) => {
  return {
    type: ADD_COMPANY_ALLOWANCE_FAILURE,
    payload: error,
  };
};

/**
* Add company deduction
*/
export const addCompanyDeduction = (type) => {
  return {
    type: ADD_COMPANY_DEDUCTION,
    payload: type,
  };
};

export const addCompanyDeductionSuccess = (response) => {
  return {
    type: ADD_COMPANY_DEDUCTION_SUCCESS,
    payload: response,
  };
};

export const addCompanyDeductionFailure = (error) => {
  return {
    type: ADD_COMPANY_DEDUCTION_FAILURE,
    payload: error,
  };
};


/**
 * get Tax Sections
 */

export const getTaxSections = (type) => {
  return {
    type: GET_TAX_SECTIONS,
    payload: type,
  };
};

export const getTaxSectionsSuccess = (response) => {
  return {
    type: GET_TAX_SECTIONS_SUCCESS,
    payload: response,
  };
};

export const getTaxSectionsFailure = (error) => {
  return {
    type: GET_TAX_SECTIONS_FAILURE,
    payload: error,
  };
};

/**
 * add Allowance Group
 */

export const addAllowanceGroup = (type) => {
  return {
    type: ADD_ALLOWANCE_GROUPS,
    payload: type,
  };
};

export const addAllowanceGroupSuccess = (response) => {
  return {
    type: ADD_ALLOWANCE_GROUPS_SUCCESS,
    payload: response,
  };
};

export const addAllowanceGroupFailure = (error) => {
  return {
    type: ADD_ALLOWANCE_GROUPS_FAILURE,
    payload: error,
  };
};


/**
 * get Allowance Groups
 */

export const getAllowanceGroups = (type) => {
  return {
    type: GET_ALLOWANCE_GROUPS,
    payload: type,
  };
};

export const getAllowanceGroupsSuccess = (response) => {
  return {
    type: GET_ALLOWANCE_GROUPS_SUCCESS,
    payload: response,
  };
};

export const getAllowanceGroupsFailure = (error) => {
  return {
    type: GET_ALLOWANCE_GROUPS_FAILURE,
    payload: error,
  };
};


/**
 * get Allowance Groups
 */

export const getAllowanceGroupsPaginated = (type) => {
  return {
    type: GET_ALLOWANCE_GROUPS_PAGINATED,
    payload: type,
  };
};

export const getAllowanceGroupsPaginatedSuccess = (response) => {
  return {
    type: GET_ALLOWANCE_GROUPS_PAGINATED_SUCCESS,
    payload: response,
  };
};

export const getAllowanceGroupsPaginatedFailure = (error) => {
  return {
    type: GET_ALLOWANCE_GROUPS_PAGINATED_FAILURE,
    payload: error,
  };
};

/**
 * get Allowance Group details
 */

export const getAllowanceGroupDetails = (type) => {
  return {
    type: GET_ALLOWANCE_GROUP_DETAILS,
    payload: type,
  };
};

export const getAllowanceGroupDetailsSuccess = (response) => {
  return {
    type: GET_ALLOWANCE_GROUP_DETAILS_SUCCESS,
    payload: response,
  };
};

export const getAllowanceGroupDetailsFailure = (error) => {
  return {
    type: GET_ALLOWANCE_GROUP_DETAILS_FAILURE,
    payload: error,
  };
};

/**
 * get company Allowance 
 */

export const getCompanyAllowance = (type) => {
  return {
    type: GET_COMPANY_ALLOWANCE,
    payload: type,
  };
};

export const getCompanyAllowanceSuccess = (response) => {
  return {
    type: GET_COMPANY_ALLOWANCE_SUCCESS,
    payload: response,
  };
};

export const getCompanyAllowanceFailure = (error) => {
  return {
    type: GET_COMPANY_ALLOWANCE_FAILURE,
    payload: error,
  };
};

/**
 * get company deductions 
 */

export const getCompanyDeductions = (type) => {
  return {
    type: GET_COMPANY_DEDUCTIONS,
    payload: type,
  };
};

export const getCompanyDeductionsSuccess = (response) => {
  return {
    type: GET_COMPANY_DEDUCTIONS_SUCCESS,
    payload: response,
  };
};

export const getCompanyDeductionsFailure = (error) => {
  return {
    type: GET_COMPANY_DEDUCTIONS_FAILURE,
    payload: error,
  };
};

/**
 * setting selected deduction details
 */

export const settingSelectedDeductionDetails = (type) => {
  console.log("typeeee--->", type);

  return {
    type: SETTING_SELECTED_DEDUCTION_DETAILS,
    payload: type,
  };
};

/**
 * setting selected group allowance details
 */
export const settingSelectedAllowanceGroupDetails = (type) => {
  console.log("typeeee", type);
  return {
    type: SETTING_SELECTED_ALLOWANCE_GROUP_DETAILS,
    payload: type,
  };
};


/**
 * get salary Allowance
 */

export const getSalaryAllowance = (type) => {
  return {
    type: GET_SALARY_ALLOWANCE,
    payload: type,
  };
};

export const getSalaryAllowanceSuccess = (response) => {
  return {
    type: GET_SALARY_ALLOWANCE_SUCCESS,
    payload: response,
  };
};

export const getSalaryAllowanceFailure = (error) => {
  return {
    type: GET_SALARY_ALLOWANCE_FAILURE,
    payload: error,
  };
};




/**
 * add Employee Salary definition
 */

export const addEmployeeSalaryDefinition = (type) => {
  return {
    type: ADD_EMPLOYEE_SALARY_DEFINITION,
    payload: type,
  };
};

export const addEmployeeSalaryDefinitionSuccess = (response) => {
  return {
    type: ADD_EMPLOYEE_SALARY_DEFINITION_SUCCESS,
    payload: response,
  };
};

export const addEmployeeSalaryDefinitionFailure = (error) => {
  return {
    type: ADD_EMPLOYEE_SALARY_DEFINITION_FAILURE,
    payload: error,
  };
};

/**
 * setting selected employee details
 */

export const settingSelectedEmployeeDetails = (type) => {
  return {
    type: SETTING_SELECTED_EMPLOYEE_DETAILS,
    payload: type,
  };
};

/**
 * get Employee Salary definition
 */

export const getEmployeeSalaryDefinition = (type) => {
  return {
    type: GET_EMPLOYEE_SALARY_DEFINITION,
    payload: type,
  };
};

export const getEmployeeSalaryDefinitionSuccess = (response) => {
  return {
    type: GET_EMPLOYEE_SALARY_DEFINITION_SUCCESS,
    payload: response,
  };
};

export const getEmployeeSalaryDefinitionFailure = (error) => {
  return {
    type: GET_EMPLOYEE_SALARY_DEFINITION_FAILURE,
    payload: error,
  };
};

/**
 * is edit Employee Salary definition
 */

export const isEditEmployeeSalaryDefinition = (type) => {
  console.log("type",type);
  return {
    type: IS_EDIT_SALARY_DEFINITION,
    payload: type,
  };
};