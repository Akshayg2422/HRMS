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
  convertTo24Hour
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
} from "../../../../store/employee/actions";
import { getBranchShifts, getMyShifts } from "../../../../store/shiftManagement/actions";

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
  };
  date_of_joining?: string;
  dob?: string;
  kgid_number?: string;
  shift?: any
};

const ManageEmployee = () => {
  const navigation = useNav();
  const { t } = useTranslation();
  let dispatch = useDispatch();

  const {
    designationDropdownData,
    departmentDropdownData,
    branchesDropdownData,
    isEdit,
  } = useSelector((state: any) => state.EmployeeReducer);

  const { dashboardDetails, hierarchicalBranchIds } = useSelector(
    (state: any) => state.DashboardReducer
  );



  const [employeeDetails, setEmployeeDetails] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    e_Mail: "",
    gender: "",
    bloodGroup: "",
    panNo: "",
    aadharrNo: "",
    designation: "",
    department: "",
    branch: dashboardDetails?.company_branch?.id,
    dateOfJoining: new Date(),
    dob: "",
    kgid_No: "",
    employeeType: "",
    attendanceStartTime: "10:00",
    attendanceEndTime: "18:00",
    shift: ''
  });
  const [shiftGroup, setShiftGroup] = useState<any>()
  const [departmentModel, setDepartmentModel] = useState(false);
  const [designationModel, setDesignationModel] = useState(false);
  const [isAdminRights, setIsAdminRights] = useState(false);
  const [department, setDepartment] = useState("");
  const [designationNote, setDesignationNote] = useState('')
  const [designation, setDesignation] = useState("");
  const [isRefresh, setIsRefresh] = useState(false);
  const [companyBranchDropdownData, setCompanyBranchDropdownData] =
    useState<any>();
  const [shiftsDropdownData, setShiftsDropdownData] =
    useState<any>([]);

  const [isBranchShiftDataExist, setIsBranchShiftExist] = useState(false)

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
    dispatch(getDepartmentData({}));
    dispatch(getDesignationData({}));
    getBranchShiftsList()
    const params = {};
    dispatch(
      getAllBranchesList({
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
        await setShiftGroup(success)
      },
      onError: (error: string) => () => {
        showToast('error', error)
      },

    }));
  }

  const designationMatchShifts = (id: any) => {
    let shifts: any[] = []
    if (id) {
      shiftGroup && shiftGroup.length > 0 && shiftGroup.map((el: any) => {
        if (el?.weekly_shift?.designation_id === id) {
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
    else if (validateEmail(employeeDetails.e_Mail).status === false || employeeDetails.e_Mail === "") {
      showToast("error", t("invalidEmail"));
      return false;
    }
    else if (employeeDetails.gender === "") {
      showToast("error", t("invalidGender"));
      return false;
    }
    else if (Object.keys(employeeDetails.designation).length === 0) {
      showToast("error", t("invalidDesignation"));
      return false;
    } else if (Object.keys(employeeDetails.department).length === 0) {
      showToast("error", t("invalidDepartment"));
      return false;
    } else if (Object.keys(employeeDetails.branch).length === 0) {
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
        email: employeeDetails.e_Mail,
        ...(employeeDetails.panNo && { pan: employeeDetails.panNo }),
        ...(employeeDetails.aadharrNo && {
          aadhar_number: employeeDetails.aadharrNo,
        }),
        designation_id: employeeDetails.designation,
        department_id: employeeDetails.department,
        branch_id: employeeDetails.branch,
        gender: employeeDetails.gender,
        ...(employeeDetails.bloodGroup && {
          blood_group: employeeDetails.bloodGroup,
        }),
        employment_type: employeeDetails.employeeType,
        attendance_settings: {
          start_time: employeeDetails.attendanceStartTime,
          end_time: employeeDetails.attendanceEndTime,
          is_excempt_allowed: false,
          associated_branch: [employeeDetails.branch],
          ...(employeeDetails.shift && { shift_settings: { shift_id: employeeDetails.shift } })
        },
        ...(employeeDetails.dateOfJoining && {
          date_of_joining: getServerDateFromMoment(
            getMomentObjFromServer(employeeDetails.dateOfJoining)
          ),
        }),
        dob: getServerDateFromMoment(
          getMomentObjFromServer(employeeDetails.dob)
        ),
        ...(employeeDetails.kgid_No && {
          kgid_number: employeeDetails.kgid_No,
        }),
      };
      console.log("paramss=====>", params);
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
        employeeInitData.designation = editEmployeeDetails.designation_id;
      }

      if (editEmployeeDetails.department_id)
        employeeInitData.department = editEmployeeDetails.department_id;

      if (editEmployeeDetails.branch_id)
        employeeInitData.branch = editEmployeeDetails.branch_id;

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
        editEmployeeDetails.shift?.id
      ) {
        employeeInitData.shift =
          editEmployeeDetails.shift?.id

      }

      setShiftsDropdownData(designationMatchShifts(editEmployeeDetails.designation_id))

    }
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

  const handleDesignationChange = (event: { target: { value: any } }) => {
    setEmployeeDetails(prevDetails => ({
      ...prevDetails,
      designation: event.target.value
    }));
    setEmployeeDetails(prevDetails => ({
      ...prevDetails,
      shift: ''
    }));
    setShiftsDropdownData(designationMatchShifts(event.target.value))
  }


  return (
    <ScreenContainer additionClass={'mb--4'}>
      <FormWrapper
        isTitle
        title={isEdit ? t("editEmployee") : t("newEmployee")}
        onClick={onSubmit}
        buttonTittle={isEdit ? t("update") : t("submit")}
      >


        <ScreenTitle title={'Basic Information'} additionclass={'mb-4'} />

        <Container additionClass={'col-xl-12 row col-sm-3'}>
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
        </Container>

        <Container additionClass={'col-xl-12 row col-sm-3'}>
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
          <div className="col-xl-6">
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
          </div>
        </Container>

        <Container additionClass={'col-xl-12 row col-sm-3'}>
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
        </Container>

        <Container additionClass={'col-xl-12 row col-sm-3 mb-4'}>
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

        </Container>

        <Divider />

        <ScreenTitle title={'Company Details'} additionclass={'mb-4'} />

        <Container additionClass={'col-xl-12 row col-sm-3'}>
          <div className="col-xl-6">
            <div className="row align-items-center">
              <div className="col mt--2">
                <DropDown
                  label={t("designation")}
                  placeholder={t("enterDesignation")}
                  data={designationDropdownData}
                  name={"designation"}
                  value={employeeDetails.designation}
                  onChange={(event) => {
                    handleDesignationChange(event)
                  }}
                />
              </div>
              <Icon
                text={"+"}
                onClick={() => setDesignationModel(!designationModel)}
              />
            </div>
          </div>
          <div className="col-xl-6">
            <div className="row align-items-center">
              <div className="col mt--2">
                <DropDown
                  label={t("department")}
                  placeholder={t("enterDepartment")}
                  data={departmentDropdownData}
                  value={employeeDetails.department}
                  name={"department"}
                  onChange={(event) =>
                    onChangeHandler(dropDownValueCheckByEvent(event, t("enterDepartment")))
                  }
                />
              </div>
              <Icon
                text={"+"}
                onClick={() => setDepartmentModel(!departmentModel)}
              />
            </div>
          </div>
        </Container>

        <Container additionClass={'col-xl-12 row col-sm-3'}>
          <div className="col-xl-6">
            <DropDown
              label={t("branch")}
              placeholder={t("branch")}
              data={companyBranchDropdownData}
              name={"branch"}
              value={employeeDetails.branch}
              onChange={(event) => {
                onChangeHandler(dropDownValueCheckByEvent(event, t("branch")))
              }}
            />
          </div>
          <div className="col-xl-6">
            <DropDown
              label={t("category")}
              placeholder={t("category")}
              name={"employeeType"}
              data={EMPLOYEE_TYPE}
              value={employeeDetails.employeeType}
              onChange={(event) =>
                onChangeHandler(dropDownValueCheckByEvent(event, t("category")))
              }
            />
          </div>
        </Container>

        <Container additionClass={'col-xl-12 row col-sm-3'}>
          <div className="col-xl-6">
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
          </div>
          <div className="col-xl-6">
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
          </div>
        </Container>

        <Divider />

        <ScreenTitle title={'Attendance Details'} additionclass={'mb-4'} />

        <Container additionClass={'col-xl-12 row col-sm-3 mb-4'}>
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
            </div> : <></>
          }
          {!employeeDetails.shift &&
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
          }
        </Container>

        <Divider />

        <ScreenTitle title={'Document information'} additionclass={'mb-4'} />

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
        {/* <InputText
          label={t("fullName")}
          placeholder={t("typeYourName")}
          validator={validateName}
          value={employeeDetails.firstName}
          name={"firstName"}
          onChange={(event) => {
            onChangeHandler(event);
          }}
        />
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
        <InputNumber
          label={t("mobileNumber")}
          placeholder={t("enterYourMobileNumber")}
          validator={validateMobileNumber}
          value={employeeDetails.mobileNumber}
          name={"mobileNumber"}
          onChange={(event) => mobileNumberHandler(inputNumberMaxLength(event.target.value, MAX_LENGTH_MOBILE_NUMBER), "mobileNumber")}
        />
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
        <div className="row align-items-center">
          <div className="col mt--2">
            <DropDown
              label={t("designation")}
              placeholder={t("enterDesignation")}
              data={designationDropdownData}
              name={"designation"}
              value={employeeDetails.designation}
              onChange={(event) => {
                handleDesignationChange(event)
              }}
            />
          </div>
          <Icon
            text={"+"}
            onClick={() => setDesignationModel(!designationModel)}
          />
        </div>
        {designationNote && <p className="text-right h6 mr-md-6  mt--3 mr-xl-6">{designationNote}</p>}
        <div className="row align-items-center">
          <div className="col mt--2">
            <DropDown
              label={t("department")}
              placeholder={t("enterDepartment")}
              data={departmentDropdownData}
              value={employeeDetails.department}
              name={"department"}
              onChange={(event) =>
                onChangeHandler(dropDownValueCheckByEvent(event, t("enterDepartment")))
              }
            />
          </div>
          <Icon
            text={"+"}
            onClick={() => setDepartmentModel(!departmentModel)}
          />
        </div>
        <DropDown
          label={t("branch")}
          placeholder={t("branch")}
          data={companyBranchDropdownData}
          name={"branch"}
          value={employeeDetails.branch}
          onChange={(event) => {
            onChangeHandler(dropDownValueCheckByEvent(event, t("branch")))
          }}
        />
        <DropDown
          label={t("category")}
          placeholder={t("category")}
          name={"employeeType"}
          data={EMPLOYEE_TYPE}
          value={employeeDetails.employeeType}
          onChange={(event) =>
            onChangeHandler(dropDownValueCheckByEvent(event, t("category")))
          }
        />
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
        <h5>{t("dateofBirth")}</h5>
        <DatePicker
          icon={Icons.Calendar}
          iconPosition={"append"}
          maxDate={Today}
          onChange={(date: string) => dateTimePickerHandler(date, "dob")}
          value={employeeDetails.dob}
        />
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
        <h4 className="mb-4">{t("attendanceDetails")}</h4> */}
        {/* {employeeDetails.shift || shiftsDropdownData.length > 0 ? (
          <DropDown
            label={t("shiftss")}
            placeholder={t("SelectShift")}
            data={shiftsDropdownData}
            name={"shift"}
            value={employeeDetails.shift}
            onChange={(event) =>
              onChangeHandler(dropDownValueCheckByEvent(event, t("SelectShift")))
            }
          />) : <></>} */}
        {/* {!employeeDetails.shift && <>
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
          <h5 className="mb-2">{t("endTime")}</h5>
          <TimePicker
            title={t("pleaseSelect")}
            icon={Icons.Time}
            iconPosition={"append"}
            value={employeeDetails.attendanceEndTime}
            onChange={(time: any) => {
              timePickerHandler(time, "attendanceEndTime");
            }}
          /></>} */}
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
    </ScreenContainer>
  );
};

export default ManageEmployee;
