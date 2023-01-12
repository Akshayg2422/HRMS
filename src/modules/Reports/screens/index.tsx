import React, { useEffect, useState } from 'react'
import { Card, Container, DropDown, Icon, Table, InputText, ChooseBranchFromHierarchical, DatePicker, CommonTable, Primary, AllHierarchical, NoRecordFound, MyActiveBranches } from '@components'
import { Icons } from '@assets'
import { ATTENDANCE_TYPE, downloadFile, getMomentObjFromServer, getServerDateFromMoment, REPORTS_TYPE, showToast, TABLE_CONTENT_TYPE_REPORT, Today } from '@utils';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getDepartmentData, getDesignationData, getDownloadMisReport, getMisReport, resetMisReportData } from '../../../store/employee/actions';
import { AttendanceReport, LeaveReports, LogReports } from '../container';


function Reports() {

  const {
    misReport, departmentDropdownData, designationDropdownData,
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
  const [designationData, setDesignationData] = useState([{
    id: "-1",
    name: "All"
  }])
  const [selectedDepartment, setSelectedDepartment] = useState(departmentsData[0].id);
  const [selectedDesignation, setSelectedDesignation] = useState<any>(designationData[0].id);
  const [selectedAttendanceType, setSelectedAttendanceType] = useState(ATTENDANCE_TYPE[0].type)
  const [customRange, setCustomRange] = useState({
    dateFrom: Today,
    dataTo: Today,
  });

  useEffect(() => {
    getDepartments()
    getDesignation()
  }, [])

  useEffect(() => {
    getReports(currentPage)
  }, [hierarchicalBranchIds, selectedDepartment, hierarchicalAllBranchIds, reportsType, selectedDesignation, selectedAttendanceType])

  const getDepartments = (() => {
    const params = {}
    dispatch(getDepartmentData({
      params,
      onSuccess: (response: any) => {
        let mergedDepartments = [...departmentsData, ...response]
        setDepartmentsData(mergedDepartments)
      },
      onError: (errorMessage: string) => {
      },
    }));
  })

  const getDesignation = (() => {
    const params = {}
    dispatch(getDesignationData({
      params,
      onSuccess: (response: any) => {
        let mergeddesignation = [...designationData, ...response]
        setDesignationData(mergeddesignation)
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
      ...(hierarchicalBranchIds.include_child && { child_ids: hierarchicalBranchIds?.child_ids }),
      ...(searchEmployee && { q: searchEmployee }),
      ...(hierarchicalAllBranchIds !== -1 && { branch_ids: [hierarchicalBranchIds?.branch_id] }),
      ...(reportsType === "log" ? { attendance_type: selectedAttendanceType } : { attendance_type: '-1' }),
      report_type: reportsType,
      department_id: selectedDepartment,
      designation_id: selectedDesignation,
      download: false,
      selected_date: customRange.dateFrom,
      selected_date_to: customRange.dataTo,
      page_number: pageNumber,
    };
    dispatch(getMisReport({
      params,
      onSuccess: (response: any) => {
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
      ...(hierarchicalBranchIds.include_child && { child_ids: hierarchicalBranchIds?.child_ids }),
      ...(reportsType === "log" ? { attendance_type: selectedAttendanceType } : { attendance_type: '-1' }),
      department_id: selectedDepartment,
      designation_id: selectedDesignation,
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

  return (
    <>
      <Card>
        <Container flexDirection={'row'} display={'d-flex'} alignItems={'align-items-center'}>
          <DropDown
            additionClass={'col-lg-3 col-md-12 mt-xl--2'}
            placeholder={'Select Report'}
            value={reportsType} label={t('misReport')}
            data={REPORTS_TYPE}
            onChange={(event) => {
              setReportsType(event.target.value)
              dispatch(resetMisReportData([]))
            }} />
          {reportsType === "log" && <div className="col-lg-3 col-md-12">
            <DropDown
              label={t('attendanceType')}
              placeholder={"Select Attendance"}
              data={ATTENDANCE_TYPE}
              value={selectedAttendanceType}
              onChange={(event) => {
                if (setSelectedAttendanceType) {
                  setSelectedAttendanceType(event.target.value);
                }
              }}
            />
          </div>}
          <Container additionClass={'col-lg-6  mt-xl-4'}>
            {/* <AllHierarchical /> */}
            <ChooseBranchFromHierarchical />
          </Container>
          {/* <Container flexDirection={'row'} display={'d-flex'} additionClass={''}  > */}
            <DropDown
              additionClass={'col-lg-3 col-md-12'}
              label={t('designation')}
              placeholder={t('selectDesignation')}
              data={designationData}
              value={selectedDesignation}
              onChange={(event) => {
                if (setSelectedDesignation) {
                  setSelectedDesignation(event.target.value);
                }
              }}
            />
            <DropDown
              additionClass={'col-lg-3 col-md-12  mt-xl--2'}
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
            <Container additionClass={'col-lg-3'}>
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
            <Container additionClass={'col-lg-3'}>
              <h5>{t("endDate")}</h5>
              <DatePicker
                placeholder={"Select Date"}
                icon={Icons.Calendar}
                iconPosition={"append"}
                onChange={(date: string) => dateTimePickerHandler(date, "dataTo")}
                value={customRange.dataTo}
              />
            </Container>
            <Container additionClass={'col-lg-2'} style={{ marginTop: "30px" }}>
              <Icon icon={Icons.DownloadSecondary} onClick={() => downloadSampleFile()} />
              <Primary text={'Search'} onClick={() => getReports(currentPage)} />
            </Container>
          {/* </Container> */}
        </Container>
      </Card>
      {reportsType === "leave" &&
        <> {misReport && misReport.data && misReport?.data.length > 0 ? <LeaveReports data={misReport.data} customrange={customRange} department={selectedDepartment} reportType={reportsType} designation={selectedDesignation} />
          : <NoRecordFound />}</>
      }
      {reportsType === "attendance" && <>
        {misReport && misReport.data && misReport?.data.length > 0 ? <AttendanceReport data={misReport.data} customrange={customRange} department={selectedDepartment} reportType={reportsType} designation={selectedDesignation} />
          : <NoRecordFound />}
      </>
      }
      {reportsType === "log" &&
        <>  {misReport && misReport.data && misReport?.data.length > 0 ? <LogReports data={misReport.data} department={selectedDepartment} reportType={reportsType} customrange={customRange} designation={selectedDesignation} />
          : <NoRecordFound />}</>
      }
    </>
  )
}

export { Reports }