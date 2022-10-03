import { Navbar } from "@modules";
import React, { useState, useEffect } from "react";
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
  const [daysHoliday, setDaysHoliday] = useState<any[]>([]);
  const { calendarEvents } = useSelector((state: any) => state.EmployeeReducer);

  useEffect(() => {
    let params = {};
    dispatch(fetchCalendardetails({}));
  }, []);

  const handleDateClick = (arg: any) => {
    setModel(!model);
    dispatch(getLeaveFromDate(arg.dateStr));
  };

  const handleApplyLeave = () => {
    goTo(navigation, ROUTE.ROUTE_APPLY_LEAVE);
  };

  const handleLeaveRequest = () => {
    goTo(navigation, ROUTE.ROUTE_LEAVE_REQUEST);
  };

  useEffect(() => {
    calendarEvents?.days_holiday?.map((item: any) => {
      setDaysHoliday([
        ...daysHoliday,
        { title: item.title, date: item.day, color: "green" },
      ]);
    });
  }, []);

  console.log(calendarEvents);
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
          <Calender dateClick={handleDateClick} events={daysHoliday} />
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
