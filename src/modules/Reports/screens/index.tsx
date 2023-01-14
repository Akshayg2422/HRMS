import React, { useEffect, useState } from 'react'
import { Card, Container, DropDown, Icon, Table, InputText, ChooseBranchFromHierarchical, DatePicker, CommonTable, Primary, AllHierarchical, NoRecordFound, MyActiveBranches, MultiselectHierarchical, useKeyPress } from '@components'
import { Icons } from '@assets'
import { ATTENDANCE_TYPE, downloadFile, dropDownValueCheck, getMomentObjFromServer, getServerDateFromMoment, REPORTS_TYPE, showToast, TABLE_CONTENT_TYPE_REPORT, Today } from '@utils';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getDepartmentData, getDesignationData, getDownloadMisReport, getMisReport, resetMisReportData } from '../../../store/employee/actions';
import { AttendanceReport, LeaveReports, LogReports } from '../container';
import { multiSelectBranch } from '../../../store/dashboard/actions';


function Reports() {

  const {
    misReport,
    currentPage,
  } = useSelector((state: any) => state.EmployeeReducer);

  const { hierarchicalBranchIds, hierarchicalAllBranchIds, multiSelectHierarchicalBranch } = useSelector(
    (state: any) => state.DashboardReducer
  );
  const enterPress = useKeyPress("Enter");
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
  const [logRange, setLogRange] = useState({
    dateFrom: Today,
    dataTo: Today,
  });

  useEffect(() => {
    getDepartments()
    getDesignation()
    return () => {
      dispatch(multiSelectBranch([]))
    };
  }, [])

  useEffect(() => {
    if (enterPress) {
      getReports(currentPage)
    }
  }, [enterPress])

  useEffect(() => {
    getReports(currentPage)
  }, [selectedDepartment, reportsType, selectedDesignation, selectedAttendanceType, multiSelectHierarchicalBranch])

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


  const getReports = ((pageNumber: number) => {
    if (validateParams()) {
      setLogRange({ ...logRange, dataTo: customRange.dataTo, dateFrom: customRange.dateFrom });
      const params = {
        ...(hierarchicalBranchIds.include_child && { child_ids: hierarchicalBranchIds?.child_ids }),
        ...(searchEmployee && { q: searchEmployee }),
        ...(hierarchicalAllBranchIds !== -1 && { branch_ids: [hierarchicalBranchIds?.branch_id] }),
        ...(reportsType === "log" ? { attendance_type: selectedAttendanceType } : { attendance_type: -1 }),
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
    }
  })


  const dateTimePickerHandler = (value: string, key: string) => {
    setCustomRange({ ...customRange, [key]: value });
  };

  const validateParams = () => {
    if (!reportsType) {
      showToast("error", t("inValidType"));
      return false;
    } else if (!selectedDesignation) {
      showToast("error", t("inValidDesignation"));
      return false;
    }
    else if (!selectedDepartment) {
      showToast("error", t("inValidDepartment"));
      return false;
    } else if (!selectedAttendanceType && reportsType === 'log') {
      showToast("error", t("inValidAttendance"));
      return false;
    }
    return true
  }

  const downloadSampleFile = () => {
    if (validateParams()) {
      setLogRange({ ...logRange, dataTo: customRange.dataTo, dateFrom: customRange.dateFrom });
      const params = {
        report_type: reportsType,
        ...(hierarchicalBranchIds.include_child && { child_ids: hierarchicalBranchIds?.child_ids }),
        ...(reportsType === "log" ? { attendance_type: selectedAttendanceType } : { attendance_type: -1 }),
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
          // getReports(currentPage)
          // setCustomRange({ ...customRange, dataTo: Today, dateFrom: Today });
        },
        onError: (error: string) => {
          // getReports(currentPage)
        },
      }));
    }
  };




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
              setReportsType(dropDownValueCheck(event.target.value, 'Select Report'))
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
                  setSelectedAttendanceType(dropDownValueCheck(event.target.value, "Select Attendance"));
                }
              }}
            />
          </div>}
          <Container additionClass={'col-lg-6 mt-4'}>
            {/* <MultiselectHierarchical /> */}
            <ChooseBranchFromHierarchical />
          </Container>
          <DropDown
            additionClass={'col-lg-3 col-md-12'}
            label={t('designation')}
            placeholder={t('selectDesignation')}
            data={designationData}
            value={selectedDesignation}
            onChange={(event) => {
              if (setSelectedDesignation) {
                setSelectedDesignation(dropDownValueCheck(event.target.value, t('selectDesignation')));
              }
            }}
          />
          <DropDown
            additionClass={'col-lg-3 col-md-12'}
            label={"Department"}
            placeholder={"Select Department"}
            data={departmentsData}
            value={selectedDepartment}
            onChange={(event) => {
              if (setSelectedDepartment) {
                setSelectedDepartment(dropDownValueCheck(event.target.value, "Select Department"));
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
              maxDate={Today}
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
          <Container additionClass={'col-lg-2'}>
            <Icon icon={Icons.DownloadSecondary} onClick={() => downloadSampleFile()} />
            <Primary text={'Search'} onClick={() => getReports(currentPage)} />
          </Container>
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
        <>  {misReport && misReport.data && misReport?.data.length > 0 ? <LogReports data={misReport.data} department={selectedDepartment} reportType={reportsType} customrange={customRange} designation={selectedDesignation} attendanceType={selectedAttendanceType} endDate={logRange.dataTo} startDate={logRange.dateFrom} />
          : <NoRecordFound />}</>
      }
    </>
  )
}

export { Reports }