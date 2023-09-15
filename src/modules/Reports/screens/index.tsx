import React, { useEffect, useState } from 'react'
import { Card, Container, DropDown, Icon, Table, InputText, ChooseBranchFromHierarchical, DatePicker, CommonTable, Primary, AllHierarchical, NoRecordFound, MyActiveBranches, MultiselectHierarchical, useKeyPress, TableWrapper, Search ,MultiSelectDropDown} from '@components'
import { Icons } from '@assets'
import { ATTENDANCE_TYPE, BLOOD_GROUP_LIST, DOMAIN, downloadFile, dropDownValueCheck, EMPLOYEE_TYPE, GENDER_LIST, getArrayFromArrayOfObject, getMomentObjFromServer, getServerDateFromMoment, HFWS_QUALIFICATIONS, INITIAL_PAGE, MARITAL_STATUS_LIST, REPORTS_TYPE, showToast, TABLE_CONTENT_TYPE_REPORT, ThisMonth, Today } from '@utils';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getDepartmentData, getDesignationData, getDownloadMisReport, getMisReport, resetMisReportData ,getVender} from '../../../store/employee/actions';
import { AttendanceReport, ConsolidatedSalaryReport, LeaveReports, LogReports, SalaryReport, ShiftReports,RegisterReport } from '../container';
import { multiSelectBranch } from '../../../store/dashboard/actions';
import { getBranchShifts } from '../../../store/shiftManagement/actions';
import moment from 'moment';



function Reports() {
  const {
    misReport,
    currentPage,
    getVenderList
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
    name: "All",
  }])
//i do this
  const isHfws = localStorage.getItem(DOMAIN);
  const [departmentData, setDepartmentData] = useState<any>([])
  const [designationData, setDesignationData] = useState([{
    id: "-1",
    name: "All"
  }])

  const [designationsData, setDesignationsData] = useState<any>([])

  const MONTHS = [
    {
      id: "0",
      name: "January",
    },
    {
      id: "1",
      name: "February",
    },
    {
      id: "2",
      name: "March",
    },
    {
      id: "3",
      name: "April",
    },
    {
      id: "4",
      name: "May",
    },
    {
      id: "5",
      name: "June",
    },
    {
      id: "6",
      name: "July",
    },
    {
      id: "7",
      name: "August",
    },
    {
      id: "8",
      name: "September",
    },
    {
      id: "9",
      name: "October",
    },
    {
      id: "10",
      name: "November",
    },
    {
      id: "11",
      name: "December",
    }
  ]

  const currentMonth = new Date().getMonth();
  const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');


  const [monthData, setMonthData] = useState(MONTHS);
  const [shiftGroupData, setShiftGroupData] = useState<any>([])
  const [shiftName, setShiftName] = useState<any>([])
  const [designationFilterShiftGroupData, setDesignationFilterShiftGroupData] = useState<any>([])

  const [customMonth, setCustomMonth] = useState(MONTHS[currentMonth].id);

  const [shiftDesignationData, setShiftDesignationData] = useState<any>([])
//i do this
  const [shiftDesignationsData, setShiftDesignationsData] = useState<any>([])

  const [selectedDepartment, setSelectedDepartment] = useState(departmentsData[0].id);
 //i do this
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedGender, setSelectedGender] = useState([]);
  const [selectedAgency, setSelectedAgency] = useState([]);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState([]);
  const [selectedMartialStatus, setSelectedMartialStatus] = useState([]);
