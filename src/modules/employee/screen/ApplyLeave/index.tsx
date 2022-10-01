import { DatePicker, DropDown, FormWrapper, InputText } from "@components";
import { Icons } from "@assets";
import { showToast, useNav, validateDefault } from "@utils";
import React, { useEffect,useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch,useSelector } from "react-redux";
import { getLeaveTypes } from "../../../../../src/store/employee/actions";
const ApplyLeave = () => {
  const { t } = useTranslation();
  let dispatch = useDispatch();
  const [leaveTypes,setLeaveTypes]=useState([])
  const { leaveFromDate} = useSelector((state: any) => state.EmployeeReducer);

  useEffect(() => {
    const params = {};
    dispatch(
      getLeaveTypes({
        params,
        onSuccess: (success: any) => {
          console.log("datatatata---->", success);
          setLeaveTypes(success?.leave_types)
        },

        onError: (error: string) => {
          showToast("error", t("somethingWrong"));
        },
      })
    );
  }, []);

  const dateTimePickerHandler = (value: string, key: string) => {
    // setEmployeeDetails({ ...employeeDetails, [key]: value });
  };



  return (
    <>
      <FormWrapper title={t("applyLeave")}>
        <DropDown
          placeholder={t("leaveType")}
            data={leaveTypes}
          name={"designation"}
          //   value={employeeDetails.designation}
          //   onChange={(event) => onChangeHandler(event)}
        />
        <h5>{t("dataFrom")}</h5>
        <DatePicker
          icon={Icons.Calendar}
          iconPosition={"append"}
          onChange={(date: string) => dateTimePickerHandler(date, "dob")}
            value={leaveFromDate}
        />
        <h5>{t("dataTo")}</h5>
        <DatePicker
          icon={Icons.Calendar}
          iconPosition={"append"}
          onChange={(date: string) => dateTimePickerHandler(date, "dob")}
          //   value={employeeDetails.dob}
        />
        <InputText
          label={t("reason")}
          validator={validateDefault}
          //   value={employeeDetails.lastName}
          name={"lastName"}
          //   onChange={(event) => {
          //     onChangeHandler(event);
          //   }}
        />
      </FormWrapper>
    </>
  );
};

export default ApplyLeave;
