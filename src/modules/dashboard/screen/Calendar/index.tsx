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
  const [daysHoliday,]=useState<any[]>([])
  const { t, i18n } = useTranslation();
  const { calendarEvents } = useSelector((state: any) => state.EmployeeReducer);

  useEffect(() => {
    let params = {};
    dispatch(fetchCalendardetails({}));
    calendarEvents?.days_holiday?.map((item:any)=>{
      daysHoliday.push({title:item.title,date:item.day,color:"green"})});
    
    calendarEvents?.days_leave?.map((item:any)=>{
      if(item.date_from)
      {
        daysHoliday.push({title:item.reason,start:item.date_from,end:item.date_to,color:"red"})
      }
      else{
        daysHoliday.push({title:item.reason,date:item.day,color:"red"})
      }
    })

    calendarEvents?.days_absent?.map((item:any)=>{
      if(item.date_from)
      {
        daysHoliday.push({title:item.reason,start:item.date_from,end:item.date_to,color:"red"})
      }
      else{
        daysHoliday.push({title:item.reason,date:item.day,color:"red"})
      }
    })


  }, []);

  const handleDateClick = (arg: any) => {
    

let data = daysHoliday.filter((item)=>item.date === arg.dateStr)


 if(data)
 {
   console.log("data",data)
 }
 else{
      setModel(!model);
      dispatch(getLeaveFromDate(arg.dateStr));
 }

  }


  return (
    <>
      <Container additionClass={"col-9 mt-5"}>
        <Card>
          <Calender
            dateClick={handleDateClick}
              events={daysHoliday?.length>1? daysHoliday :[]}
              
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
