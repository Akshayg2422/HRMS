import {
  VALIDATE_USER,
  VALIDATE_USER_SUCCESS,
  VALIDATE_USER_FAIL,
  USER_MOBILENUMBER,
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
  ADMIN_VERIFICATION_OTP_FAILURE,
  RESET_REDUCER,
  UPDATE_ADMIN_DETAILS,
  REGISTER_OTP_VERIFY,
  UPDATE_COMPANY_DETAILS,
  UPDATE_FILE_DETAILS,
  POST_APP_CONFIG,
  POST_APP_CONFIG_SUCCESS,
  POST_APP_CONFIG_FAILURE,
  GET_APP_CONFIG_DATA,
  GET_FCM_TOKEN,

  SET_ESSL_CONFIG,
  SET_ESSL_CONFIG_SUCCESS,
  SET_ESSL_CONFIG_FAILURE,

  GET_ESSL_CONFIG,
  GET_ESSL_CONFIG_SUCCESS,
  GET_ESSL_CONFIG_FAILURE,
  EDIT_ESSL_CONFIG_DETAILS,

  ADD_ESSL_DEVICE,
  ADD_ESSL_DEVICE_SUCCESS,
  ADD_ESSL_DEVICE_FAILURE,

  GET_ESSL_DEVICES,
  GET_ESSL_DEVICES_SUCCESS,
  GET_ESSL_DEVICES_FAILURE,

  ESSL_DEVICE_DETAILS,

  SYNC_ESSL_DEVICE_USERS,
  SYNC_ESSL_DEVICE_USERS_SUCCESS,
  SYNC_ESSL_DEVICE_USERS_FAILURE,

  WEB_PUSH_REGISTER,
  WEB_PUSH_REGISTER_SUCCESS,
  WEB_PUSH_REGISTER_FAILURE,

  IS_WEB_PUSH_REGISTER
} from "./actionTypes";


export const getValidateUser = (params) => {
  return {
    type: VALIDATE_USER,
    payload: params,
  };
};

export const getValidateUserSuccess = () => {
  return {
    type: VALIDATE_USER_SUCCESS,
  };
};

export const getValidateUserFail = (error) => {
  return {
    type: VALIDATE_USER_FAIL,
    payload: error,
  };
};

//VALIDATE_COMPANY_DETAILS

export const getValidateCompanyDetails = (params) => {
  return {
    type: VALIDATE_COMPANY_DETAILS,
    payload: params,
  };
};

export const getValidateCompanyDetailsSuccess = () => {
  return {
    type: VALIDATE_COMPANY_DETAILS_SUCCESS,
  };
};

export const getValidateCompanyDetailsFailure = (error) => {
  return {
    type: VALIDATE_COMPANY_DETAILS_FAILURE,
    payload: error,
  };
};

//REGISTER_ADMIN

export const getRegisterAdmin = (params) => {
  return {
    type: REGISTER_ADMIN,
    payload: params,

  };
};

export const getRegisterAdminSuccess = (response) => {
  return {
    type: REGISTER_ADMIN_SUCCESS,
    payload: response
  };
};

export const getRegisterAdminFailure = (error) => {
  return {
    type: REGISTER_ADMIN_FAILURE,
    payload: error,
  };
};

//UPLOAD_COMPANY_DOCUMENT

export const uploadCompanyDocuments = (params) => {
  return {
    type: UPLOAD_COMPANY_DOCUMENT,
    payload: params,
  };
};

export const uploadCompanyDocumentsSuccess = () => {
  return {
    type: UPLOAD_COMPANY_DOCUMENT_SUCCESS,
  };
};

export const uploadCompanyDocumentsFailure = (error) => {
  return {
    type: UPLOAD_COMPANY_DOCUMENT_FAILURE,
    payload: error,
  };
};

//LOGIN_OTP

export const proceedSignIn = (params) => {
  return {
    type: OTP_LOGIN,
    payload: params,
  };
};

export const proceedSignInSuccess = (details) => {
  return {
    type: OTP_LOGIN_SUCCESS,
    payload: details
  };
};

export const proceedSignInFailure = (error) => {
  return {
    type: OTP_LOGIN_FAILURE,
    payload: error,
  };
};

//RESEND_LOGIN_OTP

export const getResendLoginOtp = (params) => {
  return {
    type: RESEND_LOGIN_OTP,
    payload: params,
  };
};

export const getResendLoginOtpSuccess = (message) => {
  return {
    type: RESEND_LOGIN_OTP_SUCCESS,
    payload: message
  };
};

export const getResendLoginOtpFailure = (error) => {
  return {
    type: RESEND_LOGIN_OTP_FAILURE,
    payload: error,
  };
};

//ADMIN_VERIFICATION_OTP

export const getAdminVerificationOtp = (params) => {
  return {
    type: ADMIN_VERIFICATION_OTP,
    payload: params,
  };
};

export const getAdminVerificationOtpSuccess = (message) => {
  return {
    type: ADMIN_VERIFICATION_OTP_SUCCESS,
    payload: message
  };
};

export const getAdminVerificationOtpFailure = (error) => {
  return {
    type: ADMIN_VERIFICATION_OTP_FAILURE,
    payload: error,
  };
};

//NATURE_OF_BUSINESS

export const getNatureOfBusiness = (params) => {
  return {
    type: NATURE_OF_BUSINESS,
    payload: params,

  };
};

export const getNatureOfBusinessSuccess = (response) => {
  return {
    type: NATURE_OF_BUSINESS_SUCCESS,
    payload: response
  };
};

