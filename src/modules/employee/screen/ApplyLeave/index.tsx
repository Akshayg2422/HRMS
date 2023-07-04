import { DatePicker, DropDown, FormWrapper, InputText, ScreenContainer } from "@components";
import { Icons } from "@assets";
import {
  dropDownValueCheckByEvent,
  getMomentObjFromServer,
  getServerDateFromMoment,
  goBack,
  goTo,
  ROUTE,
  showToast,
  Today,
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
  getEmployeeBranchLeaveType,
  getLeaveTypes,
} from "../../../../../src/store/employee/actions";
import moment from "moment";


const ApplyLeave = () => {
  const { t } = useTranslation();
  const navigation = useNav();
  let dispatch = useDispatch();
  const [leaveTypes, setLeaveTypes] = useState<any>([]);
  const [dropDownData, setDropDownData] = useState<any>([])
  const { leaveFromDate, calendarEvents, numOfPages, currentPage, leaveTypesDetails } =
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

  useEffect(() => {
    const toSeverDate = new Date(
      getServerDateFromMoment(getMomentObjFromServer(fromDetails.dataTo))
    ).getTime();
    const fromServerDate = new Date(
      getServerDateFromMoment(getMomentObjFromServer(fromDetails.dateFrom))
    ).getTime();
    if (toSeverDate < fromServerDate) {
      setFormDetails({ ...fromDetails, dataTo: "" });
      showToast('info',t('dateFromToValidation'))
    }
  }, [fromDetails.dateFrom, fromDetails.dataTo]);

  useEffect(() => {
    const startDate = fromDetails.dateFrom + '';
    const endDate = fromDetails.dataTo + '';
    const numberOfDays = getNumberOfDays(startDate, endDate);
    let currentType = dropDownData.find((item: { leave_type_id: any; }) => item.leave_type_id === fromDetails.leaveType)
    if (numberOfDays > currentType?.available_days) {
      showToast('info', `Exceeding Available Days Please Choose less then ${currentType?.available_days} ${currentType?.available_days > 1 ? 'days' : 'day'} `)
      setFormDetails({ ...fromDetails, dataTo: "" });
    }
  }, [fromDetails.dateFrom, fromDetails.dataTo]);

  function getNumberOfDays(startDate: any, endDate: any) {
    const start = moment(startDate);
    const end = moment(endDate);
    const diffDays = end.diff(start, 'days') + 1;
    return diffDays;
  }

  const getCalendarDetails = (pageNumber: number) => {
    const params = {
      ...hierarchicalBranchIds,
      pageNumber: pageNumber,
    };
    dispatch(fetchCalendardetails({
      params,
      onSuccess: (success: any) => () => {

      },
      onError: (error: any) => () => {

      }
    }));
  };

  const FilterDropdown = (data: any) => {
    let arr: { id: string; name: string }[] = [];
    data.forEach((el: any) => {
      if (el?.available_days > 0) {
        arr.push({
          id: el.leave_type_id,
          name: el.name,
        });
      }
    });
    return arr;
  };


  useEffect(() => {
    let index = leaveTypes && leaveTypes.length > 0 && leaveTypes.findIndex((rank: { id: any; }) => rank?.id === leaveTypesDetails.leave_type_id);
    setFormDetails({ ...fromDetails, leaveType: leaveTypes[index]?.id })
  }, [leaveTypes])

  const fetchLeaveTypes = () => {
    const params = {};
    dispatch(
      getEmployeeBranchLeaveType({
        params,
        onSuccess: (success: any) => () => {
          setLeaveTypes(FilterDropdown(success?.details?.leave_types));
          setDropDownData(success?.details?.leave_types)
        },
        onError: (error: string) => () => {
          showToast("error", error);
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

      dispatch(
        applyLeave({
          params,
          onSuccess: (response: any) => () => {
            showToast("success", response?.message);
            goBack(navigation);
          },
          onError: (error: string) => () => {
            showToast("error", error);
            setFormDetails({ ...fromDetails, dataTo: "", dateFrom: '', reason: '' });
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
      <ScreenContainer>

        <FormWrapper
          title={t("applyLeave")}
          onClick={() => {
            onSubmitHandler();
          }}
          buttonTittle={t("apply")}
        >
          <DropDown
            placeholder={t("leaveType")}
            data={leaveTypes}
            name={"leaveType"}
            value={fromDetails.leaveType}
            onChange={(event) => onChangeHandler(dropDownValueCheckByEvent(event, t("leaveType")))}
          />
          <h5>{t("dataFrom")}</h5>
          <DatePicker
            icon={Icons.Calendar}
            minDate={Today}
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
            minDate={Today}
            iconPosition={"append"}
            disabledDate={disableDate(calendarEvents.days_holiday)}
            onChange={(date: string) => {
              dateTimePickerHandler(date, "dataTo");
            }}
            value={fromDetails.dataTo}
          />
          <InputText
            label={t("reason")}
            maxLength={150}
            validator={validateDefault}
            value={fromDetails.reason}
            name={"reason"}
            onChange={(event) => {
              onChangeHandler(event);
            }}
          />
        </FormWrapper>
      </ScreenContainer>
    </>
  );
};

export default ApplyLeave;
