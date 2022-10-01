import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"


interface CalenderProps{
  dateClick?:any;
  events?:any ;
}


function index({dateClick,events}:CalenderProps) {




  return (
    <FullCalendar
      plugins={[dayGridPlugin,interactionPlugin]}
      
      initialView="dayGridMonth"
      headerToolbar={{
        left: 'title',
        center: '',
        right: 'today,prev,next'
      }}
      events={events}
      dateClick={dateClick}

    />
  )
}

export default index