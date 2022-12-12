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
  FETCH_MY_SHIFTS_FAILURE
} from "./actionTypes";

const initialState = {
  loading: false,
  error: '',
  branchShifts: {},
  branchesWeeklyShifts: {},
  selectedShiftGroupDetails: '',
  selectedWeeklyShiftId: '',
  weeklyShiftDetails: {},
  selectedWeeklyShiftName: '',
  shiftEmployeesGroupDetails: {},
  myShifts:[]
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
        loading: true,
      };
      break;
    case FETCH_BRANCH_SHIFTS_SUCCESS:
      state = {
        ...state,
        loading: false,
        branchShifts: action.payload
      };
      break;

    case FETCH_BRANCH_SHIFTS_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
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
  

    default:
      state = state;
      break;
  }

  return state;
};

export default ShiftManagementReducer;