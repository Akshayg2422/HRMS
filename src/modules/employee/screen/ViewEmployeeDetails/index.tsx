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
  Card,
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
import { AttendanceView, BasicView, LogView, PayrollView } from "./Container";

const EMPLOYEE_VIEW_TYPES = [
  { id: 1, name: 'Basic', value: -1, component: <BasicView /> },
  { id: 2, name: 'Attendance', value: -2, component: <AttendanceView /> },
  { id: 3, name: 'Log', value: 1, component: <LogView /> },
  { id: 4, name: 'Payroll', value: 0, component: <PayrollView /> },
];


const ViewEmployeeDetails = () => {
  const [currentView, setCurrentView] = useState(-1)

  return (
    <ScreenContainer additionClass={'mb--5'}>
      <Card>
        <ul
          className="nav nav-pills nav-fill text-center justify-content-between"
        >
          {EMPLOYEE_VIEW_TYPES.map((el: any, index: number) => {
            return (
              <div className="col" >
                <div className={`${currentView !== el.value ? `text-uppercase text-muted mb-sm-0 mb-2` : `text-uppercase text-primary fw-bold  mb-sm-0 mb-2`}`}
                  style={{ cursor: 'pointer' }} onClick={() => { setCurrentView(el.value) }}>
                  {el.name}
                </div>
              </div>
            )
          })}
        </ul>
      </Card>
      
    </ScreenContainer>
  );
};

export default ViewEmployeeDetails;