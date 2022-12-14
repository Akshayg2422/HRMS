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
    branch: "",
    dateOfJoining: new Date(),
    dob: "",
    kgid_No: "",
    employeeType: "",
    attendanceStartTime: "10:00",
    attendanceEndTime: "06:00",
    shift: ''
  });

  const [departmentModel, setDepartmentModel] = useState(false);
  const [designationModel, setDesignationModel] = useState(false);
  const [isAdminRights, setIsAdminRights] = useState(false);
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [isRefresh, setIsRefresh] = useState(false);
  const [companyBranchDropdownData, setCompanyBranchDropdownData] =
    useState<any>();
  const [shiftsDropdownData, setShiftsDropdownData] =
    useState<any>();

  const { dashboardDetails, hierarchicalBranchIds } = useSelector(
    (state: any) => state.DashboardReducer
  );

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
    const params = {};
    dispatch(
      getAllBranchesList({
        params,
        onSuccess: (success: object) => {
          const parentBranch = branchesDropdownData.find(
            (it: any) => it.id === dashboardDetails.company_branch.id
          );
          setCompanyBranchDropdownData([
            ...getAllSubBranches(
              branchesDropdownData,
              dashboardDetails.company_branch.id
            ),
            parentBranch,
          ]);
        },

        onError: (error: string) => { },
      })
    );
    if (isEdit !== undefined) {
      getEmployeeDetailsAPi(isEdit);
    }
  }, [isRefresh]);

  const getEmployeeDetailsAPi = (id: any) => {
    const params = {
      user_id: id,
    };
    dispatch(
      getEmployeeDetails({
        params,
        onSuccess: (response: EmployeeDetail) => {
          console.log(JSON.stringify(response));

          preFillEmployeeDetails(response);
        },
        onError: (error: string) => {
          console.log("fail");
          // showToast('error', t('invalidUser'));
        },
      })
    );
  };

  const ShiftDetails = (id: any) => {
    const params = { branch_id: id }
    dispatch(getBranchShifts({
      params,
      onSuccess: (success: any) => {
        setShiftsDropdownData(success)
      },
      onError: (error: string) => {
        showToast("error", t("Somthingwentworng"));
      },
    }));
  }


  useEffect(() => {
    if (employeeDetails.branch !== '') {
      ShiftDetails(employeeDetails.branch)
    }
  }, [employeeDetails.branch])

  const validatePostParams = () => {
    if (validateName(employeeDetails.firstName).status === false) {
      showToast("error", t("invalidName"));
      return false;
    } else if (
      validateMobileNumber(employeeDetails.mobileNumber).status === false
    ) {
      showToast("error", t("invalidNumber"));
      return false;
    } else if (validateEmail(employeeDetails.e_Mail).status === false) {
      showToast("error", t("invalidEmail"));
      return false;
    } else if (Object.keys(employeeDetails.designation).length === 0) {
      showToast("error", t("invalidDesignation"));
      return false;
    } else if (Object.keys(employeeDetails.department).length === 0) {
      showToast("error", t("invalidDepartment"));
      return false;
    } else if (Object.keys(employeeDetails.branch).length === 0) {
      showToast("error", t("invalidBranch"));
      return false;
    } else if (!employeeDetails.dob) {
      showToast("error", t("invalidDOB"));
      return false;
    } else if (!employeeDetails.employeeType) {
      showToast("error", t("invalidCategory"));
      return false;
    } else {
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

      dispatch(
        employeeAddition({
          params,
          onSuccess: (success: object) => {
            showToast("success", t("employeeAddedSuccessfully"));
            goBack(navigation);
          },
          onError: (error: string) => {
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

      if (editEmployeeDetails.designation_id)
        employeeInitData.designation = editEmployeeDetails.designation_id;

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
    }


    setEmployeeDetails(employeeInitData);
  };

  const onChangeHandler = (e: any) => {
    setEmployeeDetails({ ...employeeDetails, [e.target.name]: e.target.value });
  };

  const dateTimePickerHandler = (value: string, key: string) => {
    setEmployeeDetails({ ...employeeDetails, [key]: value });
  };

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
          onSuccess: () => {
            setDesignationModel(!designationModel);
            setIsRefresh(!isRefresh);
            setDesignation("");
            setIsAdminRights(false);
          },
          onError: () => { },
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

      console.log(JSON.stringify(params));
      dispatch(
        addDepartment({
          params,
          onSuccess: () => {
            setDepartmentModel(!departmentModel);
            setIsRefresh(!isRefresh);
            setDepartment("");
          },
          onError: () => { },
        })
      );
    }
  }


  console.log('shiftsDropdownData', shiftsDropdownData);


  return (

    <>
      <FormWrapper
        title={isEdit ? t("editEmployee") : t("newEmployee")}
        onClick={onSubmit}
      >
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
            onChangeHandler(event);
          }}
        />
        <DropDown
          label={t("bloodGroup")}
          placeholder={t("enterBloodGroup")}
          data={BLOOD_GROUP_LIST}
          name={"bloodGroup"}
          value={employeeDetails.bloodGroup}
          onChange={(event) => {
            onChangeHandler(event);
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
          // maxLength={10}
          validator={validateAadhar}
          value={employeeDetails.aadharrNo}
          name={"aadharrNo"}
          onChange={(event) => {
            onChangeHandler(event);
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
              onChange={(event) => onChangeHandler(event)}
            />
          </div>
          <Icon
            text={"+"}
            onClick={() => setDesignationModel(!designationModel)}
          />
        </div>
        <div className="row align-items-center">
          <div className="col mt--2">
            <DropDown
              label={t("department")}
              placeholder={t("enterDepartment")}
              data={departmentDropdownData}
              value={employeeDetails.department}
              name={"department"}
              onChange={(event) => onChangeHandler(event)}
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
          onChange={(event) => onChangeHandler(event)}
        />
        <DropDown
          label={t("category")}
          placeholder={t("category")}
          name={"employeeType"}
          data={EMPLOYEE_TYPE}
          value={employeeDetails.employeeType}
          onChange={(event) => onChangeHandler(event)}
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
        <DropDown
          label={t("shiftss")}
          placeholder={t("SelectShift")}
          data={shiftsDropdownData}
          name={"shift"}
          value={employeeDetails.shift}
          onChange={(event) => onChangeHandler(event)}
        />
        <h4 className="mb-4">{t("attendanceDetails")}</h4>
        <h5 className="mb-2">{t("startTime")}</h5>
        <TimePicker
          title={t("pleaseSelect")}
          icon={Icons.Calendar}
          iconPosition={"append"}
          value={employeeDetails.attendanceStartTime}
          onChange={(time: any) =>
            dateTimePickerHandler(time, "attendanceStartTime")
          }
        />
        <h5 className="mb-2">{t("endTime")}</h5>
        <TimePicker
          title={t("pleaseSelect")}
          icon={Icons.Calendar}
          iconPosition={"append"}
          value={employeeDetails.attendanceEndTime}
          onChange={(time: any) => {
            dateTimePickerHandler(time, "attendanceEndTime");
          }}
        />
      </FormWrapper>
      <Modal
        title={t("department")}
        showModel={departmentModel}
        toggle={() => setDepartmentModel(!departmentModel)}
        footer
        saveChange={submitDepartment}
      >
        {
          <div className="col-xl-7 col-md-10">
            <InputText
              placeholder={t("department")}
              validator={validateDefault}
              onChange={(e) => {
                setDepartment(e.target.value);
              }}
            />
          </div>
        }
      </Modal>

      <Modal
        title={t("designation")}
        showModel={designationModel}
        toggle={() => setDesignationModel(!designationModel)}
        footer
        saveChange={submitDesignation}
      >
        {
          <div className="col-xl-7 col-md-10">
            <InputText
              placeholder={t("designation")}
              validator={validateDefault}
              onChange={(e) => {
                setDesignation(e.target.value);
              }}
            />
            <div className="col text-right">
              <CheckBox
                text={"As Admin rights"}
                onChange={(e) => setIsAdminRights(e.target.checked)}
              />
            </div>
          </div>
        }
      </Modal>
    </>
  );
};

export default ManageEmployee;
