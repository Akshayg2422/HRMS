import React, { useEffect, useState } from "react";
import {
  Dashboard,
  Employee,
  Report,
  Login,
  Register,
  Calendar,
  Location,
  Otp,
  Portfolio,
  Welcome,
  ManageEmployee,
  DashboardStats,
  DashBoardAtttendance,
  EmployeeLog,
  ManageBranches,
  EmployeeWorkBook,
  Profile,
  InActiveEmployeeList,
} from "@modules";

import { ASYN_USER_AUTH, goTo, ROUTE, useNav } from "@utils";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AppProvider, DashboardProvider } from "@contexts";
import { ToastContainer } from "react-toastify";
import { AppLoader } from "@components";
import FenceAdmin from "./modules/fenceAdmin";
import { ManageAssignLocation } from "./modules/dashboard/screen";
import { ZenylogSite } from "@screens";
import ViewEmployeeDetails from "./modules/employee/screen/ViewEmployeeDetails";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState<any>(
    localStorage.getItem(ASYN_USER_AUTH)
  );

  return (
    <AppProvider>
      <AppLoader />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path={"/"} element={<ZenylogSite />} />
            <Route path={ROUTE.ROUTE_LOGIN} element={ JSON.parse(isLoggedIn)?.userLoggedIn ?<Navigate to={ROUTE.ROUTE_DASHBOARD} replace />:<Login />} />
            <Route path={ROUTE.ROUTE_WELCOME} element={<Welcome />} />
            <Route path={ROUTE.ROUTE_OTP} element={<Otp />} />
            <Route path={ROUTE.ROUTE_REGISTER} element={<Register />} />
          </Routes>
        </AuthProvider>
        <DashboardProvider>
          <Routes>
            <Route path={ROUTE.ROUTE_DASHBOARD} element={JSON.parse(isLoggedIn)?.userLoggedIn ===false ?<Navigate to={ROUTE.ROUTE_LOGIN} replace />: <Dashboard />  } />
            <Route path={ROUTE.ROUTE_EMPLOYEE} element={<Employee />} />
            <Route path={ROUTE.ROUTE_CALENDAR} element={<Calendar />} />
            <Route path={ROUTE.ROUTE_LOCATION} element={<Location />} />
            <Route path={ROUTE.ROUTE_REPORT} element={<Report />} />
            <Route
              path={ROUTE.ROUTE_MANAGE_EMPLOYEE}
              element={<ManageEmployee />}
            />
            <Route
              path={ROUTE.ROUTE_MANAGE_BRANCHES}
              element={<ManageBranches />}
            />
            <Route
              path={ROUTE.ROUTE_DASHBOARD_STATS}
              element={<DashboardStats />}
            />
            <Route
              path={ROUTE.ROUTE_DASHBOARD_ATTENDANCE}
              element={<DashBoardAtttendance />}
            />
            <Route path={ROUTE.ROUTE_EMPLOYEE_LOG} element={<EmployeeLog />} />
            <Route
              path={ROUTE.ROUTE_EMPLOYEE_WORK_BOOK}
              element={<EmployeeWorkBook />}
            />
            <Route path={ROUTE.ROUTE_FENCE_ADMIN} element={<FenceAdmin />} />
            <Route
              path={ROUTE.ROUTE_ASSIGN_LOCATION}
              element={<ManageAssignLocation />}
            />
            <Route path={ROUTE.ROUTE_PROFILE} element={<Profile />} />
            <Route path={ROUTE.ROUTE_PORTFOLIO} element={<Portfolio />} />
            <Route path={ROUTE.ROUTE_VIEW_EMPLOYEE_DETAILS} element={<ViewEmployeeDetails />} />
            <Route path={ROUTE.ROUTE_INACTIVE_EMPLOYEE_LIST} element={<InActiveEmployeeList/>} />

          </Routes>
        </DashboardProvider>
      </BrowserRouter>
      <ToastContainer />
    </AppProvider>
  );
}

export default App;
