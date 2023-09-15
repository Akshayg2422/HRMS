import { get, post, postHeader } from "./api_helper";
import { BASE_URL_AUTH_PROD, BASE_URL_REPORTS_PROD, BASE_URL_VALIDATE_USER_PROD, BASE_URL_ONBOARD_PROD } from "./api_helper";
import * as url from "./url_helper";
/***
 * Auth 
 */
export const postValidateUser = (payload) => post(url.VALIDATE_USER, payload, {}, BASE_URL_VALIDATE_USER_PROD)
export const postRegisterCompany = (payload) => post(url.VALIDATE_COMPANY_DETAILS, payload, {}, BASE_URL_ONBOARD_PROD)
export const postRegisterAdmin = (payload) => post(url.REGISTER_ADMIN, payload, {}, BASE_URL_VALIDATE_USER_PROD)
export const postUploadCompanyDocument = (payload) => post(url.UPLOAD_COMPANY_DOCUMENT, payload, {}, BASE_URL_ONBOARD_PROD)
export const postOtpLogin = (payload) => post(url.OTP_LOGIN, payload, {}, BASE_URL_AUTH_PROD)
export const postResendLoginOtp = (payload) => post(url.RESEND_LOGIN_OTP, payload, {}, BASE_URL_VALIDATE_USER_PROD)
export const fetchNatureOfBusiness = (payload) => post(url.FETCH_NATURE_OF_BUSINESS, payload, {})
export const fetchTypeOfBusiness = (payload) => post(url.FETCH_TYPE_OF_BUSINESS, payload, {})
/***
 * Dashboard 
 */
export const fetchDashboard = (payload) => post(url.FETCH_DASHBOARD, payload, {})
export const fetchCheckInDetailedLogPerDay = (payload) => post(url.GET_CHECK_IN_DETAILED_LOG, payload, {})
export const postCheckInUser = (payload) => post(url.URL_CHECK_IN, payload, {})
export const postDailyLog = (payload) => post(url.POST_DAILY_LOG, payload, {})
export const deleteAccountUser = (payload) => post(url.URL_DELETE_USER, payload, {})
export const postEditProfilePicture = (payload) => post(url.EDIT_PROFILE_PICTURE, payload, {})
export const fetchEmployeeList = (payload) => post(url.GET_EMPLOYEES_LIST, payload, {})
export const fetchDesignationData = (payload) => post(url.FETCH_DESIGNATION, payload, {})
export const fetchDepartmentData = (payload) => post(url.FETCH_DEPARTMENT, payload, {})
export const fetchAllBranchesList = (payload) => post(url.FETCH_ALL_BRANCHES_LIST, payload, {})
export const fetchListAllBranchesList = (payload) => post(url.FETCH_LIST_ALL_BRANCHES_LIST, payload, {})

export const fetchEmployeeDetails = (payload) => post(url.FETCH_EMPLOYEE_DETAILS, payload, {})
export const postEmployeeAddition = (payload) => post(url.POST_EMPLOYEE_ADDITION_V1, payload, {})


export const postBranchAddition = (payload) => post(url.POST_BRANCH_ADDITION, payload, {}, BASE_URL_REPORTS_PROD)




export const fetchEmployeeTimeSheets = (payload) => post(url.GET_EMPLOYEE_TIME_SHEETS, payload, {})
export const fetchEmployeeCheckInLogs = (payload) => post(url.GET_EMPLOYEE_CHECK_IN_LOGS, payload, {})
export const fetchEmployeeEachUserTimeSheets = (payload) => post(url.GET_EMPLOYEE_EACH_USER_TIME_SHEETS, payload, {})
export const updateBranchLocationRadius = (payload) => post(url.UPDATE_BRANCH_LOCATION_RADIUS, payload, {})
export const postEnableBranchRefence = (payload) => post(url.ENABLE_BRANCH_REFENCE, payload, {})
export const fetchEmployeeCheckinAssociations = (payload) => post(url.GET_EMPLOYEE_CHECK_IN_ASSOCIATIONS, payload, {})
export const postEmployeeCheckinAssociations = (payload) => post(url.UPDATE_EMPLOYEE_CHECK_IN_ASSOCIATIONS, payload, {})
export const postAddDesignation = (payload) => post(url.POST_ADD_DESIGNATION, payload, {})
export const postAddDepartment = (payload) => post(url.POST_ADD_DEPARTMENT, payload, {})
export const postAddFenceAdmin = (payload) => post(url.POST_ADD_FENCH_ADMIN, payload, {})
export const fetchEmployeeAttendanceStats = (payload) => post(url.FETCH_EMPLOYEE_ATTENDANCE, payload, {})

