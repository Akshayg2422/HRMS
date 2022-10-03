import { Navbar } from "@modules";
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
  const { t } = useTranslation();

  const navigation = useNav();
  const dispatch = useDispatch();
  const [model, setModel] = useState(false);
  const [daysHoliday] = useState<any[]>([]);
  const { calendarEvents } = useSelector((state: any) => state.EmployeeReducer);

  useEffect(() => {
    let params = {};
    dispatch(fetchCalendardetails({ params }));
    calendarEvents?.days_holiday?.map((item: any) => {
      daysHoliday.push({ title: item.title, date: item.day, color: "green" });
    });

    calendarEvents?.days_leave?.map((item: any) => {
      if (item.date_from) {
        daysHoliday.push({
          title: item.reason,
          start: item.date_from,
          end: item.date_to,
          color: "red",
        });
      } else {
        daysHoliday.push({ title: item.reason, date: item.day, color: "red" });
      }
    });

    calendarEvents?.days_absent?.map((item: any) => {
      if (item.date_from) {
        daysHoliday.push({
          title: item.reason,
          start: item.date_from,
          end: item.date_to,
          color: "red",
        });
      } else {
        daysHoliday.push({ title: item.reason, date: item.day, color: "red" });
      }
    });
  }, []);

  const handleApplyLeave = () => {
    dispatch(getLeaveFromDate(""));
    goTo(navigation, ROUTE.ROUTE_APPLY_LEAVE);
  };

  const handleLeaveRequest = () => {
    goTo(navigation, ROUTE.ROUTE_LEAVE_REQUEST);
  };

  const handleDateClick = (arg: any) => {
    let data = daysHoliday.filter(
      (item) => (item.date || item.start) === arg.dateStr
    );

    if (data?.length >= 1) {
      console.log("data", data);
      data = [];
    } else {
      setModel(!model);
      dispatch(getLeaveFromDate(arg.dateStr));
    }
  };

  return (
    <>
      <Container additionClass={"col-9 mt-5"}>
        <Card>
          <Container additionClass={"text-right my-4"}>
            <Primary
              text={t("applyLeave")}
              onClick={handleApplyLeave}
              col={"col-xl-2"}
              size={"btn-sm"}
            />
            <Primary
              text={t("leaveRequest")}
              onClick={handleLeaveRequest}
              col={"col-xl-2"}
              size={"btn-sm"}
            />
          </Container>
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
