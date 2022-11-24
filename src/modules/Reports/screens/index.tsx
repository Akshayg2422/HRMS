import React, { useState } from 'react'
import { Card, Container, DropDown, DateRangePicker, Icon, Table, InputText, ChooseBranchFromHierarchical, DatePicker, CommonTable, Primary } from '@components'
import { Icons } from '@assets'
import { REPORTS_TYPE, TABLE_CONTENT_TYPE_REPORT } from '@utils';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';


function Reports() {
  const sampleData = [{ id: 1, name: 'Maria Rebert', CompanyName: 'Company Pvt Ltd', BranchName: 'Company Pvt Ltd', Location: 'Road , Street, chennai' }, { id: 1, name: 'Maria Rebert', CompanyName: 'Company Pvt Ltd', BranchName: 'Company Pvt Ltd', Location: 'Road , Street, chennai' }, { id: 1, name: 'Maria Rebert', CompanyName: 'Company Pvt Ltd', BranchName: 'Company Pvt Ltd', Location: 'Road , Street, chennai' }, { id: 1, name: 'Maria Rebert', CompanyName: 'Company Pvt Ltd', BranchName: 'Company Pvt Ltd', Location: 'Road , Street, chennai' }, { id: 1, name: 'Maria Rebert', CompanyName: 'Company Pvt Ltd', BranchName: 'Company Pvt Ltd', Location: 'Road , Street, chennai' }, { id: 1, name: 'Maria Rebert', CompanyName: 'Company Pvt Ltd', BranchName: 'Company Pvt Ltd', Location: 'Road , Street, chennai' }, { id: 1, name: 'Maria Rebert', CompanyName: 'Company Pvt Ltd', BranchName: 'Company Pvt Ltd', Location: 'Road , Street, chennai' }, { id: 1, name: 'Maria Rebert', CompanyName: 'Company Pvt Ltd', BranchName: 'Company Pvt Ltd', Location: 'Road , Street, chennai' }, { id: 1, name: 'Maria Rebert', CompanyName: 'Company Pvt Ltd', BranchName: 'Company Pvt Ltd', Location: 'Road , Street, chennai' }, { id: 1, name: 'Maria Rebert', CompanyName: 'Company Pvt Ltd', BranchName: 'Company Pvt Ltd', Location: 'Road , Street, chennai' }]

  const attendanceData = [{ id: 1, name: 'Name', designation: 'employee', totalDays: '1', presentDays: '5', alertDays: '3', leaveDays: "4", holidays: '1', billableDays: '0', absentDays: '0' }]

  const headerValue = [{ id: 1, name: 'Name', CompanyName: 'CompanyName', BranchName: 'Branch', Location: 'Location' }]

  const sampleTable = [{ name: 'Maria Rebert', designation: "employee", type: 'developer', reason: 'dontno', startDate: '15.09.2023', endDate: '-', days: '0', casualLeave: 'yes', status_code: -1 }]

  let dispatch = useDispatch();
  const { t } = useTranslation();
  const [reportsType, setReportsType] = useState(REPORTS_TYPE[0].value)



  const normalizedEmployeeLog = (data: any) => {
    return (
      data &&
      data.length > 0 &&
      data.map((el: any) => {
        return {
          "Name": el.name,
          "Designation": el.designation,
          "TotalDays": el.totalDays,
          "PresentDays": el.presentDays,
          "AlertDays": el.alertDays,
          "LeaveDays": el.leaveDays,
          "Holidays": el.holidays,
          "BillableDays": el.billableDays,
          "AbsentDays": el.absentDays
        };
      })
    );
  };

  return (
    <>
      <Card>
        <Container flexDirection={'row'} display={'d-flex'} alignItems={'align-items-center'}>
          <DropDown additionClass={'col-lg-3 col-md-12'} placeholder={'Select Report'} value={reportsType} label={t('misReport')} data={REPORTS_TYPE} onChange={(event) => setReportsType(event.target.value)} />
          <DropDown additionClass={'col-lg-3 col-md-12'} placeholder={'Select Department'} label={'Department'} data={[{ id: '1', name: 'Department', value: 'Leave' }]} />
          <Container additionClass={'col-lg-3  mt-xl-2'}>
            <h5 className='ml-xl-3'>{t("branch")}</h5>
            <ChooseBranchFromHierarchical />
          </Container>
          <Container additionClass={'col-lg-3 col-md-12'}>
            <InputText
              placeholder={t("enterEmployeeName")}
              label={t("employeeName")}
              onChange={(e) => {
                // setSearchEmployee(e.target.value);
              }}
            />
          </Container>
        </Container>
        <Container flexDirection={'row'} display={'d-flex'} additionClass={'mt-lg-4'}  >
          <Container additionClass={'col-lg-2'}>
            <h5>{t("startDate")}</h5>
            <DatePicker
              placeholder={"Select Date"}
              icon={Icons.Calendar}
              iconPosition={"prepend"}
            // value={customselectedDate}
            // onChange={(date: string) =>
            //   setCustomSelectedDateRange(
            //     getServerDateFromMoment(getMomentObjFromServer(date))
            //   )
            // }
            />
          </Container>
          <Container additionClass={'col-lg-2'}>
            <h5>{t("endDate")}</h5>
            <DatePicker
              placeholder={"Select Date"}
              icon={Icons.Calendar}
              iconPosition={"append"}
            // value={customselectedDate}
            // onChange={(date: string) =>
            //   setCustomSelectedDateRange(
            //     getServerDateFromMoment(getMomentObjFromServer(date))
            //   )
            // }
            />
          </Container>
          <Container additionClass={'col-lg-3'} style={{ marginTop: "33px" }}>
            <Icon icon={Icons.DownloadSecondary} />
          </Container>
          <Container additionClass={'col-lg-2'} style={{ marginTop: "30px" }}>
            {/* <Icon type={'btn-primary'} text={'Search'} /> */}
            <Primary text={'Search'} />
          </Container>
        </Container>
      </Card>
      <Card>
        {reportsType === "LeaveReport" && <>
          <CommonTable
            noHeader
            isPagination
            tableChildren={
              <LocationTable
                tableDataSet={sampleTable}
              // onRevertClick={(item) => manageRevertStatus(item)}
              // onApproveClick={(item) => {
              //   manageApproveStatus(item);
              // }}
              // onRejectClick={(item) => {
              //   manageRejectStatus(item);
              // }}
              />
            }
            custombutton={"h5"}
          />
        </>}
        {reportsType === "AttendanceReport" && <CommonTable
          noHeader
          // isPagination
          // currentPage={currentPage}
          // noOfPage={numOfPages}
          // paginationNumberClick={(currentPage) => {
          //   paginationHandler("current", currentPage);
          // }}
          // previousClick={() => paginationHandler("prev")}
          // nextClick={() => paginationHandler("next")}
          displayDataSet={normalizedEmployeeLog(attendanceData)}
          // additionalDataSet={LEAVE_STATUS_REVERT}
          // tableValueOnClick={(e, index, item, elv) => {
          //   const current = employeesLeaves[index];
          //   if (elv === "Revert") {
          //     RevertStatusHandler(current);
          //   }
          // }}
          custombutton={"h5"}
        />}
        {reportsType === "LogReport" && <Table displayDataSet={headerValue} tableContentType={TABLE_CONTENT_TYPE_REPORT} />}
      </Card>
    </>
  )
}


