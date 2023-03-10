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
  getObjectFromArrayByKey,
  getDropDownValueByID,
  getServerDateFromMoment,
  getMomentObjFromServer,
} from "@utils";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllBranchesList } from '../../../../store/location/actions'
import {
  getDepartmentData,
  getDesignationData,
  getEmployeeDetails,
} from "../../../../store/employee/actions";
import { log } from "console";

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
  shift?: { name: string };
};

const ViewEmployeeDetails = () => {
  const { t } = useTranslation();
  let dispatch = useDispatch();

  const {
    selectedEmployeeId,
    designationDropdownData,
    departmentDropdownData,
    branchesDropdownData,
  } = useSelector((state: any) => state.EmployeeReducer);

  const { dashboardDetails } = useSelector(
    (state: any) => state.DashboardReducer
  );

  const [companyBranchDropdownData, setCompanyBranchDropdownData] =
    useState<any>();

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
    attendanceStartTime: "",
    attendanceEndTime: "",
    shift: ""
  });

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
  }, []);

  useEffect(() => {
    getEmployeeDetailsAPi();
  }, [designationDropdownData, departmentDropdownData, branchesDropdownData]);

  const getEmployeeDetailsAPi = () => {
    const params = {
      user_id: selectedEmployeeId,
    };

    dispatch(
      getEmployeeDetails({
        params,
        onSuccess: (response: EmployeeDetail) => {
          preFillEmployeeDetails(response);
        },
        onError: (error: string) => {
          console.log("fail", error);
          // showToast('error', t('invalidUser'));
        },
      })
    );
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
        employeeInitData.gender = getObjectFromArrayByKey(
          GENDER_LIST,
          "value",
          editEmployeeDetails.gender
        ).name;

      if (editEmployeeDetails.blood_group)
        employeeInitData.bloodGroup = editEmployeeDetails.blood_group;

      if (editEmployeeDetails.designation_id)
        employeeInitData.designation = getDropDownValueByID(
          designationDropdownData,
          editEmployeeDetails.designation_id
        ).name;

      if (editEmployeeDetails.department_id)
        employeeInitData.department = getDropDownValueByID(
          departmentDropdownData,
          editEmployeeDetails.department_id
        ).name;

      if (editEmployeeDetails.branch_id)
        employeeInitData.branch = getDropDownValueByID(
          branchesDropdownData,
          editEmployeeDetails.branch_id
        ).name;

      if (editEmployeeDetails.employment_type)
        employeeInitData.employeeType = editEmployeeDetails.employment_type;

      if (editEmployeeDetails.dob)
        employeeInitData.dob = editEmployeeDetails.dob;

      if (editEmployeeDetails.date_of_joining)
        employeeInitData.dateOfJoining = editEmployeeDetails.date_of_joining;

      if (
        editEmployeeDetails &&
        editEmployeeDetails.shift?.name
      )
        employeeInitData.shift =
          editEmployeeDetails.shift?.name;

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



  return (
    <FormWrapper hideFooter title={t("viewEmployeeDetails")}>
      <InputText
        label={t("fullName")}
        placeholder={t("fullName")}
        value={employeeDetails.firstName}
        disabled={true}
      />
      <InputText
        label={t("lastName")}
        placeholder={t("lastName")}
        value={employeeDetails.lastName}
        disabled={true}
      />
      <InputNumber
        label={t("mobileNumber")}
        placeholder={t("mobileNumber")}
        value={employeeDetails.mobileNumber}
        disabled={true}
      />
      <InputMail
        label={t("email")}
        placeholder={t("email")}
        value={employeeDetails.e_Mail}
        disabled={true}
      />
      <InputDefault
        label={t("gender")}
        placeholder={t("gender")}
        value={employeeDetails.gender}
        disabled={true}
      />

      <InputDefault
        label={t("bloodGroup")}
        placeholder={t("bloodGroup")}
        value={employeeDetails.bloodGroup}
        disabled={true}
      />

      <InputDefault
        label={t("pan")}
        placeholder={t("pan")}
        value={employeeDetails.panNo}
        disabled={true}
      />
      <InputDefault
        label={t("aadhar")}
        placeholder={t("aadhar")}
        value={employeeDetails.aadharrNo}
        disabled={true}
      />
      <InputText
        label={t("designation")}
        placeholder={t("designation")}
        value={employeeDetails.designation}
        disabled={true}
      />

      <InputText
        label={t("department")}
        placeholder={t("department")}
        value={employeeDetails.department}
        disabled={true}
      />

      <InputText
        label={t("branch")}
        placeholder={t("branch")}
        value={employeeDetails.branch}
        disabled={true}
      />

      <InputText
        label={t("category")}
        placeholder={t("category")}
        value={employeeDetails.employeeType}
        disabled={true}
      />
      {/* <h5>{t('dataOfJoining')}</h5> */}
      <InputDefault
        label={t("dataOfJoining")}
        placeholder={t("dataOfJoining")}
        value={employeeDetails.dateOfJoining}
        disabled={true}
      />
      {/* <h5>{t('dateofBirth')}</h5> */}
      <InputDefault
        label={t("dateofBirth")}
        placeholder={t("dateofBirth")}
        value={employeeDetails.dob}
        disabled={true}
      />
      <InputDefault
        label={t("kgid")}
        placeholder={t("kgid")}
        value={employeeDetails.kgid_No}
        disabled={true}
      />
      <h4 className="mb-4">{t("attendanceDetails")}</h4>

      {employeeDetails.shift && <InputDefault
        label={"Shift"}
        placeholder={"Shift"}
        value={employeeDetails.shift}
        disabled={true}
      />}


      {!employeeDetails.shift && <> <InputText
        label={t("startTime")}
        placeholder={t("startTime")}
        value={
          employeeDetails.attendanceStartTime
            ? employeeDetails.attendanceStartTime
            : "-:-"
        }
        disabled={true}
      // editable={false}
      />

        <InputText
          label={t("endTime")}
          placeholder={t("endTime")}
          value={
            employeeDetails.attendanceEndTime
              ? employeeDetails.attendanceEndTime
              : "-:-"
          }
          disabled={true}
        // editable={false}
        /></>}
    </FormWrapper>
  );
};

export default ViewEmployeeDetails;