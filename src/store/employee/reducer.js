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
  FETCH_CHECK_IN_DETAILED_LOG_FAILURE
} from "./actionTypes";

const initialState = {
  loading: false,
  error: '',
  // dashboardDetails: {},
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
  employeeattendancedatalog:[],
  employeeStatusLog:[],
  checkinDetailedLog:[],
  total: '',
  total_count: ''
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
        dashboardDetails: action.payload
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
        dashboardDetails: action.payload
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
        departmentDropdownData: action.payload
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
        designationDropdownData: action.payload
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
        branchesDropdownData: action.payload
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
        editEmployeeDetails: action.payload
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
      state = { ...state, loading: true };
      break;
    case FETCH_EMPLOYEE_LIST_SUCCESS:
      const employeeRes = action.payload
      state = {
        ...state,
        loading: false,
        registeredEmployeesList: employeeRes.data,
        numOfPages: employeeRes.num_pages,
        currentPage: employeeRes.next_page === -1 ? employeeRes.num_pages : employeeRes.next_page - 1,
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
        currentPage: timeSheetsRes.employees_timesheet.next_page === -1 ? timeSheetsRes.employees_timesheet.num_pages : timeSheetsRes.employees_timesheet.next_page - 1,
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
      state = { ...state, loading: true , employeeCheckInLogs:[]};
      break;

    case FETCH_EMPLOYEE_CHECK_IN_LOGS_SUCCESS:
      const checkInLogsRes = action.payload;
      state = {
        ...state,
        loading: false,
        employeeCheckInLogs: checkInLogsRes.days
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
      state = { ...state, loading: true, employeeCheckInDetailedLogPerDay:[] };
      break;

    case FETCH_CHECK_IN_DETAILED_LOG_PER_DAY_SUCCESS:

      state = {
        ...state,
        loading: false,
        employeeCheckInDetailedLogPerDay: action.payload.logs
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
      state = { ...state, loading: true, employeeEachUserSheets:[] };
      break;

    case FETCH_EMPLOYEE_EACH_USER_TIME_SHEETS_SUCCESS:
      state = {
        ...state,
        loading: false,
        employeeEachUserSheets: action.payload
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
        state={...state,loading:true}
        break;
        case FETCH_EMPLOYEE_ATTENDANCE_STATS_SUCCESS:
          state = {
            ...state,
            loading: false,
            employeeattendancedatalog: action.payload
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
            state={...state,loading:true}
            break;
            case FETCH_EMPLOYEE_TODAY_STATUS_SUCCESS:
              state = {
                ...state,
                loading: false,
                employeeStatusLog: action.payload
              };
              break;
        
            case FETCH_EMPLOYEE_TODAY_STATUS_FAILURE:
              state = {
                ...state,
                error: action.payload,
                loading: false,
              };
              break;

              case FETCH_CHECK_IN_DETAILED_LOG:
            state={...state,loading:true}
            break;
            case FETCH_CHECK_IN_DETAILED_LOG_SUCCESS:
              state = {
                ...state,
                loading: false,
                checkinDetailedLog: action.payload
              };
              break;
        
            case FETCH_CHECK_IN_DETAILED_LOG_FAILURE:
              state = {
                ...state,
                error: action.payload,
                loading: false,
              };
              break;

    default:
      state = { ...state };
      break;
  }
  return state;
};

export default EmployeeReducer;
