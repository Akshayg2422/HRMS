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
} from "./actionTypes";

const initialState = {
  loading: false,
  error: '',
  dashboardDetails: {}
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
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default DashboardReducer;