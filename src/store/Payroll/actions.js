import { ADD_ALLOWANCE_GROUPS, ADD_ALLOWANCE_GROUPS_FAILURE, ADD_ALLOWANCE_GROUPS_SUCCESS, ADD_EMPLOYEE_SALARY, ADD_EMPLOYEE_SALARY_FAILURE, ADD_EMPLOYEE_SALARY_SUCCESS, ADD_SALARY_ALLOWANCE, ADD_SALARY_ALLOWANCE_FAILURE, ADD_SALARY_ALLOWANCE_SUCCESS, CREATE_GROUP, GET_ALLOWANCE_GROUPS, GET_ALLOWANCE_GROUPS_FAILURE, GET_ALLOWANCE_GROUPS_SUCCESS, GET_EMPLOYEE_SALARY, GET_EMPLOYEE_SALARY_FAILURE, GET_EMPLOYEE_SALARY_SUCCESS, GET_SALARY_ALLOWANCE, GET_SALARY_ALLOWANCE_FAILURE, GET_SALARY_ALLOWANCE_SUCCESS, GET_TAX_SECTIONS, GET_TAX_SECTIONS_FAILURE, GET_TAX_SECTIONS_SUCCESS, RESET_REDUCER } from './actionTypes'

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
* Add salary Allowance
*/
export const addSalaryAllowance = (type) => {
  return {
    type: ADD_SALARY_ALLOWANCE,
    payload: type,
  };
};

export const addSalaryAllowanceSuccess = (response) => {
  return {
    type: ADD_SALARY_ALLOWANCE_SUCCESS,
    payload: response,
  };
};

export const addSalaryAllowanceFailure = (error) => {
  return {
    type: ADD_SALARY_ALLOWANCE_FAILURE,
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
 * add Employee Salary
 */

export const addEmployeeSalary = (type) => {
  return {
    type: ADD_EMPLOYEE_SALARY,
    payload: type,
  };
};

export const addEmployeeSalarySuccess = (response) => {
  return {
    type: ADD_EMPLOYEE_SALARY_SUCCESS,
    payload: response,
  };
};

export const addEmployeeSalaryFailure = (error) => {
  return {
    type: ADD_EMPLOYEE_SALARY_FAILURE,
    payload: error,
  };
};

/**
 * get Employee Salary
 */

export const getEmployeeSalary = (type) => {
  return {
    type: GET_EMPLOYEE_SALARY,
    payload: type,
  };
};

export const getEmployeeSalarySuccess = (response) => {
  return {
    type: GET_EMPLOYEE_SALARY_SUCCESS,
    payload: response,
  };
};

export const getEmployeeSalaryFailure = (error) => {
  return {
    type: GET_EMPLOYEE_SALARY_FAILURE,
    payload: error,
  };
};