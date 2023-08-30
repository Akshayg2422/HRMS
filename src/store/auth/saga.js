import { takeLatest, put, call } from "redux-saga/effects";

import {
  VALIDATE_USER,
  RESEND_LOGIN_OTP,
  OTP_LOGIN,
  REGISTER_ADMIN,
  VALIDATE_COMPANY_DETAILS,
  UPLOAD_COMPANY_DOCUMENT,
  NATURE_OF_BUSINESS,
  TYPE_OF_BUSINESS,
  ADMIN_VERIFICATION_OTP,
  POST_APP_CONFIG,

  SET_ESSL_CONFIG,
  GET_ESSL_CONFIG,

  ADD_ESSL_DEVICE,
  GET_ESSL_DEVICES,

  SYNC_ESSL_DEVICE_USERS,

  WEB_PUSH_REGISTER
} from "./actionTypes";

import {
  getValidateUserSuccess,
  getValidateUserFail,
  getResendLoginOtpSuccess,
  getResendLoginOtpFailure,
  proceedSignInFailure,
  proceedSignInSuccess,
  getValidateCompanyDetailsSuccess,
  getValidateCompanyDetailsFailure,
  getRegisterAdminSuccess,
  getRegisterAdminFailure,
  uploadCompanyDocumentsSuccess,
  uploadCompanyDocumentsFailure,
  getNatureOfBusinessSuccess,
  getNatureOfBusinessFailure,
  getTypeOfBusinessSuccess,
  getTypeOfBusinessFailure,
  getAdminVerificationOtpSuccess,
  getAdminVerificationOtpFailure,
  postAppConfigSuccess,
  postAppConfigFailure,

  postEsslConfigSuccess,
  postEsslConfigFailure,

  getEsslConfigSuccess,
  getEsslConfigFailure,

  postAddEsslDeviceSuccess,
  postAddEsslDeviceFailure,

  fetchEsslDevicesSuccess,
  fetchEsslDevicesFailure,

  syncEsslDeviceUsersSuccess,
  syncEsslDeviceUsersFailure,

  webPushRegisterSuccess,
  webPushRegisterFailure

} from "./actions";

import {
  postValidateUser,
  postResendLoginOtp,
  postOtpLogin,
  postRegisterCompany,
  postRegisterAdmin,
  postUploadCompanyDocument,
  fetchNatureOfBusiness,
  fetchTypeOfBusiness,
  postAppConfigDetailsApi,

  setEsslConfigApi,
  getEsslConfigApi,

  addEsslDeviceApi,
  getEsslDevicesApi,

  syncEsslDeviceUsersApi,

  webPushRegisterApi
} from "../../helpers/backend_helper";

import {
  showLoader,
  hideLoader
} from '../loader/actions'

function* onValidateUser(action) {
  try {
    yield put(showLoader());
    const response = yield call(postValidateUser, action.payload.params);
    if (response.success) {
      yield put(hideLoader());
      yield put(getValidateUserSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(getValidateUserFail(response.error_message));
      yield call(action.payload.onError(response.error_message));
    }
  } catch (error) {

    yield put(hideLoader());
    yield put(getValidateUserFail("Invalid Request"));
    yield call(action.payload.onError(error));


  }
}

function* reSendOtp(action) {
  try {

    yield put(showLoader());

    const response = yield call(postResendLoginOtp, action.payload.params);

    if (response.success) {

      yield put(hideLoader());
      yield put(getResendLoginOtpSuccess(response.message));
      yield call(action.payload.onSuccess(response));


    } else {

      yield put(hideLoader());
      yield put(getResendLoginOtpFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));


    }
  } catch (error) {

    yield put(hideLoader());
    yield put(getResendLoginOtpFailure("Invalid Request"));
    yield call(action.payload.onError);


  }
}

function* loginOtp(action) {
  try {

    yield put(showLoader());

    const response = yield call(postOtpLogin, action.payload.params);
    if (response.success) {

      yield put(hideLoader());
      yield put(proceedSignInSuccess(response.details));
      yield call(action.payload.onSuccess(response.details));

    } else {

      yield put(hideLoader());
      yield put(proceedSignInFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));

    }
  } catch (error) {

    yield put(hideLoader());
    yield put(proceedSignInFailure("Invalid Request"));
    yield call(action.payload.onError(error));


  }
}

//Muthu

