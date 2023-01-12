import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  Container,
  Calender,
  Card,
  Sort,
  Modal,
  Primary,
  ChooseBranchFromHierarchical,
  CommonTable,
  Secondary,
  NoRecordFound,
} from "@components";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  getLeaveFromDate,
  fetchCalendardetails,
  getSelectedEventId,
  deleteHoliday,
} from "../../../../store/employee/actions";
import {
  EMPLOYEE_ADDITIONAL_DATA,
  goTo,
  ROUTE,
  showToast,
  useNav,
} from "@utils";

function Calendar() {
  const navigation = useNav();
  const dispatch = useDispatch();
  const [deleteModel, setDeleteModel] = useState(false);
  const [onEventClickModel, setOnEventClickModel] = useState(false);
  const { t, i18n } = useTranslation();
  const { calendarEvents, numOfPages, currentPage, selectedEventId } =
    useSelector((state: any) => state.EmployeeReducer);

  const { hierarchicalBranchIds } = useSelector(
    (state: any) => state.DashboardReducer
  );

  useEffect(() => {
    getCalendarDetails(currentPage);
  }, [hierarchicalBranchIds]);

  const getCalendarDetails = (pageNumber: number) => {
    const params = {
      ...hierarchicalBranchIds,
    };
    dispatch(fetchCalendardetails({ params }));
  };

  function paginationHandler(
    type: "next" | "prev" | "current",
    position?: number
  ) {
    let page =
      type === "next"
        ? currentPage + 1
        : type === "prev"
          ? currentPage - 1
          : position;
    getCalendarDetails(page);
  }

  const normalizedEmployeeLog = (data: any) => {
    return data.map((el: any) => {
      return {
        day: el.day,
        title: el.title,
        description: el.description,
      };
    });
  };

  const geteventsdetails = (data: any) => {
    return data && data.length > 0 && data.map((item: any) => {
      let filteredlist = {};
      filteredlist = {
        title: item.title,
        start: item.day,
        end: item.day,
        color: "green",
      };
      return filteredlist;
    });
  };

  const getDatesListBetweenStartEndDates = (startDate: any, stopDate: any) => {
    let dateObj = {};
    let currentDate = moment(startDate);
    stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
      let formated = moment(currentDate).format("YYYY-MM-DD");
      dateObj = formated;
      currentDate = moment(currentDate).add(1, "days");
    }
    return dateObj;
  };

  const handleDateClick = (arg: any) => {
    let Range = geteventsdetails(calendarEvents?.data.days_holiday).map(
      (item: any) => {
        if (item.end)
          return getDatesListBetweenStartEndDates(item.start, item.end);
      }
    );
    let match = Range.some((date: any) => date === arg.dateStr);
    if (match) {
      onEventClickHandler(arg.dateStr);
    } else {
      dispatch(getLeaveFromDate(arg.dateStr));
      dispatch(getSelectedEventId(undefined));
      goTo(navigation, ROUTE.ROUTE_MANAGE_HOLIDAYS);
    }
  };



  const handleAddHolidays = () => {
    dispatch(getSelectedEventId(undefined));
    dispatch(getLeaveFromDate(""));
    goTo(navigation, ROUTE.ROUTE_MANAGE_HOLIDAYS);
  };

  const manageEventEditHandler = (el: object) => {
    dispatch(getSelectedEventId(el));
    goTo(navigation, ROUTE.ROUTE_MANAGE_HOLIDAYS);
  };

  const manageEventDeleteHandler = (el: object) => {
    dispatch(getSelectedEventId(el));
    setDeleteModel(!deleteModel);
  };

  const manageProceedHandler = () => {
    const params = {
      id: selectedEventId.id,
    };
    setDeleteModel(!deleteModel);
    dispatch(
      deleteHoliday({
        params,
        onSuccess: (success: object) => {
          getCalendarDetails(currentPage);
        },
        onError: (error: string) => {
          setDeleteModel(!deleteModel);
          showToast("error", t("somethingWrong"));
        },
      })
    );
  };

  const onEventClickHandler = (date: string) => {
    return calendarEvents?.days_holiday.find((element: { day: string }) => {
      if (element.day === date) {
        dispatch(getSelectedEventId(element));
        setOnEventClickModel(!onEventClickModel);
      }
    });
  };

  const eventModelDeleteHandler = () => {
    setOnEventClickModel(!onEventClickModel);
    setDeleteModel(!deleteModel);
  };

  return (
    <>
      <Container additionClass={"mt-5 main-contain"}>
        <Card>
          <h1 className="mb-3">{t('Calendar')}</h1>
          <Container additionClass={"row"}>
            <Container additionClass="col-xl-5">
              <ChooseBranchFromHierarchical showCheckBox={false} />
            </Container>
            <Container additionClass="text-right col mt-xl-4 ">
              <Primary
                text={t("addHoildays")}
                onClick={handleAddHolidays}
                col={"col-xl-3"}
                size={"btn-md"}
              />
            </Container>
          </Container>
          <Calender
            dateClick={handleDateClick}
            events={geteventsdetails(calendarEvents?.days_holiday)}
          />
        </Card>
        <h1>{t("holidayList")}</h1>
        <Card>
          {calendarEvents && calendarEvents.days_holiday.length > 0 ? (
            <CommonTable
              noHeader
              displayDataSet={normalizedEmployeeLog(
                calendarEvents?.days_holiday
              )}
              additionalDataSet={EMPLOYEE_ADDITIONAL_DATA}
              tableValueOnClick={(e, index, item, elv) => {
                const current = calendarEvents.days_holiday[index];
                if (elv === "Edit") {
                  manageEventEditHandler(current);
                }
                if (elv === "Delete") {
                  manageEventDeleteHandler(current);
                }
              }}
              custombutton={"h5"}
            />
          ) : <NoRecordFound />}
        </Card>
        <Modal
          title={t("deleteHoliday")}
          showModel={deleteModel}
          toggle={() => setDeleteModel(!deleteModel)}
        >
          <Container>
            <span className="ml-3">{t("eventDeleteWarningMessage")}</span>
            <Container
              margin={"m-5"}
              justifyContent={"justify-content-end"}
              display={"d-flex"}
            >
              <Secondary
                text={t("cancel")}
                onClick={() => setDeleteModel(!deleteModel)}
              />
              <Primary
                text={t("proceed")}
                onClick={() => manageProceedHandler()}
              />
            </Container>
          </Container>
        </Modal>
        <Modal
          title={t("Please Select")}
          size={"modal-sm"}
          showModel={onEventClickModel}
          toggle={() => setOnEventClickModel(!onEventClickModel)}
        >
          <Container>
            <Container display={"d-flex"}>
              <Primary
                text={t("edit")}
                onClick={() => goTo(navigation, ROUTE.ROUTE_MANAGE_HOLIDAYS)}
              />
              <Primary
                text={t("delete")}
                onClick={() => eventModelDeleteHandler()}
              />
            </Container>
          </Container>
        </Modal>
      </Container>
    </>
  );
}

export default Calendar;
