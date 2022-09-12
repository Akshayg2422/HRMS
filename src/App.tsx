import React from "react";
import {
  Dashboard,
  Employee,
  Report,
  Login,
  Register,
  Calendar,
  Location,
  Otp,
  Website,
  Welcome,
  ManageEmployee,
  DashboardStats,
  EmployeeLog,
  ManageBranches,
  EmployeeWorkBook,
  Profile
} from "@modules";

import { ROUTE } from "@utils";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, AppProvider, DashboardProvider } from "@contexts";
import { ToastContainer } from "react-toastify";
import { AppLoader } from "@components";
import FenceAdmin from "./modules/fenceAdmin";
import { ManageAssignLocation } from "./modules/dashboard/screen";
import {ZenylogSite} from '@screens'
function App() {
  return (
    <AppProvider>
      <AppLoader />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path={"/"} element={<ZenylogSite />} />
            <Route path={ROUTE.ROUTE_LOGIN} element={<Login />} />
            <Route path={ROUTE.ROUTE_WELCOME} element={<Welcome />} />
            <Route path={ROUTE.ROUTE_OTP} element={<Otp />} />
            <Route path={ROUTE.ROUTE_REGISTER} element={<Register />} />
          </Routes>
        </AuthProvider>
        <DashboardProvider>
          <Routes>
            <Route path={ROUTE.ROUTE_DASHBOARD} element={<Dashboard />} />
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
              path={ROUTE.ROUTE_EMPLOYEE_LOG}
              element={<EmployeeLog />}
            />
            <Route
              path={ROUTE.ROUTE_EMPLOYEE_TIME_SHEETS}
              element={<EmployeeWorkBook />}
            />
            <Route
              path={ROUTE.ROUTE_FENCE_ADMIN}
              element={<FenceAdmin />}
            />
            <Route
              path={ROUTE.ROUTE_ASSIGN_LOCATION}
              element={<ManageAssignLocation />}
            />
            <Route
              path={ROUTE.ROUTE_PROFILE}
              element={<Profile/>}
            />
          </Routes>
        </DashboardProvider>
      </BrowserRouter>
      <ToastContainer />
    </AppProvider>
  );
}

export default App;