type LocationTableProps = {
  tableDataSet?: Array<any>;
  onApproveClick?: (item: Location) => void;
  onRejectClick?: (item: Location) => void;
};

const LocationTable = ({
  tableDataSet,
  onApproveClick,
  onRejectClick,
}: LocationTableProps) => {
  return (
    <div className="table-responsive">
      <table className="table align-items-center table-flush">
        <thead className="thead-light">
          <tr>
            <th scope="col">{"Name"}</th>
            <th scope="col">{"Designation"}</th>
            <th scope="col">{"Type"}</th>
            <th scope="col">{"Reason"}</th>
            <th scope="col">{"Start Date"}</th>
            <th scope="col">{"End Date"}</th>
            <th scope="col">{"No.Of Days"}</th>
            <th scope="col">{"Casual Leave"}</th>
            <th scope="col">{"Status"}</th>
          </tr>
        </thead>
        <tbody>
          {tableDataSet &&
            tableDataSet.length > 0 &&
            tableDataSet.map((item: any, index: number) => {
              return (
                <tr className="align-items-center">
                  <td style={{ whiteSpace: "pre-wrap" }}>{item.name}</td>
                  <td style={{ whiteSpace: "pre-wrap" }}>{item.designation}</td>
                  <td style={{ whiteSpace: "pre-wrap" }}>{item.type}</td>
                  <td style={{ whiteSpace: "pre-wrap" }}>{item.reason}</td>
                  <td style={{ whiteSpace: "pre-wrap" }}>{item.startDate}</td>
                  <td style={{ whiteSpace: "pre-wrap" }}>{item.endDate}</td>
                  <td style={{ whiteSpace: "pre-wrap" }}>{item.days}</td>
                  <td style={{ whiteSpace: "pre-wrap" }}>{item.casualLeave}</td>
                  <td style={{ whiteSpace: "pre-wrap" }}>
                    {item.status_code === -1 ? (
                      <span
                        className="h5 text-primary"
                        onClick={() => {
                          if (onApproveClick) onApproveClick(item);
                        }}
                      >
                        {"Approve"}
                      </span>
                    ) :
                      <span
                        className="h5 text-primary"
                      // onClick={() => {
                      //   if (onRevertClick) onRevertClick(item);
                      // }}
                      >
                        {"Rejected"}
                      </span>
                    }
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export { Reports }