import {
  FETCH_DASHBOARD,
  FETCH_DASHBOARD_SUCCESS,
  FETCH_DASHBOARD_FAIL,
  GET_CHECK_IN_DETAILED_LOG,
  GET_CHECK_IN_DETAILED_LOG_SUCCESS,
  GET_CHECK_IN_DETAILED_LOG_FAIL,
  URL_CHECK_IN,
  URL_CHECK_IN_SUCCESS,
  URL_CHECK_IN_FAIL,
  POST_DAILY_LOG,
  POST_DAILY_LOG_SUCCESS,
  POST_DAILY_LOG_FAIL,
  URL_DELETE_USER,
  URL_DELETE_USER_SUCCESS,
  URL_DELETE_USER_FAIL,
  EDIT_PROFILE_PICTURE,
  EDIT_PROFILE_PICTURE_SUCCESS,
  EDIT_PROFILE_PICTURE_FAIL,
  SET_HIERARCHICAL_BRANCH_IDS,
  SET_HIERARCHICAL_BRANCH_INCLUDE_CHILD,
  RESET_REDUCER,
  SET_HIERARCHICAL_ALL_BRANCH_IDS,
  SET_MULTISELECT_ALL_BRANCH_IDS,
  EMPLOYEE_FACE_FAILURE_LIST,
  EMPLOYEE_FACE_FAILURE_LIST_SUCCESS,
  EMPLOYEE_FACE_FAILURE_LIST_FAIL,
  FACE_RE_REGISTER_REQUEST,
  FACE_RE_REGISTER_REQUEST_SUCCESS,
  FACE_RE_REGISTER_REQUEST_FAIL,
  FACE_RE_REGISTER_CHANGE_STATUS,
  FACE_RE_REGISTER_CHANGE_STATUS_SUCCESS,
  FACE_RE_REGISTER_CHANGE_STATUS_FAIL,
  EMPLOYEE_FACE_RE_REGISTER_REQUEST,
  EMPLOYEE_FACE_RE_REGISTER_REQUEST_SUCCESS,
  EMPLOYEE_FACE_RE_REGISTER_REQUEST_FAIL,
  EMPLOYEE_ENABLE_FACE_RE_REGISTER_ACTION,
  EMPLOYEE_ENABLE_FACE_RE_REGISTER_ACTION_SUCCESS,
  EMPLOYEE_ENABLE_FACE_RE_REGISTER_ACTION_FAIL,
  TRIGGER_HIERARCHICAL
} from "./actionTypes";

const initialState = {
  loading: false,
  error: '',
  dashboardDetails: {},
  hierarchicalBranchIds: {},
  hierarchicalAllBranchIds: 0,
  hierarchicalBranchName: '',
  multiSelectHierarchicalBranch: [],
  employeesLoginFaceFailureDetails: [],
  numOfPages: 0,
  currentPage: 1,
  total: "",
  total_count: "",
  currentFaceType: -2,
  faceReRegisterRequestDetails: [],
  employeeFaceReRequestDetails: [],
  toTriggerHierarchical: false
};

const DashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    // Dashboard
    case FETCH_DASHBOARD:
      state = { ...state, loading: true };
      break;
    case FETCH_DASHBOARD_SUCCESS:

      state = {
        ...state,
        loading: false,
        dashboardDetails: action.payload
      };
      break;
    case FETCH_DASHBOARD_FAIL:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;
    // CheckIn Detailed Log
    case GET_CHECK_IN_DETAILED_LOG:
      state = { ...state, loading: true };
      break;
    case GET_CHECK_IN_DETAILED_LOG_SUCCESS:
      state = {
        ...state,
        loading: false,
        dashboardDetails: action.payload
      };
      break;
    case GET_CHECK_IN_DETAILED_LOG_FAIL:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;
    // CheckIn User
    case URL_CHECK_IN:
      state = { ...state, loading: true };
      break;
    case URL_CHECK_IN_SUCCESS:
      state = {
        ...state,
        loading: false,
        dashboardDetails: action.payload
      };
      break;
    case URL_CHECK_IN_FAIL:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;
    // Daily Log
    case POST_DAILY_LOG:
      state = { ...state, loading: true };
      break;
    case POST_DAILY_LOG_SUCCESS:
      state = {
        ...state,
        loading: false,
        dashboardDetails: action.payload
      };
      break;
    case POST_DAILY_LOG_FAIL:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;
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
    /**
     * HIERARCHICAL branch set
     */
    case SET_HIERARCHICAL_BRANCH_IDS:
      state = {
        ...state,
        hierarchicalBranchIds: action.payload.ids,
        hierarchicalBranchName: action.payload.name
      };
      break;
    case SET_HIERARCHICAL_BRANCH_INCLUDE_CHILD:
      state = {
        ...state,
        hierarchicalBranchIds: { ...state.hierarchicalBranchIds, include_child: action.payload.checkBoxStatus }
      };
      break;


    case SET_HIERARCHICAL_ALL_BRANCH_IDS:
      state = {
        ...state,
        hierarchicalAllBranchIds: action.payload
      };
      break;

    case SET_MULTISELECT_ALL_BRANCH_IDS:
      state = {
        ...state,
        multiSelectHierarchicalBranch: action.payload
      };
      break;


    /**
     * face Validation
     */


    case EMPLOYEE_FACE_FAILURE_LIST:
      state = {
        ...state,
        employeesLoginFaceFailureDetails: [],
        numOfPages: 0,
        currentPage: 1,
      };
      break;
    case EMPLOYEE_FACE_FAILURE_LIST_SUCCESS:
      const employeeRes = action.payload.details;
      state = {
        ...state,
        loading: false,
        employeesLoginFaceFailureDetails: employeeRes.data,
        numOfPages: employeeRes.num_pages,
        currentPage:
          employeeRes.next_page === -1
            ? employeeRes.num_pages
            : employeeRes.next_page - 1,
      };
      break;
    case EMPLOYEE_FACE_FAILURE_LIST_FAIL:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    //Face Re-Register Request

    case FACE_RE_REGISTER_REQUEST:
      state = {
        ...state, loading: true,
        faceReRegisterRequestDetails: [],
        numOfPages: 0,
        currentPage: 1,
      };
      break;
    case FACE_RE_REGISTER_REQUEST_SUCCESS:
      const employeeFaceReRequest = action.payload.details;
      state = {
        ...state,
        loading: false,
        faceReRegisterRequestDetails: employeeFaceReRequest.data,
        numOfPages: employeeFaceReRequest.num_pages,
        currentPage:
          employeeFaceReRequest.next_page === -1
            ? employeeFaceReRequest.num_pages
            : employeeFaceReRequest.next_page - 1,
      };
      break;
    case FACE_RE_REGISTER_REQUEST_FAIL:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    //// Face Re-Register Change Status

    case FACE_RE_REGISTER_CHANGE_STATUS:
      state = { ...state, loading: true };
      break;
    case FACE_RE_REGISTER_CHANGE_STATUS_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case FACE_RE_REGISTER_CHANGE_STATUS_FAIL:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    //face Re-register Employee Request 

    case EMPLOYEE_FACE_RE_REGISTER_REQUEST:
      state = {
        ...state, loading: true,
        employeeFaceReRequestDetails: [],
        numOfPages: 0,
        currentPage: 1,
      };
      break;

    case EMPLOYEE_FACE_RE_REGISTER_REQUEST_SUCCESS:
      const employeeRequest = action.payload;
      state = {
        ...state,
        loading: false,
        employeeFaceReRequestDetails: employeeRequest.data,
        numOfPages: employeeRequest.num_pages,
        currentPage:
          employeeRequest.next_page === -1
            ? employeeRequest.num_pages
            : employeeRequest.next_page - 1,
      };
      break;
    case EMPLOYEE_FACE_RE_REGISTER_REQUEST_FAIL:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    //employee enable Face ReRegister


    case EMPLOYEE_ENABLE_FACE_RE_REGISTER_ACTION:
      state = { ...state, loading: true };
      break;
    case EMPLOYEE_ENABLE_FACE_RE_REGISTER_ACTION_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case EMPLOYEE_ENABLE_FACE_RE_REGISTER_ACTION_FAIL:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    case TRIGGER_HIERARCHICAL:
      state = {
        ...state,
        toTriggerHierarchical: action.payload,
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

export default DashboardReducer;