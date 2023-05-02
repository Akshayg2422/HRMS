import React, { useEffect, useState } from "react";
import {
  WelcomeBoard,
  Container,
  Logo,
  Secondary,
  ScreenTitle,
  Primary,
  useKeyPress,

} from "@components";
import {
  RegisterUserDetail,
  RegisterCompanyDetail,
  RegisterFlow,
  RegisterDocumentUpload,
} from "../../container";
import "./register.css";

import { useAuth } from "@contexts";

import {
  validateName,
  validateDefault,
  validateMobileNumber,
  validateEmail,
  validatePAN,
  validateAadhar,
  validateGST,
  validateAddress,
  validatePincode,
  showToast,
  ASYN_USER_AUTH,
  goTo,
  useNav,
  ROUTE,
} from "@utils";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import {
  getNatureOfBusiness,
  getTypeOfBusiness,
  registerOtpVerify,
  updateAdminInput,
  updateCompanyInput,
} from "../../../../store/auth/actions";
import Otp from "../RegisterOtp";
import {
  getRegisterAdmin,
  getValidateCompanyDetails,
  getAdminVerificationOtp,
  uploadCompanyDocuments,
} from "../../../../store/auth/actions";
import { setUserLoginDetails } from "../../../../store/app/actions";
import { DynamicHeight } from "@components";

