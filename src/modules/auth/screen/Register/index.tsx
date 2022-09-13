import React, { useEffect, useState } from "react";
import {
  WelcomeBoard,
  Container,
  Logo,
  Secondary,
  ScreenTitle,
  Primary,
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
} from "../../../../store/auth/actions";
import Otp from "../RegisterOtp";
import {
  getRegisterAdmin,
  getValidateCompanyDetails,
  getAdminVerificationOtp,
  uploadCompanyDocuments,
} from "../../../../store/auth/actions";

function SignUp() {
  const { t, i18n } = useTranslation();
  let dispatch = useDispatch();

  const {
    natureOfBusiness,
    typeOfBusiness,
    registerCurrentContainer,
    mobileNumber,
  } = useSelector((state: any) => state.AuthReducer);

  const REGISTER_USER_DETAILS = 1;
  const MOBILE_NUMBER_VERIFICATION = 2;
  const REGISTER_COMPANY_DETAILS = 3;
  const REGISTER_DOCUMENT_UPLOAD = 4;

  const {
    firstName,
    lastName,
    e_mail,
    pan,
    registerMobileNumber,
    aadharNumber,
    designation,
    gender,
    businessName,
    brandName,
    companyPan,
    companyGst,
    communicationAddress,
    pinCode,
    city,
    state,
    refferalId,
    otp1,
    otp2,
    otp3,
    otp4,
    businesType,
    businessNature,
    fileUpload,
  } = useAuth();

  const navigation = useNav();

  const proceedNext = () => {
    if (registerCurrentContainer === REGISTER_USER_DETAILS) {
      proceedUserDetailsApi();
    } else if (registerCurrentContainer === MOBILE_NUMBER_VERIFICATION) {
      proceedVerifyOtpApi();
    } else if (registerCurrentContainer === REGISTER_COMPANY_DETAILS) {
      proceedCompanyDetailsApi();
    } else if (registerCurrentContainer === REGISTER_DOCUMENT_UPLOAD) {
    }
  };

  useEffect(() => {
    dispatch(getNatureOfBusiness({}));
    dispatch(getTypeOfBusiness({}));
  }, []);

  const validateUserDetailsParams = () => {
    return (
      validateName(firstName).status &&
      validateDefault(lastName).status &&
      validateMobileNumber(registerMobileNumber).status &&
      validateEmail(e_mail).status &&
      validatePAN(pan).status &&
      validateAadhar(aadharNumber).status &&
      validateDefault(designation).status &&
      gender !== ""
    );
  };

  const validateCompanyDetailsParams = () => {
    console.log(
      validateDefault(businessName).status +
        "=====" +
        validateDefault(brandName).status +
        "======" +
        validatePAN(companyPan).status +
        "======" +
        validateGST(companyGst).status +
        "=======" +
        validateAddress(communicationAddress).status +
        "======" +
        validatePincode(pinCode).status +
        "=======" +
        validateDefault(city).status +
        "======" +
        (businesType !== "") +
        "=======" +
        (businessNature !== "") +
        "====="
    );

    return (
      validateDefault(businessName).status &&
      validateDefault(brandName).status &&
      validatePAN(companyPan).status &&
      validateGST(companyGst).status &&
      validateAddress(communicationAddress).status &&
      validatePincode(pinCode).status &&
      validateDefault(city).status &&
      businesType !== "" &&
      businessNature !== ""
    );
  };

  const verifyOTP = (params: object) => {
    dispatch(
      getAdminVerificationOtp({
        params,
        onSuccess: async (response: object) => {
          const value = {
            userLoggedIn: false,
            userDetails: response,
            mobileNumber,
          };
          const jsonValue = JSON.stringify(value);
          await localStorage.setItem(ASYN_USER_AUTH, jsonValue);
        },
        onError: (error: string) => {
          showToast("error",t("invalidUser"));
        },
      })
    );
  };

  const validatePostParams = () => {
    const otpConvertor = otp1 + otp2 + otp3 + otp4;
    return (
      validateMobileNumber(mobileNumber).status && otpConvertor.length === 4
    );
  };

  const proceedVerifyOtpApi = () => {
    if (validatePostParams()) {
      const otpConvertor = otp1 + otp2 + otp3 + otp4;
      if (otpConvertor.length === 4) {
        const params = {
          mobile_number: mobileNumber,
          otp: otpConvertor,
        };
        verifyOTP(params);
      }
    } else {
      showToast("error", t("somethingWrong"));
    }
  };

  const proceedUserDetailsApi = () => {
    if (validateUserDetailsParams()) {
      const params = {
        first_name: firstName,
        last_name: lastName,
        mobile_number: registerMobileNumber,
        email: e_mail,
        gender: gender,
        designation: designation,
        pan: pan,
        aadhar_number: aadharNumber,
      };
      console.log(JSON.stringify(params));

      dispatch(getRegisterAdmin({ params }));
    } else {
      showToast("error", t("formInvalidParams"));
    }
  };

  const proceedCompanyDetailsApi = () => {
    if (validateCompanyDetailsParams()) {
      const params = {
        registered_name: businessName,
        business_name: brandName,
        business_type_id: businesType,
        nature_of_business_id: businessNature,
        pan: companyPan,
        gst: companyGst,
        communication_address: communicationAddress,
        pincode: pinCode,
        city: city,
        state: state,
        referral_id: refferalId,
      };
      console.log("company details params--->", params);

      dispatch(
        getValidateCompanyDetails({
          params,
          onSuccess: async (response: object) => {
            let current = await localStorage.getItem(ASYN_USER_AUTH);
            if (current) {
              const jsonValue: object = JSON.parse(current);
              const value = JSON.stringify({
                ...jsonValue,
                userLoggedIn: true,
              });
              await localStorage.setItem(ASYN_USER_AUTH, value);
              goTo(navigation, ROUTE.ROUTE_DASHBOARD);
            }
          },
          onError: (error: string) => {},
        })
      );
    } else {
      showToast("error",  t("formInvalidParams"));
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
          onSuccess: async (response: object) => {
            goTo(navigation, ROUTE.ROUTE_DASHBOARD);
          },
          onError: (error: string) => {},
        })
      );
    }
  };

  return (
    <Container flexDirection={"row"} height={"vh-100"} width={"vw-100"}>
      <WelcomeBoard />
      <Container
        col={"col"}
        display={"d-inline-flex"}
        flexDirection={"flex-column"}
      >
        <Container
          display={"d-inline-flex"}
          justifyContent={"justify-content-between"}
          additionClass={"container-fluid"}
          margin={"mt-4"}
        >
          <Container>
            <Logo />
          </Container>
          <Secondary text={t("login")} />
        </Container>
        <RegisterFlow
          current={
            registerCurrentContainer === 2 ? 1 : registerCurrentContainer
          }
        />
        <Container
          additionClass={
            "scrollable-register col-xl-9 col-md-12 d-flex flex-column aligns-item-center  align-self-center justify-content-center mt-2 mb-5"
          }
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
        <div className="position-absolute fixed-bottom  d-flex aligns-item-center justify-content-center my-1">
          <Primary
            additionClass={"col-6"}
            text={t("submit")}
            onClick={proceedNext}
          />
        </div>
      </Container>
    </Container>
  );
}

export default SignUp;
