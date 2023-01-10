import React, { useEffect, useState } from 'react'
import { Card, Container, DropDown, DateRangePicker, Icon, Table, InputText, ChooseBranchFromHierarchical, DatePicker, CommonTable, Primary, AllHierarchical, NoRecordFound, MyActiveBranches } from '@components'
import { Icons } from '@assets'
import { downloadFile, getMomentObjFromServer, getServerDateFromMoment, REPORTS_TYPE, showToast, TABLE_CONTENT_TYPE_REPORT, Today } from '@utils';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getDepartmentData, getDownloadMisReport, getMisReport, resetMisReportData } from '../../../store/employee/actions';
import { AttendanceReport, LeaveReports, LogReports } from '../container';
import { getDashboard } from '../../../store/dashboard/actions';


function Reports() {

  const {
    misReport, departmentDropdownData,
    currentPage,
  } = useSelector((state: any) => state.EmployeeReducer);

  const { hierarchicalBranchIds, hierarchicalAllBranchIds } = useSelector(
    (state: any) => state.DashboardReducer
  );

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [searchEmployee, setSearchEmployee] = useState('')
  const [reportsType, setReportsType] = useState(REPORTS_TYPE[0].value)
  const [departmentsData, setDepartmentsData] = useState([{
    id: "-1",
    name: "All"
  }])
  const [selectedDepartment, setSelectedDepartment] = useState(departmentsData[0].id);
  const [customRange, setCustomRange] = useState({
    dateFrom: Today,
    dataTo: Today,
  });


  useEffect(() => {
    getDepartments()
    getReports(currentPage)
  }, [hierarchicalBranchIds, selectedDepartment, hierarchicalAllBranchIds, reportsType])

  const getDepartments = (() => {
    const params = {}
    dispatch(getDepartmentData({
      params,
      onSuccess: (response: any) => {
        if (departmentsData.length === 1) {
          setDepartmentsData(departmentsData.concat(departmentDropdownData))
        }
      },
      onError: (errorMessage: string) => {
      },
    }));


  })

  useEffect(() => {
    const toSeverDate = new Date(
      getServerDateFromMoment(getMomentObjFromServer(customRange.dataTo))
    ).getTime();
    const fromServerDate = new Date(
      getServerDateFromMoment(getMomentObjFromServer(customRange.dateFrom))
    ).getTime();
    if (toSeverDate < fromServerDate) {
      showToast('info', t('dateFromToValidation'))
      setCustomRange({ ...customRange, dataTo: "" });
    }
  }, [customRange.dateFrom, customRange.dataTo]);

  // const reset=()=>
  const getReports = ((pageNumber: number) => {
    const params = {
      ...(searchEmployee && { q: searchEmployee }),
      ...(hierarchicalAllBranchIds !== -1 && { branch_ids: [hierarchicalBranchIds?.branch_id] }),
      attendance_type: '-1',
      report_type: reportsType,
      department_id: selectedDepartment,
      download: false,
      selected_date: customRange.dateFrom,
      selected_date_to: customRange.dataTo,
      page_number: pageNumber,
    };
    console.log(JSON.stringify(params) + "=======");
    dispatch(getMisReport({
      params,
      onSuccess: (response: any) => {
        // console.log(JSON.stringify(response) + "========misreport");

      },
      onError: (errorMessage: string) => {
      },
    }));
  })


  const dateTimePickerHandler = (value: string, key: string) => {
    setCustomRange({ ...customRange, [key]: value });
  };


  const downloadSampleFile = () => {
    const params = {
      report_type: reportsType,
      attendance_type: reportsType === "attendance" ? '-1' : '',
      department_id: selectedDepartment,
      ...(hierarchicalAllBranchIds !== -1 && { branch_ids: [hierarchicalBranchIds.branch_id] }),
      selected_date: customRange.dateFrom,
      selected_date_to: customRange.dataTo,
      page_number: currentPage,
      download: true,
    };
    dispatch(getDownloadMisReport({
      params,
      onSuccess: (response: any) => {
        downloadFile(response);
        getReports(currentPage)
        setCustomRange({ ...customRange, dataTo: Today, dateFrom: Today });
      },
      onError: (error: string) => {
        getReports(currentPage)
      },
    }));
  };

  console.log(JSON.stringify(misReport)+"======misReport");
  

  return (
    <>
      <Card>
        <Container flexDirection={'row'} display={'d-flex'} alignItems={'align-items-center'}>
          <DropDown
            additionClass={'col-lg-3 col-md-12'}
            placeholder={'Select Report'}
            value={reportsType} label={t('misReport')}
            data={REPORTS_TYPE}
            onChange={(event) => {
              setReportsType(event.target.value)
              dispatch(resetMisReportData([]))
            }} />
          <DropDown
            additionClass={'col-lg-3 col-md-12'}
            label={"Department"}
            placeholder={"Select Department"}
            data={departmentsData}
            value={selectedDepartment}
            onChange={(event) => {
              if (setSelectedDepartment) {
                setSelectedDepartment(event.target.value);
              }
            }}
          />
          <Container additionClass={'col-lg-6  mt-xl-2'}>
            <AllHierarchical />
          </Container>

        </Container>
        <Container flexDirection={'row'} display={'d-flex'} additionClass={'mt-lg-4'}  >
          <Container additionClass={'col-lg-3 col-md-12'}>
            <InputText
              placeholder={t("enterEmployeeName")}
              label={t("employeeName")}
              value={searchEmployee}
              onChange={(e) => {
                setSearchEmployee(e.target.value);
              }}
            />
          </Container>
          <Container additionClass={'col-lg-2'}>
            <h5>{t("startDate")}</h5>
            <DatePicker
              placeholder={"Select Date"}
              icon={Icons.Calendar}
              iconPosition={"prepend"}
              onChange={(date: string) =>
                dateTimePickerHandler(date, "dateFrom")
              }
              value={customRange.dateFrom}
            />
          </Container>
          <Container additionClass={'col-lg-2'}>
            <h5>{t("endDate")}</h5>
            <DatePicker
              placeholder={"Select Date"}
              icon={Icons.Calendar}
              iconPosition={"append"}
              onChange={(date: string) => dateTimePickerHandler(date, "dataTo")}
              value={customRange.dataTo}
            />
          </Container>
          <Container additionClass={'col-lg-4'} style={{ marginTop: "30px" }}>
            <Icon icon={Icons.DownloadSecondary} onClick={() => downloadSampleFile()} />
            <Primary text={'Search'} onClick={() => getReports(currentPage)} />
          </Container>
        </Container>
      </Card>
      {reportsType === "leave" &&
        <> {misReport && misReport.data && misReport?.data.length > 0 ? <LeaveReports data={misReport.data} customrange={customRange} department={selectedDepartment} reportType={reportsType} />
          : <NoRecordFound />}</>
      }
      {reportsType === "attendance" && <>
        {misReport && misReport.data && misReport?.data.length > 0 ? <AttendanceReport data={misReport.data} customrange={customRange} department={selectedDepartment} reportType={reportsType} />
          : <NoRecordFound />}
      </>
      }
      {reportsType === "log" &&
        <>  {misReport && misReport.data && misReport?.data.length > 0 ? <LogReports data={misReport.data} department={selectedDepartment} reportType={reportsType} customrange={customRange} />
          : <NoRecordFound />}</>
      }
    </>
  )
}

export { Reports }