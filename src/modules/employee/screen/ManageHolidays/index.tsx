import {
  ChooseBranchFromHierarchical,
  Container,
  DatePicker,
  FormWrapper,
  InputText,
  ScreenContainer,
} from "@components";
import { Icons } from "@assets";
import {
  getMomentObjFromServer,
  getServerDateFromMoment,
  goBack,
  goTo,
  ROUTE,
  showToast,
  Today,
  useNav,
  validateName,
} from "@utils";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { addHoliday } from "../../../../store/employee/actions";

const ManageHolidays = () => {
  const { t, i18n } = useTranslation();
  let dispatch = useDispatch();
  const navigation = useNav();

  const [holidayEvents, setHolidayEvents] = useState({
    id: "",
    title: "",
    description: "",
    date: "",
  });
  const { hierarchicalBranchIds } = useSelector(
    (state: any) => state.DashboardReducer
  );
  const { selectedEventId, leaveFromDate,calendarEvents } = useSelector(
    (state: any) => state.EmployeeReducer
  );
 
  useEffect(() => {
    if (selectedEventId !== undefined) {
      getPrefilledEventDetails();
    } else if (selectedEventId === undefined) {
      let eventInitData = { ...holidayEvents };
      eventInitData.date = leaveFromDate;
      setHolidayEvents(eventInitData);
    }
  }, []);

  const getPrefilledEventDetails = () => {
    let eventInitData = { ...holidayEvents };
    eventInitData.id = selectedEventId.id;
    eventInitData.date = selectedEventId.day;
    eventInitData.description = selectedEventId.description;
    eventInitData.title = selectedEventId.title;
    setHolidayEvents(eventInitData);
  };

  const onChangeHandler = (e: any) => {
    setHolidayEvents({ ...holidayEvents, [e.target.name]: e.target.value });
  };

  const dateTimePickerHandler = (value: string, key: string) => {
    setHolidayEvents({ ...holidayEvents, [key]: value });
  };

  const validatePostParams = () => {
    if (validateName(holidayEvents.description).status === false) {
      showToast("error", t("descriptionrequired"));
      return false;
    } else if (validateName(holidayEvents.title).status === false) {
      showToast("error", t("titlerequired"));
    } else if (validateName(holidayEvents.date).status === false) {
      showToast("error", t("Date Should Not Be Empty"));
    }
    else {
      return true;
    }
  };
  const onSubmit = () => {
    if (validatePostParams()) {
      const params = {
        ...hierarchicalBranchIds,
        ...(selectedEventId && { id: holidayEvents.id }),
        date: getServerDateFromMoment(
          getMomentObjFromServer(holidayEvents.date)
        ),
        description: holidayEvents.description,
        title: holidayEvents.title,
      };
      dispatch(
        addHoliday({
          params,
          onSuccess: (success: any) => () => {
            showToast('success', success.message)
            goBack(navigation);
          },
          onError: (error: any) => () => {
            showToast('error', error.error_message)
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
    <ScreenContainer >
      <FormWrapper
        title={selectedEventId ? t("editHoliday") : t("addHoildays")}
        onClick={onSubmit}
        buttonTittle={selectedEventId ? t("update") : t("addHoildays")}
      >
        <Container additionClass="col-xl-12">
          <ChooseBranchFromHierarchical />
        </Container>
        <InputText
          col="col-xl-12"
          label={t("title")}
          validator={validateName}
          value={holidayEvents.title}
          name={"title"}
          onChange={(event) => {
            onChangeHandler(event);
          }}
        />
        <Container col="col-xl-12">
          <h5>{t("date")}</h5>
          <DatePicker
            title={t("pleaseSelect")}
            icon={Icons.Calendar}
            // minDate={Today}
            disabledDate={disableDate(calendarEvents.days_holiday)}
            iconPosition={"append"}
            name={'date'}
            value={holidayEvents.date}
            onChange={(date: string) => dateTimePickerHandler(date, "date")}
          />
        </Container>
        <InputText
          col="col-xl-12"
          label={t("description")}
          validator={validateName}
          value={holidayEvents.description}
          name={"description"}
          onChange={(event) => {
            onChangeHandler(event);
          }}
        />
      </FormWrapper>
    </ScreenContainer>
  );
};

export default ManageHolidays;
