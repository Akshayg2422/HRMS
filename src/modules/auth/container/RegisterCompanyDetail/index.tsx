import React from "react";
import {
  Container,
  InputText,
  InputMail,
  InputDefault,
  InputNumber,
  DropDown,
} from "@components";
import {
  validateName,
  validateEmail,
  validateAadhar,
  validatePAN,
  validateDefault,
  validateMobileNumber,
  validateGST,
  validatePincode,
  validateAddress,
} from "@utils";

import { useAuth } from "@contexts";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

function RegisterCompanyDetail() {
  const { t } = useTranslation();
  const { natureOfBusiness, typeOfBusiness, } = useSelector(
    (state: any) => state.AuthReducer
  );

  const { setBusinessName,setBrandName,setCompanyPan,setCompanyGst,setCommunicationAddress,setPinCode,setCity,setState,setRefferalId} = useAuth();
  
  const {  setBusinessNature } = useAuth();
  const {  setBusinesType } = useAuth();

  return (
    <Container
      flexDirection={"row"}
      justifyContent={"justify-content-center"}
    >
      <InputText
        label={t("businessName")}
        placeholder={t("enteryourbussinessname")}
        validator={validateDefault}
        onChange={(e) => {
          if (setBusinessName) {
            setBusinessName(e.target.value);
          }
        }}
      />
      <InputText
        label={t("brandName")}
        placeholder={t("typeYourBrandName")}
        validator={validateDefault}
        onChange={(e) => {
          if (setBrandName) {
            setBrandName(e.target.value);
          }
        }}
      />
      <DropDown
        label={t("tBusiness")}
        placeholder={t("tBusiness")}
        data={typeOfBusiness}
        onChange={(event) => {
          if (setBusinesType) {
            setBusinesType(event.target.value);
          }
        }}
      />
      <DropDown
        label={t("nBusiness")}
        placeholder={t("nBusiness")}
        data={natureOfBusiness}
        onChange={(event) => {
          if (setBusinessNature) {
            setBusinessNature(event.target.value);
          }
        }}
      />
      <InputDefault
        label={t("cPan")}
        placeholder={t("typeCPan")}
        validator={validatePAN}
        maxLength={10}
        onChange={(e) => {
          if (setCompanyPan) {
            setCompanyPan(e.target.value);
          }
        }}
      />
      <InputDefault
        label={t("gst")}
        placeholder={t("typeGst")}
        validator={validateGST}
        maxLength={15}
        onChange={(e) => {
          if (setCompanyGst) {
            setCompanyGst(e.target.value);
          }
        }}
      />
      <InputText
        label={t("address")}
        placeholder={t("typeAddress")}
        validator={validateAddress}
        maxLength={160}
        onChange={(e) => {
          if (setCommunicationAddress) {
            setCommunicationAddress(e.target.value);
          }
        }}
      />
      <InputNumber
        label={t("pinCode")}
        placeholder={t("typepinCode")}
        maxLength={10}
        validator={validatePincode}
        onChange={(e) => {
          if (setPinCode) {
            setPinCode(e.target.value);
          }
        }}
      />
      <InputText
        label={t("city")}
        placeholder={t("typecity")}
        validator={validateDefault}
        maxLength={20}
        onChange={(e) => {
          if (setCity) {
            setCity(e.target.value);
          }
        }}
      />
      <InputText
        label={t("state")}
        placeholder={t("typeState")}
        validator={validateDefault}
        maxLength={10}
        onChange={(e) => {
          if (setState) {
            setState(e.target.value);
          }
        }}
      />
      <InputText
        label={t("referralId")}
        placeholder={t("typeReferral")}
        onChange={(e) => {
          if (setRefferalId) {
            setRefferalId(e.target.value);
          }
        }}
      />
    </Container>
  );
}
export default RegisterCompanyDetail;