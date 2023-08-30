import {
  DatePicker,
  DropDown,
  InputDefault,
  InputMail,
  InputNumber,
  InputText,
  FormWrapper,
  TimePicker,
  Icon,
  Modal,
  CheckBox,
  Container,
  Secondary,
  Primary,
  ScreenContainer,
  ScreenTitle,
  Divider,
  ImageView,
  NoRecordFound,
  SearchableDropdown,
} from "@components";
import { Icons } from "@assets";
import {
  GENDER_LIST,
  EMPLOYEE_TYPE,
  BLOOD_GROUP_LIST,
  showToast,
  validateAadhar,
  validateDefault,
  validateEmail,
  validateMobileNumber,
  validateName,
  validatePAN,
  getObjectFromArrayByKey,
  getMomentObjFromServer,
  getServerDateFromMoment,
  useNav,
  goBack,
  getDropDownValueByID,
  inputNumberMaxLength,
  MAX_LENGTH_MOBILE_NUMBER,
  Today,
  dropDownValueCheckByEvent,
  MAX_LENGTH_AADHAR,
  convertTo24Hour,
  isHfwsBranch,
  getDropDownFormatter,
  GROUP_LIST,
  DOMAIN,
  HFWS_SPECLILISATION,
  HFWS_ORGANISATION,
  HFWS_QUALIFICATIONS,
  EMPLOYEE_TYPE_HFWS,
  dropDownValueCheck,
  MARITAL_STATUS_LIST,
} from "@utils";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getDepartmentData,
  getDesignationData,
  getAllBranchesList,
  getEmployeeDetails,
  addDepartment,
  addDesignation,
  employeeAddition,
  getSyncData,
} from "../../../../store/employee/actions";

import { getBranchShifts, getHfwsBranchShift, getMyShifts } from "../../../../store/shiftManagement/actions";
import { getListAllBranchesList } from "../../../../store/location/actions";

type EmployeeDetail = {
  id?: string;
  first_name?: string;
  last_name?: string;
  mobile_number?: string;
  email?: string;
  pan?: string;
  aadhar_number?: string;
  designation_id?: string;
  department_id?: string;
  branch_id?: string;
  gender?: string;
  blood_group?: string;
  employment_type?: string;
  attendance_settings?: {
    start_time: string;
    end_time: string;
    is_excempt_allowed: boolean;
    enable_generic_shift: boolean;
  };
  date_of_joining?: string;
  dob?: string;
  kgid_number?: string;
  shift?: any
  qualification: any,
  branch_group: any,
  organisation: any,
  marital_status: any,
  specialization: any
};

