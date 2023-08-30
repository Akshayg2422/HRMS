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
  CommonDropdownMenu,
} from "@components";
import { Icons } from "@assets";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  getLeaveFromDate,
  fetchCalendardetails,
  getSelectedEventId,
  deleteHoliday,
} from "../../../../store/employee/actions";
import {
  convertFrom24To12Format,
  goTo,
  ROUTE,
  showToast,
  useNav,
} from "@utils";

export const DROPDOWN_MENU = [
  { id: '1', name: 'Edit', value: 'PF', image: Icons.Pencil },
  { id: '2', name: 'Delete', value: 'CL', image: Icons.Delete_1 },
]

const CARD_DROPDOWN_ITEM = [
  { id: '1', name: `Manage Leave Types`, value: 'CL', icon: 'fas fa-window-restore' },
]

function Calendar() {
  const navigation = useNav();
  const dispatch = useDispatch();
  const [deleteModel, setDeleteModel] = useState(false);
  const [onEventClickModel, setOnEventClickModel] = useState(false);
  const { t, i18n } = useTranslation();
  const { calendarEvents, numOfPages, currentPage, selectedEventId } =
    useSelector((state: any) => state.EmployeeReducer);

  const { hierarchicalBranchIds, dashboardDetails } = useSelector(
    (state: any) => state.DashboardReducer
  );


  useEffect(() => {
    getCalendarDetails(currentPage);
  }, [hierarchicalBranchIds]);

  const getCalendarDetails = (pageNumber: number) => {
    const params = {
      ...hierarchicalBranchIds,
    };
    dispatch(fetchCalendardetails({
      params,
      onSuccess: (success: any) => () => {

      },
      onError: (error: any) => () => {

      }
    }));
  };

  // dashboardDetails?.permission_details?.is_parent_branch && dashboardDetails?.permission_details?.is_admin

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

  const dropdownMenuItemActionHandler = (item: any, data: any, index: number) => {
    const current = calendarEvents.days_holiday[index];

    switch (item.name) {
      case 'Edit':
        manageEventEditHandler(current)
        break;

      case 'Delete':
        manageEventDeleteHandler(current)
        break;
    }
  }

  const normalizedEmployeeLog = (data: any) => {
    return data?.map((el: any, index: number) => {
      return {
        day: el.day,
        'Time': el?.time && convertFrom24To12Format(el?.time),
        title: el.title,
        description: el.description,
        "Created By": el.created_by ? el.created_by : '-',
        "Created Date": el.holiday_created_date ? el.holiday_created_date : '-',
        "": <CommonDropdownMenu
          data={DROPDOWN_MENU}
          onItemClick={(e, item) => {
            e.stopPropagation();
            dropdownMenuItemActionHandler(item, el, index)
          }}
        />
      };
    });
  };

  const geteventsdetails = (data: any) => {
    return data && data?.length > 0 && data?.map((item: any) => {
      let filteredlist = {};
      filteredlist = {
        title: item.title,
        start: item.day,
        end: item.day,
        color: "#52307c",
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
    let Range = geteventsdetails(calendarEvents?.data?.days_holiday)?.map(
      (item: any) => {
        if (item?.end)
          return getDatesListBetweenStartEndDates(item?.start, item?.end);
      }
    );
    let match = Range?.some((date: any) => date === arg?.dateStr);
    if (match) {
      onEventClickHandler(arg?.dateStr);
    } else {
      dispatch(getLeaveFromDate(arg?.dateStr));
      dispatch(getSelectedEventId(undefined));
      goTo(navigation, ROUTE.ROUTE_MANAGE_HOLIDAYS);
    }
  };

  const handleAddHolidays = () => {
    dispatch(getSelectedEventId(undefined));
    dispatch(getLeaveFromDate(""));
    goTo(navigation, ROUTE.ROUTE_MANAGE_HOLIDAYS);
  };

  const manageEventEditHandler = (el: any | undefined) => {
    dispatch(getSelectedEventId(el));
    goTo(navigation, ROUTE.ROUTE_MANAGE_HOLIDAYS);
  };

  const manageEventDeleteHandler = (el: any | undefined) => {
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
        onSuccess: (success: any) => () => {
          showToast("success", success.message)
          getCalendarDetails(currentPage);
        },
        onError: (error: any) => () => {
          setDeleteModel(!deleteModel);
          showToast("error", error);
        },
      })
    );
  };

  const onEventClickHandler = (date: string) => {
    return calendarEvents?.days_holiday?.find((element: { day: string }) => {
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
      <Container additionClass={"main-contain"}>
        <Card>
          <Container additionClass="row ">
            <div className=" col">
              <h1 className="mb-3">{t('Calendar')}</h1>
            </div>
            <div className=" d-flex justify-content-end col mt-1 mb-4 mr-lg--4 mr-sm-0 mr--4 ">
              <Primary
                size="btn-sm"
                additionClass=''
                text={t("addHoildays")}
                onClick={handleAddHolidays}
              />
              {dashboardDetails?.permission_details?.is_parent_branch && dashboardDetails?.permission_details?.is_admin &&
                <CommonDropdownMenu
                  data={CARD_DROPDOWN_ITEM}
                  onItemClick={(e, item) => {
                    e.stopPropagation();
                    goTo(navigation, ROUTE.ROUTE_LEAVES_TYPES)
                  }}
                />}
            </div>
          </Container>
          <Container additionClass="col-xl-3">
            <ChooseBranchFromHierarchical showCheckBox={false} />
          </Container>
          <Calender
            // dateClick={handleDateClick}
            events={geteventsdetails(calendarEvents?.days_holiday)}
          />
        </Card>
        <h1>{t("holidayList")}</h1>
        {calendarEvents && calendarEvents.days_holiday.length > 0 ? (
          <CommonTable
            noHeader
            displayDataSet={normalizedEmployeeLog(
              calendarEvents?.days_holiday
            )}
            custombutton={"h5"}
          />
        ) : <NoRecordFound />}
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