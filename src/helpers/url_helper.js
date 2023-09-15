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
export const FETCH_DASHBOARD = '/authentication/v1/dashboard';
export const GET_CHECK_IN_DETAILED_LOG =
    '/attendance/getCheckinDetailedLogsPerDay';
export const URL_CHECK_IN = '/attendance/checkin';
export const POST_DAILY_LOG = '/attendance/addTimeSheet';
export const URL_DELETE_USER = '/authentication/deleteUser';
export const EDIT_PROFILE_PICTURE = 'employee/updateEmployeeProfilePhoto';

export const GET_EMPLOYEES_LIST = '/employee/web/v1/getEmployees';
export const FETCH_DESIGNATION = '/employee/getDesignations';
export const FETCH_DEPARTMENT = '/company/getDepartments';
// export const FETCH_ALL_BRANCHES_LIST = '/company/getAllBranches';
export const FETCH_ALL_BRANCHES_LIST = '/company/v1/getAllBranches';

export const FETCH_LIST_ALL_BRANCHES_LIST = '/company/getAllBranchesL';

export const FETCH_EMPLOYEE_DETAILS = '/employee/getEmployeeDetails';
export const FETCH_EMPLOYEE_BASIC_INFO = '/employee/getEmployeeBasicInfo';
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
export const FETCH_EMPLOYEE_ATTENDANCE = '/attendance/attendanceDashboard';
export const FETCH_EMPLOYEE_TODAY_STATUS = "/attendance/v1/todaysStats"
export const FETCH_CHECK_IN_DETAILED_LOG = "/attendance/getCheckinDetailedLogsPerDay";

export const FETCH_ATTENDANCE_CONSOLIDATED_CARDS =
    '/attendance/attendanceConsolidatedCards';

export const UPDATE_EMPLOYEE_STATUS = 'employee/updateEmployeeStatus';
export const FETCH_LEAVE_TYPES = '/attendance/getLeaveTypes';


export const POST_APPLY_LEAVE = '/attendance/v1/applyLeave';

export const FETCH_CALENDAR_DETAILS = "/attendance/getCalenderDetails"


//Modify api for modify log for employee
export const EMPLOYEE_MODIFY_REQUEST = 'attendance/v1/modifyLogEmployee'

//api for modify admin

export const ADMIN_MODIFY_LOG = 'attendance/v1/modifyLogAdmin'

export const POST_EMPLOYEE_MODIFY_LOG_STATUS = '/attendance/v1/changeModifyLogStatus';


export const POST_CHANGE_EMPLOYEE_LEAVE_STATUS = '/attendance/v1/changeEmployeeLeaveStatus';


export const FETCH_EMPLOYEES_LEAVES = '/attendance/v1/getEmployeesLeaves'

export const FETCH_MODIFY_EMPLOYEES_LEAVES = '/attendance/v1/getModifyLogs'


export const FETCH_MY_LEAVES = "/attendance/v1/getEmployeeLeaves"

export const POST_EMPLOYEES_HOLIDAYS = '/attendance/addHoliday'

export const POST_DELETE_HOLIDAYS = '/attendance/deleteHoliday'

export const FETCH_EMPLOYEE_DOCUMENT = '/employee/getEmployeeDocuments'

export const ATTACH_USER_DOCUMENT = '/employee/attachUserDocument';

export const FETCH_MIS_REPORT = 'reports/baseAttendanceReport'

export const POST_ADD_WEEKLY_SHIFT = 'attendance/addWeeklyShift'

export const FETCH_BRANCH_SHIFTS = 'attendance/getBranchShifts'

export const FETCH_BRANCH_WEEKLY_SHIFTS = 'attendance/getBranchWeeklyShifts'


export const POST_ADD_SHIFTS = 'attendance/addShift'

export const FETCH_WEEKLY_SHIFT_DETAILS = 'attendance/getWeeklyShiftDetails'

export const FETCH_SHIFT_EMPLOYEES = 'attendance/getShiftEmployees'

