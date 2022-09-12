import React from "react";
import {
  Container,
  InputMail,
  InputNumber,
  InputText,
  DropDown,
  InputDefault,
} from "@components";

import { GENDER_LIST } from "@utils";
import {
  validateName,
  validateEmail,
  validateAadhar,
  validatePAN,
  validateDefault,
  validateMobileNumber,
} from "@utils";
import {useTranslation} from "react-i18next";


import { useAuth } from "@contexts";

function RegisterUserDetail() {
 const {t,i18n}=useTranslation()

  const {setRegisterMobileNumber,setE_mail,setFirstName,setDesignation,setPan,setAadharNumber,setGender,setLastName } = useAuth();

  return (
    <Container
      flexDirection={"row"}
      col={"col-12"}
      justifyContent={"justify-content-center"}
    >
      <InputText
        label={t('firstName')}
        placeholder={t('typeYourName')}
        maxLength={20}
        validator={validateName}
        onChange={(e) => {
          if (setFirstName) {
            setFirstName(e.target.value);
          }
        }}
      />
      <InputText
        label={t('lastName')}
        placeholder={t('typeLastName')}
        maxLength={20}
        validator={validateDefault}
        onChange={(e) => {
          if (setLastName) {
            setLastName(e.target.value);
          }
        }}
      />
      <InputNumber
        label={t('mobileNumber')}
        placeholder={t('enterYourMobileNumber')}
        validator={validateMobileNumber}
        maxLength={10}
        onChange={(e) => {
          if (setRegisterMobileNumber) {
            setRegisterMobileNumber(e.target.value);
          }
        }}
      />
      <InputMail
        type={"email"}
        label={t('companyEmail')}
        placeholder={t('companyEmail')}
        validator={validateEmail}
        onChange={(e) => {
          if (setE_mail) {
            setE_mail(e.target.value);
          }
        }}
      />
      <DropDown
        label={t('gender')}
        placeholder={t('selectYourGender')}
        data={GENDER_LIST}
        onChange={ (event) =>{
          if (setGender) {
            setGender(event.target.value);
          }
        }
        }
      />
      <InputText
        label={t('designation')}
        placeholder={t('enterDesignation')}
        validator={validateDefault}
        maxLength={10}
        onChange={(e) => {
          if (setDesignation) {
            setDesignation(e.target.value);
          }
        }}
      />
      <InputDefault
        label={t('pan')}
        placeholder={t('typeYourPanNo')}
        validator={validatePAN}
        maxLength={10}
        onChange={(e) => {
          if (setPan) {
            setPan(e.target.value);
          }
        }}
      />
      <InputNumber
        label={t('aadhar')}
        placeholder={t('typeypurAadharNo')}
        validator={validateAadhar}
        maxLength={12}
        onChange={(e) => {
          if (setAadharNumber) {
            setAadharNumber(e.target.value);
          }
        }}
      />
    </Container>
  );
}

export default RegisterUserDetail;

