import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  Container,
  Calender,
  Card,
  Sort,
  Modal,
  Primary,
  ChooseBranchFromHierarchical,
  CommonTable,
  Secondary,
  NoRecordFound,
} from "@components";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  getLeaveFromDate,
  fetchCalendardetails,
  getSelectedEventId,
  deleteHoliday,
} from "../../../../store/employee/actions";
import { goTo, ROUTE, showToast, useNav } from "@utils";
import Hierarchical from "@src/components/ChooseBranchFromHierarchical";

function ManageLeaves() {
  const navigation = useNav();
  const dispatch = useDispatch();
  const [model, setModel] = useState(false);
  const[recall,setRecall]=useState(false)
  const [deleteModel, setDeleteModel] = useState(false);
  const [daysHoliday] = useState<any[]>([]);
  const { t, i18n } = useTranslation();
  const { calendarEvents, numOfPages, currentPage, selectedEventId } =
    useSelector((state: any) => state.EmployeeReducer);

  const { hierarchicalBranchIds } = useSelector(
    (state: any) => state.DashboardReducer
  );

  useEffect(() => {
    getCalendarDetails(currentPage);
    geteventsdetails();
  }, []);

  const getCalendarDetails = (pageNumber: number) => {
    const params = {
      ...hierarchicalBranchIds,
      pageNumber: pageNumber,
    };
    dispatch(fetchCalendardetails({ params }));
  };

  function paginationHandler(
    type: "next" | "prev" | "current",
    position?: number
  ) {
    let page =
      type === "next"
        ? currentPage + 1
        : type === "prev"
        ? currentPage - 1
        : position;
    getCalendarDetails(page);
  }

  const normalizedEmployeeLog = (data: any) => {
    return data.map((el: any) => {
      return {
        day: el.day,
        title: el.title,
        description: el.description,
      };
    });
  };

  const geteventsdetails = () => {
    calendarEvents?.days_leave?.map((item: any) => {
      daysHoliday.push({
        title: item.reason,
        start: item.date_from,
        end: item.date_to + "T23:59:00",
        color:
          item.status_code === 1
            ? "green"
            : item.status_code === 0
            ? "red"
            : "gray",
      });
    });
    calendarEvents?.days_absent?.map((item: any) => {
      daysHoliday.push({
        title: item.reason,
        start: item.date_from,
        end: item.date_to + "T23:59:00",
        color: "gray",
      });
    });
    calendarEvents?.days_holiday?.map((item: any) => {
      daysHoliday.push({
        title: item.title,
        start: item.day,
        end: item.day,
        color: "green",
      });
    });
    setRecall(true)

  };


  console.log(" calendarEvents?.days_leave", calendarEvents?.days_leave);

  return (
    <>
      <Container additionClass={"mt-5 main-contain"}>
        <Card>
          <Calender events={daysHoliday?.length > 0 ? daysHoliday : []} />
        </Card>
        <h1>{t("holidayList")}</h1>
        <Card>
          {daysHoliday && daysHoliday.length > 0 ? (
            <CommonTable
              noHeader
              isPagination
              currentPage={currentPage}
              noOfPage={numOfPages}
              paginationNumberClick={(currentPage) => {
                paginationHandler("current", currentPage);
              }}
              previousClick={() => paginationHandler("prev")}
              nextClick={() => paginationHandler("next")}
              displayDataSet={normalizedEmployeeLog(
                calendarEvents?.days_holiday
              )}
            />
          ) : (
            <NoRecordFound />
          )}
        </Card>
      </Container>
    </>
  );
}

export default ManageLeaves;