export const fetchEmployeeTodayStatus = (payload) => post(url.FETCH_EMPLOYEE_TODAY_STATUS, payload, {})

export const fetchDownloadTodayStatus = (payload) => postHeader(url.FETCH_EMPLOYEE_TODAY_STATUS, payload, {}, BASE_URL_REPORTS_PROD)


export const fetchCheckInDetailedLog = (payload) => post(url.FETCH_CHECK_IN_DETAILED_LOG, payload, {})
export const fetchAttendanceConsolidatedCards = (payload) => post(url.FETCH_ATTENDANCE_CONSOLIDATED_CARDS, payload, {})
export const postUpdateEmployeeStatus = (payload) => post(url.UPDATE_EMPLOYEE_STATUS, payload, {})
export const fetchLeaveTypes = (payload) => post(url.FETCH_LEAVE_TYPES, payload, {})
export const postApplyLeave = (payload) => post(url.POST_APPLY_LEAVE, payload, {})
export const fetchCalendarDetails = (payload) => post(url.FETCH_CALENDAR_DETAILS, payload, {})

// Modify api for modify log for employee

export const employeeModifyRequestApi = (payload) => post(url.EMPLOYEE_MODIFY_REQUEST, payload, {})

// api for modify admin

export const adminModifyLogApi = (payload) => post(url.ADMIN_MODIFY_LOG, payload, {})



export const postChangeEmployeeLeaveStatus = (payload) => post(url.POST_CHANGE_EMPLOYEE_LEAVE_STATUS, payload, {})

export const postChangeEmployeeModifyLogStatus = (payload) => post(url.POST_EMPLOYEE_MODIFY_LOG_STATUS, payload, {})



export const postAddHolidays = (payload) => post(url.POST_EMPLOYEES_HOLIDAYS, payload, {})
export const postDeleteHolidays = (payload) => post(url.POST_DELETE_HOLIDAYS, payload, {})



export const fetchMyleaves = (payload) => post(url.FETCH_MY_LEAVES, payload, {})

export const fetchEmployeesleaves = (payload) => post(url.FETCH_EMPLOYEES_LEAVES, payload, {})

export const fetchModifyEmployeesLeaves = (payload) => post(url.FETCH_MODIFY_EMPLOYEES_LEAVES, payload, {})

//*// E-Locker

export const fetchEmployeeDocuments = (payload) => post(url.FETCH_EMPLOYEE_DOCUMENT, payload, {})

export const attachUserDocuments = (payload) => post(url.ATTACH_USER_DOCUMENT, payload, {})




export const fetchMisReportsLog = (payload) => post(url.FETCH_MIS_REPORT, payload, {})

export const fetchDownloadMisReportsLog = (payload) => postHeader(url.FETCH_MIS_REPORT, payload, {}, BASE_URL_REPORTS_PROD)


export const postAddWeeklyShift = (payload) => post(url.POST_ADD_WEEKLY_SHIFT, payload, {})

export const fetchBranchShifts = (payload) => post(url.FETCH_BRANCH_SHIFTS, payload, {})

export const fetchBranchWeeklyShifts = (payload) => post(url.FETCH_BRANCH_WEEKLY_SHIFTS, payload, {})

export const postAddShiftApi = (payload) => post(url.POST_ADD_SHIFTS, payload, {})

export const fetchWeeklyShiftDetailsApi = (payload) => post(url.FETCH_WEEKLY_SHIFT_DETAILS, payload, {})

export const fetchShiftEmployeesApi = (payload) => post(url.FETCH_SHIFT_EMPLOYEES, payload, {})

export const fetchMyShiftsApi = (payload) => post(url.FETCH_MY_SHIFTS_DETAILS, payload, {})

export const fetchEmployeeWithShiftsApi = (payload) => post(url.FETCH_EMPLOYEE_WITH_SHIFTS, payload, {})

export const PostEmployeeWithChangeShiftApi = (payload) => post(url.POST_EMPLOYEE_SHIFT_CHANGE, payload, {})



/**
 * Admin My Branches
 */

export const fetchAdminBranches = (payload) => post(url.GET_BRANCH_ADMIN_BRANCHES, payload, {})

export const PostUpdatedAdminBranches = (payload) => post(url.UPDATING_THE_ADMIN_BRANCHES, payload, {})

export const getBranchAdminsApi = (payload) => post(url.GET_ADMIN_BRANCHES, payload, {})

/**
 * 
 * EDIT BRANCH NAME 
 */

