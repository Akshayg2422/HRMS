import {
  SHOW_LOADER,
  HIDE_LOADER,
  SET_USER_LOGIN_DETAILS,
  RESET_REDUCER,
  NAV_INDEX,
  IS_LAUNCH,
  HIDE_OTP,
  LAUNCH_TIME,
  TIMER,
  API_CONTROL
} from "./actionsType";

const initialState = {
  loading: false,
  userLoggedIn: false,
  token: "",
  userDetails: "",
  mobileNumber: "",
  navIndex: 0,
  setLaunch: false,
  timer: 40,
  isLoad: true
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case API_CONTROL:
      state = {
        ...state,
        isLoad: action.payload,
      };
      break;
    case HIDE_LOADER:
      state = {
        ...state,
        loading: false,
      };
      break;

    case SET_USER_LOGIN_DETAILS:
      const loginDetails = action.payload;
      state = {
        ...state,
        userLoggedIn: loginDetails.userLoggedIn,
        token: loginDetails.token,
        userDetails: loginDetails.userDetails,
        mobileNumber: loginDetails.mobileNumber,
      };
      break;

    case NAV_INDEX:
      state = { ...state, navIndex: action.payload };
      break;

    case IS_LAUNCH:
      state = { ...state, setLaunch: action.payload };
      break;

    case TIMER:
      state = { ...state, timer: action.payload };
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

export default AppReducer;
