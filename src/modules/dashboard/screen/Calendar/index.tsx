import React from "react";
import { Container, Calender, Card, Sort } from "@components";
import { Navbar } from "@modules";
import { goTo, ROUTE, useNav } from "@utils";

function Calendar() {
  const navigation = useNav();

  const handleDateClick = (arg: any) => {
    console.log("arg---->", arg);
    goTo(navigation, ROUTE.ROUTE_APPLY_LEAVE);
  };

  return (
    <>
      <Container additionClass={"col-9 mt-5"}>
        <Card>
          <Calender dateClick={handleDateClick} />
        </Card>
      </Container>
    </>
  );
}

export default Calendar;