export const PostEditBranchNameApi = (payload) => post(url.POST_EDIT_BRANCH_NAME, payload, {}, BASE_URL_REPORTS_PROD)

/**
 * employees Shift request
 */
export const getShiftRequestedEmployeesApi = (payload) => post(url.FETCH_SHIFT_REQUESTED_EMPLOYEES, payload, {})

/**
 * SHIFT_REQUESTED_STATUS
 */

export const getShiftRequestedStatusApi = (payload) => post(url.FETCH_SHIFT_REQUESTED_STATUS, payload, {})

/**
 * POST_REQUEST_SHIFT_CHANGE
 */

export const postRequestShiftChangeApi = (payload) => post(url.POST_REQUEST_SHIFT_CHANGE, payload, {})


/**
 * change Employee Shift
 */

export const postChangeEmployeeShiftApi = (payload) => post(url.POST_CHANGE_EMPLOYEE_SHIFT, payload, {})


/**
 * 
 */

export const postGetEmployeesLoginFaceFailureApi = (payload) => post(url.GET_EMPLOYEE_LOGIN_FACE_FAILURE, payload, {})


/**
 * changeEmployeeFaceValidationRequest
 */

export const postChangeEmployeeFaceValidationRequestApi = (payload) => post(url.CHANGE_EMPLOYEE_FACE_VALIDATION, payload, {})

/**
 * App Config
 */

export const postAppConfigDetailsApi = (payload) => post(url.POST_APP_CONFIG_DETAILS, payload, {})

/**
 * Update Leave Status
 */

export const updateLeaveTypeApi = (payload) => post(url.UPDATE_LEAVE_TYPE, payload, {})

/**
 * create Broadcast notification
 */
export const createBroadcastMessageApi = (payload) => post(url.CREATE_BROADCAST_MESSAGE, payload, {})

//get broadcast message

export const fetchBroadcastMessageApi = (payload) => post(url.FETCH_BROADCAST_MESSAGE, payload, {})


//get Employee Checking logs Report

export const getDownloadEmployeeCheckingLogReportApi = (payload) => postHeader(url.GET_EMPLOYEE_CHECK_IN_LOGS_REPORT, payload, {}, BASE_URL_REPORTS_PROD)

//Face Re-Register Request

export const faceReRegisterRequestApi = (payload) => post(url.FACE_RE_REGISTER_REQUEST, payload, {})

// Face Re-Register Change Status
export const faceReRegisterRequestChangeStatusApi = (payload) => post(url.FACE_RE_REGISTER_REQUEST_CHANGE_STATUS, payload, {})

//set ESSL config

export const setEsslConfigApi = (payload) => post(url.SET_ESSL_CONFIG_URL, payload, {})

//get ESSL config

export const getEsslConfigApi = (payload) => post(url.GET_ESSL_CONFIG_URL, payload, {})

//add ESSL device

export const addEsslDeviceApi = (payload) => post(url.ADD_ESSL_DEVICE, payload, {})

//get ESSL devices

// export const getEsslDevicesApi = (payload) => post(url.GET_ESSL_DEVICES, payload, {})

//sync essl device users

export const syncEsslDeviceUsersApi = (payload) => post(url.SYNC_ESSL_DEVICE_USERS, payload, {})

//get notifications

export const getNotificationsApi = (payload) => post(url.GET_NOTIFICATIONS, payload, {})

//web push

export const webPushRegisterApi = (payload) => post(url.WEB_PUSH_REGISTER_URL, payload, {})


//face Re-register Employee Request 

export const getEmployeeReRegisterRequestApi = (payload) => post(url.FACE_RE_REGISTER_EMPLOYEE_REQUEST, payload, {})

//employee enable Face ReRegister


export const employeeEnableFaceReRegisterApi = (payload) => post(url.EMPLOYEE_ENABLE_FACE_RE_REGISTER, payload, {})


//enableFieldCheckIn

export const enableFieldCheckInApi = (payload) => post(url.POST_ENABLE_FIELD_CHECK_IN, payload, {})

// enableOfficeCheckIn

export const enableOfficeCheckInApi = (payload) => post(url.POST_ENABLE_OFFICE_CHECK_IN, payload, {})

//changeAttendanceSettings  

export const changeAttendanceSettingsApi = (payload) => post(url.FACE_VALIDATION_STATUS, payload, {})

/**
 * Payroll
 */

//Add company allowance

export const addCompanyAllowanceApi = (payload) => post(url.ADD_COMPANY_ALLOWANCE_URL, payload, {})

//Add company deduction

export const addCompanyDeductionApi = (payload) => post(url.ADD_COMPANY_DEDUCTION_URL, payload, {})

