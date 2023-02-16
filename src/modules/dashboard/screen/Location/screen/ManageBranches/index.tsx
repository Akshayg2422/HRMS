import {
    DropDown,
    InputNumber,
    InputText,
    FormWrapper,
  } from "@components";
  import { Icons } from "@assets";
  import {
    showToast,
    useNav,
    validateDefault,
    validateName,
    validateAddress,
    validatePincode,
    goBack
  } from "@utils";
  import { useTranslation } from "react-i18next";
  import { useState, useEffect } from "react";
  import { useSelector, useDispatch } from "react-redux";
  import {
    getListAllBranchesList,
    branchAddition
  } from '../../../../../../store/location/actions';
  
  const ManageBranches = () => {
    const navigation = useNav();
    const { t } = useTranslation();
    let dispatch = useDispatch();

    const {
      listBranchesList
      } = useSelector((state: any) => state.LocationReducer);
  
    const [branchDetails, setBranchDetails] = useState({
      companyname: "",
      displaycompanyname: "",
      parentbranch: "",
      address: "",
      city: "",
      district: "",
      state:"",
      pincode:""
    });
  
    useEffect(() => {
      dispatch(getListAllBranchesList({}))
    }, [])

  
    const validatePostParams = () => {
      if (validateDefault(branchDetails.companyname).status === false) {
        showToast("error", t("invalidCompanyName"));
        return false;
      } else if (
        validateName(branchDetails.displaycompanyname).status === false
      ) {
        showToast("error", t("invalidDisplayCompanyName"));
        return false;
      } else if(branchDetails.parentbranch === "") {
          showToast("error",t("Parent Branch should not be empty"))
      }
      
      else if (validateDefault(branchDetails.address).status === false) {
        showToast("error", t("invalidAddress"));
        return false;
      } 
      else if (validateDefault(branchDetails.city).status === false) {
        showToast("error", t("invalidcity"));
        return false;
      }
      else if (validateDefault(branchDetails.district).status === false) {
        showToast("error", t("invaliddistrict"));
        return false;
      }else if (validateDefault(branchDetails.state).status === false) {
        showToast("error", t("invalidstate"));
        return false;
      }else if (validatePincode(branchDetails.pincode).status === false) {
        showToast("error", t("invalidpincode"));
        return false;
    }
      else {
        return true;
      }
    };
  
    const onSubmit = () => {
        if(validatePostParams())
        {
      const params = {
        name: branchDetails.companyname,
        display_name: branchDetails.displaycompanyname ,
        communication_address:branchDetails.address,
        city:branchDetails.city,
        district:branchDetails.district,
        state: branchDetails.state,
        pincode: branchDetails.pincode,
        parent: branchDetails.parentbranch
      };
    
  
      dispatch(
        branchAddition({
          params,
          onSuccess: (success: object) => {
            showToast("success", t("branchAddedSuccessfully"));
            goBack(navigation)
          },
          onError: (error: string) => {
            showToast("error", t("invalidParams"));
          },
        })
      );
    }
    }
  
    const onChangeHandler = (e: any) => {
      setBranchDetails({ ...branchDetails, [e.target.name]: e.target.value });
    };

    return (
      <FormWrapper
        title={t("addCompanyBranch")}
        onClick={onSubmit}
      >
        <InputText
          label={t("branchName")}
          placeholder={t("branchName")}
          validator={validateDefault}
          value={branchDetails.companyname}
          name={"companyname"}
          onChange={(event) => {
            onChangeHandler(event);
          }}
        />
        <InputText
          label={t("displayCompanyName")}
          placeholder={t("displayCompanyName")}
          validator={validateName}
          value={branchDetails.displaycompanyname}
          name={"displaycompanyname"}
          onChange={(event) => {
            onChangeHandler(event);
          }}
        />
        <DropDown
          label={t("Parent Branch")}
          placeholder={t("Parent Branch")}
          data={listBranchesList}
          name={"parentbranch"}
          onChange={(event) => {

            onChangeHandler(event);
          }}
        />
        <InputText
          label={t("Communication Address")}
          placeholder={t("Communication Address")}
          validator={validateAddress}
          value={branchDetails.address}
          name={"address"}
          onChange={(event) => {
            onChangeHandler(event);
          }}
        />
  
        <InputText
          label={t("City")}
          placeholder={t("City")}
          validator={validateDefault}
          value={branchDetails.city}
          name={"city"}
          onChange={(event) => {
            onChangeHandler(event);
          }}
        />
        <InputText
          label={t("District")}
          placeholder={t("District")}
          validator={validateDefault}
          value={branchDetails.district}
          name={"district"}
          onChange={(event) => {
            onChangeHandler(event);
          }}
        />
        <InputText
          label={t("State")}
          placeholder={t("State")}
          validator={validateDefault}
          value={branchDetails.state}
          name={"state"}
          onChange={(event) => {
            onChangeHandler(event);
          }}
        />
        <InputNumber
          label={t("Pincode")}
          placeholder={t("Pincode")}
          validator={validatePincode}
          name={"pincode"}
          maxLength={6}
          onChange={(event) => {
            onChangeHandler(event);
          }}
        />
      </FormWrapper>
    );
  };
  
  export default ManageBranches;
  