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
  const navigation = useNav();
  const dispatch = useDispatch();
  const [model, setModel] = useState(false);
  const [daysHoliday,setDaysHoliday]=useState<any[]>([])
  const { t, i18n } = useTranslation();
  const { calendarEvents } = useSelector((state: any) => state.EmployeeReducer);

  useEffect(() => {
    let params = {};
    dispatch(fetchCalendardetails({}));
  }, []);

  const handleDateClick = (arg: any) => {
    setModel(!model);
    dispatch(getLeaveFromDate(arg.dateStr));
  };

  // const fetchEvents=(info:any,successCallback:any)=>{
  //   calendarEvents?.days_holiday?.map((item:any)=>({title:item.title,date:item.day,color:"red"}))
  // }

  useEffect(()=>{
    calendarEvents?.days_holiday?.map((item:any)=>{setDaysHoliday([...daysHoliday,{title:item.title,date:item.day,color:"green"}])})
  },[])


  console.log(calendarEvents)
  return (
    <>
      <Container additionClass={"col-9 mt-5"}>
        <Card>
          <Calender
            dateClick={handleDateClick}
            // events={[
            //   {
            //     title: "Fever",
            //     start: "2022-09-01",
            //     end: "2022-09-05",
            //     color: "red",
                
            //   },
            //   {
            //     title: "Independance Day",
            //     start: "2022-08-25",
            //     color:"green"
            //   },
            //   {
            //     title: "Christmas",
            //     start: "2022-12-25",
            //     color: "green",
            //   },
            //   {
            //     title: "Pongal",
            //     start: "2023-01-15",
            //     color: "green",
            //   }
            // ]}
              events={daysHoliday}
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
