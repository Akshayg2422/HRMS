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
  ADMIN_VERIFICATION_OTP} from "./actionTypes";

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
  getAdminVerificationOtpFailure
  
} from "./actions";

import {
  postValidateUser,
  postResendLoginOtp,
  postOtpLogin,
  postRegisterCompany,
  postRegisterAdmin,
  postUploadCompanyDocument,
  fetchNatureOfBusiness,
  fetchTypeOfBusiness
} from "../../helpers/backend_helper";

function* onValidateUser(action) {
  try {
    const response = yield call(postValidateUser, action.payload.params);
    console.log(JSON.stringify(response)+"======");
    if (response.success) {
      yield put(getValidateUserSuccess(response));
      yield call(action.payload.onSuccess);
    } else {
      yield put(getValidateUserFail(response.error_message));
      yield call(action.payload.onError);

    }
  } catch (error) {
    yield put(getValidateUserFail("Invalid Request"));
  }
}

function* reSendOtp(action) {
  try {
    const response = yield call(postResendLoginOtp, action.payload.params);
    console.log(JSON.stringify(response));
    if (response.success) {
      console.log("resend otp successfully",response)
      
      yield put(getResendLoginOtpSuccess(response.message));
    } else {
      yield put(getResendLoginOtpFailure(response.error_message));
    }
  } catch (error) {
    yield put(getResendLoginOtpFailure("Invalid Request"));
  }
}

function* loginOtp(action) {
  try {
    const response = yield call(postOtpLogin, action.payload.params);
    if (response.success) {
      yield put(proceedSignInSuccess(response.details));
      yield call(action.payload.onSuccess(response.details));
    } else {
      yield put(proceedSignInFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));

    }
  } catch (error) {
    yield put(proceedSignInFailure("Invalid Request"));
  }
}

//Muthu

function* adminVerificationOtp(action) {
  try {
    const response = yield call(postOtpLogin, action.payload.params);
    if (response.success) {      
      yield put(getAdminVerificationOtpSuccess(response.message));
      yield call(action.payload.onSuccess(response.details));
    } else {
      yield put(getAdminVerificationOtpFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));
    }
  } catch (error) {
    yield put(getResendLoginOtpFailure("Invalid Request"));
  }
}

function* registerAdmin(action) {
  try {
    const response = yield call(postRegisterAdmin, action.payload.params);
    console.log(JSON.stringify(response)+"====response");
    if (response.success) {
      yield put(getRegisterAdminSuccess({...response,...action.payload.params}));
    } else {
      yield put(getRegisterAdminFailure(response.error_message)
      );
    }
  } catch (error) {
    yield put(getRegisterAdminFailure("Invalid Request"));
  }
}

function* registerCompany(action) {
  try {
    const response = yield call(postRegisterCompany, action.payload.params);
    console.log("dsdsdsdsdsds---------->"+ JSON.stringify(response));
    if (response.success) {
      yield put(getValidateCompanyDetailsSuccess(response.details));
      yield call(action.payload.onSuccess(response.details));
    } else {
      yield put(getValidateCompanyDetailsFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));
    }
  } catch (error) {
    console.log("dsdsdsdsdsds"+error);
    yield put(getValidateCompanyDetailsFailure("Invalid Request"));
  }
}

function* uploadCompanyDocument(action) {
  try {
    const response = yield call(postUploadCompanyDocument, action.payload.params);
    console.log(JSON.stringify(response)+"+==============uploadCompanyDocument");
    if (response.success) {
      yield put(uploadCompanyDocumentsSuccess(response.details));
      yield call(action.payload.onSuccess());
    } else {
      yield put(uploadCompanyDocumentsFailure(response.error_message));
      yield call(action.payload.onError());
    }
  } catch (error) {
    yield put(uploadCompanyDocumentsFailure("Invalid Request"));
  }
}

function* getNatureOfBusiness(action) {
  try {
    const response = yield call(fetchNatureOfBusiness, action.payload.params);
    if (response.success) {
      yield put(getNatureOfBusinessSuccess(response.details));
    } else {
      yield put(getNatureOfBusinessFailure(response.error_message));
    }
  } catch (error) {
    yield put(getNatureOfBusinessFailure("Invalid Request"));
  }
}

function* getTypeOfBusiness(action) {
  try {
    const response = yield call(fetchTypeOfBusiness, action.payload.params);
    if (response.success) {
      yield put(getTypeOfBusinessSuccess(response.details));
    } else {
      yield put(getTypeOfBusinessFailure(response.error_message));
    }
  } catch (error) {
    yield put(getTypeOfBusinessFailure("Invalid Request"));
  }
}

///watcher///
function* AuthSaga() {
  yield takeLatest(VALIDATE_USER, onValidateUser);
  yield takeLatest(RESEND_LOGIN_OTP, reSendOtp);
  yield takeLatest(OTP_LOGIN, loginOtp);
  //Muthu
  yield takeLatest(REGISTER_ADMIN, registerAdmin);
  yield takeLatest(VALIDATE_COMPANY_DETAILS, registerCompany);
  yield takeLatest(UPLOAD_COMPANY_DOCUMENT, uploadCompanyDocument);
  yield takeLatest(NATURE_OF_BUSINESS, getNatureOfBusiness);
  yield takeLatest(TYPE_OF_BUSINESS, getTypeOfBusiness);
  yield takeLatest(ADMIN_VERIFICATION_OTP, adminVerificationOtp);
}

export default AuthSaga;