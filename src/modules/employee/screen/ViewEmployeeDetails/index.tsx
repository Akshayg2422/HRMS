import {
  ScreenContainer,
  Card,
} from "@components";
import { useState, useEffect } from "react";
import { AttendanceView, BasicView, LogView, PayrollView } from "./Container";

const EMPLOYEE_VIEW_TYPES = [
  { id: 1, name: 'Basic', value: 1 },
  { id: 2, name: 'Attendance', value: 2 },
  { id: 3, name: 'Log', value: 3 },
  { id: 4, name: 'Payroll', value: 4 },
];


const ViewEmployeeDetails = () => {
  const [currentView, setCurrentView] = useState(1)

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
      <div className="mx--3">
        {currentView === 1 && <BasicView />}
        {currentView === 2 && <AttendanceView />}
        {currentView === 3 && <LogView />}
        {currentView === 4 && <PayrollView />}
      </div>
    </ScreenContainer>
  );
};

export default ViewEmployeeDetails;