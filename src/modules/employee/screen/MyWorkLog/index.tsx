import React, { useEffect, useState } from "react";
import {
  Sort,
  CommonTable,
  Modal,
  Carousel,
  Table,
  NoRecordFound,
  Card,
  BackArrow,
} from "@components";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import {
  getEmployeesList,
  getEmployeesCheckInLogs,
  getCheckInDetailedLogPerDay,
  getEmployeeEachUserTimeSheets,
} from "../../../../store/employee/actions";
import {
  paginationHandler,
  displayStringExists,
  getDisplayTimeFromMoment,
  getMomentObjFromServer,
  showToast,
  getDisplayDateTimeFromMoment,
  useNav,
  goTo,
  ROUTE,
} from "@utils";
import index from "@src/components/Table";
import { Item } from "@src/screens/Zenylog_site/components/Input";
import { ManageLeaves, Navbar } from "@modules";

type CheckInLog = {
  date?: string;
  logs?: [];
  start_time?: string;
  end_time?: string;
  day_status_type?: number;
  day_status?: string;
  hours_spent?: number;
  mobile_number?: string;
};

type TimeSheetResponse = {
  id?: string;
  details?: string;
  attachments?: [];
  time_stamp?: string;
  address?: {
    address_text?: string;
    location_latitude?: string;
    location_longitude?: string;
  };
};

function MyWorkLog() {
  const { t } = useTranslation();
  let dispatch = useDispatch();
  const navigation = useNav();

  const employeeLogSort = [
    { id: 1, title: t("last3Months") },
    { id: 2, title: moment().format("MMMM") },
  ];

  const sortData = [
    { id: 1, title: "Daily" },
    { id: 2, title: "Weekly" },
    { id: 3, title: "Monthly" },
  ];

  const [activeSort, setActiveSort] = useState<number>(1);
  const [activeSortWorkBook, setActiveSortWorkBook] = useState<number>(0);
  const [startDate, setStartDate] = useState(
    moment().startOf("month").format("yyyy-MM-DD")
  );
  const [endDate, setEndDate] = useState(
    moment().add(1, "days").format("yyyy-MM-DD")
  );
  const [type, setType] = useState<string>("daily");

  const [attachmentModel, setAttachmentModel] = useState<boolean>(false);
  const [logPerDayModel, setLogPerDayModel] = useState<boolean>(false);

  const [attachment, setAttachment] = useState<Array<string>>([]);

  const {
    employeeCheckInLogs,
    employeeCheckInDetailedLogPerDay,
    employeeEachUserSheets,
  } = useSelector((state: any) => state.EmployeeReducer);

  useEffect(() => {
    getUserCheckInLogs();
  }, [startDate]);

  useEffect(() => {
    getEmployeeEachUserTimeSheetsApi();
  }, [type]);

  function getUserCheckInLogs() {
    const params = { start_time: startDate, end_time: endDate };
    dispatch(getEmployeesCheckInLogs({ params }));
  }

  function getEmployeeEachUserTimeSheetsApi() {
    dispatch(
      getEmployeeEachUserTimeSheets({
        type,
      })
    );

    console.log(JSON.stringify(employeeEachUserSheets) + "======");
  }

  const normalizedEmployeeLog = (data: any) => {
    return data.map((el: CheckInLog) => {
      return {
        date: el.date,
        in: el.start_time
          ? getDisplayTimeFromMoment(getMomentObjFromServer(el.start_time))
          : "-",
        out: el.end_time
          ? getDisplayTimeFromMoment(getMomentObjFromServer(el.end_time))
          : "-",
        remark: el.day_status,
      };
    });
  };

  const normalizedTimeSheet = (timesheet1: any) => {
    return timesheet1.map((it: TimeSheetResponse) => {
      return {
        Details: it.details,
        Time: getDisplayDateTimeFromMoment(
          getMomentObjFromServer(it.time_stamp)
        ),
        address: it.address?.address_text,
      };
    });
  };

  const normalizedPerDayData = (data: any) => {
    return data.map((it: any) => {
      return {
        Time: getDisplayTimeFromMoment(getMomentObjFromServer(it.checkin_time)),
        Type: it.type,
        address: it.address_text,
      };
    });
  };

  const onTabChange = (index: number) => {
    if (index === 0) {
      setStartDate(moment().add(-3, "month").format("yyyy-MM-DD"));
    } else {
      setStartDate(moment().startOf("month").format("yyyy-MM-DD"));
    }
  };

  const onTabChangeWorkBook = (index: number) => {
    setType(sortData[index].title.toLocaleLowerCase());
  };

  function getEmployeeCheckInDetailedLogPerDay(index: number) {
    const selectedDate = employeeCheckInLogs[index].date;
    dispatch(
      getCheckInDetailedLogPerDay({
        date: selectedDate,
      })
    );
    setLogPerDayModel(!logPerDayModel);
  }

  return (
    <>
      <div className="row">
        <div className="col">
          <></>
          <BackArrow additionClass={'m-3'}/>
          <div className="col text-right mb-3">
            <Sort
              sortData={sortData}
              activeIndex={activeSortWorkBook}
              onClick={(index) => {
                setActiveSortWorkBook(index);
                onTabChangeWorkBook(index);
              }}
            />
          </div>
          <div className="mr--3">
            <CommonTable
              tableTitle={"My Time Sheet"}
              displayDataSet={normalizedTimeSheet(employeeEachUserSheets)}
              tableOnClick={(e, index, item) => {
                const attachment = employeeEachUserSheets[index].attachments;
                setAttachment(attachment);
                setAttachmentModel(!attachmentModel);
              }}
            />
          </div>
        </div>
        {/* <div className="col">
          <div className="col text-right mb-3">
            <Sort
              sortData={employeeLogSort}
              activeIndex={activeSort}
              onClick={(index) => {
                setActiveSort(index);
                onTabChange(index);
              }}
            />
          </div>

          <div className="ml--3">
            <CommonTable
              tableTitle={"My Log"}
              displayDataSet={normalizedEmployeeLog(employeeCheckInLogs)}
              tableOnClick={(e, index, Item) => {
                getEmployeeCheckInDetailedLogPerDay(index);
              }}
            />
          </div>
        </div> */}
      </div>
      <Modal
        title={"Attachment"}
        showModel={attachmentModel}
        toggle={() => setAttachmentModel(!attachmentModel)}
      >
        {attachment && attachment.length > 0 ? (
          <Carousel images={attachment} height={500} />
        ) : (
          <></>
        )}
      </Modal>
      <Modal
        showModel={logPerDayModel}
        toggle={() => setLogPerDayModel(!logPerDayModel)}
      >
        {employeeCheckInDetailedLogPerDay &&
        employeeCheckInDetailedLogPerDay.length > 0 ? (
          <Table
            displayDataSet={normalizedPerDayData(
              employeeCheckInDetailedLogPerDay
            )}
          />
        ) : (
          <NoRecordFound />
        )}
      </Modal>
      </>
  );
}

export default MyWorkLog;
