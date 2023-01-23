import React, { useEffect, useState } from "react";
import {
  Sort,
  CommonTable,
  Modal,
  Carousel,
  Table,
  NoRecordFound,
  Container,
  Secondary,
  Primary,
  InputText,
  BackArrow,
} from "@components";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import {
  getEmployeesCheckInLogs,
  getCheckInDetailedLogPerDay,
  getEmployeeEachUserTimeSheets,
  applyLeave,
} from "../../../../store/employee/actions";
import {
  getDisplayTimeFromMoment,
  getMomentObjFromServer,
  showToast,
  getDisplayDateTimeFromMoment,
  useNav,
  validateDefault,
  showAdminModify,
} from "@utils";

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

function MyLog() {
  const { t } = useTranslation();
  let dispatch = useDispatch();
  const navigation = useNav();

  const employeeLogSort = [
    { id: 2, title: t("last3Months") },
    { id: 1, title: moment().format("MMMM") },
  ];

  const sortData = [
    { id: 1, title: "Daily" },
    { id: 2, title: "Weekly" },
    { id: 3, title: "Monthly" },
  ];

  const [activeSort, setActiveSort] = useState<number>(1);
  const [startDate, setStartDate] = useState(
    moment().startOf("month").format("yyyy-MM-DD")
  );
  const [endDate, setEndDate] = useState(
    moment().add(1, "days").format("yyyy-MM-DD")
  );
  const [type, setType] = useState<string>("daily");

  const [attachmentModel, setAttachmentModel] = useState<boolean>(false);
  const [logPerDayModel, setLogPerDayModel] = useState<boolean>(false);
  const [markAsPresentModel, setMarkAsPresentModel] = useState<boolean>(false);
  const [markAsPresentDetails, setMarkAsPresentDetails] = useState({
    date: "",
    reason: "",
    id: "",
  });

  const [attachment, setAttachment] = useState<Array<string>>([]);
  const {
    employeeCheckInLogs,
    employeeCheckInDetailedLogPerDay,
    employeeEachUserSheets,
  } = useSelector((state: any) => state.EmployeeReducer);

  useEffect(() => {
    getUserCheckInLogs();
  }, [startDate]);

  // useEffect(() => {
  //   getEmployeeEachUserTimeSheetsApi();
  // }, [type]);

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
  }

  const normalizedEmployeeLog = (data: any) => {
    return data.map((el: CheckInLog) => {
console.log(" showAdminModify(el.day_status_type)", showAdminModify(el.day_status_type),el.day_status_type,typeof(el.day_status_type));

      return {
        date: el.date,
        in: el.start_time
          ? getDisplayTimeFromMoment(getMomentObjFromServer(el.start_time))
          : "-",
        out: el.end_time
          ? getDisplayTimeFromMoment(getMomentObjFromServer(el.end_time))
          : "-",
        remark: el.day_status,
        "Request": <>{showAdminModify(el.day_status_type) ?
          <Secondary text={'Request'} size={'btn-sm'} style={{ borderRadius: '20px', fontSize: '8px' }} onClick={(e: any) => onModify(e, el)} />
          : '-'  }</>
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

  const onModify = (e: any, item: any) => {
    e.stopPropagation()
    setMarkAsPresentDetails({
      ...markAsPresentDetails,
      date: item.date,
      id: item.id,
    });
    setMarkAsPresentModel(!markAsPresentModel);
  }

  function getEmployeeCheckInDetailedLogPerDay(index: number) {
    const selectedDate = employeeCheckInLogs[index].date;
    dispatch(
      getCheckInDetailedLogPerDay({
        date: selectedDate,
      })
    );
    setLogPerDayModel(!logPerDayModel);
  }

  const dateTimePickerHandler = (value: string, key: string) => {
    setMarkAsPresentDetails({ ...markAsPresentDetails, [key]: value });
  };
  const onChangeHandler = (event: any) => {
    setMarkAsPresentDetails({
      ...markAsPresentDetails,
      [event.target.name]: event.target.value,
    });
  };

  const validateOnSubmit = () => {
    if (!validateDefault(markAsPresentDetails.reason).status) {
      showToast("error", t("invalidReason"));
      return false;
    }
    return true;
  };

  const onRequestHandler = () => {
    if (validateOnSubmit()) {
      const params = {
        day_status_id: markAsPresentDetails.id,
        date_from: markAsPresentDetails.date,
        date_to: markAsPresentDetails.date,
        reason: markAsPresentDetails.reason,
      };
      dispatch(
        applyLeave({
          params,
          onSuccess: (response: any) => {
            setMarkAsPresentModel(!markAsPresentModel);
            setMarkAsPresentDetails({ ...markAsPresentDetails, reason: "" });
            showToast("success", response?.message);
          },
          onError: (error: string) => {
            showToast("error", error);
            setMarkAsPresentDetails({ ...markAsPresentDetails, reason: "" });
            setMarkAsPresentModel(!markAsPresentModel);
          },
        })
      );
    }
  };

  return (
    <>
      <div className="row">
        <div className="col">
          <BackArrow additionClass={"m-3"} />
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
        </div>
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
      <Modal
        showModel={markAsPresentModel}
        toggle={() => setMarkAsPresentModel(!markAsPresentModel)}
      >
        <Container>
          <span className="h4 ml-xl-4">{t("requestForAsPresent")}</span>
          <Container additionClass="col-6 my-4">
            <InputText
              disabled
              label={t("today")}
              value={markAsPresentDetails.date}
              name={"date"}
              onChange={(event) => {
                onChangeHandler(event);
              }}
            />
            <InputText
              label={t("reason")}
              validator={validateDefault}
              value={markAsPresentDetails.reason}
              name={"reason"}
              onChange={(event) => {
                onChangeHandler(event);
              }}
            />
          </Container>
          <Container margin={"mt-5"} additionClass={"text-right"}>
            <Secondary
              text={t("cancel")}
              onClick={() => setMarkAsPresentModel(!markAsPresentModel)}
            />
            <Primary text={t("request")} onClick={() => onRequestHandler()} />
          </Container>
        </Container>
      </Modal>
    </>
  );
}

export default MyLog;