const [selectedQualification, setSelectedQualification] = useState([]);
const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedShift, setSelectedShift] = useState<any>();
  const [selectedDesignation, setSelectedDesignation] = useState<any>(designationData[0].id);
  const [selectedDesignations, setSelectedDesignations] = useState<any>([]);
  const [shiftSelectedDesignation, setShiftSelectedDesignation] = useState<any>(shiftDesignationData[0]?.id);

  const [shiftSelectedDesignations, setShiftSelectedDesignations] = useState<any>(shiftDesignationData[0]?.id);

  const [selectedAttendanceType, setSelectedAttendanceType] = useState(ATTENDANCE_TYPE[0].type)
 
  const [initialRender, setInitialRender] = useState(true)
  const [customRange, setCustomRange] = useState({
    dateFrom: ThisMonth,
    dataTo: Today,
  });
 
  const [logRange, setLogRange] = useState({
    dateFrom: Today,
    dataTo: Today,
  });
  const [initialSalary, setInitialSalary] = useState(true)
  const [minData, setMinData] = useState('')
  const [maxDate, setMaxData] = useState('')

  useEffect(() => {
    reportsType !== 'shift' && getReports(INITIAL_PAGE)
  }, [selectedDepartment,selectedDepartments, reportsType,selectedAgency,selectedCategory, selectedDesignation,selectedDesignations, selectedAttendanceType, hierarchicalBranchIds,selectedGender,selectedBloodGroup,selectedMartialStatus,selectedQualification])

  useEffect(() => {
    getDepartments()
    getDesignation()
    getBranchShiftsList()
    getVenderData()
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
    const filteredMonth = MONTHS.filter((el: any) => el.id <= currentMonth)
    setMonthData(filteredMonth);
  }, [])


  useEffect(() => {
    if (reportsType === 'shift' && selectedShift) {
      getReports(INITIAL_PAGE)
      setShiftName(getShiftName(selectedShift, shiftGroupData))
    
    }
    if (reportsType === 'shift' && initialRender) {
      // designationMatchShifts(shiftDesignationData[0]?.id)
      console.log('ppppp')
    }
  }, [selectedDepartment,selectedDepartments,selectedCategory, reportsType, selectedAttendanceType,selectedAgency, hierarchicalBranchIds, selectedShift, shiftSelectedDesignation,selectedGender,selectedBloodGroup,selectedMartialStatus,selectedQualification])



  const getDepartments = (() => {
    const params = {}
    dispatch(getDepartmentData({
      params,
      onSuccess: (response: any) => () => {
        let mergedDepartments = [...departmentsData, ...response]
        setDepartmentsData(mergedDepartments)
        //i do this
        let mergedDepartment = [...departmentData, ...response]
        setDepartmentData(mergedDepartment)

       
      
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
        let mergedDesignations = [...designationsData, ...response]
        setDesignationData(mergedDesignation)
        setDesignationsData(mergedDesignations )
        setShiftDesignationData(response)
        setShiftDesignationsData(response)
     
        setShiftSelectedDesignation(response[0]?.id)
      },
      onError: (errorMessage: string) => () => {
      },
    }));
  })

  const getVenderData =(()=>{
    const params={}
    dispatch(getVender({
      params,
      onSuccess: (response: any) => () => {
     
      },
      onError: (errorMessage: string) => () => {
      },

    }))

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


  useEffect(() => {
    if (customRange.dateFrom && customRange.dataTo) {
      const endOfMonth = moment(customRange.dateFrom).endOf('month').format('YYYY-MM-DD');
      if (customRange.dataTo > endOfMonth) {
        setCustomRange({ ...customRange, dataTo: endOfMonth });
      }
    }
  }, [customRange.dateFrom, customRange.dataTo])

  useEffect(() => {
    getMonthMinMaxDate(customMonth)
  }, [customMonth])


  function getMonthMinMaxDate(month: any) {
    const year = new Date().getFullYear();
    const date = new Date(year, month, 1);
    const minDate = new Date(date.getFullYear(), date.getMonth(), 1);
    const maxDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const dateFrom = getServerDateFromMoment(getMomentObjFromServer(minDate))
    const dataTo = getServerDateFromMoment(getMomentObjFromServer(maxDate))
    if (month != currentMonth) {
      setCustomRange({ ...customRange, dateFrom: dateFrom, dataTo: dataTo, });
      setMinData(dateFrom)
      setMaxData(dataTo)
    }
    else {
      setCustomRange({ ...customRange, dateFrom: dateFrom, dataTo: Today, });
      setMinData(startOfMonth)
      setMaxData(Today)
    }

  }

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
   
  
    if(id?.length>0){
    let selectedData=getArrayFromArrayOfObject(id,'id')
 
    if(selectedData.length>0){
      selectedData.map((element:any)=>{
        shifts = shiftGroupData && shiftGroupData.length > 0 && shiftGroupData.filter((el: any) => el?.weekly_shift?.designation_id === element)
        shifts.length > 0 ? setSelectedShift([...selectedShift,shifts[0].id]) : showToast('info', t('noShift'))

      })
    }
  }
    

  
    // if (id !== "-1") {
    //   shifts = shiftGroupData && shiftGroupData.length > 0 && shiftGroupData.filter((el: any) => el?.weekly_shift?.designation_id === id)
      
    //   shifts.length > 0 ? setSelectedShift(shifts[0].id) : showToast('info', t('noShift'))
    // }
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
        // department_id: selectedDepartment,
      ...( selectedDepartments.length>0&& { department_ids:getArrayFromArrayOfObject(selectedDepartments,'id') }),
        ...(selectedDesignations.length>0 && {designation_ids:getArrayFromArrayOfObject(selectedDesignations,'id')}),
        ...(selectedGender.length>0 &&{genders:getArrayFromArrayOfObject(selectedGender,'id')}),
        ...(selectedBloodGroup.length>0 &&{blood_groups:getArrayFromArrayOfObject(selectedBloodGroup,'id')}),
        ...(selectedMartialStatus.length>0 &&{marital_statuss:getArrayFromArrayOfObject(selectedMartialStatus,'id')}),
        ...(selectedQualification.length>0 &&{qualifications:getArrayFromArrayOfObject(selectedQualification,'id')}),
        ...(selectedAgency.length>0 && {vendor_ids:getArrayFromArrayOfObject(selectedAgency,'id')}),
        ...(selectedCategory.length>0 && {employment_types:getArrayFromArrayOfObject(selectedCategory,'id')}),
        
        
        // designation_id: reportsType !== 'shift' ? selectedDesignation : shiftSelectedDesignation,
        // ...(reportsType === 'shift' && { shift_ids: selectedShift }),
        download: false,
        selected_date: initialSalary && (reportsType === 'salary_basic') || (reportsType === 'salary_breakdown') ? ThisMonth : customRange.dateFrom,
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


  const dateTimePickerHandler = (value: string, key: string) => {
    setCustomRange({ ...customRange, [key]: value });
    setInitialSalary(false)
  };

  const validateParams = () => {

    if (!reportsType) {
      showToast("error", t("inValidType"));
      return false;
    } else if (!selectedDesignations) {
      showToast("error", t("inValidDesignation"));
      return false;
    }
    else if (!selectedDepartments) {
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
        // department_id: selectedDepartment,
        
        // designation_id: reportsType !== 'shift' ? selectedDesignation : shiftSelectedDesignation,
        ...( selectedDepartments.length>0&& { department_ids:getArrayFromArrayOfObject(selectedDepartments,'id') }),
        ...(selectedDesignations.length>0 && {designation_ids:getArrayFromArrayOfObject(selectedDesignations,'id')}),
        ...(selectedGender.length>0 &&{genders:getArrayFromArrayOfObject(selectedGender,'id')}),
        ...(selectedBloodGroup.length>0 &&{blood_groups:getArrayFromArrayOfObject(selectedBloodGroup,'id')}),
        ...(selectedMartialStatus.length>0 &&{marital_statuss:getArrayFromArrayOfObject(selectedMartialStatus,'id')}),
        ...(selectedQualification.length>0 &&{qualifications:getArrayFromArrayOfObject(selectedQualification,'id')}),
        ...(selectedAgency.length>0 && {vendor_ids:getArrayFromArrayOfObject(selectedAgency,'id')}),
        ...(selectedCategory.length>0 && {employment_types:getArrayFromArrayOfObject(selectedCategory,'id')}),

        ...(hierarchicalAllBranchIds !== -1 && { branch_ids: [hierarchicalBranchIds.branch_id] }),
        // ...(reportsType === 'shift' && { shift_ids: selectedShift }),
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

            {/* {reportsType !== 'shift' &&
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
            } */}
            {/* {reportsType === 'shift' &&
              <div className='col-sm-3'>
                <DropDown
                  additionClass={''}
                  label={t('designation')}
                  placeholder={t('selectDesignation')}
                  data={shiftDesignationData}
                  value={shiftSelectedDesignation}
                  onChange={(event) => {
                    if (setShiftSelectedDesignation) {
                      console.log(event.target.value,"event.target.value====>")
                      setInitialRender(false)
                      setSelectedShift('')
                      designationMatchShifts(event.target.value)
                      setShiftSelectedDesignation(event.target.value);
                    }
                  }}
                />
              </div>
            } */}
            {/* <div className='col-sm-3'>
              <DropDown
                additionClass={''}
                label={"Department"}
                placeholder={"Select Department"}P
                data={departmentsData}
                value={selectedDepartment}
                onChange={(event) => {
                  if (setSelectedDepartment) {
                    setSelectedDepartment(dropDownValueCheck(event.target.value, "Select Department"));
                  }
                }}
              />
            </div> */}
         {reportsType !== 'shift' ? <div className={'col-sm-3 '}>
              <MultiSelectDropDown
                  options={designationsData!}
                  displayValue={"name"}
                   heading={"Designation"}
                  placeholder={'Select Designation'}
                  onSelect={(item) => {
                   
                      setSelectedDesignations(item)
                  }}
                  onRemove={(item) => {
                   setSelectedDesignations(item)
                  }}
              />

            </div>:
            <div className={'col-sm-3 '}>
              <MultiSelectDropDown
                  options={shiftDesignationData!}
                  displayValue={"name"}
                   heading={"Designation"}
                  placeholder={'Select Designation'}
                  onSelect={(item) => {
                 
                    setShiftSelectedDesignations(item)
                    setInitialRender(false)
                    setSelectedShift('')
                      designationMatchShifts(item)
                  }}
                  onRemove={(item) => {
                    setShiftSelectedDesignations(item)
                  }}
              />

            </div>
}
            <div className={'col-sm-3 '}>
              <MultiSelectDropDown
                  options={departmentData!}
                  displayValue={"name"}
                   heading={"Department"}
                  placeholder={'Select Department'}
                  onSelect={(item) => {
                   
                    setSelectedDepartments(item)
                   
                  }}
                  onRemove={(item) => {
                    setSelectedDepartments(item)
                  }}
              />

            </div>
            {/* setSelectedCategory */}
            <div className={'col-sm-3 '}>
              <MultiSelectDropDown
                  options={EMPLOYEE_TYPE!}
                  displayValue={"name"}
                   heading={"Category"}
                  placeholder={'Select Category'}
                  onSelect={(item) => {
                   
                    setSelectedCategory(item)
                   
                  }}
                  onRemove={(item) => {
                    setSelectedCategory(item)
                  }}
              />

            </div>

          {isHfws==='HFWS' &&  <div className={'col-sm-3 '}>
              <MultiSelectDropDown
                  options={GENDER_LIST!}
                  displayValue={"name"}
                   heading={"Gender"}
                  placeholder={'Select Gender'}
                  onSelect={(item) => {
                   
                    setSelectedGender(item)
                   
                  }}
                  onRemove={(item) => {
                    setSelectedGender(item)
                  }}
              />

            </div>
}

{dashboardDetails?.permission_details?.company_code==='WTC' &&  <div className={'col-sm-3 '}>
              <MultiSelectDropDown
                  options={getVenderList!}
                  displayValue={"name"}
                   heading={"Agency"}
                  placeholder={'Select Agency'}
                  onSelect={(item) => {
                    setSelectedAgency(item)
                   
                  }}
                  onRemove={(item) => {
                    setSelectedAgency(item)
                  }}
              />

            </div>
}
           {isHfws==='HFWS' && <div className={'col-sm-3 '}>
              <MultiSelectDropDown
                  options={BLOOD_GROUP_LIST!}
                  displayValue={"name"}
                   heading={"Blood Group"}
                  placeholder={'Select Blood Group'}
                  onSelect={(item) => {
                   
                    setSelectedBloodGroup(item)
                   
                  }}
                  onRemove={(item) => {
                    setSelectedBloodGroup(item)
                  }}
              />

            </div>
}
           { isHfws==='HFWS' && <div className={'col-sm-3 '}>
              <MultiSelectDropDown
                  options={MARITAL_STATUS_LIST!}
                  displayValue={"name"}
                   heading={"Marital Status"}
                  placeholder={'Select Martial Status '}
                  onSelect={(item) => {
                   
                    setSelectedMartialStatus(item)
                   
                  }}
                  onRemove={(item) => {
                    setSelectedMartialStatus(item)
                  }}
              />
            </div>
}
         {  isHfws==='HFWS' && <div className={'col-sm-3 '}>
              <MultiSelectDropDown
                  options={HFWS_QUALIFICATIONS!}
                  displayValue={"name"}
                   heading={"Qualification"}
                  placeholder={'Select Qualification'}
                  onSelect={(item) => {
                   
                    setSelectedQualification(item)
                   
                  }}
                  onRemove={(item) => {
                    setSelectedQualification(item)
                  }}
              />

            </div>
}

            
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
            <div className="col-lg-3 col-md-4 col-sm-12 mt--1 ">
              <DropDown
                label='Month'
                placeholder='Select month'
                data={monthData}
                value={customMonth}
                onChange={(e) => {
                  setCustomMonth(e.target.value)
                }}
              />
            </div>
            <div className='col-sm-3'>
              <h5 className=''>{t("startDate")}</h5>
              <DatePicker
                additionalClass='pt-1'
                placeholder={"Select Date"}
                icon={Icons.Calendar}
                minDate={minData}
                maxDate={maxDate}
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
                minDate={minData}
                maxDate={maxDate}
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
          <> {misReport && misReport.data && misReport?.data.length > 0 ? <LeaveReports data={misReport.data} customrange={customRange} departments={selectedDepartments}  reportType={reportsType} designations={selectedDesignations} qualifications={selectedQualification} categorys={selectedCategory}genders={selectedGender}bloodGroups={selectedBloodGroup}martialStatus={selectedMartialStatus} agencys={selectedAgency} />
            : <NoRecordFound />}</>
        }
        {reportsType === "attendance" && <>
          {misReport && misReport.data && misReport?.data.length > 0 ? <AttendanceReport data={misReport.data} customrange={customRange} departments={selectedDepartments} reportType={reportsType} designations={selectedDesignations} qualifications={selectedQualification} categorys={selectedCategory}genders={selectedGender}bloodGroups={selectedBloodGroup}martialStatus={selectedMartialStatus} agencys={selectedAgency} />
            : <NoRecordFound />}
        </>
        }
        {reportsType === "log" &&
          <>  {misReport && misReport.data && misReport?.data.length > 0 ? <LogReports data={misReport.data} departments={selectedDepartments} reportType={reportsType} customrange={customRange} designations={selectedDesignations} attendanceType={selectedAttendanceType} endDate={logRange.dataTo} startDate={logRange.dateFrom} qualifications={selectedQualification} categorys={selectedCategory}genders={selectedGender}bloodGroups={selectedBloodGroup}martialStatus={selectedMartialStatus} agencys={selectedAgency}/>
            : <NoRecordFound />}</>
        }

{reportsType === "Register" &&
          <>  {misReport && misReport.data && misReport?.data.length > 0 ? <RegisterReport data={misReport.data} departments={selectedDepartments} reportType={reportsType} customrange={customRange} designations={selectedDesignations} attendanceType={selectedAttendanceType} endDate={logRange.dataTo} startDate={logRange.dateFrom} qualifications={selectedQualification} categorys={selectedCategory}genders={selectedGender}bloodGroups={selectedBloodGroup}martialStatus={selectedMartialStatus} agencys={selectedAgency}/>
            : <NoRecordFound />}</>
        }
        {reportsType === "shift" &&
          <>  {misReport && misReport.data && misReport?.data.length > 0 ? <ShiftReports data={misReport.data} departments={selectedDepartments} reportType={reportsType} customrange={customRange} designations={shiftSelectedDesignations} attendanceType={selectedAttendanceType} shiftid={selectedShift} name={shiftName} endDate={logRange.dataTo} startDate={logRange.dateFrom}  qualifications={selectedQualification} categorys={selectedCategory}genders={selectedGender}bloodGroups={selectedBloodGroup}martialStatus={selectedMartialStatus} agencys={selectedAgency}/>
            : <NoRecordFound />}</>
        }
        {reportsType === "salary_basic" &&
          <>  {
            misReport && misReport.data && misReport?.data.length > 0 ?
              <SalaryReport data={misReport.data} departments={selectedDepartments} reportType={reportsType} customrange={customRange} designations={selectedDesignations} attendanceType={selectedAttendanceType} shiftid={selectedShift} name={shiftName} endDate={logRange.dataTo} startDate={logRange.dateFrom} qualifications={selectedQualification} categorys={selectedCategory}genders={selectedGender}bloodGroups={selectedBloodGroup}martialStatus={selectedMartialStatus} agencys={selectedAgency} />
              : <NoRecordFound />
          }</>
        }
        {reportsType === "salary_breakdown" &&
          <>  {
            misReport && misReport.data && misReport?.data?.length > 0 ?
              <ConsolidatedSalaryReport data={misReport.data} departments={selectedDepartments} reportType={reportsType} customrange={customRange} designations={selectedDesignations} endDate={logRange.dataTo} startDate={logRange.dateFrom} qualifications={selectedQualification} categorys={selectedCategory}genders={selectedGender}bloodGroups={selectedBloodGroup}martialStatus={selectedMartialStatus} agencys={selectedAgency} />
              : <NoRecordFound />
          }</>
        }
      </TableWrapper>
    </>
  )
}

export { Reports }