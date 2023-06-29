import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  Container,
  Calender,
  Card,
  CommonTable,
  NoRecordFound,
  BackArrow,
} from "@components";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCalendardetails,
} from "../../../../store/employee/actions";
import { goTo, ROUTE, showToast, useNav } from "@utils";

function ManageLeaves() {
  const navigation = useNav();
  const dispatch = useDispatch();
  const [model, setModel] = useState(false);
  const [recall, setRecall] = useState(false);
  const [daysHoliday, setDaysHoliday] = useState<any[]>([]);
  const { t, i18n } = useTranslation();
  const { calendarEvents, numOfPages, currentPage, selectedEventId } =
    useSelector((state: any) => state.EmployeeReducer);

  const { hierarchicalBranchIds } = useSelector(
    (state: any) => state.DashboardReducer
  );

  useEffect(() => {
    getCalendarDetails(currentPage);
  }, []);


  const getCalendarDetails = (pageNumber: number) => {
    const params = {
      ...hierarchicalBranchIds,
      pageNumber: pageNumber,
    };
    dispatch(fetchCalendardetails({
      params,
      onSuccess: (success: any) => () => {
        geteventsdetails(success?.details);
      },
      onError: (error: any) => () => {

      }
    }));
  };

  const normalizedEmployeeLog = (data: any) => {
    return data.map((el: any) => {
      return {
        day: el.day,
        title: el.title,
        description: el.description,
      };
    });
  };

  const geteventsdetails = (events: any) => {

    let leaves: any = []
    events?.days_leave?.map((item: any) => {
      leaves.push({
        title: item.reason,
        start: item.date_from,
        end: item.date_to + "T23:59:00",
        color:
          item.status_code === 1
            ? "green"
            : item.status_code === 0
              ? "red"
              : "gray",
      })
    });
    events?.days_absent?.map((item: any) => {
      leaves.push({
        title: item.reason,
        start: item.date_from,
        end: item.date_to + "T23:59:00",
        color: "gray",
      });
    });
    events?.days_holiday?.map((item: any) => {
      leaves.push({
        title: item.title,
        start: item.day,
        end: item.day,
        color: "#52307c",
      });
    });
    setDaysHoliday(leaves)
  };





  return (
    <>
      <Container additionClass={"mt-5 main-contain"}>
        <Card>
          <h1 className="mb-3">{t('Calendar')}</h1>
          <Calender events={daysHoliday?.length > 0 ? daysHoliday : []} />
        </Card>
        <h1>{t("holidayList")}</h1>
        {/* <Card> */}
        {daysHoliday && daysHoliday.length > 0 ? (
          <CommonTable
            noHeader
            displayDataSet={normalizedEmployeeLog(
              calendarEvents?.days_holiday
            )}
          />
        ) : (
          <NoRecordFound />
        )}
        {/* </Card> */}
      </Container>
    </>
  );
}

export default ManageLeaves;
