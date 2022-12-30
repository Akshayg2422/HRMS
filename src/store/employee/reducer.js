import {
  URL_DELETE_USER,
  URL_DELETE_USER_SUCCESS,
  URL_DELETE_USER_FAIL,
  EDIT_PROFILE_PICTURE,
  EDIT_PROFILE_PICTURE_SUCCESS,
  EDIT_PROFILE_PICTURE_FAIL,
  FETCH_DEPARTMENT,
  FETCH_DEPARTMENT_SUCCESS,
  FETCH_DEPARTMENT_FAILURE,
  FETCH_DESIGNATION,
  FETCH_DESIGNATION_SUCCESS,
  FETCH_DESIGNATION_FAILURE,
  FETCH_ALL_BRANCHES_LIST,
  FETCH_ALL_BRANCHES_LIST_SUCCESS,
  FETCH_ALL_BRANCHES_LIST_FAILURE,
  FETCH_EMPLOYEE_DETAILS,
  FETCH_EMPLOYEE_DETAILS_SUCCESS,
  FETCH_EMPLOYEE_DETAILS_FAILURE,
  FETCH_EMPLOYEE_LIST,
  FETCH_EMPLOYEE_LIST_SUCCESS,
  FETCH_EMPLOYEE_LIST_FAILURE,
  POST_EMPLOYEE_ADDITION,
  POST_EMPLOYEE_ADDITION_SUCCESS,
  POST_EMPLOYEE_ADDITION_FAILURE,
  EDIT_EMPLOYEE,
  FETCH_EMPLOYEE_TIME_SHEETS,
  FETCH_EMPLOYEE_TIME_SHEETS_SUCCESS,
  FETCH_EMPLOYEE_TIME_SHEETS_FAILURE,
  FETCH_EMPLOYEE_CHECK_IN_LOGS,
  FETCH_EMPLOYEE_CHECK_IN_LOGS_SUCCESS,
  FETCH_EMPLOYEE_CHECK_IN_LOGS_FAILURE,
  FETCH_CHECK_IN_DETAILED_LOG_PER_DAY,
  FETCH_CHECK_IN_DETAILED_LOG_PER_DAY_SUCCESS,
  FETCH_CHECK_IN_DETAILED_LOG_PER_DAY_FAILURE,
  FETCH_EMPLOYEE_EACH_USER_TIME_SHEETS,
  FETCH_EMPLOYEE_EACH_USER_TIME_SHEETS_SUCCESS,
  FETCH_EMPLOYEE_EACH_USER_TIME_SHEETS_FAILURE,
  ADD_DEPARTMENT,
  ADD_DEPARTMENT_SUCCESS,
  ADD_DEPARTMENT_FAILURE,
  ADD_DESIGNATION,
  ADD_DESIGNATION_SUCCESS,
  ADD_DESIGNATION_FAILURE,
  ADD_FENCE_ADMIN,
  ADD_FENCE_ADMIN_SUCCESS,
  ADD_FENCE_ADMIN_FAILURE,
  FETCH_EMPLOYEE_ATTENDANCE_STATS,
  FETCH_EMPLOYEE_ATTENDANCE_STATS_FAILURE,
  FETCH_EMPLOYEE_ATTENDANCE_STATS_SUCCESS,
  FETCH_EMPLOYEE_TODAY_STATUS,
  FETCH_EMPLOYEE_TODAY_STATUS_SUCCESS,
  FETCH_EMPLOYEE_TODAY_STATUS_FAILURE,
  FETCH_CHECK_IN_DETAILED_LOG,
  FETCH_CHECK_IN_DETAILED_LOG_SUCCESS,
  FETCH_CHECK_IN_DETAILED_LOG_FAILURE,
  SELECTED_CARD_TYPE,
  SELECTED_DEPARTMENT_NAME,
  SELECTED_DEPARTMENT_ID,
  SELECTED_EMPLOYEE_ID,
  FETCH_ATTENDANCE_CONSOLIDATED_CARDS,
  FETCH_ATTENDANCE_CONSOLIDATED_CARDS_SUCCESS,
  FETCH_ATTENDANCE_CONSOLIDATED_CARDS_FAILURE,
  UPDATE_EMPLOYEE_STATUS,
  UPDATE_EMPLOYEE_STATUS_SUCCESS,
  UPDATE_EMPLOYEE_STATUS_FAILURE,
  RESET_REDUCER,
  FETCH_DOWNLOAD_TODAY_STATUS,
  FETCH_DOWNLOAD_TODAY_STATUS_SUCCESS,
  FETCH_DOWNLOAD_TODAY_STATUS_FAILURE,
  FETCH_LEAVE_TYPES,
  FETCH_LEAVE_TYPES_SUCCESS,
  FETCH_LEAVE_TYPES_FAILURE,
  APPLY_LEAVE,
  APPLY_LEAVE_SUCCESS,
  APPLY_LEAVE_FAILURE,
  ADD_LEAVE_FROM_DATE,
  FETCH_CALENDAR_DETAILS,
  FETCH_CALENDAR_DETAILS_SUCCESS,
  FETCH_CALENDAR_DETAILS_FAILURE,
  CHANGE_EMPLOYEE_LEAVE_STATUS,
  CHANGE_EMPLOYEE_LEAVE_STATUS_SUCCESS,
  CHANGE_EMPLOYEE_LEAVE_STATUS_FAILURE,
  ADD_HOLIDAY,
  ADD_HOLIDAY_SUCCESS,
  ADD_HOLIDAY_FAILURE,
  SELECTED_EVENT_ID,
  DELETE_HOLIDAY,
  DELETE_HOLIDAY_SUCCESS,
  DELETE_HOLIDAY_FAILURE,
  GET_LEAVES_BY_TYPES,
  GET_LEAVES_BY_TYPES_SUCCESS,
  GET_LEAVES_BY_TYPES_FAILURE,
  GET_EMPLOYEES_LEAVES,
  GET_EMPLOYEES_LEAVE_SUCCESS,
  GET_EMPLOYEES_LEAVES_FAILURE,
  GET_MODIFY_LOGS,
  GET_MODIFY_LOGS_SUCCESS,
  GET_MODIFY_LOGS_FAILURE,
  GET_MIS_REPORT,
  GET_MIS_REPORT_SUCCESS,
  GET_MIS_REPORT_FAILURE,
  GET_MIS_REPORT_DOWNLOAD,
  GET_MIS_REPORT_DOWNLOAD_SUCCESS,
  GET_MIS_REPORT_DOWNLOAD_FAILURE,
  GET_MIS_REPORT_CLEAR,
  GET_EMPLOYEE_DOCUMENT,
  GET_EMPLOYEE_DOCUMENT_FAILURE,
  GET_EMPLOYEE_DOCUMENT_SUCCESS,
  ATTACH_USER_DOCUMENT,
  ATTACH_USER_DOCUMENT_FAILURE,
  ATTACH_USER_DOCUMENT_SUCCESS,
  GET_ADMIN_BRANCHES,
  GET_ADMIN_BRANCHES_SUCCESS,
  GET_ADMIN_BRANCHES_FAILURE,
  POST_UPDATED_ADMIN_BRANCHES,
  POST_UPDATED_ADMIN_BRANCHES_SUCCESS,
  POST_UPDATED_ADMIN_BRANCHES_FAILURE
} from "./actionTypes";

