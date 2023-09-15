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
    Primary,
    ImageView,
    Card,
} from "@components";
import {
    GENDER_LIST,
    getObjectFromArrayByKey,
    getDropDownValueByID,
    showToast,
    ROUTE,
    useNav,
    goTo,
    DOMAIN,
} from "@utils";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllBranchesList, getListAllBranchesList } from '../../../../../../store/location/actions'
import {
    changeAttendanceSettings,
    getDepartmentData,
    getDesignationData,
    getEmployeeBasicInfo,
    getEmployeeDetails,
    postEnableFieldCheckIn,
    postEnableOfficeCheckIn,
} from "../../../../../../store/employee/actions";
import { Icons } from "@assets";

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

const BasicView = () => {
    const { t } = useTranslation();
    let dispatch = useDispatch();
    const navigation = useNav();


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

    const isHfws = localStorage.getItem(DOMAIN);

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
        pic:"",
        faceRegisterEnable: false,
        canFieldCheckIn: false,
        canOfficeCheckIn: false
    });

   

    useEffect(() => {
        getEmployeeDetailsAPi();
    }, []);

    const getEmployeeDetailsAPi = () => {
        const params = {
            user_id: selectedEmployeeId,
        };
        dispatch(
            getEmployeeBasicInfo({
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

//selectedEmployeeDetails
    const preFillEmployeeDetails = (editEmployeeDetails: any) => {

        let employeeInitData = employeeDetails;

        if (editEmployeeDetails) {
            if (editEmployeeDetails.first_name) {
                employeeInitData.firstName = editEmployeeDetails.first_name;
            }
            if (editEmployeeDetails.pic) {
                employeeInitData.pic = editEmployeeDetails.pic;
            }

            // if (
            //     editEmployeeDetails &&
            //     editEmployeeDetails.attendance_settings?.id
            // ) {
            //     employeeInitData.id =
            //         editEmployeeDetails.attendance_settings?.id;
            // }

            if (editEmployeeDetails.last_name) {
                employeeInitData.lastName = editEmployeeDetails.last_name;
            }

            if (editEmployeeDetails.mobile_number) {
                employeeInitData.mobileNumber = editEmployeeDetails.mobile_number;
            }

            if (editEmployeeDetails.email) {
                employeeInitData.e_Mail = editEmployeeDetails.email;
            }

            if (editEmployeeDetails.aadhar_number) {
                employeeInitData.aadharrNo = editEmployeeDetails.aadhar_number;
            }

            if (editEmployeeDetails.pan) {
                employeeInitData.panNo = editEmployeeDetails.pan;
            }

            if (editEmployeeDetails.kgid_number) {
                employeeInitData.kgid_No = editEmployeeDetails.kgid_number;
            }

            if (editEmployeeDetails.gender) {
                employeeInitData.gender = getObjectFromArrayByKey(
                    GENDER_LIST,
                    "value",
                    editEmployeeDetails.gender
                ).name;
            }


            if (editEmployeeDetails.blood_group) {
                employeeInitData.bloodGroup = editEmployeeDetails.blood_group;
            }

            if (editEmployeeDetails.designation) {
                employeeInitData.designation =
                    editEmployeeDetails.designation

            }


            if (editEmployeeDetails.department) {
                employeeInitData.department =
                    editEmployeeDetails.department
            }


            if (editEmployeeDetails.branch) {
                employeeInitData.branch =
                    editEmployeeDetails.branch
            }


            if (editEmployeeDetails.employment_type) {
                employeeInitData.employeeType = editEmployeeDetails.employment_type;
            }

            if (editEmployeeDetails.dob) {
                employeeInitData.dob = editEmployeeDetails.dob;
            }

            if (editEmployeeDetails.date_of_joining) {
                employeeInitData.dateOfJoining = editEmployeeDetails.date_of_joining;
            }


        }
        setEmployeeDetails(employeeInitData);
    };



    const convertFrom24To12Format = (time24: any) => {
        const [sHours, minutes] = time24.match(/([0-9]{1,2}):([0-9]{2})/).slice(1);
        const period = +sHours < 12 ? 'AM' : 'PM';
        const hours = +sHours % 12 || 12;
        return `${hours}:${minutes} ${period}`;
    }


    return (
        <ScreenContainer>
            <FormWrapper hideFooter title={t("viewEmployeeDetails")} isTitle>
                <Container additionClass={'text-right'}>
                    <ImageView icon={Icons.Edit} onClick={() => {
                        goTo(navigation, ROUTE.ROUTE_MANAGE_EMPLOYEE);

                    }} />
                </Container>

                <ScreenTitle title={'Basic Information'} />

                <Container additionClass={'col-xl-12 row col-sm-3'}>
                    <div className="col-xl-6 col-lg-6">
                        <FormTypography title={t("fullName")} subTitle={employeeDetails.firstName} />
                    </div>
                    <div className="col-xl-4 col-lg-4">
                        <FormTypography title={t("lastName")} subTitle={employeeDetails.lastName ? employeeDetails.lastName : '-'} />
                    </div>
      
        
                </Container>

                <Container additionClass={'col-xl-12 row col-sm-3'}>
                    <div className="col-xl-6 col-lg-6">
                        <FormTypography title={t("mobileNumber")} subTitle={employeeDetails.mobileNumber} />
                    </div>
                    {isHfws !== "HFWS" && <div className="col-xl-4  col-lg-4 ">
                        <FormTypography title={t("email")} subTitle={employeeDetails.e_Mail} />
                    </div>}
                    <div className="col-xl-2 mt-xl--5 mt-lg--5 col-lg-2">
            <ImageView
            //   style={{ objectFit: 'cover' }}
              height={'102px'}
              width={'100px'}
              additionClass={"rounded-circle"}
              icon={employeeDetails.pic?employeeDetails.pic: Icons.ProfilePlaceHolder}
            />
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
                        {employeeDetails.kgid_No && (
                            <FormTypography title={t("kgid")} subTitle={employeeDetails.kgid_No ? employeeDetails.kgid_No : '-'} />
                        )}
                    </div>
                </Container>

                <Divider />

                {/* <ScreenTitle title={'Attendance Details'} />
  
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
  
          <Divider /> */}

                <ScreenTitle title={'Document information'} />

                <Container additionClass={'col-xl-12 row col-sm-3'}>
                    <div className="col-xl-6">
                        <FormTypography title={t("aadhar")} subTitle={employeeDetails.aadharrNo ? employeeDetails.aadharrNo : '-'} />
                    </div>
                    <div className="col-xl-6">
                        <FormTypography title={t("pan")} subTitle={employeeDetails.panNo ? employeeDetails.panNo : '-'} />
                    </div>
                </Container>

            </FormWrapper>
        </ScreenContainer>
    );
};

export default BasicView;