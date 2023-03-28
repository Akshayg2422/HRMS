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


const REGISTER_USER_DETAILS = 1;
const MOBILE_NUMBER_VERIFICATION = 2;
const REGISTER_COMPANY_DETAILS = 3;
const REGISTER_DOCUMENT_UPLOAD = 4;

const initialState = {
  // *** userValid *** //
  userValid: false,
  mobileNumber: "",
  loading: false,
  error: "",
  success: "",
  userDetails: {},
  natureOfBusiness: [],
  registerAdminDetails: { firstName: '', lastName: '', gender: '', mobileNumber: '', eMail: '', designation: '', pan: '', aadhaar: '' },
  typeOfBusiness: [],
  registerCurrentContainer: REGISTER_USER_DETAILS,
  registerOtp: {
    otp1: '',
    otp2: '',
    otp3: '',
    otp4: ''
  },
  registerCompanyDetails: {
    businessName: '',
    brandName: '',
    companyPan: '',
    companyGst: '',
    communicationAddress: '',
    pinCode: '',
    city: '',
    state: '',
    refferalId: '',
    businesType: '',
    businessNature: '',
  },
  fileUpload: [
    {
      name: 'Company GST',
      base64: '',
      filePath: '',
      param: 'attachment_gst',
    },
    {
      name: 'ProfilePhoto',
      base64: '',
      filePath: '',
      param: 'attachment_profile',
    },
    {
      name: 'Company Logo',
      base64: '',
      filePath: '',
      param: 'attachment_logo'
    },
  ],
  appConfig: {},
  fcmToken: '',
  esslConfigDataList: '',
  editEsslConfigDetails: '',
  esslDevicesData: [],
  esslDeviceDetails: undefined,
  isWebPushRegisterController: true
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
        registerCurrentContainer: REGISTER_USER_DETAILS
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
    /** */
    case UPDATE_ADMIN_DETAILS:
      const { name, value } = action.payload;
      return {
        ...state,
        registerAdminDetails: { ...state.registerAdminDetails, [name]: value },
      };
    /**
     * Register OTP verify
     */
    case REGISTER_OTP_VERIFY:
      const { field, otp } = action.payload;
      return {
        ...state,
        registerOtp: { ...state.registerOtp, [field]: otp },
      };

    /**
     * Update Company Details
     */

    case UPDATE_COMPANY_DETAILS:
      const { CompanyField, CompanyValue } = action.payload;
      return {
        ...state,
        registerCompanyDetails: { ...state.registerCompanyDetails, [CompanyField]: CompanyValue },
      };

    /**
     * Update Documents
     */
    case UPDATE_FILE_DETAILS:
      const { file, index } = action.payload;
      return {
        ...state,
        fileUpload: state.fileUpload.map((item, i) => {
          if (i === index) {
            return {
              ...item,
              base64: file
            }
          }
          return item;
        })
      }
    /**
     * App Config
     */
    case POST_APP_CONFIG:
      state = {
        ...state,
        loading: true,
      };
      break;
    case POST_APP_CONFIG_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case POST_APP_CONFIG_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    case GET_APP_CONFIG_DATA:
      state = {
        ...state,
        appConfig: action.payload,
        loading: false,
      };
      break;

    case GET_FCM_TOKEN:
      state = {
        ...state,
        fcmToken: action.payload,
      };
      break;

    /**
     *  SET_LOGOUT
     */
    case RESET_REDUCER:
      state = initialState;
      break;


    /**
  * set essl Config
  */
    case SET_ESSL_CONFIG:
      state = {
        ...state,
        loading: true,
      };
      break;
    case SET_ESSL_CONFIG_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case SET_ESSL_CONFIG_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    /**
  * get essl Config
  */
    case GET_ESSL_CONFIG:
      state = {
        ...state,
        loading: true,
        esslConfigDataList: ''
      };
      break;
    case GET_ESSL_CONFIG_SUCCESS:
      state = {
        ...state,
        loading: false,
        esslConfigDataList: action.payload
      };
      break;
    case GET_ESSL_CONFIG_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;
    // editEsslConfigDetails
    case EDIT_ESSL_CONFIG_DETAILS:
      state = {
        ...state,
        editEsslConfigDetails: action.payload,
      };
      break;

    /**
* add essl device
*/
    case ADD_ESSL_DEVICE:
      state = {
        ...state,
        loading: true,
      };
      break;
    case ADD_ESSL_DEVICE_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case ADD_ESSL_DEVICE_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    /**
* GET essl device
*/
    case GET_ESSL_DEVICES:
      state = {
        ...state,
        loading: true,
      };
      break;
    case GET_ESSL_DEVICES_SUCCESS:
      state = {
        ...state,
        loading: false,
        esslDevicesData: action.payload
      };
      break;
    case GET_ESSL_DEVICES_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    //essl device details

    case ESSL_DEVICE_DETAILS:
      state = {
        ...state,
        esslDeviceDetails: action.payload
      };
      break;

    /**
   * Sync essl device users
   */
    case SYNC_ESSL_DEVICE_USERS:
      state = {
        ...state,
        loading: true,
      };
      break;
    case SYNC_ESSL_DEVICE_USERS_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case SYNC_ESSL_DEVICE_USERS_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;


    /**
* web push register
*/
    case WEB_PUSH_REGISTER:
      state = {
        ...state,
        loading: true,
      };
      break;
    case WEB_PUSH_REGISTER_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case WEB_PUSH_REGISTER_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    //is web push controller

    case IS_WEB_PUSH_REGISTER:
      state = {
        ...state,
        isWebPushRegisterController: action.payload
      };
      break;

    default:
      state = state;
      break;
  }


  return state;
};

export default AuthReducer;
