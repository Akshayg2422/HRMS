import React, { useState, useEffect } from "react";
import moment from "moment";
import { Container, Calender, Card, Sort, Modal, Primary } from "@components";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  getLeaveFromDate,
  fetchCalendardetails,
} from "../../../../store/employee/actions";
import { goTo, ROUTE, useNav } from "@utils";

function Calendar() {
  const navigation = useNav();
  const dispatch = useDispatch();
  const [model, setModel] = useState(false);
  const [daysHoliday] = useState<any[]>([]);
  const { t, i18n } = useTranslation();
  const { calendarEvents } = useSelector((state: any) => state.EmployeeReducer);

  useEffect(() => {
    let params = {};
    dispatch(fetchCalendardetails({}));
    calendarEvents?.days_holiday?.map((item: any) => {
      daysHoliday.push({
        title: item.title,
        start: item.day,
        end: item.day,
        color: "green",
      });
    });

    calendarEvents?.days_leave?.map((item: any) => {
      daysHoliday.push({
        title: item.reason,
        start: item.date_from,
        end: item.date_to+"T23:59:00",
        color: "red",
      });
    });

    calendarEvents?.days_absent?.map((item: any) => {
      daysHoliday.push({
        title: item.reason,
        start: item.date_from,
        end: item.date_to+"T23:59:00",
        color: "red",
      });
    });
  }, []);

  const getDatesListBetweenStartEndDates = (startDate: any, stopDate: any) => {
    const dateObj = [];
    let currentDate = moment(startDate);
    stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
      dateObj.push(moment(currentDate).format("YYYY-MM-DD"));
      currentDate = moment(currentDate).add(1, "days");
    }

    return dateObj;
  };

  const handleDateClick = (arg: any) => {
    let Range = daysHoliday.map((item: any) => {
      if (item.end)
        return getDatesListBetweenStartEndDates(item.start, item.end);
    });
    var merged = Range.flat(1);

    let match = merged.some((date: any) => date === arg.dateStr);
    console.log("match", match);

    if (match) {
    } else {
      setModel(!model);
      dispatch(getLeaveFromDate(arg.dateStr));
    }
  };

  console.log(daysHoliday)
  return (
    <>
      <Container additionClass={"col-9 mt-5"}>
        <Card>
          <Calender
            dateClick={handleDateClick}
            events={daysHoliday?.length > 1 ? daysHoliday : []}
          />
        </Card>

        <Modal
          title={"Please Select"}
          showModel={model}
          size={"modal-sm"}
          toggle={() => setModel(!model)}
        >
          <Container>
            <Primary
              text={t("Apply Leave")}
              onClick={() => goTo(navigation, ROUTE.ROUTE_APPLY_LEAVE)}
            />
            <Primary text={t("Leave Request")} />
          </Container>
        </Modal>
      </Container>
    </>
  );
}

export default Calendar;
