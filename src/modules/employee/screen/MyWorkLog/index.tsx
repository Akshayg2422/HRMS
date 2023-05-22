import React, { useEffect, useMemo, useState } from "react";
import {
  Sort,
  CommonTable,
  Modal,
  Carousel,
  Table,
  NoRecordFound,
  Card,
  BackArrow,
  TableWrapper,
  ImageView,
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
import { Icons } from "@assets";

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
  attachments?: any;
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
    getEmployeeEachUserTimeSheetsApi();
  }, [type]);


  function getEmployeeEachUserTimeSheetsApi() {
    const params = {
      type: type,
    }
    dispatch(
      getEmployeeEachUserTimeSheets({
        params,
        onSuccess: (success: any) => () => {

        },
        onError: (error: any) => () => {

        }
      })
    );

  }


  const normalizedTimeSheet = (timesheet1: any) => {
    return timesheet1.map((it: TimeSheetResponse) => {
      return {
        Details: it.details,
        Time: getDisplayDateTimeFromMoment(
          getMomentObjFromServer(it.time_stamp)
        ),
        address: it.address?.address_text ? it.address?.address_text : "      -",
        "": <ImageView icon={Icons.Eye} 
        // onClick={
        //   () => {
        //     setAttachment(it?.attachments);
        //     setAttachmentModel(!attachmentModel);
        //   }
        // } 
        />

      };
    });
  };

  const normalizedPerDayData = (data: any) => {
    return data.map((it: any) => {
      return {
        Time: getDisplayTimeFromMoment(getMomentObjFromServer(it.checkin_time)),
        Type: it.type,
        address: it.address_text ? it.address_text : "       -",
      };
    });
  };


  const onTabChangeWorkBook = (index: number) => {
    setType(sortData[index].title.toLocaleLowerCase());
  };


  const memoizedTable = useMemo(() => {
    return <>
      {employeeEachUserSheets && employeeEachUserSheets.length > 0 ? (
        <CommonTable
          // noHeader
          card={false}
          title={"My Time Sheet"}
          displayDataSet={normalizedTimeSheet(employeeEachUserSheets)}
          tableOnClick={(e, index, item) => {
            const attachment = employeeEachUserSheets[index].attachments;
            setAttachment(attachment);
            setAttachmentModel(!attachmentModel);
          }}
        />
      ) : <NoRecordFound />}
    </>
  }, [employeeEachUserSheets])



  return (
    <>
      <TableWrapper>
        <div className="row">
          <div className="col">
            <div className="col text-right mb-3">
              <Sort
                size="btn-sm"
                sortData={sortData}
                activeIndex={activeSortWorkBook}
                onClick={(index: any, item: any) => {
                  setActiveSortWorkBook(index);
                  onTabChangeWorkBook(index);
                }}
              />
            </div>
            <div className="">
              {
                memoizedTable
              }
            </div>
          </div>
        </div>
      </TableWrapper>
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