function* adminVerificationOtp(action) {
  try {

    yield put(showLoader());

    const response = yield call(postOtpLogin, action.payload.params);

    if (response.success) {

      yield put(hideLoader());
      yield put(getAdminVerificationOtpSuccess(response.message));
      yield call(action.payload.onSuccess(response.details));

    } else {

      yield put(hideLoader());
      yield put(getAdminVerificationOtpFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));

    }
  } catch (error) {

    yield put(hideLoader());
    yield put(getResendLoginOtpFailure("Invalid Request"));
    yield call(action.payload.onError(error));


  }
}

function* registerAdmin(action) {
  try {

    yield put(showLoader());

    const response = yield call(postRegisterAdmin, action.payload.params);

    if (response.success) {
      yield put(hideLoader());
      yield put(getRegisterAdminSuccess({ ...response, ...action.payload.params }));
      yield call(action.payload.onSuccess(response));

    } else {
      yield put(hideLoader());
      yield put(getRegisterAdminFailure(response.error_message));
      yield call(action.payload.onError(response.error));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getRegisterAdminFailure("Invalid Request"));
    yield call(action.payload.onError(error));
  }
}

function* registerCompany(action) {
  try {

    yield put(showLoader());

    const response = yield call(postRegisterCompany, action.payload.params);

    if (response.success) {
      yield put(hideLoader());
      yield put(getValidateCompanyDetailsSuccess(response.details));
      yield call(action.payload.onSuccess(response.details));

    } else {
      yield put(hideLoader());
      yield put(getValidateCompanyDetailsFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));
    }
  } catch (error) {

    yield put(hideLoader());
    yield put(getValidateCompanyDetailsFailure("Invalid Request"));
    yield call(action.payload.onError(error));
  }
}

function* uploadCompanyDocument(action) {
  try {

    yield put(showLoader());

    const response = yield call(postUploadCompanyDocument, action.payload.params);

    if (response.success) {

      yield put(hideLoader());
      yield put(uploadCompanyDocumentsSuccess(response.details));
      yield call(action.payload.onSuccess(response.details));

    } else {

      yield put(hideLoader());
      yield put(uploadCompanyDocumentsFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));

    }
  } catch (error) {

    yield put(hideLoader());
    yield put(uploadCompanyDocumentsFailure("Invalid Request"));
    yield call(action.payload.onError(error));


  }
}

function* getNatureOfBusiness(action) {
  try {

    yield put(showLoader());

    const response = yield call(fetchNatureOfBusiness, action.payload.params);

    if (response.success) {

      yield put(hideLoader());
      yield put(getNatureOfBusinessSuccess(response.details));
      yield call(action.payload.onSuccess(response.details));


    } else {

      yield put(hideLoader());
      yield put(getNatureOfBusinessFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));


    }
  } catch (error) {

    yield put(hideLoader());
    yield put(getNatureOfBusinessFailure("Invalid Request"));
    yield call(action.payload.onError(error));


  }
}

function* getTypeOfBusiness(action) {
  try {

    yield put(showLoader());

    const response = yield call(fetchTypeOfBusiness, action.payload.params);

    if (response.success) {

      yield put(hideLoader());
      yield put(getTypeOfBusinessSuccess(response.details));
      yield call(action.payload.onSuccess(response.details));


    } else {

      yield put(hideLoader());
      yield put(getTypeOfBusinessFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));


    }
  } catch (error) {

    yield put(hideLoader());
    yield put(getTypeOfBusinessFailure("Invalid Request"));
    yield call(action.payload.onError(error));


  }
}


// postAppConfigDetailsApi


function* postAppConfigDetailsSaga(action) {
  try {

    // yield put(showLoader());

    const response = yield call(postAppConfigDetailsApi, action.payload.params);

    if (response.success) {

      // yield put(hideLoader());
      yield put(postAppConfigSuccess(response.details));
      yield call(action.payload.onSuccess(response));


    } else {

      // yield put(hideLoader());
      yield put(postAppConfigFailure(response.error_message));
      yield call(action.payload.onError(response));


    }
  } catch (error) {

    // yield put(hideLoader());
    yield put(postAppConfigFailure("Invalid Request"));
    yield call(action.payload.onError(error));


  }
}

//set essl config

function* postEsslConfigSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(setEsslConfigApi, action.payload.params);

    if (response.success) {

      yield put(hideLoader());
      yield put(postEsslConfigSuccess(response));
      yield call(action.payload.onSuccess(response));


    } else {

      yield put(hideLoader());
      yield put(postEsslConfigFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));

    }
  } catch (error) {

    yield put(hideLoader());
    yield put(postEsslConfigFailure("Invalid Request"));
    yield call(action.payload.onError(error));


  }
}

