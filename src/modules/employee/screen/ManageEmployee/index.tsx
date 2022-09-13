import {
  Card,
  Container,
  DatePicker,
  DropDown,
  InputDefault,
  InputMail,
  InputNumber,
  InputText,
  FormWrapper,
  TimePicker,
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
  getStartTime,
  getEndTime,
  getDisplayTimeWithoutSuffixFromMoment,
  goBack,
  useNav,
  getDropDownValueByID
} from "@utils";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getDepartmentData,
  getDesignationData,
  getAllBranchesList,
  getEmployeeDetails,
  employeeAddition,
} from '../../../../store/employee/actions';

const ManageEmployee = () => {
  const navigation = useNav();
  const { t } = useTranslation();
  let dispatch = useDispatch();

  const {
    designationDropdownData,
    departmentDropdownData,
    branchesDropdownData,
    isEdit,
    editEmployeeDetails,
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
    dateOfJoining: "",
    dob: "",
    kgid_No: "",
    employeeType: "",
    attendanceStartTime: getStartTime(),
    attendanceEndTime: getEndTime(),
  });

  useEffect(() => {
    dispatch(getDepartmentData({}));
    dispatch(getDesignationData({}));
    dispatch(getAllBranchesList({}));
    if (isEdit !== undefined) {
      getEmployeeDetailsAPi(isEdit);
    }
  }, []);

  const getEmployeeDetailsAPi = (id: any) => {
    const params = {
      user_id: id,
    };

    dispatch(
      getEmployeeDetails({
        params,
        onSuccess: (success: object) => {
          preFillEmployeeDetails();
        },
        onError: (error: string) => {
          showToast("error", t("invalidUser"));
        },
      })
    );
  };

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
    } else {
      return true;
    }
  };

  const onSubmit = () => {
    if (validatePostParams()) {
    const params = {
      ...(isEdit && {id: isEdit}),
      first_name: employeeDetails.firstName,
      ...(employeeDetails.lastName && { last_name: employeeDetails.lastName }),
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
        start_time: getDisplayTimeWithoutSuffixFromMoment(
          getMomentObjFromServer(employeeDetails.attendanceStartTime)
        ),

        end_time: getDisplayTimeWithoutSuffixFromMoment(
          getMomentObjFromServer(employeeDetails.attendanceEndTime)
        ),

        is_excempt_allowed: false,
        associated_branch:[employeeDetails.branch],
      },
      ...(employeeDetails.dateOfJoining && {
        date_of_joining: getServerDateFromMoment(
          getMomentObjFromServer(employeeDetails.dateOfJoining)
        ),
      }),
      dob: getServerDateFromMoment(getMomentObjFromServer(employeeDetails.dob)),
      ...(employeeDetails.kgid_No && { kgid_number: employeeDetails.kgid_No }),
    };

    console.log("params---->", params);

    dispatch(
      employeeAddition({
        params,
        onSuccess: (success: object) => {
          showToast("success",t("employeeAddedSuccessfully"));
          goBack(navigation)
        },
        onError: (error: string) => {
          // showToast("error", "Invalid user");
        },
      })
    );
    }
  };

  const preFillEmployeeDetails = () => {
    let fillData = employeeDetails;
    fillData.firstName = editEmployeeDetails.first_name;
    fillData.lastName = editEmployeeDetails.last_name;
    fillData.mobileNumber = editEmployeeDetails.mobile_number;
    fillData.e_Mail = editEmployeeDetails.email;
    fillData.aadharrNo = editEmployeeDetails.aadhar_number;
    fillData.panNo = editEmployeeDetails.pan;
    fillData.kgid_No = editEmployeeDetails.kgid_number;
    fillData.dob = editEmployeeDetails.dob;

    fillData.gender = getObjectFromArrayByKey(
      GENDER_LIST,
      "value",
      editEmployeeDetails.gender
    );

    fillData.gender = getObjectFromArrayByKey(
      BLOOD_GROUP_LIST,
      "value",
      editEmployeeDetails.blood_group
    );

    fillData.designation = getDropDownValueByID(
      designationDropdownData,
      editEmployeeDetails.designation_id,
    )

    fillData.department = getDropDownValueByID(
      departmentDropdownData,
      editEmployeeDetails.department_id,
    )

    fillData.department = getDropDownValueByID(
      branchesDropdownData,
      editEmployeeDetails.branch_id,
    )

    fillData.dateOfJoining = getServerDateFromMoment(
      getMomentObjFromServer(editEmployeeDetails.date_of_joining)
    );

    fillData.dob = getServerDateFromMoment(
      getMomentObjFromServer(editEmployeeDetails.dob)
    );

    fillData.attendanceStartTime = getStartTime(
      editEmployeeDetails.attendance_settings.start_time
    );
    fillData.attendanceEndTime = getEndTime(
      editEmployeeDetails.attendance_settings.end_time
    );

    setEmployeeDetails(fillData);
  };

  const onChangeHandler = (e: any) => {
    setEmployeeDetails({ ...employeeDetails, [e.target.name]: e.target.value });
  };

  const dateTimePickerHandler = (value: string, key: string) => {
    setEmployeeDetails({ ...employeeDetails, [key]: value });
  };

  return (
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
        onChange={(event) => {
          onChangeHandler(event);
        }}
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
      <DropDown
        label={t("designation")}
        placeholder={t("enterDesignation")}
        data={designationDropdownData}
        name={"designation"}
        value={employeeDetails.designation}
        onChange={(event) => onChangeHandler(event)}
      />
      <DropDown
        label={t("department")}
        placeholder={t("enterDepartment")}
        data={departmentDropdownData}
        value={employeeDetails.department}
        name={"department"}
        onChange={(event) => onChangeHandler(event)}
      />
      <DropDown
        label={t("branch")}
        placeholder={t("branch")}
        data={branchesDropdownData}
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
        // value={employeeDetails.attendanceStartTime}
      />
      <h5 className="mb-2">{t("endTime")}</h5>
      <TimePicker
        title={t("pleaseSelect")}
        icon={Icons.Calendar}
        iconPosition={"append"}
        value={employeeDetails.attendanceEndTime}
        onChange={(time: any) =>
          dateTimePickerHandler(time, "attendanceEndTime")
        }
      />
    </FormWrapper>
  );
};

export default ManageEmployee;