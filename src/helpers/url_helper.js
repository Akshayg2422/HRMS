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
export const FETCH_EMPLOYEE_ATTENDANCE = '/attendance/attendanceDashboard';
export const FETCH_EMPLOYEE_TODAY_STATUS = "/attendance/v1/todaysStats"
export const FETCH_CHECK_IN_DETAILED_LOG = "/attendance/getCheckinDetailedLogsPerDay";

export const FETCH_ATTENDANCE_CONSOLIDATED_CARDS =
    '/attendance/attendanceConsolidatedCards';

export const UPDATE_EMPLOYEE_STATUS = 'employee/updateEmployeeStatus';
export const FETCH_LEAVE_TYPES = '/attendance/getLeaveTypes';


export const POST_APPLY_LEAVE = '/attendance/applyLeave';
export const FETCH_CALENDAR_DETAILS = "/attendance/getCalenderDetails"



export const POST_CHANGE_EMPLOYEE_LEAVE_STATUS = '/attendance/changeEmployeeLeaveStatus';

export const FETCH_EMPLOYEES_LEAVES = '/attendance/getEmployeesLeaves'

export const FETCH_MODIFY_EMPLOYEES_LEAVES = '/attendance/getEmployeesLeaves'


export const FETCH_MY_LEAVES = "/attendance/getEmployeeLeaves"

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

