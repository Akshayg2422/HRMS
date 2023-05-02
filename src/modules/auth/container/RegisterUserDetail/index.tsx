import React from "react";
import {
  Container,
  InputMail,
  InputNumber,
  InputText,
  DropDown,
  InputDefault,
} from "@components";

import { dropDownValueCheck, GENDER_LIST, inputAadharLength, inputNumberMaxLength, MAX_LENGTH_AADHAR, MAX_LENGTH_PAN_CARD, MAX_LENGTH_MOBILE_NUMBER, inputTextMaxLength } from "@utils";
import {
  validateName,
  validateEmail,
  validateAadhar,
  validatePAN,
  validateDefault,
  validateMobileNumber,
} from "@utils";
import { useTranslation } from "react-i18next";
import { updateAdminInput } from '../../../../store/auth/actions'
import { useDispatch, useSelector } from "react-redux";

function RegisterUserDetail() {
  const {
    registerAdminDetails,
  } = useSelector((state: any) => state.AuthReducer);


  const { t, i18n } = useTranslation()
  let dispatch = useDispatch();

  return (
    <Container>
      <InputText
        label={t('firstName')}
        placeholder={t('typeYourName')}
        maxLength={20}
        validator={validateName}
        name={'firstName'}
        onChange={(e) => dispatch(updateAdminInput('firstName', e.target.value))}
      />
      <InputText
        label={t('lastName')}
        placeholder={t('typeLastName')}
        maxLength={20}
        validator={validateDefault}
        name={'lastName'}
        onChange={(e) => dispatch(updateAdminInput('lastName', e.target.value))}
      />
      <InputNumber
        label={t('mobileNumber')}
        placeholder={t('enterYourMobileNumber')}
        validator={validateMobileNumber}
        // maxLength={10}
        value={registerAdminDetails.mobileNumber}
        name={'mobileNumber'}
        onChange={(e) => dispatch(updateAdminInput('mobileNumber', inputNumberMaxLength(e.target.value, MAX_LENGTH_MOBILE_NUMBER)))}
      />
      <InputMail
        type={"email"}
        label={t('companyEmail')}
        placeholder={t('companyEmail')}
        validator={validateEmail}
        onChange={(e) => dispatch(updateAdminInput('eMail', e.target.value))}

      />
      <DropDown
        label={t('gender')}
        placeholder={t('selectYourGender')}
        data={GENDER_LIST}
        onChange={(e) => dispatch(updateAdminInput('gender', dropDownValueCheck(e.target.value, t('selectYourGender'))))}

      />
      <InputText
        label={t('designation')}
        placeholder={t('enterDesignation')}
        validator={validateDefault}
        maxLength={20}
        onChange={(e) => dispatch(updateAdminInput('designation', e.target.value))}
      />
      <InputDefault
        label={t('pan')}
        placeholder={t('typeYourPanNo')}
        validator={validatePAN}
        value={registerAdminDetails.pan}
        onChange={(e) => dispatch(updateAdminInput('pan', inputTextMaxLength(e.target.value, MAX_LENGTH_PAN_CARD)))}
      />
      <InputNumber
        label={t('aadhar')}
        placeholder={t('typeypurAadharNo')}
        validator={validateAadhar}
        name={'aadhaar'}
        value={registerAdminDetails.aadhaar}
        onChange={(e) => dispatch(updateAdminInput('aadhaar', inputAadharLength(e.target.value, MAX_LENGTH_AADHAR)))}
      />
    </Container>
  );
}

export default RegisterUserDetail;