export const getNatureOfBusinessFailure = (error) => {
  return {
    type: NATURE_OF_BUSINESS_FAILURE,
    payload: error,
  };
};

//TYPE_OF_BUSINESS

export const getTypeOfBusiness = (params) => {
  return {
    type: TYPE_OF_BUSINESS,
    payload: params,

  };
};

export const getTypeOfBusinessSuccess = (response) => {
  return {
    type: TYPE_OF_BUSINESS_SUCCESS,
    payload: response
  };
};

export const getTypeOfBusinessFailure = (error) => {
  return {
    type: TYPE_OF_BUSINESS_FAILURE,
    payload: error,
  };
};

/**
 * 
 * Update Admin Details
 */

export const updateAdminInput = (name, value) => ({
  type: UPDATE_ADMIN_DETAILS,
  payload: { name, value },
});

/**
 * 
 * Register OTP verify
 */


export const registerOtpVerify = (field, otp) => ({
  type: REGISTER_OTP_VERIFY,
  payload: { field, otp },
});
/**
 * 
 * Update Company Details
 */

export const updateCompanyInput = (CompanyField, CompanyValue) => ({
  type: UPDATE_COMPANY_DETAILS,
  payload: { CompanyField, CompanyValue },
});

/**
 * 
 * Update Documents Details
 */
export const updateDocumentsInput = (file, index) => ({
  type: UPDATE_FILE_DETAILS,
  payload: { file, index },
});

/**
 *  set logout 
 */


export const resetAuth = () => {
  return {
    type: RESET_REDUCER,
  };
};

/**
 * App Config
 */


export const postAppConfig = (params) => {
  return {
    type: POST_APP_CONFIG,
    payload: params,
  };
};

export const postAppConfigSuccess = (details) => {
  return {
    type: POST_APP_CONFIG_SUCCESS,
    payload: details
  };
};

export const postAppConfigFailure = (error) => {
  return {
    type: POST_APP_CONFIG_FAILURE,
    payload: error,
  };
};


export const getAppConfigData = (details) => {
  return {
    type: GET_APP_CONFIG_DATA,
    payload: details,
  };
};


export const getFcmToken = (token) => {
  return {
    type: GET_FCM_TOKEN,
    payload: token,
  };
};

//set essl config

export const postEsslConfig = (params) => {
  return {
    type: SET_ESSL_CONFIG,
    payload: params,
  };
};

export const postEsslConfigSuccess = (details) => {
  return {
    type: SET_ESSL_CONFIG_SUCCESS,
    payload: details
  };
};

export const postEsslConfigFailure = (error) => {
  return {
    type: SET_ESSL_CONFIG_FAILURE,
    payload: error,
  };
};

//get essl config

export const getEsslConfig = (params) => {
  return {
    type: GET_ESSL_CONFIG,
    payload: params,
  };
};

export const getEsslConfigSuccess = (details) => {
  return {
    type: GET_ESSL_CONFIG_SUCCESS,
    payload: details
  };
};

export const getEsslConfigFailure = (error) => {
  return {
    type: GET_ESSL_CONFIG_FAILURE,
    payload: error,
  };
};


export const editEsslConfig = (data) => {
  return {
    type: EDIT_ESSL_CONFIG_DETAILS,
    payload: data,
  };
};
//add essl device

export const postAddEsslDevice = (params) => {
  return {
    type: ADD_ESSL_DEVICE,
    payload: params,
  };
};

export const postAddEsslDeviceSuccess = (details) => {
  return {
    type: ADD_ESSL_DEVICE_SUCCESS,
    payload: details
  };
};

export const postAddEsslDeviceFailure = (error) => {
  return {
    type: ADD_ESSL_DEVICE_FAILURE,
    payload: error,
  };
};

//add essl device

export const fetchEsslDevices = (params) => {
  return {
    type: GET_ESSL_DEVICES,
    payload: params,
  };
};

export const fetchEsslDevicesSuccess = (details) => {
  return {
    type: GET_ESSL_DEVICES_SUCCESS,
    payload: details
  };
};

export const fetchEsslDevicesFailure = (error) => {
  return {
    type: GET_ESSL_DEVICES_FAILURE,
    payload: error,
  };
};

/**
 * ESSL device details
 */

export const esslDeviceDetails = (params) => ({
  type: ESSL_DEVICE_DETAILS,
  payload: params,
});

//sync essl device users

export const syncEsslDeviceUsers = (params) => {
  return {
    type: SYNC_ESSL_DEVICE_USERS,
    payload: params,
  };
};

export const syncEsslDeviceUsersSuccess = (details) => {
  return {
    type: SYNC_ESSL_DEVICE_USERS_SUCCESS,
    payload: details
  };
};

export const syncEsslDeviceUsersFailure = (error) => {
  return {
    type: SYNC_ESSL_DEVICE_USERS_FAILURE,
    payload: error,
  };
};


//WEB push register

export const webPushRegister = (params) => {
  return {
    type: WEB_PUSH_REGISTER,
    payload: params,
  };
};

export const webPushRegisterSuccess = (details) => {
  return {
    type: WEB_PUSH_REGISTER_SUCCESS,
    payload: details
  };
};

export const webPushRegisterFailure = (error) => {
  return {
    type: WEB_PUSH_REGISTER_FAILURE,
    payload: error,
  };
};


//is web push register

export const isWebPushRegister = (params) => {
  return {
    type: IS_WEB_PUSH_REGISTER,
    payload: params,
  };
};


//ValidateDev