//set essl config

function* fetchEsslConfigSaga(action) {
  try {

    yield put(showLoader());

    const response = yield call(getEsslConfigApi, action.payload.params);

    if (response.success) {

      yield put(hideLoader());
      yield put(getEsslConfigSuccess(response.details));
      yield call(action.payload.onSuccess(response));


    } else {

      yield put(hideLoader());
      yield put(getEsslConfigFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));

    }
  } catch (error) {

    yield put(hideLoader());
    yield put(getEsslConfigFailure("Invalid Request"));
    yield call(action.payload.onError(error));


  }
}

//add essl device

function* postAddEsslDeviceSaga(action) {
  try {

    yield put(showLoader());

    const response = yield call(addEsslDeviceApi, action.payload.params);

    if (response.success) {

      yield put(hideLoader());
      yield put(postAddEsslDeviceSuccess(response.details));
      yield call(action.payload.onSuccess(response.details));


    } else {

      yield put(hideLoader());
      yield put(postAddEsslDeviceFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));

    }
  } catch (error) {

    yield put(hideLoader());
    yield put(postAddEsslDeviceFailure("Invalid Request"));
    yield call(action.payload.onError(error));


  }
}

//get essl devices

function* fetchEsslDevicesSaga(action) {
  try {

    yield put(showLoader());

    const response = yield call(getEsslDevicesApi, action.payload.params);

    if (response.success) {

      yield put(hideLoader());
      yield put(fetchEsslDevicesSuccess(response.details));
      yield call(action.payload.onSuccess(response.details));

    } else {
      yield put(hideLoader());
      yield put(fetchEsslDevicesFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));

    }
  } catch (error) {

    yield put(hideLoader());
    yield put(fetchEsslDevicesFailure("Invalid Request"));
    yield call(action.payload.onError(error));


  }
}

//sync essl device users

function* syncEsslDeviceUsersSaga(action) {
  try {

    yield put(showLoader());

    const response = yield call(syncEsslDeviceUsersApi, action.payload.params);

    if (response.success) {

      yield put(hideLoader());
      yield put(syncEsslDeviceUsersSuccess(response.details));
      yield call(action.payload.onSuccess(response));

    } else {
      yield put(hideLoader());
      yield put(syncEsslDeviceUsersFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));

    }
  } catch (error) {

    yield put(hideLoader());
    yield put(syncEsslDeviceUsersFailure("Invalid Request"));
    yield call(action.payload.onError(error));


  }
}

//web push register

function* webPushRegisterSaga(action) {
  try {

    const response = yield call(webPushRegisterApi, action.payload.params);

    if (response.success) {
      yield put(hideLoader());
      yield put(webPushRegisterSuccess(response.details));
      yield call(action.payload.onSuccess(response));

    } else {
      yield put(hideLoader());
      yield put(webPushRegisterFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));

    }
  } catch (error) {
    yield put(hideLoader());
    yield put(webPushRegisterFailure("Invalid Request"));
    yield call(action.payload.onError(error));

  }
}

///watcher///

function* AuthSaga() {
  yield takeLatest(VALIDATE_USER, onValidateUser);
  yield takeLatest(RESEND_LOGIN_OTP, reSendOtp);
  yield takeLatest(OTP_LOGIN, loginOtp);
  yield takeLatest(REGISTER_ADMIN, registerAdmin);
  yield takeLatest(VALIDATE_COMPANY_DETAILS, registerCompany);
  yield takeLatest(UPLOAD_COMPANY_DOCUMENT, uploadCompanyDocument);
  yield takeLatest(NATURE_OF_BUSINESS, getNatureOfBusiness);
  yield takeLatest(TYPE_OF_BUSINESS, getTypeOfBusiness);
  yield takeLatest(ADMIN_VERIFICATION_OTP, adminVerificationOtp);
  yield takeLatest(POST_APP_CONFIG, postAppConfigDetailsSaga);

  yield takeLatest(SET_ESSL_CONFIG, postEsslConfigSaga);
  yield takeLatest(GET_ESSL_CONFIG, fetchEsslConfigSaga);
  // yield takeLatest(ADD_ESSL_DEVICE, postAddEsslDeviceSaga);
  yield takeLatest(GET_ESSL_DEVICES, fetchEsslDevicesSaga);
  yield takeLatest(SYNC_ESSL_DEVICE_USERS, syncEsslDeviceUsersSaga);
  yield takeLatest(WEB_PUSH_REGISTER, webPushRegisterSaga);





}

export default AuthSaga;