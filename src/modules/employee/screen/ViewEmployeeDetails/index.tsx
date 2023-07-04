import {
  ScreenContainer,
  Card,
} from "@components";
import { useState, useEffect } from "react";
import { AttendanceView, BasicView, LogView, PayrollView, ManageEmployeeLeaveTypes } from "./Container";
import { useSelector } from "react-redux";

const EMPLOYEE_VIEW_TYPES = [
  { id: 1, name: 'Basic', value: 1 },
  { id: 2, name: 'Attendance', value: 2 },
  { id: 3, name: 'Log', value: 3 },
  { id: 4, name: 'Payroll', value: 4 },
  { id: 5, name: 'Manage Leave', value: 5 },
];


const ViewEmployeeDetails = () => {
  const [currentView, setCurrentView] = useState(1)

  const {
    employeeDetailsViewApiHandler
  } = useSelector((state: any) => state.EmployeeReducer);


  const componentHandler = () => {
    if (currentView === 1) {
      return <BasicView />
    }
    else if (currentView === 2) {
      return <AttendanceView />
    }
    else if (currentView === 3) {
      return <LogView />
    }
    else if (currentView === 4) {
      return <PayrollView />
    }
    else if (currentView === 5) {
      return <ManageEmployeeLeaveTypes />
    }
  }

  return (
    // <ScreenContainer additionClass={'mb--5'}>
    <>
      <Card additionClass="mx-4">
        <ul
          className="nav nav-pills nav-fill text-center justify-content-between"
        >
          {EMPLOYEE_VIEW_TYPES.map((el: any, index: number) => {
            return (
              <div className="col" onClick={() => {
                if (el.id === 1) {
                  setCurrentView(1)
                }
                else if (el.id === 2) {
                  setCurrentView(2)
                }
                else if (el.id === 3) {
                  setCurrentView(3)
                }
                else if (el.id === 4) {
                  setCurrentView(4)
                }
                else if (el.id === 5) {
                  setCurrentView(5)
                }
              }}>
                <div className={`${currentView !== el.id ? `text-uppercase text-muted mb-sm-0 mb-2` : `text-uppercase text-primary fw-bold  mb-sm-0 mb-2`}`}
                  style={{ cursor: 'pointer' }} onClick={() => { }}>
                  {el.name}
                </div>
              </div>
            )
          })}
        </ul>
      </Card>
      {componentHandler()}
    </>
    // </ScreenContainer>
  );
};

export default ViewEmployeeDetails;