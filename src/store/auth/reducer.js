import {
  VALIDATE_USER,
  VALIDATE_USER_SUCCESS,
  VALIDATE_USER_FAIL,
  VALIDATE_COMPANY_DETAILS,
  VALIDATE_COMPANY_DETAILS_SUCCESS,
  VALIDATE_COMPANY_DETAILS_FAILURE,
  REGISTER_ADMIN,
  REGISTER_ADMIN_SUCCESS,
  REGISTER_ADMIN_FAILURE,
  UPLOAD_COMPANY_DOCUMENT,
  UPLOAD_COMPANY_DOCUMENT_SUCCESS,
  UPLOAD_COMPANY_DOCUMENT_FAILURE,
  OTP_LOGIN,
  OTP_LOGIN_SUCCESS,
  OTP_LOGIN_FAILURE,
  RESEND_LOGIN_OTP,
  RESEND_LOGIN_OTP_SUCCESS,
  RESEND_LOGIN_OTP_FAILURE,
  NATURE_OF_BUSINESS,
  NATURE_OF_BUSINESS_SUCCESS,
  NATURE_OF_BUSINESS_FAILURE,
  TYPE_OF_BUSINESS,
  TYPE_OF_BUSINESS_SUCCESS,
  TYPE_OF_BUSINESS_FAILURE,
  ADMIN_VERIFICATION_OTP,
  ADMIN_VERIFICATION_OTP_SUCCESS,
  ADMIN_VERIFICATION_OTP_FAILURE
} from "./actionTypes";


const REGISTER_USER_DETAILS = 1;
const MOBILE_NUMBER_VERIFICATION = 2;
const REGISTER_COMPANY_DETAILS = 3;
const REGISTER_DOCUMENT_UPLOAD = 4;

const initialState = {
  // *** userValid *** //
  userValid: false,
  mobileNumber: "",
  error: "",
  success: "",
  userDetails: {},
  natureOfBusiness: [],
  typeOfBusiness: [],
  registerCurrentContainer: REGISTER_USER_DETAILS

};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case VALIDATE_USER:
      state = {
        ...state,
        loading: true,
        mobileNumber: action.payload.params.mobile_number,
      };
      break;
    case VALIDATE_USER_SUCCESS:
      state = {
        ...state,
        loading: false,
        userValid: true,
      };
      break;
    case VALIDATE_USER_FAIL:
      state = {
        ...state,
        userValid: false,
        error: action.payload,
        loading: false,
      };
      break;
    //VALIDATE_COMPANY_DETAILS
    case VALIDATE_COMPANY_DETAILS:
      state = {
        ...state,
        loading: true,
      };
      break;
    case VALIDATE_COMPANY_DETAILS_SUCCESS:
      state = {
        ...state,
        loading: false,
        userLoggedIn: true,
        registerCurrentContainer: REGISTER_DOCUMENT_UPLOAD
      };
      break;
    case VALIDATE_COMPANY_DETAILS_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;
    //REGISTER_ADMIN
    case REGISTER_ADMIN:
      state = {
        ...state,
        loading: true,
      };
      break;
    case REGISTER_ADMIN_SUCCESS:
      state = {
        ...state,
        loading: false,
        mobileNumber: action.payload.mobile_number,
        registerCurrentContainer: MOBILE_NUMBER_VERIFICATION
      };
      break;
    case REGISTER_ADMIN_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;
    //UPLOAD_COMPANY_DOCUMENT
    case UPLOAD_COMPANY_DOCUMENT:
      state = {
        ...state,
        loading: true,
      };
      break;
    case UPLOAD_COMPANY_DOCUMENT_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case UPLOAD_COMPANY_DOCUMENT_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;
    //LOGIN_OTP
    case OTP_LOGIN:
      state = {
        ...state,
        loading: true,
      };
      break;
    case OTP_LOGIN_SUCCESS:
      state = {
        ...state,
        loading: false,
        userDetails: action.payload,
      };
      break;
    case OTP_LOGIN_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;
    //RESEND_LOGIN_OTP
    case RESEND_LOGIN_OTP:
      state = {
        ...state,
        loading: true,
      };
      break;
    case RESEND_LOGIN_OTP_SUCCESS:
      state = {
        ...state,
        loading: false,
        success: action.payload,
      };
      break;
    case RESEND_LOGIN_OTP_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;
    //ADMIN_VERIFICATION_OTP
    case ADMIN_VERIFICATION_OTP:
      state = {
        ...state,
        loading: true,
      };
      break;
    case ADMIN_VERIFICATION_OTP_SUCCESS:
      state = {
        ...state,
        loading: false,
        success: action.payload,
        registerCurrentContainer: REGISTER_COMPANY_DETAILS
      };
      break;
    case ADMIN_VERIFICATION_OTP_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;
    //NATURE_OF_BUSINESS
    case NATURE_OF_BUSINESS:
      state = {
        ...state,
        loading: true,
      };
      break;
    case NATURE_OF_BUSINESS_SUCCESS:
      state = {
        ...state,
        loading: false,
        natureOfBusiness: action.payload,
      };
      break;
    case NATURE_OF_BUSINESS_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;
    //TYPE_OF_BUSINESS
    case TYPE_OF_BUSINESS:
      state = {
        ...state,
        loading: true,
      };
      break;
    case TYPE_OF_BUSINESS_SUCCESS:
      state = {
        ...state,
        loading: false,
        typeOfBusiness: action.payload,
      };
      break;
    case TYPE_OF_BUSINESS_FAILURE:
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

export default AuthReducer;
