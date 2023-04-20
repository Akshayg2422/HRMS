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
  inputTextMaxLength,
  dropDownValueCheck,
  MAX_LENGTH_PAN_CARD,
} from "@utils";

import { useAuth } from "@contexts";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { updateCompanyInput } from "../../../../store/auth/actions";

function RegisterCompanyDetail() {
  const { t } = useTranslation();
  let dispatch = useDispatch();

  const { natureOfBusiness, typeOfBusiness, registerCompanyDetails } = useSelector(
    (state: any) => state.AuthReducer
  );

  return (
    <Container
      justifyContent={"justify-content-center"}
    >
      <InputText
        label={t("businessName")}
        placeholder={t("enteryourbussinessname")}
        validator={validateDefault}
        onChange={(e) => dispatch(updateCompanyInput('businessName', e.target.value))}

      />
      <InputText
        label={t("brandName")}
        placeholder={t("typeYourBrandName")}
        validator={validateDefault}
        onChange={(e) => dispatch(updateCompanyInput('brandName', e.target.value))}

      />
      <DropDown
        label={t("tBusiness")}
        placeholder={t("tBusiness")}
        data={typeOfBusiness}
        onChange={(e) => dispatch(updateCompanyInput('businesType', dropDownValueCheck(e.target.value, t("tBusiness"))))}

      />
      <DropDown
        label={t("nBusiness")}
        placeholder={t("nBusiness")}
        data={natureOfBusiness}
        onChange={(e) => dispatch(updateCompanyInput('businessNature', dropDownValueCheck(e.target.value, t("nBusiness"))))}

      />
      <InputDefault
        label={t("cPan")}
        placeholder={t("typeCPan")}
        validator={validatePAN}
        maxLength={10}
        onChange={(e) => dispatch(updateCompanyInput('companyPan', inputTextMaxLength(e.target.value, MAX_LENGTH_PAN_CARD)))}

      />
      <InputDefault
        label={t("gst")}
        placeholder={t("typeGst")}
        validator={validateGST}
        maxLength={15}
        onChange={(e) => dispatch(updateCompanyInput('companyGst', inputTextMaxLength(e.target.value, 15)))}

      />
      <InputText
        label={t("address")}
        placeholder={t("typeAddress")}
        validator={validateAddress}
        maxLength={160}
        onChange={(e) => dispatch(updateCompanyInput('communicationAddress', e.target.value))}

      />
      <InputNumber
        label={t("pinCode")}
        placeholder={t("typepinCode")}
        value={registerCompanyDetails.pinCode}
        validator={validatePincode}
        onChange={(e) => dispatch(updateCompanyInput('pinCode', inputTextMaxLength(e.target.value, 6)))}

      />
      <InputText
        label={t("city")}
        placeholder={t("typecity")}
        validator={validateDefault}
        maxLength={20}
        onChange={(e) => dispatch(updateCompanyInput('city', e.target.value))}

      />
      <InputText
        label={t("state")}
        placeholder={t("typeState")}
        validator={validateDefault}
        maxLength={10}
        onChange={(e) => dispatch(updateCompanyInput('state', e.target.value))}

      />
      <InputText
        label={t("referralId")}
        placeholder={t("typeReferral")}
        onChange={(e) => dispatch(updateCompanyInput('refferalId', e.target.value))}

      />
    </Container>
  );
}
export default RegisterCompanyDetail;