import React from "react";
import { Container, Calender, Card, Sort, Primary } from "@components";
import { Navbar } from "@modules";
import { goTo, ROUTE, useNav } from "@utils";
import { useTranslation } from "react-i18next";

function Calendar() {
  const { t } = useTranslation();

  const navigation = useNav();

  const handleDateClick = (arg: any) => {
    console.log("arg---->", arg);
    goTo(navigation, ROUTE.ROUTE_APPLY_LEAVE);
  };

  const handleApplyLeave = () => {
    goTo(navigation, ROUTE.ROUTE_APPLY_LEAVE);
  };

  const handleLeaveRequest = () => {
    goTo(navigation, ROUTE.ROUTE_LEAVE_REQUEST);
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
          <Calender dateClick={handleDateClick} />
        </Card>
      </Container>
    </>
  );
}

export default Calendar;
