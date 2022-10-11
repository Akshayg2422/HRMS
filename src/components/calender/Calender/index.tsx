import React from "react";
import FullCalendar, { CustomButtonInput } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

interface CalenderProps {
  dateClick?: any;
  events?: any;
  customButtons?:
    | {
        [name: string]: CustomButtonInput;
      }
    | undefined;
  eventClick?: any;
}

function index({
  dateClick,
  events,
  customButtons,
  eventClick,
}: CalenderProps) {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      headerToolbar={{
        left: "title",
        center: "",
        right: "today,prev,next",
      }}
      events={events}
      customButtons={customButtons}
      dateClick={dateClick}
      eventClick={eventClick}
      displayEventTime={false}
    />
  );
}

export default index;
