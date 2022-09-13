/***
 * Auth endpoints
 */
export const VALIDATE_USER = "/authentication/web/validateUser";
export const VALIDATE_COMPANY_DETAILS = "/authentication/registerCompany";
export const OTP_LOGIN = '/authentication/v1/otpLogin';
export const RESEND_LOGIN_OTP = '/authentication/resendRegistationOtp';
export const REGISTER_ADMIN = '/authentication/registerAdmin';
export const FETCH_NATURE_OF_BUSINESS = '/company/getNatureOfBusiness';
export const FETCH_TYPE_OF_BUSINESS = '/company/getTypeOfBusiness';
export const UPLOAD_COMPANY_DOCUMENT = '/company/addCompanyAttachments';
/***
 * Dashboard endpoints
 */
 export const FETCH_DASHBOARD = '/authentication/dashboard';
 export const GET_CHECK_IN_DETAILED_LOG =
  '/attendance/getCheckinDetailedLogsPerDay';
  export const URL_CHECK_IN = '/attendance/checkin';
  export const POST_DAILY_LOG = '/attendance/addTimeSheet';
  export const URL_DELETE_USER = '/authentication/deleteUser';
  export const EDIT_PROFILE_PICTURE = 'employee/updateEmployeeProfilePhoto';

  export const GET_EMPLOYEES_LIST = '/employee/web/v1/getEmployees';
  export const FETCH_DESIGNATION = '/employee/getDesignations';
  export const FETCH_DEPARTMENT = '/company/getDepartments';
  export const FETCH_ALL_BRANCHES_LIST = '/company/getAllBranches';
  export const FETCH_EMPLOYEE_DETAILS = '/employee/getEmployeeDetails';
  export const POST_EMPLOYEE_ADDITION_V1 = '/employee/v1/addEmployee';
  export const POST_BRANCH_ADDITION = '/company/addBranch';

  export const GET_EMPLOYEE_TIME_SHEETS = '/employee/v1/getEmployeesTimeSheets';
  export const GET_EMPLOYEE_CHECK_IN_LOGS = '/attendance/getCheckInLogs';
  export const GET_EMPLOYEE_EACH_USER_TIME_SHEETS = '/attendance/getTimeSheets';

  export const UPDATE_BRANCH_LOCATION_RADIUS = '/company/updateBranchLocation';
  export const ENABLE_BRANCH_REFENCE = 'company/enableBranchFence';
  export const UPDATE_EMPLOYEE_CHECK_IN_ASSOCIATIONS =
  '/employee/updateEmployeeCheckinAssociations';
  export const GET_EMPLOYEE_CHECK_IN_ASSOCIATIONS =
  '/employee/getEmployeeCheckinAssociations';
  export const POST_ADD_DESIGNATION = '/employee/addDesignation';
  export const POST_ADD_DEPARTMENT = '/company/addDepartment';
  export const POST_ADD_FENCH_ADMIN = '/company/addFenchAdmin';