export const FETCH_MY_SHIFTS_DETAILS = 'attendance/getEmployeeShiftDetails'

export const FETCH_EMPLOYEE_WITH_SHIFTS = 'employee/v1/getEmployeesWithShift'

export const POST_EMPLOYEE_SHIFT_CHANGE = 'attendance/setEmployeeShift'


/**
 * Admin My Branches
 */

export const GET_BRANCH_ADMIN_BRANCHES = 'employee/getBranchAdminBranches'

export const UPDATING_THE_ADMIN_BRANCHES = 'employee/updateBranchAdminBranches'

export const GET_ADMIN_BRANCHES = 'employee/getBranchAdmins'

/**
 * edit branch name
 */

export const POST_EDIT_BRANCH_NAME = 'company/updateBranch'


export const FETCH_SHIFT_REQUESTED_EMPLOYEES = 'attendance/getEmployeesShiftCr'


export const FETCH_SHIFT_REQUESTED_STATUS = 'attendance/getEmployeeShiftCr'


export const POST_REQUEST_SHIFT_CHANGE = 'attendance/requestShiftChange'

export const POST_CHANGE_EMPLOYEE_SHIFT = 'attendance/changeEmployeeShift'

/**
 * getEmployeesLoginFaceFailure
 */

export const GET_EMPLOYEE_LOGIN_FACE_FAILURE = 'attendance/getEmployeesLoginFaceFailure'


/**
 * changeEmployeeFacevalidationRequest
 */

export const CHANGE_EMPLOYEE_FACE_VALIDATION = 'attendance/changeEmployeeFacevalidationRequest'


/**
 * App Config
 */


export const POST_APP_CONFIG_DETAILS = 'authentication/v1/webAppConfig'

/**
 * Update Leaves Type
 */

export const UPDATE_LEAVE_TYPE = 'attendance/updateLeaveTypes'

//Create broadcast message
export const CREATE_BROADCAST_MESSAGE = 'messages/createBroadcastMessage'

//get Broadcast message
export const FETCH_BROADCAST_MESSAGE = 'messages/getBroadcastMessages'

//get Employee Checking logs Report
export const GET_EMPLOYEE_CHECK_IN_LOGS_REPORT = 'attendance/getEmployeeCheckInLogs'

//Face Re-Register Request

export const FACE_RE_REGISTER_REQUEST = 'employee/web/v1/getEmployeesFaceRegisterRequestsWithFace'

// Face Re-Register Change Status

export const FACE_RE_REGISTER_REQUEST_CHANGE_STATUS = 'employee/web/v1/changeStatusEmployeesFaceRegisterRequestsWithFace'

//set ESSL config

export const SET_ESSL_CONFIG_URL = 'company/setESSLConfig'

//get ESSL config

export const GET_ESSL_CONFIG_URL = 'company/getESSLConfig'

//add ESSL device

export const ADD_ESSL_DEVICE = 'company/addESSLDevice'

//get ESSL device

export const GET_ESSL_DEVICES = 'company/getESSLDevices'

//sync essl device users

export const SYNC_ESSL_DEVICE_USERS = 'company/syncESSLDeviceUsers'

//get notifications

export const GET_NOTIFICATIONS = "messages/getNotifications"

//web push 

export const WEB_PUSH_REGISTER_URL = "/api/v1/push/web/"
//face Re-register Employee Request 

export const FACE_RE_REGISTER_EMPLOYEE_REQUEST = 'employee/v1/getEmployeesFaceRegisterRequests'

//employee enable Face ReRegister

export const EMPLOYEE_ENABLE_FACE_RE_REGISTER = 'employee/enableFaceReRegister'

//enableFieldCheckIn

export const POST_ENABLE_FIELD_CHECK_IN = '/attendance/enableFieldCheckIn'

//enableOfficeCheckIn

export const POST_ENABLE_OFFICE_CHECK_IN = '/attendance/enableOfficeCheckIn';