function SignUp() {
  const { t, i18n } = useTranslation();
  let dispatch = useDispatch();
  const enterPress = useKeyPress("Enter");

  const [screenSize, getDimension] = useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight
  });

  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight
    })
  }

  useEffect(() => {
    window.addEventListener('resize', setDimension);

    return (() => {
      window.removeEventListener('resize', setDimension);
    })
  }, [screenSize])


  const {
    registerCurrentContainer,
    mobileNumber, registerAdminDetails, registerOtp, registerCompanyDetails, fileUpload
  } = useSelector((state: any) => state.AuthReducer);

  const REGISTER_USER_DETAILS = 1;
  const MOBILE_NUMBER_VERIFICATION = 2;
  const REGISTER_COMPANY_DETAILS = 3;
  const REGISTER_DOCUMENT_UPLOAD = 4;


  const navigation = useNav();

  const proceedNext = () => {
    if (registerCurrentContainer === REGISTER_USER_DETAILS) {
      proceedUserDetailsApi();
    } else if (registerCurrentContainer === MOBILE_NUMBER_VERIFICATION) {
      proceedVerifyOtpApi();
    } else if (registerCurrentContainer === REGISTER_COMPANY_DETAILS) {
      proceedCompanyDetailsApi();
    } else if (registerCurrentContainer === REGISTER_DOCUMENT_UPLOAD) {
      proceedDocumentUploadAPi();
    }
  };

  useEffect(() => {
    natureOfBusiness()
    typeOfBusiness()
  }, []);


  useEffect(() => {
    if (enterPress) {
      proceedNext()
    }
  }, [enterPress])

  const natureOfBusiness = () => {
    const params = {}

    dispatch(getNatureOfBusiness({
      params,
      onSuccess: (success: any) => () => {

      },
      onError: (error: any) => () => {

      }
    }));
  }

  const typeOfBusiness = () => {
    const params = {}
    dispatch(getTypeOfBusiness({
      params,
      onSuccess: (success: any) => () => {
      },
      onError: (error: any) => () => {

      }
    }));
  }


  const validateUserDetailsParams = () => {
    if (validateName(registerAdminDetails.firstName).status === false) {
      showToast("error", t("invalidName"));
      return false;
    }
    // else if (
    //   validateDefault(registerAdminDetails.lastName).status === false
    // ) {
    //   showToast("error", t(""));
    //   return false;
    // }
    else if (
      validateMobileNumber(registerAdminDetails.mobileNumber).status === false
    ) {
      showToast("error", t("invalidNumber"));
      return false;
    } else if (validateEmail(registerAdminDetails.eMail).status === false) {
      showToast("error", t("invalidEmail"));
      return false;
    } else if (validateDefault(registerAdminDetails.designation).status === false) {
      showToast("error", t("invalidDesignation"));
      return false;
    } else if (!registerAdminDetails.gender) {
      showToast("error", t("invalidGender"));
      return false;
    } else if (validateAadhar(registerAdminDetails.aadhaar).status === false) {
      showToast("error", t("InvalidAadhaar"));
      return false;
    }
    else if (validatePAN(registerAdminDetails.pan).status === false) {
      showToast("error", t("InvaliadPan"));
      return false;
    }
    else {
      return true;
    }
  };


  const validateCompanyDetailsParams = () => {
    if (validateDefault(registerCompanyDetails.businessName).status === false) {
      showToast("error", t("inValidBusinessName"));
      return false
    } else if (validateDefault(registerCompanyDetails.brandName).status === false) {
      showToast("error", t("inValidBrandName"));
      return false
    }
    else if (!validatePAN(registerCompanyDetails.companyPan).status) {
      showToast("error", t("invalidPan"));
      return false
    }
    else if (!validateGST(registerCompanyDetails.companyGst).status) {
      showToast("error", t("invalidGst"));
      return false
    }
    else if (!validateAddress(registerCompanyDetails.communicationAddress).status) {
      showToast("error", t("invalidAddress"));
      return false
    }
    else if (!validatePincode(registerCompanyDetails.pinCode).status) {
      showToast("error", t("invalidPincode"));
      return false
    }
    else if (!validateDefault(registerCompanyDetails.city).status) {
      showToast("error", t("invalidCity"));
      return false
    }
    else if (!validateDefault(registerCompanyDetails.state).status) {
      showToast("error", t("invalidState"));
      return false
    }
    else if (registerCompanyDetails.businesType === "") {
      showToast("error", t("inValidBusinessType"));
      return false
    }
    else if (registerCompanyDetails.businessNature === "") {
      showToast("error", t("inValidNatureBusiness"));
      return false
    } else {
      return true
    }
  };

  const verifyOTP = (params: object) => {
    dispatch(
      getAdminVerificationOtp({
        params,
        onSuccess: (response: any) => async () => {
          const value = { userLoggedIn: true, token: response.token, userDetails: response, mobileNumber: mobileNumber }
          dispatch(setUserLoginDetails(value))
          await localStorage.setItem(ASYN_USER_AUTH, response.token);
          dispatch(registerOtpVerify({}))
        },
        onError: (error: string) => () => {
          showToast("error", error);
        },
      })
    );
  };


  const validatePostParams = () => {
    const otpConvertor = registerOtp.otp1 + registerOtp.otp2 + registerOtp.otp3 + registerOtp.otp4;

    if (validateMobileNumber(mobileNumber).status === false) {
      showToast("error", t("invalidNumber"));
      return false;
    }
    else if (otpConvertor.length !== 4) {
      showToast("error", t("invalidOTP"));
    }
    else {
      return true;
    }
  };

  const proceedVerifyOtpApi = () => {
    if (validatePostParams()) {
      const otpConvertor = registerOtp.otp1 + registerOtp.otp2 + registerOtp.otp3 + registerOtp.otp4;
      if (otpConvertor.length === 4) {
        const params = {
          mobile_number: mobileNumber,
          otp: otpConvertor,
        };
        verifyOTP(params);
      }
    }
  };

  const proceedUserDetailsApi = () => {
    if (validateUserDetailsParams()) {
      const params = {
        first_name: registerAdminDetails.firstName,
        last_name: registerAdminDetails.lastName,
        mobile_number: registerAdminDetails.mobileNumber,
        email: registerAdminDetails.eMail,
        gender: registerAdminDetails.gender,
        designation: registerAdminDetails.designation,
        pan: registerAdminDetails.pan,
        aadhar_number: registerAdminDetails.aadhaar,
      };
      dispatch(getRegisterAdmin({
        params,
        onSuccess: (response: object) => () => {
          dispatch(updateAdminInput({}))
        },
        onError: (errorRes: any) => () => {
          showToast('error', errorRes)
        },
      }));
    }
  };

  const proceedCompanyDetailsApi = () => {
    if (validateCompanyDetailsParams()) {
      const params = {
        registered_name: registerCompanyDetails.businessName,
        business_name: registerCompanyDetails.brandName,
        business_type_id: registerCompanyDetails.businesType,
        nature_of_business_id: registerCompanyDetails.businessNature,
        pan: registerCompanyDetails.companyPan,
        gst: registerCompanyDetails.companyGst,
        communication_address: registerCompanyDetails.communicationAddress,
        pincode: registerCompanyDetails.pinCode,
        city: registerCompanyDetails.city,
        state: registerCompanyDetails.state,
        referral_id: registerCompanyDetails.refferalId,
      };
      dispatch(
        getValidateCompanyDetails({
          params,
          onSuccess: (response: object) => async () => {
            let current = await localStorage.getItem(ASYN_USER_AUTH);
            if (current) {
              const jsonValue: object = JSON.parse(current);
              const value = JSON.stringify({
                ...jsonValue,
                userLoggedIn: true,
              });
              await localStorage.setItem(ASYN_USER_AUTH, value);
            }
            dispatch(updateCompanyInput({}))
          },
          onError: (error: string) => () => {
            showToast('error', error)
          },
        })
      );
    }
  };


  const proceedDocumentUploadAPi = () => {
    let params: object = {};

    if (fileUpload) {
      for (let i = 0; i < fileUpload.length; i++) {
        const base64 = fileUpload[i].base64;
        const param = fileUpload[i].param;
        if (base64) {
          params = { ...params, [param]: base64 };
        }
      }

      dispatch(
        uploadCompanyDocuments({
          params,
          onSuccess: (response: object) => () => {
            goTo(navigation, ROUTE.ROUTE_LOGIN, true);
          },
          onError: (error: string) => () => {
            showToast("error", error);
          },
        })
      );
    }
  };

  return (
    <Container additionClass="m-0 p-0" flexDirection={"row"} height={"vh-100"} width={"vw-100"}>
      <WelcomeBoard />
      <Container additionClass="col-xl-6">
        <Container additionClass="d-flex container-fluid justify-content-between my-3">
          <Container>
            <Logo />
          </Container>
          <Secondary text={t("login")} onClick={() =>
            goTo(navigation, ROUTE.ROUTE_LOGIN)
          } />
        </Container>
        <Container additionClass="aligns-item-center d-flex container ml-sm-0 ml--5 px-sm-0 px-3  ml-xl-5 my-4 justify-content-center" >
          <RegisterFlow
            current={
              registerCurrentContainer === 2 ? 1 : registerCurrentContainer
            }
          />
        </Container>
        <Container additionClass={`${registerCurrentContainer !== MOBILE_NUMBER_VERIFICATION && 'scrollable-register'} d-flex aligns-item-center overflow-auto scroll-hidden  justify-content-center`}
          style={{ height: registerCurrentContainer !== MOBILE_NUMBER_VERIFICATION ? screenSize.dynamicHeight - 270 : '' }}
        >
          <Container
            additionClass={"col-xl-9 col-md-9 col-sm-3"}
          >
            {registerCurrentContainer === REGISTER_USER_DETAILS && (
              <RegisterUserDetail />
            )}
            {registerCurrentContainer === MOBILE_NUMBER_VERIFICATION && <Otp />}
            {registerCurrentContainer === REGISTER_COMPANY_DETAILS && (
              <RegisterCompanyDetail />
            )}
            {registerCurrentContainer === REGISTER_DOCUMENT_UPLOAD && (
              <RegisterDocumentUpload />
            )}
          </Container>
        </Container>
        <Container additionClass={'text-center my-4'}>
          <Primary
            additionClass={"col-6"}
            text={t("submit")}
            onClick={proceedNext}
          />
        </Container>
      </Container>
    </Container>
  );
}

export default SignUp;
