import {
  InputDefault,
  InputMail,
  InputNumber,
  InputText,
  FormWrapper,
  TimePicker,
  Icon,
  Modal,
  CheckBox,
  ScreenContainer,
  ScreenTitle,
  FormTypography,
  Container,
  Divider,
} from "@components";
import {
  GENDER_LIST,
  getObjectFromArrayByKey,
  getDropDownValueByID,
  showToast,
} from "@utils";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllBranchesList, getListAllBranchesList } from '../../../../store/location/actions'
import {
  changeAttendanceSettings,
  getDepartmentData,
  getDesignationData,
  getEmployeeDetails,
  postEnableFieldCheckIn,
  postEnableOfficeCheckIn,
} from "../../../../store/employee/actions";

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
    id: string;
    start_time: string;
    end_time: string;
    is_excempt_allowed: boolean;
    can_field_checkin: boolean;
    can_office_checkin: boolean;
    face_validation_required: boolean;
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
  const [deptExist, setDeptExist] = useState(false);
  const [desigationExist, setDesigationExist] = useState(false);
  const [branchesExist, setBranchesExist] = useState(false);
  const [showEnableContainers, setShowEnableContainers] = useState(false);


  const [employeeDetails, setEmployeeDetails] = useState({
    id: '',
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
    shift: "",
    faceRegisterEnable: false,
    canFieldCheckIn: false,
    canOfficeCheckIn: false
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
    getDepartmentDataList()
    getDesignationDataList()

    const params = {};
    dispatch(
      getListAllBranchesList({
        params,
        onSuccess: (success: object) => () => {
          setBranchesExist(true)
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

        onError: (error: string) => () => { },
      })
    );
  }, []);

  const getDepartmentDataList = () => {
    const params = {}
    dispatch(
      getDepartmentData({
        params,
        onSuccess: (success: object) => () => {
          setDeptExist(true)
        },
        onError: (error: string) => () => { },
      }))
  }

  const getDesignationDataList = () => {
    const params = {}

    dispatch(
      getDesignationData({
        params,
        onSuccess: (success: object) => () => {
          setDesigationExist(true)
        },
        onError: (error: string) => () => { },
      }))
  }

  useEffect(() => {
    if (deptExist && desigationExist && branchesExist) {
      getEmployeeDetailsAPi();
    }

  }, [deptExist, desigationExist, branchesExist]);

  const getEmployeeDetailsAPi = () => {
    const params = {
      user_id: selectedEmployeeId,
    };
    dispatch(
      getEmployeeDetails({
        params,
        onSuccess: (response: EmployeeDetail) => () => {

          preFillEmployeeDetails(response);
          setShowEnableContainers(true)
        },
        onError: (error: string) => () => {
          showToast('error', error)
        },
      })
    );
  };

  const fieldCheckInHandler = (value: boolean) => {
    const params = {
      can_field_checkin: value,
      id: employeeDetails.id
    }
    dispatch(postEnableFieldCheckIn({
      params, onSuccess: (success: any) => {
        setEmployeeDetails({ ...employeeDetails, canFieldCheckIn: value })
        showToast('success', success.message)
      },
      onError: (error: string) => {
        showToast('error', error)
      },
    }))
  }

  const officeCheckInHandler = (value: boolean) => {
    const params = {
      can_office_checkin: value,
      id: employeeDetails.id
    }
    dispatch(postEnableOfficeCheckIn({
      params, onSuccess: (success: any) => {
        setEmployeeDetails({ ...employeeDetails, canOfficeCheckIn: value })
        showToast('success', success.message)
      },
      onError: (error: string) => {
        showToast('error', error)
      },
    }))
  }

  const faceValidationHandler = (value: boolean) => {
    const params = {
      face_validation_required: value,
      id: employeeDetails.id
    }
    dispatch(changeAttendanceSettings({
      params, onSuccess: (success: any) => {
        setEmployeeDetails({ ...employeeDetails, faceRegisterEnable: value })
        showToast('success', success.message)
      },
      onError: (error: string) => {
        showToast('error', error)
      },
    }))

  }

  const preFillEmployeeDetails = (editEmployeeDetails: EmployeeDetail) => {
    let employeeInitData = { ...employeeDetails };

    if (editEmployeeDetails) {
      if (editEmployeeDetails.first_name)
        employeeInitData.firstName = editEmployeeDetails.first_name;

      // if (editEmployeeDetails.id)
      //   employeeInitData.id = editEmployeeDetails.id;

      if (
        editEmployeeDetails &&
        editEmployeeDetails.attendance_settings?.id
      )
        employeeInitData.id =
          editEmployeeDetails.attendance_settings?.id;


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

      if (
        editEmployeeDetails &&
        editEmployeeDetails.attendance_settings?.can_field_checkin
      )
        employeeInitData.canFieldCheckIn =
          editEmployeeDetails.attendance_settings?.can_field_checkin;

      if (
        editEmployeeDetails &&
        editEmployeeDetails.attendance_settings?.can_office_checkin
      )
        employeeInitData.canOfficeCheckIn =
          editEmployeeDetails.attendance_settings?.can_office_checkin;

      if (
        editEmployeeDetails &&
        editEmployeeDetails.attendance_settings?.face_validation_required
      )
        employeeInitData.faceRegisterEnable =
          editEmployeeDetails.attendance_settings?.face_validation_required;
    }
    // console.log("employeeInitData", employeeInitData);
    setEmployeeDetails(employeeInitData);
  };

  const convertFrom24To12Format = (time24: any) => {
    const [sHours, minutes] = time24.match(/([0-9]{1,2}):([0-9]{2})/).slice(1);
    const period = +sHours < 12 ? 'AM' : 'PM';
    const hours = +sHours % 12 || 12;
    return `${hours}:${minutes} ${period}`;
  }


  return (
    <ScreenContainer additionClass={'mb--5'}>
      <FormWrapper hideFooter title={t("viewEmployeeDetails")} isTitle>

        <ScreenTitle title={'Basic Information'} />

        <Container additionClass={'col-xl-12 row col-sm-3'}>
          <div className="col-xl-6">
            <FormTypography title={t("fullName")} subTitle={employeeDetails.firstName} />
          </div>
          <div className="col-xl-6">
            <FormTypography title={t("lastName")} subTitle={employeeDetails.lastName ? employeeDetails.lastName : '-'} />
          </div>
        </Container>

        <Container additionClass={'col-xl-12 row col-sm-3'}>
          <div className="col-xl-6">
            <FormTypography title={t("mobileNumber")} subTitle={employeeDetails.mobileNumber} />
          </div>
          <div className="col-xl-6">
            <FormTypography title={t("email")} subTitle={employeeDetails.e_Mail} />
          </div>
        </Container>

        <Container additionClass={'col-xl-12 row col-sm-3'}>
          <div className="col-xl-6">
            <FormTypography title={t("gender")} subTitle={employeeDetails.gender} />
          </div>
          <div className="col-xl-6">
            <FormTypography title={t("bloodGroup")} subTitle={employeeDetails.bloodGroup ? employeeDetails.bloodGroup : "-"} />
          </div>
        </Container>

        <Container additionClass={'col-xl-12 row col-sm-3 mb-4'}>
          <div className="col-xl-6">
            <FormTypography title={t("dateofBirth")} subTitle={employeeDetails.dob} />
          </div>

        </Container>
        <Divider />

        <ScreenTitle title={'Company Details'} />

        <Container additionClass={'col-xl-12 row col-sm-3 '}>
          <div className="col-xl-6">
            <FormTypography title={t("designation")} subTitle={employeeDetails.designation} />
          </div>
          <div className="col-xl-6">
            <FormTypography title={t("department")} subTitle={employeeDetails.department} />
          </div>
        </Container>

        <Container additionClass={'col-xl-12 row col-sm-3'}>
          <div className="col-xl-6">
            <FormTypography title={t("branch")} subTitle={employeeDetails.branch} />
          </div>
          <div className="col-xl-6">
            <FormTypography title={t("category")} subTitle={employeeDetails.employeeType} />
          </div>
        </Container>

        <Container additionClass={'col-xl-12 row col-sm-3 mb-4'}>
          <div className="col-xl-6">
            <FormTypography title={t("dataOfJoining")} subTitle={employeeDetails.dateOfJoining} />
          </div>
          <div className="col-xl-6">
            <FormTypography title={t("kgid")} subTitle={employeeDetails.kgid_No ? employeeDetails.kgid_No : '-'} />
          </div>
        </Container>

        <Divider />

        <ScreenTitle title={'Attendance Details'} />

        <Container additionClass={'col-xl-12 row col-sm-3 mb-4'}>
          {employeeDetails.shift &&
            <div className="col-xl-6">
              <FormTypography title={"Shift"} subTitle={employeeDetails.shift} />
            </div>
          }
          {!employeeDetails.shift &&
            <>
              <div className="col-xl-6">
                <FormTypography title={t("startTime")} subTitle={employeeDetails.attendanceStartTime
                  ? convertFrom24To12Format(employeeDetails.attendanceStartTime)
                  : "-:-"} />
              </div>
              <div className="col-xl-6">
                <FormTypography title={t("endTime")} subTitle={employeeDetails.attendanceEndTime
                  ? convertFrom24To12Format(employeeDetails.attendanceEndTime)
                  : "-:-"} />
              </div>
            </>
          }
        </Container>

        <Divider />

        <ScreenTitle title={'Document information'} />

        <Container additionClass={'col-xl-12 row col-sm-3'}>
          <div className="col-xl-6">
            <FormTypography title={t("aadhar")} subTitle={employeeDetails.aadharrNo ? employeeDetails.aadharrNo : '-'} />
          </div>
          <div className="col-xl-6">
            <FormTypography title={t("pan")} subTitle={employeeDetails.panNo ? employeeDetails.panNo : '-'} />
          </div>
        </Container>

        {/* <InputText
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
        <InputDefault
          label={t("dataOfJoining")}
          placeholder={t("dataOfJoining")}
          value={employeeDetails.dateOfJoining}
          disabled={true}
        />
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
        <h4 className="mb-4">{t("attendanceDetails")}</h4> */}

        {/* {employeeDetails.shift && <InputDefault
          label={"Shift"}
          placeholder={"Shift"}
          value={employeeDetails.shift}
          disabled={true}
        />} */}


        {/* {!employeeDetails.shift && <> <InputText
          label={t("startTime")}
          placeholder={t("startTime")}
          value={
            employeeDetails.attendanceStartTime
              ? convertFrom24To12Format(employeeDetails.attendanceStartTime)
              : "-:-"
          }
          disabled={true}
        />

          <InputText
            label={t("endTime")}
            placeholder={t("endTime")}
            value={
              employeeDetails.attendanceEndTime
                ? convertFrom24To12Format(employeeDetails.attendanceEndTime)
                : "-:-"
            }
            disabled={true}
          /></>} */}
      </FormWrapper>
    </ScreenContainer>
  );
};

export default ViewEmployeeDetails;