const ManageEmployee = () => {
  const navigation = useNav();
  const { t } = useTranslation();
  let dispatch = useDispatch();
  const isHfws = localStorage.getItem(DOMAIN);
  const {
    designationDropdownData,
    departmentDropdownData,
    isEdit,
  } = useSelector((state: any) => state.EmployeeReducer);

  const { userDetails } = useSelector(
    (state: any) => state.AppReducer
  );

  const { dashboardDetails } = useSelector(
    (state: any) => state.DashboardReducer
  );

  const { listBranchesList } =
    useSelector((state: any) => state.LocationReducer);

  const { hfwsBranchShifts } = useSelector(
    (state: any) => state.ShiftManagementReducer
  );

  const INITIAL_COMPANY_BRANCH = { id: dashboardDetails?.company_branch?.id, text: dashboardDetails?.company_branch?.name }


  const [syncDetails, setSyncDetails] = useState<any>('')
  const [enableShift, setEnableShift] = useState(false)

  const [employeeDetails, setEmployeeDetails] = useState<any>({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    e_Mail: "",
    gender: "",
    bloodGroup: "",
    panNo: "",
    aadharrNo: "",
    designation: '',
    department: '',
    branch: INITIAL_COMPANY_BRANCH,
    dateOfJoining: new Date(),
    dob: "",
    kgid_No: "",
    employeeType: "",
    shift: '',
    maritalStatus: MARITAL_STATUS_LIST[0].id,
    qualification: HFWS_QUALIFICATIONS[HFWS_QUALIFICATIONS.length - 1].id,
    specialization: HFWS_SPECLILISATION[HFWS_SPECLILISATION.length - 1].id,
    group: GROUP_LIST[GROUP_LIST.length - 1].id,
    organisation: HFWS_ORGANISATION[0].id,
    attendanceStartTime: "10:00",
    attendanceEndTime: "18:00",
  });
  const [shiftGroup, setShiftGroup] = useState<any>()
  const [departmentModel, setDepartmentModel] = useState(false);
  const [designationModel, setDesignationModel] = useState(false);
  const [isAdminRights, setIsAdminRights] = useState(false);
  const [department, setDepartment] = useState("");
  const [designationNote, setDesignationNote] = useState('')
  const [designation, setDesignation] = useState("");
  const [isExempted, setIsExempted] = useState(false)
  const [isRefresh, setIsRefresh] = useState(false);
  const [selectedGenericShift, setSelectedGenericShift] = useState(syncDetails[0])

  const [companyBranchDropdownData, setCompanyBranchDropdownData] =
    useState<any>();
  const [shiftsDropdownData, setShiftsDropdownData] =
    useState<any>([]);

  const [isBranchShiftDataExist, setIsBranchShiftExist] = useState(false)

  // getHfwsBranchShift

  const getAllSubBranches = (branchList: any, parent_id: string) => {
    const branchListFiltered: any = [];
    const getChild = (branchList: any, parent_id: string) =>
      branchList
        .filter((it: any) => it.parent_id === parent_id)
        .map((it2: any) => {
          branchListFiltered.push(it2);
          getChild(branchList, it2.id);
          return it2;
        });
    getChild(branchList, parent_id);
    return branchListFiltered;
  };

  useEffect(() => {
    getSyncDataApiHAndler()
    departmentData()
    designationData()
    getBranchShiftsList()

    if (listBranchesList.length === 0) {
      const params = {};

      dispatch(
        getListAllBranchesList({
          params,
          onSuccess: (success: any) => () => {

            const parentBranch = success.find(
              (it: any) => it.id === dashboardDetails.company_branch.id
            );

            setCompanyBranchDropdownData([
              ...getAllSubBranches(
                success,
                dashboardDetails.company_branch.id
              ),
              parentBranch,
            ]);
          },
          onError: (error: string) => () => { },
        })
      );
    }
    else {
      const parentBranch = listBranchesList.find(
        (it: any) => it.id === dashboardDetails.company_branch.id
      );

      setCompanyBranchDropdownData([
        ...getAllSubBranches(
          listBranchesList,
          dashboardDetails.company_branch.id
        ),
        parentBranch,
      ]);
    }
    setDesignationNote('')

  }, [isRefresh]);


  useEffect(() => {
    if (isEdit) {
      if (isBranchShiftDataExist) {
        getEmployeeDetailsAPi(isEdit);
      }
      setDesignationNote("* Changing Designation Will Impact in Shift")
    }
  }, [isRefresh, isBranchShiftDataExist])


  const getSyncDataApiHAndler = () => {
    const params = {
      sync: []
    }
    dispatch(getSyncData({
      params,
      onSuccess: (success: any) => () => {
        const { company_generic_shifts } = success?.sync_data?.company_info
        if (company_generic_shifts.length > 0) {
          setEnableShift(true)
        }
        let normalizedData: any = []
        company_generic_shifts.length > 0 && company_generic_shifts.map((el: any) => {
          return normalizedData = [...normalizedData, { name: el.display_text, id: el.id, startTime: el.start_time, endTime: el.end_time }]
        })
        setSyncDetails(normalizedData)
      },
      onError: (error: any) => () => {

      }
    }))
  }


  const departmentData = () => {
    const params = {}
    dispatch(getDepartmentData({
      params,
      onSuccess: (success: any) => () => {

      },
      onError: (error: any) => () => {

      }
    }));

  }

  const designationData = () => {
    const params = {}

    dispatch(getDesignationData({
      params,
      onSuccess: (success: any) => () => {

      },
      onError: (error: any) => () => {

      }
    }));
  }

  const getEmployeeDetailsAPi = (id: any) => {
    const params = {
      user_id: id,
    };
    dispatch(
      getEmployeeDetails({
        params,
        onSuccess: (response: EmployeeDetail) => () => {
          preFillEmployeeDetails(response);
        },
        onError: (error: string) => () => {
          showToast('error', error);
        },
      })
    );

  };

  useEffect(() => {
    setShiftsDropdownData(designationMatchShifts(employeeDetails.designation))
  }, [shiftGroup])


  const getBranchShiftsList = () => {
    const params = { branch_id: dashboardDetails?.company_branch?.id }
    dispatch(getBranchShifts({
      params,
      onSuccess: (success: any) => async () => {
        setIsBranchShiftExist(true)
        await setShiftGroup(success)
      },
      onError: (error: string) => () => {
        showToast('error', error)
      },

    }));
  }

  const designationMatchShifts = (item: any) => {
    let shifts: any[] = []
    if (item.id) {
      shiftGroup && shiftGroup.length > 0 && shiftGroup.map((el: any) => {
        if (el?.weekly_shift?.designation_id === item.id) {
          shifts = [...shifts, el]
        }
      })
    } else (
      shifts = []
    )
    return shifts
  }


  const validatePostParams = () => {
    if (validateName(employeeDetails.firstName).status === false) {
      showToast("error", t("invalidName"));
      return false;
    } else if (
      validateMobileNumber(employeeDetails.mobileNumber).status === false
    ) {
      showToast("error", t("invalidNumber"));
      return false;
    }
    else if (validateEmail(employeeDetails.e_Mail).status === false || employeeDetails.e_Mail === "" && isHfws !== 'HFWS') {
      showToast("error", t("invalidEmail"));
      return false;
    }
    else if (employeeDetails.gender === "") {
      showToast("error", t("invalidGender"));
      return false;
    }
    else if (employeeDetails.designation === '') {
      showToast("error", t("invalidDesignation"));
      return false;
    } else if (employeeDetails.department === '') {
      showToast("error", t("invalidDepartment"));
      return false;
    } else if (employeeDetails.branch === '') {
      showToast("error", t("invalidBranch"));
      return false;
    }
    else if (!employeeDetails.employeeType) {
      showToast("error", t("invalidCategory"));
      return false;
    }
    else if (!employeeDetails.dob) {
      showToast("error", t("invalidDOB"));
      return false;
    } else if (employeeDetails?.attendanceStartTime === '' && employeeDetails?.attendanceEndTime === '') {
      showToast("error", "Please Select Shift Time");
      return false
    }
    else {
      return true;
    }
  };


  const onSubmit = () => {
    if (validatePostParams()) {
      const params = {
        ...(isEdit && { id: isEdit }),
        first_name: employeeDetails.firstName,
        ...(employeeDetails.lastName && {
          last_name: employeeDetails.lastName,
        }),
        mobile_number: employeeDetails.mobileNumber,
        ...(isHfws !== "HFWS" && { email: employeeDetails.e_Mail }),
        ...(employeeDetails.panNo && { pan: employeeDetails.panNo }),
        ...(employeeDetails.aadharrNo && {
          aadhar_number: employeeDetails.aadharrNo,
        }),
        designation_id: employeeDetails.designation.id,
        department_id: employeeDetails.department.id,
        branch_id: employeeDetails.branch.id,
        gender: employeeDetails.gender,
        ...(employeeDetails.bloodGroup && {
          blood_group: employeeDetails.bloodGroup,
        }),
        employment_type: employeeDetails.employeeType,
        ...(isHfws === 'HFWS' && { qualification: employeeDetails.qualification }),
        ...(isHfws === 'HFWS' && { marital_status: employeeDetails.maritalStatus }),
        ...(isHfws === 'HFWS' && { specialization: employeeDetails.specialization }),
        ...(isHfws === 'HFWS' && { branch_group: employeeDetails.group }),
        ...(isHfws === 'HFWS' && { organisation: employeeDetails.organisation }),
        attendance_settings: {
          start_time: employeeDetails.attendanceStartTime,
          end_time: employeeDetails.attendanceEndTime,
          is_excempt_allowed: isExempted,
          associated_branch: [employeeDetails.branch?.id],
          ...(employeeDetails.shift && { shift_settings: { shift_id: employeeDetails.shift } }),
          enable_generic_shift: enableShift
        },
        ...(employeeDetails.dateOfJoining && isHfws !== "HFWS" && {
          date_of_joining: getServerDateFromMoment(
            getMomentObjFromServer(employeeDetails.dateOfJoining)
          ),
        }),
        dob:
          getServerDateFromMoment(
            getMomentObjFromServer(employeeDetails.dob)
          ),
        ...(employeeDetails.kgid_No && {
          kgid_number: employeeDetails.kgid_No,
        }),
      };

      dispatch(
        employeeAddition({
          params,
          onSuccess: (success: any) => () => {
            showToast("success", success.message);
            goBack(navigation);
          },
          onError: (error: string) => () => {
            showToast("error", error);
          },
        })
      );
    }
  };

  const preFillEmployeeDetails = (editEmployeeDetails: EmployeeDetail) => {

    let employeeInitData = { ...employeeDetails };
    if (editEmployeeDetails) {
      if (editEmployeeDetails.first_name)
        employeeInitData.firstName = editEmployeeDetails.first_name;

      if (editEmployeeDetails.last_name)
        employeeInitData.lastName = editEmployeeDetails.last_name;

      if (editEmployeeDetails.mobile_number)
        employeeInitData.mobileNumber = editEmployeeDetails.mobile_number;

      if (editEmployeeDetails.email)
        employeeInitData.e_Mail = editEmployeeDetails.email;

      if (editEmployeeDetails.aadhar_number)
        employeeInitData.aadharrNo = editEmployeeDetails.aadhar_number;

      if (editEmployeeDetails.pan)
        employeeInitData.panNo = editEmployeeDetails.pan;

      if (editEmployeeDetails.kgid_number)
        employeeInitData.kgid_No = editEmployeeDetails.kgid_number;

      if (editEmployeeDetails.gender)
        employeeInitData.gender = editEmployeeDetails.gender;

      if (editEmployeeDetails.blood_group)
        employeeInitData.bloodGroup = editEmployeeDetails.blood_group;

      if (editEmployeeDetails.designation_id) {
        employeeInitData.designation = getObjectFromArrayByKey(designationDropdownData, "id", editEmployeeDetails.designation_id);
      }

      if (editEmployeeDetails.department_id)
        employeeInitData.department = getObjectFromArrayByKey(departmentDropdownData, "id", editEmployeeDetails.department_id);

      if (editEmployeeDetails.branch_id)
        employeeInitData.branch = getObjectFromArrayByKey(companyBranchDropdownData, "id", editEmployeeDetails.branch_id);

      if (editEmployeeDetails.employment_type)
        employeeInitData.employeeType = editEmployeeDetails.employment_type;

      if (editEmployeeDetails.dob)
        employeeInitData.dob = getServerDateFromMoment(
          getMomentObjFromServer(editEmployeeDetails.dob)
        );

      if (editEmployeeDetails.date_of_joining)
        employeeInitData.dateOfJoining = getServerDateFromMoment(
          getMomentObjFromServer(editEmployeeDetails.date_of_joining)
        );

      if (
        editEmployeeDetails &&
        editEmployeeDetails.attendance_settings?.start_time
      )
        employeeInitData.attendanceStartTime =
          editEmployeeDetails.attendance_settings?.start_time;

      if (
        editEmployeeDetails &&
        editEmployeeDetails.attendance_settings?.end_time
      )
        employeeInitData.attendanceEndTime =
          editEmployeeDetails.attendance_settings?.end_time;
      if (
        editEmployeeDetails &&
        editEmployeeDetails.qualification
      )
        employeeInitData.qualification =
          editEmployeeDetails.qualification;

      if (
        editEmployeeDetails &&
        editEmployeeDetails.specialization
      )
        employeeInitData.specialization =
          editEmployeeDetails.specialization;

      if (
        editEmployeeDetails &&
        editEmployeeDetails.marital_status
      )
        employeeInitData.maritalStatus =
          editEmployeeDetails.marital_status;

      if (
        editEmployeeDetails &&
        editEmployeeDetails.branch_group
      )
        employeeInitData.group =
          editEmployeeDetails.branch_group;

      if (
        editEmployeeDetails &&
        editEmployeeDetails.organisation
      )
        employeeInitData.organisation =
          editEmployeeDetails.organisation;

      if (
        editEmployeeDetails &&
        editEmployeeDetails.shift?.id
      ) {
        employeeInitData.shift =
          editEmployeeDetails.shift?.id

      }
      if (
        editEmployeeDetails &&
        editEmployeeDetails.attendance_settings?.is_excempt_allowed
      ) {
        setIsExempted(editEmployeeDetails.attendance_settings?.is_excempt_allowed)
      }
      if (
        editEmployeeDetails &&
        editEmployeeDetails.attendance_settings?.enable_generic_shift
      ) {
        setEnableShift(editEmployeeDetails.attendance_settings?.enable_generic_shift)
      }

      setShiftsDropdownData(designationMatchShifts(editEmployeeDetails.designation_id))

    }
    editGenericShiftDetails(employeeInitData.attendanceStartTime, employeeInitData.attendanceEndTime)
    setEmployeeDetails(employeeInitData);
  };



  const onChangeHandler = (e: any) => {
    setEmployeeDetails({ ...employeeDetails, [e.target?.name]: e.target?.value });
  };

  const dateTimePickerHandler = (value: string, key: string) => {
    setEmployeeDetails({ ...employeeDetails, [key]: value });
  };

  const timePickerHandler = (value: string, key: string) => {
    setEmployeeDetails({ ...employeeDetails, [key]: convertTo24Hour(value).trim() });
  }

  const mobileNumberHandler = (value: string, key: string) => {
    setEmployeeDetails({ ...employeeDetails, [key]: value });
  };

  const validateDesignationPostParams = () => {
    return validateDefault(designation).status;
  };

  function submitDesignation() {
    if (validateDesignationPostParams()) {
      const params = { name: designation, is_admin: isAdminRights };
      dispatch(
        addDesignation({
          params,
          onSuccess: (success: any) => () => {
            setDesignationModel(!designationModel);
            setIsRefresh(!isRefresh);
            setDesignation("");
            showToast('success', success?.message)
            setIsAdminRights(false);
          },
          onError: (error: string) => () => {
            showToast('error', error)
          },
        })
      );
    }
  }

  const validateDepartmentPostParams = () => {
    return validateDefault(department).status;
  };

  function submitDepartment() {
    if (validateDepartmentPostParams()) {
      const params = { name: department };
      dispatch(
        addDepartment({
          params,
          onSuccess: (success: any) => () => {
            setDepartmentModel(!departmentModel);
            setIsRefresh(!isRefresh);

            showToast('success', success?.message)
          },
          onError: (error: string) => () => {
            showToast('error', error)
          },
        })
      );
    }
  }


  const handleCancelDesignation = () => {
    setDesignation("");
    setDesignationModel(!designationModel);
  }

  const handleCancelDepartment = () => {
    setDepartment("");
    setDepartmentModel(!departmentModel);
  }

  const handleDesignationChange = (event: any) => {
    setEmployeeDetails((prevDetails: any) => ({
      ...prevDetails,
      designation: event
    }));
    setEmployeeDetails((prevDetails: any) => ({
      ...prevDetails,
      shift: ''
    }));
    setShiftsDropdownData(designationMatchShifts(event))
  }

  const handleDepartmentChange = (event: any) => {
    setEmployeeDetails((prevDetails: any) => ({
      ...prevDetails,
      department: event
    }));
  }

  const handleBranchChange = (event: any) => {
    setEmployeeDetails((prevDetails: any) => ({
      ...prevDetails,
      branch: event
    }));
  }

  const convertTo24HourFormat = (time) => {
    const [hours, minutes, seconds] = time.split(':').map(Number);

    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59 || seconds < 0 || seconds > 59) {
      return '';
    }

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (isEdit) {
      editGenericShiftDetails(employeeDetails.attendanceStartTime, employeeDetails.attendanceEndTime)
    }
  }, [employeeDetails.attendanceStartTime, employeeDetails.attendanceEndTime,])

  const editGenericShiftDetails = (start_Time: any, end_time: any) => {
    let data
    if (start_Time && end_time) {
      syncDetails && syncDetails.length > 0 && syncDetails.map((el: any, index: any) => {
        if (convertTo24HourFormat(start_Time) == convertTo24HourFormat(el.startTime) && convertTo24HourFormat(end_time) == convertTo24HourFormat(el.endTime)) {
          // data = 
          setSelectedGenericShift(syncDetails[index].id)
        }
      })
    }


  }



  return (
    <ScreenContainer>
      <FormWrapper
        isTitle
        title={isEdit ? t("editEmployee") : t("newEmployee")}
        onClick={onSubmit}
        buttonTittle={isEdit ? t("update") : t("submit")}
      >
        <ScreenTitle title={'Basic Information'} additionclass={'mb-4'} />
        <Container additionClass={'row col-xl-12  col-sm-3'}>
          <div className="col-xl-6">
            <InputText
              label={t("fullName")}
              placeholder={t("typeYourName")}
              validator={validateName}
              value={employeeDetails.firstName}
              name={"firstName"}
              onChange={(event) => {
                onChangeHandler(event);
              }}
            />
          </div>
          <div className="col-xl-6">
            <InputText
              label={t("lastName")}
              placeholder={t("typeLastName")}
              validator={validateDefault}
              value={employeeDetails.lastName}
              name={"lastName"}
              onChange={(event) => {
                onChangeHandler(event);
              }}
            />
          </div>

          <div className="col-xl-6">
            <InputNumber
              label={t("mobileNumber")}
              placeholder={t("enterYourMobileNumber")}
              validator={validateMobileNumber}
              value={employeeDetails.mobileNumber}
              name={"mobileNumber"}
              onChange={(event) => mobileNumberHandler(inputNumberMaxLength(event.target.value, MAX_LENGTH_MOBILE_NUMBER), "mobileNumber")}
            />
          </div>
          {isHfws !== "HFWS" && <div className="col-xl-6">
            <InputMail
              label={t("email")}
              placeholder={t("enterYourEmail")}
              validator={validateEmail}
              value={employeeDetails.e_Mail}
              name={"e_Mail"}
              onChange={(event) => {
                onChangeHandler(event);
              }}
            />
          </div>}

          <div className="col-xl-6">
            <DropDown
              label={t("gender")}
              placeholder={t("selectYourGender")}
              data={GENDER_LIST}
              name={"gender"}
              value={employeeDetails.gender}
              onChange={(event) => {
                onChangeHandler(dropDownValueCheckByEvent(event, t("selectYourGender")));
              }}
            />
          </div>
          <div className="col-xl-6">
            <DropDown
              label={t("bloodGroup")}
              placeholder={t("enterBloodGroup")}
              data={BLOOD_GROUP_LIST}
              name={"bloodGroup"}
              value={employeeDetails.bloodGroup}
              onChange={(event) => {
                // onChangeHandler(event);
                onChangeHandler(dropDownValueCheckByEvent(event, t("enterBloodGroup")));

              }}
            />
          </div>

          <div className="col-xl-6">
            <h5>{t("dateofBirth")}</h5>
            <DatePicker
              placeholder={t("dateofBirth")}
              icon={Icons.Calendar}
              iconPosition={"append"}
              maxDate={Today}
              onChange={(date: string) => dateTimePickerHandler(date, "dob")}
              value={employeeDetails.dob}
            />
          </div>
          {isHfws === 'HFWS' && <div className="col-xl-6 mt--2">
            <DropDown
              label={t("Marital Status")}
              placeholder={t("Enter Marital Status")}
              data={MARITAL_STATUS_LIST}
              name={"maritalStatus"}
              value={employeeDetails.maritalStatus}
              onChange={(event) => {
                onChangeHandler(dropDownValueCheckByEvent(event, t("Enter Marital Status")));
              }}
            />
          </div>}
          {isHfws === 'HFWS' &&
            <div className="col-xl-6 mt--2">
              <DropDown
                label={t("Qualification")}
                placeholder={t("Enter Your Qualification")}
                data={HFWS_QUALIFICATIONS}
                name={"qualification"}
                value={employeeDetails.qualification}
                onChange={(event) => {
                  onChangeHandler(dropDownValueCheckByEvent(event, t("Enter Your Qualification")));
                }}
              />
            </div>
          }
        </Container>
        <Divider />

        <ScreenTitle title={'Company Details'} additionclass={'mb-4'} />

        <Container additionClass={'col-xl-12 row col-sm-3'}>
          <div className="col-xl-6">
            <div className="row align-items-center">
              <div className="col mb-3">
                {/* <DropDown
                  label={t("designation")}
                  placeholder={t("enterDesignation")}
                  data={designationDropdownData}
                  name={"designation"}
                  value={employeeDetails.designation}
                  onChange={(event) => {
                    handleDesignationChange(event)
                  }}
                /> */}
                <SearchableDropdown selected={employeeDetails.designation} data={getDropDownFormatter(designationDropdownData)} heading={t("designation")} placeHolder={t("enterDesignation")} onChange={(event) => {
                  handleDesignationChange(event)
                }} />

              </div>
              <div className="mt-3">
                {dashboardDetails?.permission_details?.is_parent_branch && dashboardDetails?.permission_details?.is_admin && <Icon
                  text={"+"}
                  onClick={() => setDesignationModel(!designationModel)}
                />}
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="row align-items-center">
              <div className="col mb-3">
                {/* <DropDown
                  label={t("department")}
                  placeholder={t("enterDepartment")}
                  data={departmentDropdownData}
                  value={employeeDetails.department}
                  name={"department"}
                  onChange={(event) =>
                    onChangeHandler(dropDownValueCheckByEvent(event, t("enterDepartment")))
                  }
                /> */}
                <SearchableDropdown selected={employeeDetails.department} data={getDropDownFormatter(departmentDropdownData)} heading={t("department")} placeHolder={t("enterDepartment")} onChange={(event) => {
                  handleDepartmentChange(event)
                }} />
              </div>
              {dashboardDetails?.permission_details?.is_parent_branch && dashboardDetails?.permission_details?.is_admin && <Icon
                text={"+"}
                additionClass="mt-3"
                onClick={() => setDepartmentModel(!departmentModel)}
              />}
            </div>
          </div>

          <div className="col-xl-6">
            {/* <DropDown
              label={t("branch")}
              placeholder={t("branch")}
              data={companyBranchDropdownData}
              name={"branch"}
              value={employeeDetails.branch}
              onChange={(event) => {
                onChangeHandler(dropDownValueCheckByEvent(event, t("branch")))
              }}
            /> */}
            <SearchableDropdown selected={employeeDetails.branch} data={getDropDownFormatter(companyBranchDropdownData)} heading={t("branch")} placeHolder={t("branch")} onChange={(event) => {
              handleBranchChange(event)
            }} />
          </div>
          <div className="col-xl-6">
            <DropDown
              label={t("category")}
              placeholder={t("category")}
              name={"employeeType"}
              data={isHfws !== "HFWS" ? EMPLOYEE_TYPE : EMPLOYEE_TYPE_HFWS}
              value={employeeDetails.employeeType}
              onChange={(event) =>
                onChangeHandler(dropDownValueCheckByEvent(event, t("category")))
              }
            />
          </div>

          {isHfws !== "HFWS" && <div className="col-xl-6">
            <h5>{t("dataOfJoining")}</h5>
            <DatePicker
              title={t("pleaseSelect")}
              icon={Icons.Calendar}
              iconPosition={"append"}
              value={employeeDetails.dateOfJoining}
              onChange={(date: string) =>
                dateTimePickerHandler(date, "dateOfJoining")
              }
            />
          </div>}
          {/* <div className="col-xl-6">
            <InputDefault
              label={t("kgid")}
              placeholder={t("kgid")}
              maxLength={10}
              validator={validateDefault}
              value={employeeDetails.kgid_No}
              name={"kgid_No"}
              onChange={(event) => {
                onChangeHandler(event);
              }}
            />
          </div> */}
          {isHfws === 'HFWS' && <div className="col-xl-6 mt--2">
            <DropDown
              label={t("Specialization")}
              placeholder={t("Enter Your Specialization")}
              data={HFWS_SPECLILISATION}
              name={"specialization"}
              value={employeeDetails.specialization}
              onChange={(event) => {
                onChangeHandler(dropDownValueCheckByEvent(event, t("Enter Your specialization")));
              }}
            />
          </div>}
          {isHfws === 'HFWS' &&
            <>
              <div className="col-xl-6">
                <DropDown
                  label={t("Group")}
                  placeholder={t("Enter Your Group")}
                  data={GROUP_LIST}
                  name={"group"}
                  value={employeeDetails.group}
                  onChange={(event) => {
                    onChangeHandler(dropDownValueCheckByEvent(event, t("Enter Your Group")));
                  }}
                />
              </div>
              <div className="col-xl-6">
                <DropDown
                  label={t("Organisation")}
                  placeholder={t("Enter Your Organisation")}
                  data={HFWS_ORGANISATION}
                  name={"organisation"}
                  value={employeeDetails.organisation}
                  onChange={(event) => {
                    // onChangeHandler(event);
                    onChangeHandler(dropDownValueCheckByEvent(event, t("Enter Your Organisation")));

                  }}
                />
              </div>
            </>
          }
        </Container>
        <Container additionClass={'col-xl-12 row col-sm-3 mb-4'}>

        </Container>

        <Divider />

        <ScreenTitle title={'Attendance Details'} additionclass={'mb-4'} />
        {userDetails?.is_admin && <div className="col row my-3">
          <CheckBox
            id={'3'}
            text={"is Exempted"}
            checked={isExempted}
            onChange={(e) => setIsExempted(e.target.checked)}
          />
          <div className="ml-3">
            {syncDetails && syncDetails.length > 0 && <CheckBox
              id={'4'}
              text={"Enable Shift"}
              checked={enableShift}
              onChange={(e) => setEnableShift(e.target.checked)}
            />}
          </div>
        </div>}

        {syncDetails && syncDetails.length > 0 ? <Container additionClass={'col-xl-12 row col-sm-3 mb-4'}>
          {syncDetails && syncDetails.length > 0 && enableShift ?
            <div className="col-xl-6">
              <DropDown
                label={t("Shift Time")}
                placeholder={"Select shift Time"}
                data={syncDetails}
                name={"selectedDevice"}
                value={selectedGenericShift}
                onChange={(event) => {
                  setSelectedGenericShift(dropDownValueCheck(event.target.value, 'Select shift Time'))
                  syncDetails.map((el: any) => {
                    if (el.id == event.target.value) {
                      setEmployeeDetails({ ...employeeDetails, attendanceStartTime: el.startTime, attendanceEndTime: el.endTime })
                    }
                  })
                }
                }
              />
            </div>
            : <>
              {employeeDetails.attendanceStartTime && <div className="col-xl-6">
                <h5 className="mb-2">{t("startTime")}</h5>
                <TimePicker
                  title={t("pleaseSelect")}
                  icon={Icons.Time}
                  iconPosition={"append"}
                  disabled
                  value={employeeDetails.attendanceStartTime}
                  onChange={(time: any) => {
                    timePickerHandler(time, "attendanceStartTime")
                  }}
                />
              </div>}
              {employeeDetails.attendanceEndTime && <div className="col-xl-6">
                <h5 className="mb-2">{t("endTime")}</h5>
                <TimePicker
                  title={t("pleaseSelect")}
                  icon={Icons.Time}
                  iconPosition={"append"}
                  disabled
                  value={employeeDetails.attendanceEndTime}
                  onChange={(time: any) => {
                    timePickerHandler(time, "attendanceEndTime");
                  }}
                />
              </div>}
            </>
          }
        </Container> : <Container additionClass={'col-xl-12 row col-sm-3 mb-4'}>
          {employeeDetails.shift || shiftsDropdownData.length > 0 ?
            <div className="col-xl-6">
              <DropDown
                label={t("shiftss")}
                placeholder={t("SelectShift")}
                data={shiftsDropdownData}
                name={"shift"}
                value={employeeDetails.shift}
                onChange={(event) =>
                  onChangeHandler(dropDownValueCheckByEvent(event, t("SelectShift")))
                }
              />
            </div> : <>
              {employeeDetails.attendanceStartTime && <div className="col-xl-6">
                <h5 className="mb-2">{t("startTime")}</h5>
                <TimePicker
                  title={t("pleaseSelect")}
                  icon={Icons.Time}
                  iconPosition={"append"}
                  disabled
                  value={employeeDetails.attendanceStartTime}
                  onChange={(time: any) => {
                    timePickerHandler(time, "attendanceStartTime")
                  }}
                />
              </div>}
              {employeeDetails.attendanceEndTime && <div className="col-xl-6">
                <h5 className="mb-2">{t("endTime")}</h5>
                <TimePicker
                  title={t("pleaseSelect")}
                  icon={Icons.Time}
                  iconPosition={"append"}
                  disabled
                  value={employeeDetails.attendanceEndTime}
                  onChange={(time: any) => {
                    timePickerHandler(time, "attendanceEndTime");
                  }}
                />
              </div>}
            </>
          }
          {/* {!employeeDetails.shift && !isHfwsBranch(dashboardDetails?.company?.id) &&
            <>
              <div className="col-xl-6">
                <h5 className="mb-2">{t("startTime")}</h5>
                <TimePicker
                  title={t("pleaseSelect")}
                  icon={Icons.Time}
                  iconPosition={"append"}
                  value={employeeDetails.attendanceStartTime}
                  onChange={(time: any) => {
                    timePickerHandler(time, "attendanceStartTime")
                  }}
                />
              </div>
              <div className="col-xl-6">
                <h5 className="mb-2">{t("endTime")}</h5>
                <TimePicker
                  title={t("pleaseSelect")}
                  icon={Icons.Time}
                  iconPosition={"append"}
                  value={employeeDetails.attendanceEndTime}
                  onChange={(time: any) => {
                    timePickerHandler(time, "attendanceEndTime");
                  }}
                />
              </div>
            </>
          } */}
          {/* {isHfwsBranch(dashboardDetails?.company?.id) &&
            <>
              {employeeDetails.attendanceStartTime && <div className="col-xl-6">
                <h5 className="mb-2">{t("startTime")}</h5>
                <TimePicker
                  title={t("pleaseSelect")}
                  icon={Icons.Time}
                  iconPosition={"append"}
                  disabled
                  value={employeeDetails.attendanceStartTime}
                  onChange={(time: any) => {
                    timePickerHandler(time, "attendanceStartTime")
                  }}
                />
              </div>}
              {employeeDetails.attendanceEndTime && <div className="col-xl-6">
                <h5 className="mb-2">{t("endTime")}</h5>
                <TimePicker
                  title={t("pleaseSelect")}
                  icon={Icons.Time}
                  iconPosition={"append"}
                  disabled
                  value={employeeDetails.attendanceEndTime}
                  onChange={(time: any) => {
                    timePickerHandler(time, "attendanceEndTime");
                  }}
                />
              </div>}
            </>
          } */}
        </Container>}

        <Divider />

        <ScreenTitle title={'Document Information'} additionclass={'mb-4'} />

        <Container additionClass={'col-xl-12 row col-sm-3'}>
          <div className="col-xl-6">
            <InputDefault
              label={t("aadhar")}
              placeholder={t("typeypurAadharNo")}
              validator={validateAadhar}
              value={employeeDetails.aadharrNo}
              name={"aadharrNo"}
              onChange={(event) => {
                mobileNumberHandler(inputNumberMaxLength(event.target.value, MAX_LENGTH_AADHAR), "aadharrNo")
              }}
            />
          </div>
          <div className="col-xl-6">
            <InputDefault
              label={t("pan")}
              placeholder={t("enterPanNUmber")}
              maxLength={10}
              validator={validatePAN}
              value={employeeDetails.panNo}
              name={"panNo"}
              onChange={(event) => {
                onChangeHandler(event);
              }}
            />
          </div>
        </Container>
      </FormWrapper>
      <Modal
        title={t("department")}
        showModel={departmentModel}
        toggle={() => handleCancelDepartment()}
      >
        {
          <Container>
            <div className="col-xl-7 col-md-10">
              <InputText
                placeholder={t("department")}
                validator={validateDefault}
                value={department}
                onChange={(e) => {
                  setDepartment(e.target.value);
                }}
              />
            </div>
            <Container margin={"mt-5"} additionClass={"text-right"}>
              <Secondary
                text={t("cancel")}
                onClick={() => handleCancelDepartment()}
              />
              <Primary
                text={t("submit")}
                onClick={() => submitDepartment()}
              />
            </Container>
          </Container>
        }
      </Modal>

      <Modal
        title={t("designation")}
        showModel={designationModel}
        toggle={() => handleCancelDesignation()}
      >
        {
          <Container>
            <div className="col-xl-7 col-md-10">
              <InputText
                placeholder={t("designation")}
                validator={validateDefault}
                value={designation}
                onChange={(e) => {
                  setDesignation(e.target.value);
                }}
              />
              <div className="col text-right">
                <CheckBox
                  id={'2'}
                  text={"As Admin rights"}
                  onChange={(e) => setIsAdminRights(e.target.checked)}
                />
              </div>
            </div>
            <Container margin={"mt-5"} additionClass={"text-right"}>
              <Secondary
                text={t("cancel")}
                onClick={() => handleCancelDesignation()}
              />
              <Primary
                text={t("submit")}
                onClick={() => submitDesignation()}
              />
            </Container>
          </Container>
        }
      </Modal>
      {/* <Modal showModel={hfswShiftModel}
        title={t('Shift Timing')}
        size={"modal-sm"}
        toggle={() => setHfswShiftModel(!hfswShiftModel)}>
        <Container>
          {hfwsBranchShifts && hfwsBranchShifts.length > 0 ? <Container>
            {hfwsBranchShifts && hfwsBranchShifts.length > 0 && hfwsBranchShifts.map((el: any, index: any) => {
              return (
                <Container additionClass="p-2 row"
                  onClick={() => {
                    // setCurrentEmployeeShiftId(el.id)
                  }}
                >
                  <h4 className="col fw-normal">{el.display_text}</h4>
                  <td className="col-2" onClick={() => { handleHfswShiftSelect(el, index) }} style={{ whiteSpace: "pre-wrap", cursor: 'pointer' }}><ImageView icon={index === hfswSelectedShiftIndex ? Icons.TickActive : Icons.TickDefault} /></td>

                </Container>
              )
            })}
          </Container> : <NoRecordFound />}
        </Container>
      </Modal> */}
    </ScreenContainer>
  );
};

export default ManageEmployee;