//changeAttendanceSettings

export const FACE_VALIDATION_STATUS = '/attendance/changeAttendanceSettings';

/**
 * payroll
 */

//create company allowance

export const ADD_COMPANY_ALLOWANCE_URL = 'payroll/addCompanyAllowance'

//Create company deduction

export const ADD_COMPANY_DEDUCTION_URL = 'payroll/addCompanyDeduction'

//Add allowance group

export const ADD_ALLOWANCE_GROUP_URL = 'payroll/addAllowanceGroup'

//Get allowance group

export const FETCH_ALLOWANCE_GROUP_URL = 'payroll/getAllowanceGroups'

//Get allowance group details

export const FETCH_ALLOWANCE_GROUP_DETAILS_URL = 'payroll/getAllowanceGroupDetails'

//Get company allowance

export const FETCH_COMPANY_ALLOWANCE_URL = 'payroll/getCompanyAllowance'

//get company deduction

export const GET_COMPANY_DEDUCTIONS_URL = 'payroll/getCompanyDeductions'

//add employee salary definition

export const ADD_EMPLOYEE_SALARY_DEFINITION_URL = 'payroll/addEmployeeSalaryDefinition'

//get employee salary definition

export const GET_EMPLOYEE_SALARY_DEFINITION_URL = 'payroll/getEmployeeSalaryDefinition'

//get employee attendance info

export const GET_EMPLOYEE_ATTENDANCE_INFO_URL = 'employee/getEmployeeAttendanceInfo'

// get earnings

export const GET_EMPLOYEES_EARNINGS = '/attendance/getEmployeeConsolidatedAttendance'

// getCompanyBaseWeeklyCalendar

export const GET_BASE_WEEK_CALENDAR = '/attendance/getCompanyBaseWeeklyCalendar'

// getCompanyBaseWeeklyCalendar

export const SET_BASE_WEEK_CALENDAR = '/attendance/setCompanyBaseWeeklyCalendar'

// branchWiseEmployeesLeaves

export const GET_BRANCH_WISE_EMPLOYEE_LEAVES = '/attendance/v1/branchWiseEmployeesLeaves'

// getEmployeeLeaveTypes

export const GET_EMPLOYEE_LEAVE_TYPES = '/attendance/getEmployeeLeaveTypes'

// updateEmployeeAllocatedDays

export const UPDATE_EMPLOYEE_ALLOCATED_DAYS = '/attendance/updateEmployeeLeaveTypeAllocatedDays'

// addCompanyIncentive

export const ADD_COMPANY_INCENTIVE = '/payroll/addCompanyIncentive'

// getCompanyIncentives

export const GET_COMPANY_INCENTIVE = '/payroll/getCompanyIncentives'


// getHfwsStartEndTime

export const GET_HFWS_BRANCH_SHIFT_TIME = '/attendance/getHfwsStartEndTime'

// syncData

export const GET_SYNC_DATA = '/authentication/v1/syncData'


// updateCompanyGenericShift

export const UPDATE_COMPANY_GENERIC_SHIFT_URL = '/authentication/updateCompanyGenericShift'

// Add Devices

export const ADD_ESSL_DEVICE_URL = '/company/addDevice'

// get Devices

export const GET_ESSL_DEVICE_URL = '/company/getDevices'

// remove Devices

export const REMOVE_ESSL_DEVICE_URL = '/company/removeDevice'

// updateEmployeesDeviceDetail

export const UPDATE_EMPLOYEE_DEVICE_DETAILS_URL = '/employee/updateEmployeesDeviceDetail'

// getEmployeesDeviceDetail

export const GET_EMPLOYEE_DEVICE_DETAILS_URL = '/employee/getEmployeesDeviceDetail'

// delete Branch

export const DELETE_BRANCH_URL = '/company/deleteBranch'

//get vender
export const GET_VENDER_URL = '/company/getVendors'
export const ADD_VENDER_URL = '/company/addVendors'

