import {
  POST_ADD_WEEKLY_SHIFT,
  POST_ADD_WEEKLY_SHIFT_SUCCESS,
  POST_ADD_WEEKLY_SHIFT_FAILURE,
  FETCH_BRANCH_SHIFTS,
  FETCH_BRANCH_SHIFTS_SUCCESS,
  FETCH_BRANCH_SHIFTS_FAILURE,
  FETCH_BRANCH_WEEKLY_SHIFTS,
  FETCH_BRANCH_WEEKLY_SHIFTS_SUCCESS,
  FETCH_BRANCH_WEEKLY_SHIFTS_FAILURE,
  SELECTED_BRANCH_SHIFT_GROUP_DETAILS,
  POST_ADD_SHIFT,
  POST_ADD_SHIFT_SUCCESS,
  POST_ADD_SHIFT_FAILURE,
  SELECTED_WEEKLY_SHIFT_ID,
  FETCH_WEEKLY_SHIFT_DETAILS,
  FETCH_WEEKLY_SHIFT_DETAILS_SUCCESS,
  FETCH_WEEKLY_SHIFT_DETAILS_FAILURE,
  SELECTED_WEEKLY_SHIFT_NAME,
  FETCH_SHIFT_EMPLOYEES,
  FETCH_SHIFT_EMPLOYEES_SUCCESS,
  FETCH_SHIFT_EMPLOYEES_FAILURE,
  FETCH_MY_SHIFTS,
  FETCH_MY_SHIFTS_SUCCESS,
  FETCH_MY_SHIFTS_FAILURE,
  RESET_REDUCER,
  GET_EMPLOYEE_WITH_SHIFTS,
  GET_EMPLOYEE_WITH_SHIFTS_SUCCESS,
  GET_EMPLOYEE_WITH_SHIFTS_FAILURE,
  POST_EMPLOYEE_SHIFT_CHANGE,
  POST_EMPLOYEE_SHIFT_CHANGE_SUCCESS,
  POST_EMPLOYEE_SHIFT_CHANGE_FAILURE,
  GET_SHIFT_REQUESTED_EMPLOYEES,
  GET_SHIFT_REQUESTED_EMPLOYEES_SUCCESS,
  GET_SHIFT_REQUESTED_EMPLOYEES_FAILURE,
  GET_SHIFT_REQUESTED_STATUS,
  GET_SHIFT_REQUESTED_STATUS_SUCCESS,
  GET_SHIFT_REQUESTED_STATUS_FAILURE,
  POST_REQUEST_SHIFT_CHANGE,
  POST_REQUEST_SHIFT_CHANGE_SUCCESS,
  POST_REQUEST_SHIFT_CHANGE_FAILURE,
  POST_CHANGE_SHIFT_CHANGE,
  POST_CHANGE_SHIFT_CHANGE_SUCCESS,
  POST_CHANGE_SHIFT_CHANGE_FAILURE,
  CURRENT_STATUS_TYPE,
  DESIGNATION_GROUP_DETAILS,
  GET_HFWS_BRANCH_SHIFT,
  GET_HFWS_BRANCH_SHIFT_SUCCESS,
  GET_HFWS_BRANCH_SHIFT_FAILURE
} from "./actionTypes";

const initialState = {
  loading: false,
  error: '',
  numOfPages: 0,
  currentPage: 1,
  branchShifts: {},
  branchesWeeklyShifts: {},
  selectedShiftGroupDetails: '',
  selectedWeeklyShiftId: '',
  weeklyShiftDetails: {},
  selectedWeeklyShiftName: '',
  shiftEmployeesGroupDetails: {},
  myShifts: {},
  employeeWithShifts: [],
  shiftRequestedEmployees: [],
  requestList: [],
  currentType: -2,
  designationShiftGroup: {},
  hfwsBranchShifts: []
};

const ShiftManagementReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_ADD_WEEKLY_SHIFT:
      state = {
        ...state,
        loading: true,
      };
      break;
    case POST_ADD_WEEKLY_SHIFT_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;

    case POST_ADD_WEEKLY_SHIFT_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    //get branch shifts

    case FETCH_BRANCH_SHIFTS:
      state = {
        ...state,
      };
      break;
    case FETCH_BRANCH_SHIFTS_SUCCESS:
      state = {
        ...state,
        branchShifts: action.payload
      };
      break;

    case FETCH_BRANCH_SHIFTS_FAILURE:
      state = {
        ...state,
        error: action.payload,
      };
      break;

    //get branches weekly shifts

    case FETCH_BRANCH_WEEKLY_SHIFTS:
      state = {
        ...state,
        loading: true,
      };
      break;
    case FETCH_BRANCH_WEEKLY_SHIFTS_SUCCESS:
      state = {
        ...state,
        loading: false,
        branchesWeeklyShifts: action.payload
      };
      break;

    case FETCH_BRANCH_WEEKLY_SHIFTS_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    //SET SELECTED group name

    case SELECTED_BRANCH_SHIFT_GROUP_DETAILS:
      state = {
        ...state,
        selectedShiftGroupDetails: action.payload
      };
      break;

    //add shift

    case POST_ADD_SHIFT:
      state = {
        ...state,
        loading: true,
      };
      break;
    case POST_ADD_SHIFT_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;

    case POST_ADD_SHIFT_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    //SET SELECTED weekly shift id

    case SELECTED_WEEKLY_SHIFT_ID:
      state = {
        ...state,
        selectedWeeklyShiftId: action.payload
      };
      break;

    //SET SELECTED weekly shift name

    case SELECTED_WEEKLY_SHIFT_NAME:
      state = {
        ...state,
        selectedWeeklyShiftName: action.payload
      };
      break;

    //get weekly shift details


    case FETCH_WEEKLY_SHIFT_DETAILS:
      state = {
        ...state,
        loading: true,
      };
      break;
    case FETCH_WEEKLY_SHIFT_DETAILS_SUCCESS:
      state = {
        ...state,
        loading: false,
        weeklyShiftDetails: action.payload
      };
      break;

    case FETCH_WEEKLY_SHIFT_DETAILS_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    //get shift employees group details

    case FETCH_SHIFT_EMPLOYEES:
      state = {
        ...state,
        loading: true,
      };
      break;
    case FETCH_SHIFT_EMPLOYEES_SUCCESS:
      state = {
        ...state,
        loading: false,
        shiftEmployeesGroupDetails: action.payload
      };
      break;

    case FETCH_SHIFT_EMPLOYEES_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    //////MY SHIFTS

    case FETCH_MY_SHIFTS:
      state = {
        ...state,
        loading: true,
        myShifts: {}
      };
      break;
    case FETCH_MY_SHIFTS_SUCCESS:
      state = {
        ...state,
        loading: false,
        myShifts: action.payload
      };
      break;

    case FETCH_MY_SHIFTS_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;
    // // get Employee with shifts

    case GET_EMPLOYEE_WITH_SHIFTS:
      state = {
        ...state,
        employeeWithShifts: [],
        numOfPages: 0,
        currentPage: 1,
      };
      break;
    case GET_EMPLOYEE_WITH_SHIFTS_SUCCESS:
      const employeeDetails = action.payload;
      state = {
        ...state,
        employeeWithShifts: employeeDetails.data,
        numOfPages: employeeDetails.num_pages,
        currentPage:
          employeeDetails.next_page === -1
            ? employeeDetails.num_pages
            : employeeDetails.next_page - 1,
      };
      break;

    case GET_EMPLOYEE_WITH_SHIFTS_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    // Change Employee Shifts 

    case POST_EMPLOYEE_SHIFT_CHANGE:
      state = {
        ...state,
        loading: true,
      };
      break;
    case POST_EMPLOYEE_SHIFT_CHANGE_SUCCESS:
      state = {
        ...state,
        loading: false,
        // myShifts: action.payload
      };
      break;

    case POST_EMPLOYEE_SHIFT_CHANGE_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;
    /**
     * employees Shift request
     */
    case GET_SHIFT_REQUESTED_EMPLOYEES:
      state = {
        ...state,
        shiftRequestedEmployees: [],
        numOfPages: 0,
        currentPage: 1,
      };
      break;
    case GET_SHIFT_REQUESTED_EMPLOYEES_SUCCESS:
      const employeesRequest = action.payload;
      state = {
        ...state,
        loading: false,
        shiftRequestedEmployees: employeesRequest.data,
        numOfPages: employeesRequest.num_pages,
        currentPage:
          employeesRequest.next_page === -1
            ? employeesRequest.num_pages
            : employeesRequest.next_page - 1,
      };
      break;

    case GET_SHIFT_REQUESTED_EMPLOYEES_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    /**
     * employee Shift request Status
     */
    case GET_SHIFT_REQUESTED_STATUS:
      state = {
        ...state,
        requestList: [],
        numOfPages: 0,
        currentPage: 1,
      };
      break;
    case GET_SHIFT_REQUESTED_STATUS_SUCCESS:
      const employeeRequest = action.payload;
      state = {
        ...state,
        loading: false,
        requestList: employeeRequest.data,
        numOfPages: employeeRequest.num_pages,
        currentPage:
          employeeRequest.next_page === -1
            ? employeeRequest.num_pages
            : employeeRequest.next_page - 1,
      };
      break;

    case GET_SHIFT_REQUESTED_STATUS_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;
    /**
     * POST_REQUEST_SHIFT_CHANGE
     */
    case POST_REQUEST_SHIFT_CHANGE:
      state = {
        ...state,
      };
      break;
    case POST_REQUEST_SHIFT_CHANGE_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;

    case POST_REQUEST_SHIFT_CHANGE_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;
    /**
     * POST_CHANGE_SHIFT_CHANGE
     */

    case POST_CHANGE_SHIFT_CHANGE:
      state = {
        ...state,
      };
      break;
    case POST_CHANGE_SHIFT_CHANGE_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;

    case POST_CHANGE_SHIFT_CHANGE_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    /**
     * 
     */

    case CURRENT_STATUS_TYPE:
      state = {
        ...state,
        currentType: action.payload,
      };
      break;

    // DESIGNATION_GROUP_DETAILS

    case DESIGNATION_GROUP_DETAILS:
      state = {
        ...state,
        designationShiftGroup: action.payload,
      };
      break;

    // ******************************** //
    // getHfwsStartEndTime

    case GET_HFWS_BRANCH_SHIFT:
      state = {
        ...state,
      };
      break;
    case GET_HFWS_BRANCH_SHIFT_SUCCESS:
      state = {
        ...state,
        loading: false,
        hfwsBranchShifts: action.payload,
      };
      break;

    case GET_HFWS_BRANCH_SHIFT_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    case RESET_REDUCER:
      state = initialState;
      break;


    default:
      state = state;
      break;
  }

  return state;
};

export default ShiftManagementReducer;