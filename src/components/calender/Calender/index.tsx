import React from "react";
import FullCalendar, { CustomButtonInput } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

interface CalenderProps {
  dateClick?: any;
  events?: { title: string; date: string }[];
  customButtons?:
    | {
        [name: string]: CustomButtonInput;
      }
    | undefined;
}

function index({ dateClick, events, customButtons }: CalenderProps) {
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
      
    />
  );
}

export default index;
