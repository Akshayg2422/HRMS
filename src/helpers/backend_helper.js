import { get, post } from "./api_helper";
import * as url from "./url_helper";
/***
 * Auth 
 */
export const postValidateUser = (payload) => post(url.VALIDATE_USER,payload,{})
export const postRegisterCompany = (payload) => post(url.VALIDATE_COMPANY_DETAILS,payload,{})
export const postRegisterAdmin = (payload) => post(url.REGISTER_ADMIN,payload,{})
export const postUploadCompanyDocument = (payload) => post(url.UPLOAD_COMPANY_DOCUMENT,payload,{})
export const postOtpLogin = (payload) => post(url.OTP_LOGIN,payload,{})
export const postResendLoginOtp = (payload) => post(url.RESEND_LOGIN_OTP,payload,{})
export const fetchNatureOfBusiness = (payload) => post(url.FETCH_NATURE_OF_BUSINESS,payload,{})
export const fetchTypeOfBusiness = (payload) => post(url.FETCH_TYPE_OF_BUSINESS,payload,{})
/***
 * Dashboard 
 */
 export const fetchDashboard = (payload) => post(url.FETCH_DASHBOARD,payload,{})
 export const fetchCheckInDetailedLogPerDay = (payload) => post(url.GET_CHECK_IN_DETAILED_LOG,payload,{})
 export const postCheckInUser = (payload) => post(url.URL_CHECK_IN,payload,{})
 export const postDailyLog = (payload) => post(url.POST_DAILY_LOG,payload,{})
 export const deleteAccountUser = (payload) => post(url.URL_DELETE_USER,payload,{})
 export const postEditProfilePicture = (payload) => post(url.EDIT_PROFILE_PICTURE,payload,{})
 export const fetchEmployeeList = (payload) => post(url.GET_EMPLOYEES_LIST,payload,{})
 export const fetchDesignationData = (payload) => post(url.FETCH_DESIGNATION,payload,{})
 export const fetchDepartmentData = (payload) => post(url.FETCH_DEPARTMENT,payload,{})
 export const fetchAllBranchesList = (payload) => post(url.FETCH_ALL_BRANCHES_LIST,payload,{})
 export const fetchEmployeeDetails = (payload) => post(url.FETCH_EMPLOYEE_DETAILS,payload,{})
 export const postEmployeeAddition = (payload) => post(url.POST_EMPLOYEE_ADDITION_V1,payload,{})
 export const postBranchAddition = (payload) => post(url.POST_BRANCH_ADDITION,payload,{})
 export const fetchEmployeeTimeSheets = (payload) => post(url.GET_EMPLOYEE_TIME_SHEETS,payload,{})
 export const fetchEmployeeCheckInLogs = (payload) => post(url.GET_EMPLOYEE_CHECK_IN_LOGS,payload,{})
 export const fetchEmployeeEachUserTimeSheets = (payload) => post(url.GET_EMPLOYEE_EACH_USER_TIME_SHEETS,payload,{})
 export const updateBranchLocationRadius = (payload) => post(url.UPDATE_BRANCH_LOCATION_RADIUS,payload,{})
 export const postEnableBranchRefence = (payload) => post(url.ENABLE_BRANCH_REFENCE,payload,{})
 export const fetchEmployeeCheckinAssociations = (payload) => post(url.GET_EMPLOYEE_CHECK_IN_ASSOCIATIONS,payload,{})
 export const postEmployeeCheckinAssociations = (payload) => post(url.UPDATE_EMPLOYEE_CHECK_IN_ASSOCIATIONS,payload,{})
 export const postAddDesignation = (payload) => post(url.POST_ADD_DESIGNATION,payload,{})
 export const postAddDepartment = (payload) => post(url.POST_ADD_DEPARTMENT,payload,{})
 export const postAddFenceAdmin = (payload) => post(url.POST_ADD_FENCH_ADMIN,payload,{})
 export const fetchEmployeeAttendanceStats = (payload) => post(url.FETCH_EMPLOYEE_ATTENDANCE,payload,{})
 export const fetchEmployeeTodayStatus = (payload) => post(url.FETCH_EMPLOYEE_TODAY_STATUS,payload,{})
 export const fetchCheckInDetailedLog = (payload) => post(url.FETCH_CHECK_IN_DETAILED_LOG,payload,{})
 export const fetchAttendanceConsolidatedCards = (payload) => post(url.FETCH_ATTENDANCE_CONSOLIDATED_CARDS,payload,{})
 export const postUpdateEmployeeStatus = (payload) => post(url.UPDATE_EMPLOYEE_STATUS,payload,{})