//Add allowance group

export const addAllowanceGroupApi = (payload) => post(url.ADD_ALLOWANCE_GROUP_URL, payload, {})

//Get allowance group

export const fetchAllowanceGroupsApi = (payload) => post(url.FETCH_ALLOWANCE_GROUP_URL, payload, {})

//Get allowance group details

export const fetchAllowanceGroupDetailsApi = (payload) => post(url.FETCH_ALLOWANCE_GROUP_DETAILS_URL, payload, {})

//Get company allowance

export const fetchCompanyAllowanceApi = (payload) => post(url.FETCH_COMPANY_ALLOWANCE_URL, payload, {})

//Get company deductions

export const fetchCompanyDeductionsApi = (payload) => post(url.GET_COMPANY_DEDUCTIONS_URL, payload, {})

//add employee salary definition

export const addEmployeeSalaryDefinitionApi = (payload) => post(url.ADD_EMPLOYEE_SALARY_DEFINITION_URL, payload, {})

//get employee salary definition

export const getEmployeeSalaryDefinitionApi = (payload) => post(url.GET_EMPLOYEE_SALARY_DEFINITION_URL, payload, {})

//get employee basic info

export const fetchEmployeeBasicInfoApi = (payload) => post(url.FETCH_EMPLOYEE_BASIC_INFO, payload, {})

//get employee attendance info

export const fetchEmployeeAttendanceInfoApi = (payload) => post(url.GET_EMPLOYEE_ATTENDANCE_INFO_URL, payload, {})

//get Employee Earning

export const fetchEmployeeEarningsApi = (payload) => post(url.GET_EMPLOYEES_EARNINGS, payload, {})

// GetCompanyBaseWeeklyCalendar

export const fetchCompanyBaseWeeklyCalendarApi = (payload) => post(url.GET_BASE_WEEK_CALENDAR, payload, {})

// setCompanyBaseWeeklyCalendar

export const postCompanyBaseWeeklyCalendarApi = (payload) => post(url.SET_BASE_WEEK_CALENDAR, payload, {})

// branchWiseEmployeesLeaves


export const postBranchWiseEmployeesLeavesApi = (payload) => post(url.GET_BRANCH_WISE_EMPLOYEE_LEAVES, payload, {})


// getEmployeeLeaveTypes

export const getEmployeeLeaveTypesApi = (payload) => post(url.GET_EMPLOYEE_LEAVE_TYPES, payload, {})

// updateEmployeeAllocatedDays

export const postUpdateEmployeeAllocatedDaysApi = (payload) => post(url.UPDATE_EMPLOYEE_ALLOCATED_DAYS, payload, {})

// addCompanyIncentive

export const postCompanyIncentiveApi = (payload) => post(url.ADD_COMPANY_INCENTIVE, payload, {})

// getCompanyIncentives

export const getCompanyIncentiveApi = (payload) => post(url.GET_COMPANY_INCENTIVE, payload, {})

//GET_HFWS_BRANCH_SHIFT_TIME 

export const getHfwsBranchShiftApi = (payload) => post(url.GET_HFWS_BRANCH_SHIFT_TIME, payload, {})

// Delete Branch

export const deleteBranchApi = (payload) => post(url.DELETE_BRANCH_URL, payload, {})

// getSyncDataApi

export const getSyncDataApi = (payload) => post(url.GET_SYNC_DATA, payload, {})

// updateCompanyGenericShift

export const updateCompanyGenericShiftApi = (payload) => post(url.UPDATE_COMPANY_GENERIC_SHIFT_URL, payload, {})

// add Devices

export const addEsslDevicesApi = (payload) => post(url.ADD_ESSL_DEVICE_URL, payload, {})

// get Devices
export const getEsslDevicesApi = (payload) => post(url.GET_ESSL_DEVICE_URL, payload, {})

// remove Devices
export const removeEsslDevicesApi = (payload) => post(url.REMOVE_ESSL_DEVICE_URL, payload, {})

// updateEmployeesDeviceDetail

export const updateEmployeesDeviceDetailApi = (payload) => post(url.UPDATE_EMPLOYEE_DEVICE_DETAILS_URL, payload, {})

// getEmployeesDeviceDetail

export const getEmployeesDeviceDetailApi = (payload) => post(url.GET_EMPLOYEE_DEVICE_DETAILS_URL, payload, {})

//get vender

export const getVenderApi = (payload) => post(url.GET_VENDER_URL, payload, {})//get employee details
export const addVendorApi = (payload) => post(url.ADD_VENDER_URL, payload, {})

