import { useState } from "react";
import { Button, InputItem, DropDown } from "../../../../components";
import { RegisterHeader, LogoHeader } from "../index";
const RegisterCompany = () => {
  const [businessname, Setbusinessname] = useState("");
  const [brandname, Setbrandname] = useState("");
  const [businesstype, setbusinesstype] = useState("");
  const [businessnature, setbusinessnature] = useState("");
  const [companypan, setcompanypan] = useState("");
  const [companygst, setcompanygst] = useState("");
  const [communicationaddress, setcommunicationaddress] = useState("");
  const [pincode, setpincode] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [noofemployees, setnoofemployees] = useState("");
  const [bankserviceprovider,setbankserviceprovider] = useState("");
  const [annualturnover,setannualturnover] = useState("");
  const [referralid,setreferralid] = useState("");

  const validateName = (value) => {
    if (value.length > 3) return "";
    else return "Name Should be minimun 3 Characters";
  };

  const RegisteredBusinessnameInput = {
    isManditory: false,
    validate: validateName,
    value: businessname,
    inputType: InputItem.INPUT_TYPES.TEXT,
    onChange: Setbusinessname,
    label: "Registered Business name",
    placeholder: "Type your Registered Business name*",
  };
  const BrandTradenameInput = {
    isManditory: false,
    validate: validateName,
    value: brandname,
    inputType: InputItem.INPUT_TYPES.TEXT,
    onChange: Setbrandname,
    label: "Brand/trade name",
    placeholder: "Type your Brand/trade name*",
  };
  const BusinessTypeInput = {
    isManditory: false,
    validate: validateName,
    value: businesstype,
    inputType: InputItem.INPUT_TYPES.TEXT,
    onChange: setbusinesstype,
    label: "Type of business",
    placeholder: "Type of business*",
  };
  const BusinessNatureInput = {
    isManditory: false,
    validate: validateName,
    value: businessnature,
    inputType: InputItem.INPUT_TYPES.TEXT,
    onChange: setbusinessnature,
    label: "Nature of business",
    placeholder: "Nature of business*",
  };
  const CompanyPANInput = {
    isManditory: false,
    validate: validateName,
    value: companypan,
    inputType: InputItem.INPUT_TYPES.TEXT,
    onChange: setcompanypan,
    label: "Company PAN",
    placeholder: "Type company PAN*",
  };
  const CompanyGSTInput = {
    isManditory: false,
    validate: validateName,
    value: companygst,
    inputType: InputItem.INPUT_TYPES.TEXT,
    onChange: setcompanygst,
    label: "Company GST",
    placeholder: "Type company GST*",
  };
  const CommunicationAddressInput = {
    isManditory: false,
    validate: validateName,
    value: communicationaddress,
    inputType: InputItem.INPUT_TYPES.TEXT,
    onChange: setcommunicationaddress,
    label: "Communication address",
    placeholder: "Type communication address*",
  };
  const PinCodeInput = {
    isManditory: false,
    validate: validateName,
    value: pincode,
    inputType: InputItem.INPUT_TYPES.NUMBER,
    onChange: setpincode,
    label: "Pincode",
    placeholder: "560000*",
  };
  const CityInput = {
    isManditory: false,
    validate: validateName,
    value: city,
    inputType: InputItem.INPUT_TYPES.TEXT,
    onChange: setcity,
    label: "City",
    placeholder: "Type city name*",
  };
  const StateInput = {
    isManditory: false,
    validate: validateName,
    value: state,
    inputType: InputItem.INPUT_TYPES.TEXT,
    onChange: setstate,
    label: "State",
    placeholder: "Type state name*",
  };
  const NoOfEmployeesInput = {
    isManditory: false,
    validate: validateName,
    value: noofemployees,
    inputType: InputItem.INPUT_TYPES.NUMBER,
    onChange: setnoofemployees,
    label: "No. of employees",
    placeholder: "Type total employees*",
  };
  const BankServiceProviderInput = {
    isManditory: false,
    validate: validateName,
    value: bankserviceprovider,
    inputType: InputItem.INPUT_TYPES.TEXT,
    onChange: setbankserviceprovider,
    label: "Current banking service provider",
    placeholder: "Type your banking service provider*",
  };
  const AnnualTurnoverInput = {
    isManditory: false,
    validate: validateName,
    value: annualturnover,
    inputType: InputItem.INPUT_TYPES.NUMBER,
    onChange: setannualturnover,
    label: "Annual turnover",
    placeholder: "Type annual turnover*",
  };
  const ReferralIdInput = {
    isManditory: false,
    validate: validateName,
    value: referralid,
    inputType: InputItem.INPUT_TYPES.TEXT,
    onChange: setreferralid,
    label: "Referral ID",
    placeholder: "Type referral ID*",
  };

  return (
    <div>
      <LogoHeader />
      <div>
        <RegisterHeader />
      </div>
      <div class="row justify-content-center scrollable">
        <div class="form-group col-8">
          <form>
            <InputItem.Item {...RegisteredBusinessnameInput} />
            <InputItem.Item {...BrandTradenameInput} />
            <div className="row justify-content-end">
            <input class="mr-2" type="checkbox" />
            <label className="mt-2 ml-0 checkbox"> same as Registered Business name</label>
            </div>
            <InputItem.Item {...BusinessTypeInput} />
            <InputItem.Item {...BusinessNatureInput} />
            <InputItem.Item {...CompanyPANInput} />
            <InputItem.Item {...CompanyGSTInput} />
            <InputItem.Item {...CommunicationAddressInput} />
            <InputItem.Item {...PinCodeInput} />
            <InputItem.Item {...CityInput} />
            <InputItem.Item {...StateInput} />
            <InputItem.Item {...NoOfEmployeesInput} />
            <InputItem.Item {...BankServiceProviderInput} />
            <InputItem.Item {...AnnualTurnoverInput} />
            <InputItem.Item {...ReferralIdInput} />
          </form>
          <div
            id="buttons-lg-component"
            class="tab-pane tab-example-result fade active show"
            role="tabpanel"
            aria-labelledby="buttons-lg-component-tab"
          >
            <button type="button" class="btn btn-primary btn-lg">
              BACK
            </button>
            <button type="button" class="btn btn-secondary btn-lg">
              CONTINUE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegisterCompany;
