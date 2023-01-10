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
  validateReason
} from "@utils";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  applyLeave,
  fetchCalendardetails,
  getLeaveTypes,
} from "../../../../../src/store/employee/actions";


const ApplyLeave = () => {
  const { t } = useTranslation();
  const navigation = useNav();
  let dispatch = useDispatch();
  const [leaveTypes, setLeaveTypes] = useState([]);
  const { leaveFromDate, calendarEvents, numOfPages, currentPage } =
    useSelector((state: any) => state.EmployeeReducer);
  const { hierarchicalBranchIds } = useSelector(
    (state: any) => state.DashboardReducer
  );

  const [fromDetails, setFormDetails] = useState({
    leaveType: "",
    dateFrom: leaveFromDate ? leaveFromDate : "",
    dataTo: "",
    reason: "",
  });

  useEffect(() => {
    fetchLeaveTypes();
    getCalendarDetails(currentPage);
  }, []);

  const getCalendarDetails = (pageNumber: number) => {
    const params = {
      ...hierarchicalBranchIds,
      pageNumber: pageNumber,
    };
    dispatch(fetchCalendardetails({ params }));
  };

  useEffect(() => {
    const toSeverDate = new Date(
      getServerDateFromMoment(getMomentObjFromServer(fromDetails.dataTo))
    ).getTime();
    const fromServerDate = new Date(
      getServerDateFromMoment(getMomentObjFromServer(fromDetails.dateFrom))
    ).getTime();
    if (toSeverDate < fromServerDate) {
      setFormDetails({ ...fromDetails, dataTo: "" });
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
    // console.log(JSON.stringify({ ...fromDetails, [key]: value }));
  };

  const onChangeHandler = (event: any) => {
    setFormDetails({ ...fromDetails, [event.target.name]: event.target.value });
  };

  const validateOnSubmit = () => {
    if (fromDetails.dateFrom === "") {
      showToast("error", t("invalidDate"));
      return false;
    }
    if (fromDetails.dataTo === "") {
      showToast("error", t("invalidDate"));
      return false;
    }
    if (!validateDefault(fromDetails.reason).status) {
      showToast("error", t("invalidReason"));
      return false;
    }
    return true;
  };

  const onSubmitHandler = () => {
    if (validateOnSubmit()) {
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

      console.log(JSON.stringify(params));

      dispatch(
        applyLeave({
          params,
          onSuccess: (response: object) => {
            goTo(navigation, ROUTE.ROUTE_MY_LEAVES);
          },
          onError: (error: string) => {
            showToast("error", t("somethingWrong"));
          },
        })
      );
    }
  };

  const disableDate = (data: any) => {
    return (
      data &&
      data.length > 0 &&
      data.map((el: any) => {
        let filteredlist = {};
        filteredlist = {
          from: el.day,
          to: el.day,
        };
        return filteredlist;
      })
    );
  };

  return (
    <>
      <FormWrapper
        title={t("applyLeave")}
        onClick={() => {
          onSubmitHandler();
        }}
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
          disabledDate={disableDate(calendarEvents.days_holiday)}
          onChange={(date: string) => {
            dateTimePickerHandler(date, "dateFrom");
          }}
          value={fromDetails.dateFrom}
        />
        <h5>{t("dataTo")}</h5>
        <DatePicker
          icon={Icons.Calendar}
          iconPosition={"append"}
          disabledDate={disableDate(calendarEvents.days_holiday)}
          onChange={(date: string) => {
            dateTimePickerHandler(date, "dataTo");
          }}
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
