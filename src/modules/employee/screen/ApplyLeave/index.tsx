import { DatePicker, DropDown, FormWrapper, InputText } from "@components";
import { Icons } from "@assets";
import {
  getMomentObjFromServer,
  getServerDateFromMoment,
  goBack,
  goTo,
  ROUTE,
  showToast,
  useNav,
  validateDefault,
} from "@utils";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  applyLeave,
  getLeaveTypes,
} from "../../../../../src/store/employee/actions";
import { Route } from "react-router-dom";
const ApplyLeave = () => {
  const { t } = useTranslation();
  const navigation = useNav();
  let dispatch = useDispatch();
  const [leaveTypes, setLeaveTypes] = useState([]);
  const { leaveFromDate } = useSelector((state: any) => state.EmployeeReducer);

  const [fromDetails, setFormDetails] = useState({
    leaveType: "",
    dateFrom: leaveFromDate ? leaveFromDate : "",
    dataTo: "",
    reason: "",
  });

  useEffect(() => {
    fetchLeaveTypes();
  }, []);

  useEffect(() => {
    const toSeverDate = new Date(
      getServerDateFromMoment(getMomentObjFromServer(fromDetails.dataTo))
    ).getTime();
    const fromServerDate = new Date(
      getServerDateFromMoment(getMomentObjFromServer(fromDetails.dateFrom))
    ).getTime();
    if (toSeverDate < fromServerDate) {
      setFormDetails({...fromDetails,dataTo:''});
    }
  }, [fromDetails.dateFrom, fromDetails.dataTo]);

  const FilterDropdown = (data: any) => {
    let arr: { id: string; name: string }[] = [];
    data.forEach((el: any) => {
      arr.push({
        id: el.leave_type_id,
        name: el.name,
      });
    });
    return arr;
  };

  const fetchLeaveTypes = () => {
    const params = {};
    dispatch(
      getLeaveTypes({
        params,
        onSuccess: (success: any) => {
          setLeaveTypes(success.leave_types);
        },
        onError: (error: string) => {
          showToast("error", t("somethingWrong"));
        },
      })
    );
  };

  const dateTimePickerHandler = (value: string, key: string) => {
    setFormDetails({ ...fromDetails, [key]: value });
  };

  const onChangeHandler = (event: any) => {
    setFormDetails({ ...fromDetails, [event.target.name]: event.target.value });
  };

  const onSubmitHandler = () => {
    const params = {
      leave_type_id: fromDetails.leaveType,
      date_from: getServerDateFromMoment(
        getMomentObjFromServer(fromDetails.dateFrom)
      ),
      date_to: getServerDateFromMoment(
        getMomentObjFromServer(fromDetails.dataTo)
      ),
      reason: fromDetails.reason,
    };

    dispatch(
      applyLeave({
        params,
        onSuccess: (response: object) => {
          goTo(navigation, ROUTE.ROUTE_CALENDAR);
        },
        onError: (error: string) => {
          showToast("error", t("somethingWrong"));
        },
      })
    );
  };

  return (
    <>
      <FormWrapper
        title={t("applyLeave")}
        onClick={() => onSubmitHandler()}
        buttonTittle={t("apply")}
      >
        <DropDown
          placeholder={t("leaveType")}
          data={FilterDropdown(leaveTypes)}
          name={"leaveType"}
          value={fromDetails.leaveType}
          onChange={(event) => onChangeHandler(event)}
        />
        <h5>{t("dataFrom")}</h5>
        <DatePicker
          icon={Icons.Calendar}
          iconPosition={"append"}
          onChange={(date: string) => dateTimePickerHandler(date, "dateFrom")}
          value={fromDetails.dateFrom}
        />
        <h5>{t("dataTo")}</h5>
        <DatePicker
          icon={Icons.Calendar}
          iconPosition={"append"}
          onChange={(date: string) => dateTimePickerHandler(date, "dataTo")}
          value={fromDetails.dataTo}
        />
        <InputText
          label={t("reason")}
          validator={validateDefault}
          value={fromDetails.reason}
          name={"reason"}
          onChange={(event) => {
            onChangeHandler(event);
          }}
        />
      </FormWrapper>
    </>
  );
};

export default ApplyLeave;
