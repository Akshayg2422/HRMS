import {
  DropDown,
  InputNumber,
  InputText,
  FormWrapper,
  ScreenContainer,
  Container,
  SearchableDropdown,
} from "@components";
import { Icons } from "@assets";
import {
  showToast,
  useNav,
  validateDefault,
  validateName,
  validateAddress,
  validatePincode,
  goBack,
  inputNumberMaxLength,
  MARITAL_STATUS_LIST,
  dropDownValueCheckByEvent,
  DOMAIN,
  getDropDownFormatter,
} from "@utils";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getListAllBranchesList,
  branchAddition
} from '../../../../../../store/location/actions';
import { OFFICE_TYPE } from "@utils";

const ManageBranches = () => {
  const navigation = useNav();
  const { t } = useTranslation();
  let dispatch = useDispatch();

  const {
    listBranchesList
  } = useSelector((state: any) => state.LocationReducer);

  const isHfws = localStorage.getItem(DOMAIN);

  const [branchDetails, setBranchDetails] = useState<any>({
    companyname: "",
    displaycompanyname: "",
    parentbranch: "",
    address: "-",
    city: "-",
    district: "-",
    state: "-",
    pincode: "-",
    branchType: OFFICE_TYPE[OFFICE_TYPE.length - 1].id
  });

  useEffect(() => {
    getBranchL()
  }, [])


  const getBranchL = () => {
    const params = {}
    dispatch(getListAllBranchesList({
      params,
      onSuccess: (success: any) => () => {

      },
      onError: (error: any) => () => {

      }
    }))
  }


  const validatePostParams = () => {
    if (validateDefault(branchDetails.companyname).status === false) {
      showToast("error", t("invalidCompanyName"));
      return false;
    }
    //  else if (
    //   validateName(branchDetails.displaycompanyname).status === false
    // ) {
    //   showToast("error", t("invalidDisplayCompanyName"));
    //   return false;
    // } 
    else if (branchDetails.parentbranch === "") {
      showToast("error", t("Parent Branch should not be empty"))
    }

    // else if (validateDefault(branchDetails.address).status === false) {
    //   showToast("error", t("invalidAddress"));
    //   return false;
    // }
    // else if (validateDefault(branchDetails.city).status === false) {
    //   showToast("error", t("invalidCity"));
    //   return false;
    // }
    // else if (validateDefault(branchDetails.district).status === false) {
    //   showToast("error", t("invalidDistrict"));
    //   return false;
    // } else if (validateDefault(branchDetails.state).status === false) {
    //   showToast("error", t("invalidState"));
    //   return false;
    // } else if (validatePincode(branchDetails.pincode).status === false) {
    //   showToast("error", t("invalidPincode"));
    //   return false;
    // }
    else {
      return true;
    }
  };

  const onSubmit = () => {
    if (validatePostParams()) {
      const params = {
        name: branchDetails.companyname,
        display_name: branchDetails.displaycompanyname ? branchDetails.displaycompanyname : branchDetails.companyname,
        communication_address: branchDetails.address,
        city: branchDetails.city,
        district: branchDetails.district,
        state: branchDetails.state,
        pincode: branchDetails.pincode,
        parent: branchDetails.parentbranch?.id,
        ...(isHfws === 'HFWS' && { branch_type: branchDetails.branchType })
      };

      dispatch(
        branchAddition({
          params,
          onSuccess: (success: object) => () => {
            showToast("success", t("branchAddedSuccessfully"));
            getBranchL()
            goBack(navigation)
          },
          onError: (error: string) => () => {
            showToast("error", error);
          },
        })
      );
    }
  }

  const onChangeHandler = (e: any) => {
    setBranchDetails({ ...branchDetails, [e.target.name]: e.target.value });
  };

  const NumberHandler = (value: string, key: string) => {
    setBranchDetails({ ...branchDetails, [key]: value });
  };

  const handleParentBranchChange = (event: any) => {
    setBranchDetails(prevDetails => ({
      ...prevDetails,
      parentbranch: event
    }));
  }

  return (
    <ScreenContainer>
      <FormWrapper
        isTitle
        title={t("addCompanyBranch")}
        onClick={onSubmit}
      >

        <Container additionClass={'col-xl-12 row col-sm-3'}>
          <div className="col-xl-6">
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
          </div>
          <div className="col-xl-6">
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
          </div>
          <div className="col-xl-6">
            {/* <DropDown
              label={t("Parent Branch")}
              placeholder={t("Parent Branch")}
              data={listBranchesList}
              name={"parentbranch"}
              value={branchDetails.parentbranch}
              onChange={(event) => {
                onChangeHandler(event);
              }}
            /> */}
            <SearchableDropdown selected={branchDetails.parentbranch} data={getDropDownFormatter(listBranchesList)} heading={t("Parent Branch")} placeHolder={t("Parent Branch")} onChange={(event) => {
              handleParentBranchChange(event)
            }} />
          </div>
          {isHfws === 'HFWS' && <div className="col-xl-6">
            <DropDown
              label={t("Type")}
              placeholder={t("Enter Type")}
              data={OFFICE_TYPE}
              name={"branchType"}
              value={branchDetails.branchType}
              onChange={(event) => {
                onChangeHandler(dropDownValueCheckByEvent(event, t("Enter Type")));
              }}
            />
          </div>}
          <div className="col-xl-6">
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
          </div>

          <div className="col-xl-6">

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
          </div>
          <div className="col-xl-6">
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
          </div>

          <div className="col-xl-6">
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
          </div>
          <div className="col-xl-6">

            <InputNumber
              label={t("Pincode")}
              placeholder={t("Pincode")}
              validator={validatePincode}
              name={"pincode"}
              value={branchDetails.pincode}
              onChange={(event) => NumberHandler(inputNumberMaxLength(event.target.value, 6), "pincode")}
            />
          </div>
        </Container>

      </FormWrapper>
    </ScreenContainer >
  );
};

export default ManageBranches;
