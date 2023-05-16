import React, { useEffect, useState } from 'react'
import { Card, Container, DropDown, Icon, Table, InputText, ChooseBranchFromHierarchical, DatePicker, CommonTable, Primary, AllHierarchical, NoRecordFound, MyActiveBranches, MultiselectHierarchical, useKeyPress, TableWrapper, Search } from '@components'
import { Icons } from '@assets'
import { ATTENDANCE_TYPE, downloadFile, dropDownValueCheck, getMomentObjFromServer, getServerDateFromMoment, INITIAL_PAGE, REPORTS_TYPE, showToast, TABLE_CONTENT_TYPE_REPORT, Today } from '@utils';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getDepartmentData, getDesignationData, getDownloadMisReport, getMisReport, resetMisReportData } from '../../../store/employee/actions';
import { AttendanceReport, ConsolidatedSalaryReport, LeaveReports, LogReports, SalaryReport, ShiftReports } from '../container';
import { multiSelectBranch } from '../../../store/dashboard/actions';
import { getBranchShifts } from '../../../store/shiftManagement/actions';
import moment from 'moment'
import { getEmployeeEarnings } from '../../../store/Payroll/actions';


function Reports() {

  const {
    misReport,
    currentPage,
  } = useSelector((state: any) => state.EmployeeReducer);


  const { hierarchicalBranchIds, hierarchicalAllBranchIds, multiSelectHierarchicalBranch, dashboardDetails } = useSelector(
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

  const [shiftGroupData, setShiftGroupData] = useState<any>([])
  const [shiftName, setShiftName] = useState<any>([])
  const [designationFilterShiftGroupData, setDesignationFilterShiftGroupData] = useState<any>([])


  const [shiftDesignationData, setShiftDesignationData] = useState<any>([])
  const [selectedDepartment, setSelectedDepartment] = useState(departmentsData[0].id);
  const [selectedShift, setSelectedShift] = useState<any>();
  const [selectedDesignation, setSelectedDesignation] = useState<any>(designationData[0].id);
  const [shiftSelectedDesignation, setShiftSelectedDesignation] = useState<any>(shiftDesignationData[0]?.id);
  const [selectedAttendanceType, setSelectedAttendanceType] = useState(ATTENDANCE_TYPE[0].type)
  const [initialRender, setInitialRender] = useState(true)


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
    getBranchShiftsList()
    return () => {
      dispatch(multiSelectBranch([]))
    };
  }, [])

  useEffect(() => {
    if (enterPress) {
      getReports(INITIAL_PAGE)
    }
  }, [enterPress])

  useEffect(() => {
    reportsType !== 'shift' && getReports(INITIAL_PAGE)
  }, [selectedDepartment, reportsType, selectedDesignation, selectedAttendanceType, hierarchicalBranchIds])


  useEffect(() => {
    if (reportsType === 'shift' && selectedShift) {
      getReports(INITIAL_PAGE)
      setShiftName(getShiftName(selectedShift, shiftGroupData))
    }
    if (reportsType === 'shift' && initialRender) {
      designationMatchShifts(shiftDesignationData[0]?.id)
    }
  }, [selectedDepartment, reportsType, selectedAttendanceType, hierarchicalBranchIds, selectedShift, shiftSelectedDesignation])



  const getDepartments = (() => {
    const params = {}
    dispatch(getDepartmentData({
      params,
      onSuccess: (response: any) => () => {
        let mergedDepartments = [...departmentsData, ...response]
        setDepartmentsData(mergedDepartments)
      },
      onError: (errorMessage: string) => () => {
      },
    }));
  })


  const getDesignation = (() => {
    const params = {}
    dispatch(getDesignationData({
      params,
      onSuccess: (response: any) => () => {
        let mergedDesignation = [...designationData, ...response]
        setDesignationData(mergedDesignation)
        setShiftDesignationData(response)
        setShiftSelectedDesignation(response[0]?.id)
      },
      onError: (errorMessage: string) => () => {
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

  const getBranchShiftsList = () => {
    const params = { branch_id: dashboardDetails?.company_branch?.id }
    dispatch(getBranchShifts({
      params,
      onSuccess: (success: object) => () => {
        setShiftGroupData(success)
      },
      onError: (error: string) => () => {
        showToast("error", error);
      },
    }));
  }

  const designationMatchShifts = (id: any) => {
    let shifts
    if (id !== "-1") {
      shifts = shiftGroupData && shiftGroupData.length > 0 && shiftGroupData.filter((el: any) => el?.weekly_shift?.designation_id === id)
      shifts.length > 0 ? setSelectedShift(shifts[0].id) : showToast('info', t('noShift'))
    }
    setDesignationFilterShiftGroupData(shifts)
  }

  const getShiftName = (id: string, array: any) => {
    let shiftName = ''
    array && array.length > 0 && array.map((item: any) => {
      if (item?.id === id) {
        shiftName = item.name
      }
    })
    return shiftName
  }

  const getReports = ((pageNumber: number) => {
    if (validateParams()) {
      setLogRange({ ...logRange, dataTo: customRange.dataTo, dateFrom: customRange.dateFrom });
      const params = {
        ...(hierarchicalBranchIds.include_child && { child_ids: hierarchicalBranchIds?.child_ids }),
        ...(searchEmployee && { q: searchEmployee }),
        ...(hierarchicalAllBranchIds !== -1 && { branch_ids: [hierarchicalBranchIds?.branch_id] }),
        ...(reportsType === "log" || reportsType === "shift" ? { attendance_type: selectedAttendanceType } : { attendance_type: -1 }),
        report_type: reportsType,
        department_id: selectedDepartment,
        designation_id: reportsType !== 'shift' ? selectedDesignation : shiftSelectedDesignation,
        ...(reportsType === 'shift' && { shift_id: selectedShift }),
        download: false,
        selected_date: customRange.dateFrom,
        selected_date_to: customRange.dataTo,
        page_number: pageNumber,
      };

      dispatch(getMisReport({
        params,
        onSuccess: (response: any) => () => {
        },
        onError: (errorMessage: string) => () => {
        },
      }));
    }
  })

  useEffect(() => {


    if (customRange.dateFrom && customRange.dataTo) {
      const startOfMonth = moment(customRange.dateFrom).startOf('month').format('YYYY-MM-DD');
      const endOfMonth = moment(customRange.dateFrom).endOf('month').format('YYYY-MM-DD');

      if (customRange.dataTo > endOfMonth) {
        setCustomRange({ ...customRange, dataTo: endOfMonth });
      }

    }

  }, [customRange.dateFrom, customRange.dataTo])


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
    } else if (reportsType === 'shift' && designationFilterShiftGroupData.length < 0) {
      showToast("error", t("noShift"));
      return false;
    }
    else if (!customRange.dataTo) {
      showToast("error", 'End date should not be empty');
      return false;

    }
    else if (!selectedShift && reportsType === 'shift') {
      showToast("error", t("invalidShift"));
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
        ...(searchEmployee && { q: searchEmployee }),
        department_id: selectedDepartment,
        designation_id: reportsType !== 'shift' ? selectedDesignation : shiftSelectedDesignation,
        ...(hierarchicalAllBranchIds !== -1 && { branch_ids: [hierarchicalBranchIds.branch_id] }),
        ...(reportsType === 'shift' && { shift_id: selectedShift }),
        selected_date: customRange.dateFrom,
        selected_date_to: customRange.dataTo,
        page_number: currentPage,
        download: true,
      };
      dispatch(getDownloadMisReport({
        params,
        onSuccess: (response: any) => () => {
          downloadFile(response);
        },
        onError: (error: string) => () => {
        },
      }));
    }
  };

  const tableData = [
    {
      employee: "John Doe",
      designation: "Software Engineer",
      total: "11",
      billable_days: "9",
      net_salary: 37230.56,
      lop_days: 5,
      lop: 2,
      total_Payable: 18615.28
    },
    {
      employee: "Jane Smith",
      designation: "UX Designer",
      total: "15",
      billable_days: "12",
      net_salary: 47687.22,
      lop_days: 3,
      lop: 1,
      total_Payable: 23924.44
    },
    {
      employee: "Bob Johnson",
      designation: "Project Manager",
      total: "20",
      billable_days: "18",
      net_salary: 67282.14,
      lop_days: 2,
      lop: 0.5,
      total_Payable: 33641.07
    }
  ];

  const sample = [
    {
      employee: "Bob Johnson",
      designation: "Sales Manager",
      basic_salary: "50 (percent)",
      working_days: 20,
      allowance_breakdown: {
        DA: 6000,
        "Other Allowance": 7750,
        "House rent allowance ": 5000
      },
      deduction_breakdown: {
        TDS: 69.44,
        "Professional Tax": 200,
        "Employee PF Contribution": 0
      }
    },
    {
      employee: "Alice Smith",
      designation: "Marketing Coordinator",
      basic_salary: "35 (percent)",
      working_days: 22,
      allowance_breakdown: {
        DA: 4500,
        "Other Allowance": 6250,
        "House rent allowance ": 4000
      },
      deduction_breakdown: {
        TDS: 44.44,
        "Professional Tax": 150,
        "Employee PF Contribution": 0
      }
    },
    {
      employee: "John Williams",
      designation: "Senior Developer",
      basic_salary: "80 (percent)",
      working_days: 21,
      allowance_breakdown: {
        DA: 8000,
        "Other Allowance": 9250,
        "House rent allowance ": 5500
      },
      deduction_breakdown: {
        TDS: 99.99,
        "Professional Tax": 300,
        "Employee PF Contribution": 0
      }
    }
  ]


  return (
    <>
      <TableWrapper>
        <div className='container-fluid mb-3'>
          <div className='row'>
            <div className='col-sm-3'>
              <DropDown
                additionClass={''}
                placeholder={'Select Report'}
                value={reportsType} label={t('misReport')}
                data={REPORTS_TYPE}
                onChange={(event) => {
                  setReportsType(dropDownValueCheck(event.target.value, 'Select Report'))
                  setSelectedAttendanceType(ATTENDANCE_TYPE[0].type)
                  dispatch(resetMisReportData([]))
                }} />
            </div>
            {(reportsType === "log") || (reportsType === 'shift') ?
              <div className="col-sm-3">
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
              </div> : <></>}
            <div className='col-sm-3'>
              <ChooseBranchFromHierarchical />
            </div>

            {reportsType !== 'shift' &&
              <div className='col-sm-3'>
                <DropDown
                  additionClass={''}
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
              </div>
            }
            {reportsType === 'shift' &&
              <div className='col-sm-3'>
                <DropDown
                  additionClass={''}
                  label={t('designation')}
                  placeholder={t('selectDesignation')}
                  data={shiftDesignationData}
                  value={shiftSelectedDesignation}
                  onChange={(event) => {
                    if (setShiftSelectedDesignation) {
                      setInitialRender(false)
                      setSelectedShift('')
                      designationMatchShifts(event.target.value)
                      setShiftSelectedDesignation(event.target.value);
                    }
                  }}
                />
              </div>
            }
            <div className='col-sm-3'>
              <DropDown
                additionClass={''}
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
            </div>
            {reportsType === 'shift' &&
              <div className='col-sm-3'>
                <DropDown
                  additionClass={''}
                  label={"Shift"}
                  placeholder={"Select Shift"}
                  data={designationFilterShiftGroupData}
                  value={selectedShift}
                  onChange={(event) => {
                    if (setSelectedShift) {
                      setSelectedShift(event.target.value);
                    }
                  }}
                />
              </div>}
            <div className='col-sm-3'>
              <InputText
                placeholder={t("enterEmployeeName")}
                label={t("employeeName")}
                value={searchEmployee}
                onChange={(e) => {
                  setSearchEmployee(e.target.value);
                }}
              />
            </div>
            <div className='col-sm-3'>
              <h5 className=''>{t("startDate")}</h5>
              <DatePicker
                additionalClass='pt-1'
                placeholder={"Select Date"}
                icon={Icons.Calendar}
                maxDate={Today}
                iconPosition={"prepend"}
                onChange={(date: string) =>
                  dateTimePickerHandler(date, "dateFrom")
                }
                value={customRange.dateFrom}
              />
            </div>
            <div className='col-sm-3'>
              <h5>{t("endDate")}</h5>
              <DatePicker
                additionalClass='pt-1'
                placeholder={"Select Date"}
                icon={Icons.Calendar}
                maxDate={Today}
                iconPosition={"append"}
                onChange={(date: string) => dateTimePickerHandler(date, "dataTo")}
                value={customRange.dataTo}
              />
            </div>
          </div>
          <div>
            <Icon icon={Icons.DownloadSecondary} additionClass={'col-xl-1 mb-sm-0 mb-2'} onClick={() => downloadSampleFile()} />
            {/* <Search variant="Icon" icons={Icons.DownloadSecondary} onClick={() => downloadSampleFile()} /> */}
            <Search variant="Button" onClick={() => getReports(INITIAL_PAGE)} />
          </div>
        </div>

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
        {reportsType === "shift" &&
          <>  {misReport && misReport.data && misReport?.data.length > 0 ? <ShiftReports data={misReport} department={selectedDepartment} reportType={reportsType} customrange={customRange} designation={shiftSelectedDesignation} attendanceType={selectedAttendanceType} shiftid={selectedShift} name={shiftName} endDate={logRange.dataTo} startDate={logRange.dateFrom} />
            : <NoRecordFound />}</>
        }
        {reportsType === "salary" &&
          <>  {
            // misReport && misReport.data && misReport?.data.length < 0 ?
            <SalaryReport data={tableData} department={selectedDepartment} reportType={reportsType} customrange={customRange} designation={shiftSelectedDesignation} attendanceType={selectedAttendanceType} shiftid={selectedShift} name={shiftName} endDate={logRange.dataTo} startDate={logRange.dateFrom} />
            // : <NoRecordFound />
          }</>
        }
        {reportsType === "consolidatedSalaryReport" &&
          <>  {
            // misReport && misReport.data && misReport?.data.length > 0 ?
            <ConsolidatedSalaryReport data={sample} department={selectedDepartment} reportType={reportsType} customrange={customRange} designation={shiftSelectedDesignation} attendanceType={selectedAttendanceType} endDate={logRange.dataTo} startDate={logRange.dateFrom} />
            // : <NoRecordFound />
          }</>
        }
      </TableWrapper>
    </>
  )
}

export { Reports }