const initialState = {
  loading: false,
  error: "",
  designationDropdownData: [],
  departmentDropdownData: [],
  branchesDropdownData: [],
  registeredEmployeesList: [],
  numOfPages: 0,
  currentPage: 1,
  isEdit: undefined,
  editEmployeeDetails: {},
  employeeTimeSheets: [],
  employeeEachUserSheets: [],
  employeeCheckInLogs: [],
  employeeCheckInDetailedLogPerDay: [],
  employeeattendancedatalog: [],
  employeeStatusLog: [],
  checkinDetailedLog: [],
  total: "",
  total_count: "",
  routeParams: {},
  selectedDepartmentName: "",
  selectedDepartmentId: "",
  attendanceConsolidatedCardsData: [],
  selectedEmployeeId: "",
  employeeAttendanceStats: [],
  downloadContent: "",
  leaveFromDate: "",
  calendarEvents: "",
  selectedEventId: undefined,
  myLeaves: "",
  employeesLeaves: "",
  employeesModifyLeaves: "",
  misReport: [],
  employeeDocuments: [],
  adminBranches: []
};

const EmployeeReducer = (state = initialState, action) => {
  switch (action.type) {
    // Delete Account
    case URL_DELETE_USER:
      state = { ...state, loading: true };
      break;
    case URL_DELETE_USER_SUCCESS:
      state = {
        ...state,
        loading: false,
        dashboardDetails: action.payload,
      };
      break;
    case URL_DELETE_USER_FAIL:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;
    // Edit Profile Picture
    case EDIT_PROFILE_PICTURE:
      state = { ...state, loading: true };
      break;
    case EDIT_PROFILE_PICTURE_SUCCESS:
      state = {
        ...state,
        loading: false,
        dashboardDetails: action.payload,
      };
      break;
    case EDIT_PROFILE_PICTURE_FAIL:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;
    //get departments
    case FETCH_DEPARTMENT:
      state = { ...state, loading: true };
      break;
    case FETCH_DEPARTMENT_SUCCESS:
      state = {
        ...state,
        loading: false,
        departmentDropdownData: action.payload,
      };
      break;
    case FETCH_DEPARTMENT_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;
    //get designations
    case FETCH_DESIGNATION:
      state = { ...state, loading: true };
      break;
    case FETCH_DESIGNATION_SUCCESS:
      state = {
        ...state,
        loading: false,
        designationDropdownData: action.payload,
      };
      break;
    case FETCH_DESIGNATION_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;
    //get all branch list
    case FETCH_ALL_BRANCHES_LIST:
      state = { ...state, loading: true };
      break;
    case FETCH_ALL_BRANCHES_LIST_SUCCESS:
      state = {
        ...state,
        loading: false,
        branchesDropdownData: action.payload,
      };
      break;
    case FETCH_ALL_BRANCHES_LIST_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;
    //get employee details
    case FETCH_EMPLOYEE_DETAILS:
      state = { ...state, loading: true };
      break;
    case FETCH_EMPLOYEE_DETAILS_SUCCESS:
      state = {
        ...state,
        loading: false,
        editEmployeeDetails: action.payload,
      };
      break;
    case FETCH_EMPLOYEE_DETAILS_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;
    //Get employees list

    case FETCH_EMPLOYEE_LIST:
      state = {
        ...state,
        registeredEmployeesList: [],
        numOfPages: 0,
        currentPage: 1,
      };
      break;
    case FETCH_EMPLOYEE_LIST_SUCCESS:
      const employeeRes = action.payload;
      state = {
        ...state,
        loading: false,
        registeredEmployeesList: employeeRes.data,
        numOfPages: employeeRes.num_pages,
        currentPage:
          employeeRes.next_page === -1
            ? employeeRes.num_pages
            : employeeRes.next_page - 1,
      };
      break;
    case FETCH_EMPLOYEE_LIST_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;
    //employee addition
    case POST_EMPLOYEE_ADDITION:
      state = { ...state, loading: true };
      break;
    case POST_EMPLOYEE_ADDITION_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case POST_EMPLOYEE_ADDITION_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;
    case EDIT_EMPLOYEE:
      state = { ...state, isEdit: action.payload };
      break;

    /**
     * GET EMPLOYEE TIME SHEETS
     */

    case FETCH_EMPLOYEE_TIME_SHEETS:
      state = { ...state, loading: true };
      break;

    case FETCH_EMPLOYEE_TIME_SHEETS_SUCCESS:
      const timeSheetsRes = action.payload;

      state = {
        ...state,
        loading: false,
        employeeTimeSheets: timeSheetsRes.employees_timesheet.data,
        numOfPages: timeSheetsRes.employees_timesheet.num_pages,
        currentPage:
          timeSheetsRes.employees_timesheet.next_page === -1
            ? timeSheetsRes.employees_timesheet.num_pages
            : timeSheetsRes.employees_timesheet.next_page - 1,
      };
      break;

    case FETCH_EMPLOYEE_TIME_SHEETS_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    /**
     * GET EMPLOYEE CHECK IN LOGS
     */

    case FETCH_EMPLOYEE_CHECK_IN_LOGS:
      state = { ...state, loading: true, employeeCheckInLogs: [] };
      break;

    case FETCH_EMPLOYEE_CHECK_IN_LOGS_SUCCESS:
      const checkInLogsRes = action.payload;
      state = {
        ...state,
        loading: false,
        employeeCheckInLogs: checkInLogsRes.days,
      };
      break;

    case FETCH_EMPLOYEE_CHECK_IN_LOGS_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    /**
     * FETCH_CHECK_IN_DETAILED_LOG_PER_DAY
     */

    case FETCH_CHECK_IN_DETAILED_LOG_PER_DAY:
      state = { ...state, loading: true, employeeCheckInDetailedLogPerDay: [] };
      break;

    case FETCH_CHECK_IN_DETAILED_LOG_PER_DAY_SUCCESS:
      state = {
        ...state,
        loading: false,
        employeeCheckInDetailedLogPerDay: action.payload.logs,
      };
      break;

    case FETCH_CHECK_IN_DETAILED_LOG_PER_DAY_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    /**
     * Each User Employee Time Sheets
     */

    case FETCH_EMPLOYEE_EACH_USER_TIME_SHEETS:
      state = { ...state, loading: true, employeeEachUserSheets: [] };
      break;

    case FETCH_EMPLOYEE_EACH_USER_TIME_SHEETS_SUCCESS:
      console.log(JSON.stringify(action.payload));
      state = {
        ...state,
        loading: false,
        employeeEachUserSheets: action.payload,
      };
      break;

    case FETCH_EMPLOYEE_EACH_USER_TIME_SHEETS_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    /**
     * Add department
     */

    case ADD_DEPARTMENT:
      state = { ...state, loading: true };
      break;
    case ADD_DEPARTMENT_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case ADD_DEPARTMENT_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    /**
     * Add designation
     */

    case ADD_DESIGNATION:
      state = { ...state, loading: true };
      break;
    case ADD_DESIGNATION_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case ADD_DESIGNATION_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    /**
     * Add fence admin
     */

    case ADD_FENCE_ADMIN:
      state = { ...state, loading: true };
      break;
    case ADD_FENCE_ADMIN_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case ADD_FENCE_ADMIN_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    case FETCH_EMPLOYEE_ATTENDANCE_STATS:
      state = { ...state, loading: true };
      break;
    case FETCH_EMPLOYEE_ATTENDANCE_STATS_SUCCESS:
      state = {
        ...state,
        loading: false,
        employeeattendancedatalog: action.payload,
      };
      break;

    case FETCH_EMPLOYEE_ATTENDANCE_STATS_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    case FETCH_EMPLOYEE_TODAY_STATUS:
      state = {
        ...state,
        loading: true,
        employeeAttendanceStats: [],
        numOfPages: 0,
        currentPage: 1,
      };
      break;
    case FETCH_EMPLOYEE_TODAY_STATUS_SUCCESS:
      const attendanceStats = action.payload;
      state = {
        ...state,
        employeeAttendanceStats: attendanceStats.employees.data,
        numOfPages: attendanceStats.employees.num_pages,
        currentPage:
          attendanceStats.employees.next_page === -1
            ? attendanceStats.employees.num_pages
            : attendanceStats.employees.next_page - 1,
      };
      break;

    case FETCH_EMPLOYEE_TODAY_STATUS_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    //download
    case FETCH_DOWNLOAD_TODAY_STATUS:
      state = {
        ...state,
        loading: true,
      };
      break;
    case FETCH_DOWNLOAD_TODAY_STATUS_SUCCESS:
      state = {
        ...state,
        loading: false,
        downloadContent: action.payload,
      };
      break;

    case FETCH_DOWNLOAD_TODAY_STATUS_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    case FETCH_CHECK_IN_DETAILED_LOG:
      state = { ...state, loading: true };
      break;
    case FETCH_CHECK_IN_DETAILED_LOG_SUCCESS:
      state = {
        ...state,
        loading: false,
        checkinDetailedLog: action.payload,
      };
      break;

    case FETCH_CHECK_IN_DETAILED_LOG_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;
    // Stats card type //
    case SELECTED_CARD_TYPE:
      console.log(JSON.stringify(action.payload) + "+======SELECTED_CARD_TYPE");
      state = {
        ...state,
        routeParams: action.payload,
      };
      break;
    // Stats selected department name //
    case SELECTED_DEPARTMENT_NAME:
      state = {
        ...state,
        selectedDepartmentName: action.payload,
      };
      break;
    // Stats selected department id //
    case SELECTED_DEPARTMENT_ID:
      state = {
        ...state,
        selectedDepartmentId: action.payload,
      };
      break;
    // Stats selected employee id for view employee details//
    case SELECTED_EMPLOYEE_ID:
      state = {
        ...state,
        selectedEmployeeId: action.payload,
      };
      break;
    //attendance consolidated cards

    case FETCH_ATTENDANCE_CONSOLIDATED_CARDS:
      state = { ...state, loading: true, attendanceConsolidatedCardsData: [] };
      break;
    case FETCH_ATTENDANCE_CONSOLIDATED_CARDS_SUCCESS:
      state = {
        ...state,
        loading: false,
        attendanceConsolidatedCardsData: action.payload,
      };
      break;

    case FETCH_ATTENDANCE_CONSOLIDATED_CARDS_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;
    //delete employee

    case UPDATE_EMPLOYEE_STATUS:
      state = {
        ...state,
        loading: true,
      };
      break;
    case UPDATE_EMPLOYEE_STATUS_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;

    case UPDATE_EMPLOYEE_STATUS_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    case RESET_REDUCER:
      state = initialState;
      break;

    //get leave types

    case FETCH_LEAVE_TYPES:
      state = {
        ...state,
        loading: true,
      };
      break;
    case FETCH_LEAVE_TYPES_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;

    case FETCH_LEAVE_TYPES_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    //Apply leave

    case APPLY_LEAVE:
      state = {
        ...state,
        loading: true,
      };
      break;
    case APPLY_LEAVE_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;

    case APPLY_LEAVE_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    //Apply leave from date
    case ADD_LEAVE_FROM_DATE:
      state = {
        ...state,
        leaveFromDate: action.payload,
      };
      break;

    //Calendar Events

    case FETCH_CALENDAR_DETAILS:
      state = {
        ...state,
        loading: true,
      };
      break;
    case FETCH_CALENDAR_DETAILS_SUCCESS:
      state = {
        ...state,
        loading: false,
        calendarEvents: action.payload,
      };
      break;

    case FETCH_CALENDAR_DETAILS_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    //change employee status

    case CHANGE_EMPLOYEE_LEAVE_STATUS:
      state = {
        ...state,
        loading: true,
      };
      break;
    case CHANGE_EMPLOYEE_LEAVE_STATUS_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;

    case CHANGE_EMPLOYEE_LEAVE_STATUS_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    /**
     * Add holiday events
     */
    case ADD_HOLIDAY:
      state = {
        ...state,
        loading: true,
      };
      break;
    case ADD_HOLIDAY_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;

    case ADD_HOLIDAY_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    /**
     * selected Event data
     */
    case SELECTED_EVENT_ID:
      state = {
        ...state,
        selectedEventId: action.payload,
      };
      break;

    /**
     * Delete holiday
     */

    case DELETE_HOLIDAY:
      state = {
        ...state,
        loading: true,
      };
      break;
    case DELETE_HOLIDAY_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;

    case DELETE_HOLIDAY_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    /**
     * get Employee leaves
     */

    case GET_LEAVES_BY_TYPES:
      state = {
        ...state,
        loading: true,
        numOfPages: 0,
        currentPage: 1,
        myLeaves: [],
      };
      break;
    case GET_LEAVES_BY_TYPES_SUCCESS:
      const getLeaves = action.payload;

      state = {
        ...state,
        loading: false,
        myLeaves: getLeaves.details.data,
        numOfPages: getLeaves.details.num_pages,
        currentPage:
          getLeaves.details.next_page === -1
            ? getLeaves.details.num_pages
            : getLeaves.details.next_page - 1,
      };
      break;

    case GET_LEAVES_BY_TYPES_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    /**
     * Employees Leaves
     */

    case GET_EMPLOYEES_LEAVES:
      state = {
        ...state,
        loading: true,
        numOfPages: 0,
        currentPage: 1,
        employeesLeaves: [],
      };
      break;
    case GET_EMPLOYEES_LEAVE_SUCCESS:
      const employeeLeaves = action.payload;
      state = {
        ...state,
        loading: false,
        employeesLeaves: employeeLeaves.details.data,
        numOfPages: employeeLeaves.details.num_pages,
        currentPage:
          employeeLeaves.details.next_page === -1
            ? employeeLeaves.details.num_pages
            : employeeLeaves.details.next_page - 1,
      };
      break;

    case GET_EMPLOYEES_LEAVES_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    /**
     * modify logs
     */

    case GET_MODIFY_LOGS:
      state = {
        ...state,
        loading: true,
        numOfPages: 0,
        currentPage: 1,
        employeesModifyLeaves: [],
      };
      break;
    case GET_MODIFY_LOGS_SUCCESS:
      const modifyLogs = action.payload;
      state = {
        ...state,
        loading: false,
        employeesModifyLeaves: modifyLogs.details.data,
        numOfPages: modifyLogs.details.num_pages,
        currentPage:
          modifyLogs.details.next_page === -1
            ? modifyLogs.details.num_pages
            : modifyLogs.details.next_page - 1,
      };
      break;

    case GET_MODIFY_LOGS_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;
    /**
        * get Employee Document E-locker
        */
    case GET_EMPLOYEE_DOCUMENT:
      state = {
        ...state,
        loading: true,
      };
      break;
    case GET_EMPLOYEE_DOCUMENT_SUCCESS:
      state = {
        ...state,
        loading: false,
        employeeDocuments: action.payload
      };
      break;

    case GET_EMPLOYEE_DOCUMENT_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;


    /**
           * Attach User Documents
           */
    case ATTACH_USER_DOCUMENT:
      state = {
        ...state,
        loading: true,
      };
      break;
    case ATTACH_USER_DOCUMENT_SUCCESS:
      state = {
        ...state,
        loading: false,
        // employeeDocuments: action.payload
      };
      break;

    case ATTACH_USER_DOCUMENT_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;



    // ***Mis Report***//

    case GET_MIS_REPORT:
      state = {
        ...state,
        misReport: [],
        loading: true,
        numOfPages: 0,
        currentPage: 1,
      };
      break;
    case GET_MIS_REPORT_CLEAR:
      state = {
        ...state,
        misReport: [],
        numOfPages: 0,
        currentPage: 1,
      };
      break;
    case GET_MIS_REPORT_SUCCESS:
      const reports = action.payload.employees;
      state = {
        ...state,
        misReport: reports.data,
        numOfPages: reports.data.num_pages,
        currentPage:
          reports.data.next_page === -1
            ? reports.data.num_pages
            : reports.data.next_page - 1,
        loading: false,
      };
      break;

    case GET_MIS_REPORT_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;
    // ***MIS Report Download

    case GET_MIS_REPORT_DOWNLOAD:
      state = {
        ...state,
        loading: true,
      };
      break;
    case GET_MIS_REPORT_DOWNLOAD_SUCCESS:
      state = {
        ...state,
        loading: false,
        downloadContent: action.payload,
      };
      break;

    case GET_MIS_REPORT_DOWNLOAD_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;
    /**
     * getAdminBranches
     */
    case GET_ADMIN_BRANCHES:
      state = {
        ...state,
        loading: true,
      };
      break;
    case GET_ADMIN_BRANCHES_SUCCESS:
      state = {
        ...state,
        loading: false,
        adminBranches: action.payload,
      };
      break;

    case GET_ADMIN_BRANCHES_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    /**
     * Update Admin Branch
     */
    case POST_UPDATED_ADMIN_BRANCHES:
      state = {
        ...state,
        loading: true,
      };
      break;
    case POST_UPDATED_ADMIN_BRANCHES_SUCCESS:
      state = {
        ...state,
        loading: false,
        // adminBranches: action.payload,
      };
      break;

    case POST_UPDATED_ADMIN_BRANCHES_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;
    /**
     * Default
     */
    default:
      state = state;
      break;
  }
  return state;
};

export default EmployeeReducer;
