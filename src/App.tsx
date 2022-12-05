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
  DashBoardAttendance,
  EmployeeLog,
  ManageBranches,
  EmployeeWorkBook,
  Profile,
  InActiveEmployeeList,
  RequireAuth,
  RequireAuthExist,
  ApplyLeave,
  LeaveRequest,
  ManageHolidays,
  ManageLeaves,
  MyLog,
  MyWorkLog,
  MyLeaves,
  AutoLogout,
  ModifyLogs,
  Reports,
  ELocker,
  ElockerUpload,
  WeeklyShiftSelection,
  ShiftGroup,
  ShiftListing,
  EditEmployeesNewGroup
} from "@modules";

import { ASYN_USER_AUTH, goTo, ROUTE, useNav } from "@utils";
import { Routes, Route, Navigate } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import { AppLoader, PageNotFound } from "@components";
import FenceAdmin from "./modules/fenceAdmin";
import { ManageAssignLocation } from "./modules/dashboard/screen";
import { PolicyScr, TermsOfUse, ZenylogSite } from "@screens";
import ViewEmployeeDetails from "./modules/employee/screen/ViewEmployeeDetails";

function App() {
  return (
    <>
      {/* <AutoLogout /> */}
      <AppLoader />
      <Routes>
        <Route path={"/"} element={<ZenylogSite />} />
        <Route path={"/PrivacyPolicy"} element={<PolicyScr />} />
        <Route path={"/TermsOfUse"} element={<TermsOfUse />} />
        <Route
          path={ROUTE.ROUTE_LOGIN}
          element={<RequireAuthExist>{<Login />}</RequireAuthExist>}
        />
        <Route
          path={ROUTE.ROUTE_OTP}
          element={<RequireAuthExist>{<Otp />}</RequireAuthExist>}
        />
        {/* <Route path={ROUTE.ROUTE_REGISTER} element={<Register />} /> */}
        <Route
          path={ROUTE.ROUTE_DASHBOARD}
          element={<RequireAuth>{<Dashboard />}</RequireAuth>}
        />
        <Route
          path={ROUTE.ROUTE_EMPLOYEE}
          element={<RequireAuth>{<Employee />}</RequireAuth>}
        />
        <Route
          path={ROUTE.ROUTE_CALENDAR}
          element={<RequireAuth>{<Calendar />}</RequireAuth>}
        />
        <Route
          path={ROUTE.ROUTE_LOCATION}
          element={<RequireAuth>{<Location />}</RequireAuth>}
        />
        <Route
          path={ROUTE.ROUTE_REPORTS}
          element={<RequireAuth>{<Reports />}</RequireAuth>}
        />
        <Route
          path={ROUTE.ROUTE_MANAGE_EMPLOYEE}
          element={<RequireAuth>{<ManageEmployee />}</RequireAuth>}
        />
        <Route
          path={ROUTE.ROUTE_MANAGE_BRANCHES}
          element={<RequireAuth>{<ManageBranches />}</RequireAuth>}
        />
        <Route
          path={ROUTE.ROUTE_DASHBOARD_STATS}
          element={<RequireAuth>{<DashboardStats />}</RequireAuth>}
        />
        <Route
          path={ROUTE.ROUTE_DASHBOARD_ATTENDANCE}
          element={<RequireAuth>{<DashBoardAttendance />}</RequireAuth>}
        />
        <Route
          path={ROUTE.ROUTE_EMPLOYEE_LOG}
          element={<RequireAuth>{<EmployeeLog />}</RequireAuth>}
        />
        <Route
          path={ROUTE.ROUTE_EMPLOYEE_WORK_BOOK}
          element={<RequireAuth>{<EmployeeWorkBook />}</RequireAuth>}
        />
        <Route
          path={ROUTE.ROUTE_FENCE_ADMIN}
          element={<RequireAuth>{<FenceAdmin />}</RequireAuth>}
        />
        <Route
          path={ROUTE.ROUTE_ASSIGN_LOCATION}
          element={<RequireAuth>{<ManageAssignLocation />}</RequireAuth>}
        />
        <Route
          path={ROUTE.ROUTE_PROFILE}
          element={<RequireAuth>{<Profile />}</RequireAuth>}
        />
        <Route
          path={ROUTE.ROUTE_PORTFOLIO}
          element={<RequireAuth>{<Portfolio />}</RequireAuth>}
        />
        <Route
          path={ROUTE.ROUTE_VIEW_EMPLOYEE_DETAILS}
          element={<RequireAuth>{<ViewEmployeeDetails />}</RequireAuth>}
        />
        <Route
          path={ROUTE.ROUTE_INACTIVE_EMPLOYEE_LIST}
          element={<RequireAuth>{<InActiveEmployeeList />}</RequireAuth>}
        />
        <Route
          path={ROUTE.ROUTE_APPLY_LEAVE}
          element={<RequireAuth>{<ApplyLeave />}</RequireAuth>}
        />
        <Route
          path={ROUTE.ROUTE_LEAVE_REQUEST}
          element={<RequireAuth>{<LeaveRequest />}</RequireAuth>}
        />
        <Route
          path={ROUTE.ROUTE_MANAGE_HOLIDAYS}
          element={<RequireAuth>{<ManageHolidays />}</RequireAuth>}
        />
        <Route
          path={ROUTE.ROUTE_MANAGE_LEAVES}
          element={<RequireAuth>{<ManageLeaves />}</RequireAuth>}
        />
        <Route
          path={ROUTE.ROUTE_MY_LOG}
          element={<RequireAuth>{<MyLog />}</RequireAuth>}
        />
        <Route
          path={ROUTE.ROUTE_MY_WORK_BOOK}
          element={<RequireAuth>{<MyWorkLog />}</RequireAuth>}
        />
        <Route
          path={ROUTE.ROUTE_MY_LEAVES}
          element={<RequireAuth>{<MyLeaves />}</RequireAuth>}
        />
        <Route
          path={ROUTE.ROUTE_MODIFY_LOGS}
          element={<RequireAuth>{<ModifyLogs />}</RequireAuth>}
        />
         <Route
          path={ROUTE.ROUTE_E_LOCKER}
          element={<RequireAuth>{<ELocker/>}</RequireAuth>}
        />
         <Route
          path={ROUTE.ROUTE_E_LOCKER_UPLOAD}
          element={<RequireAuth>{<ElockerUpload/>}</RequireAuth>}
          />
        <Route
          path={ROUTE.ROUTE_SHIFT_MANAGEMENT}
          element={<RequireAuth>{<WeeklyShiftSelection />}</RequireAuth>}
        />
        <Route
          path={ROUTE.ROUTE_SHIFT_GROUP}
          element={<RequireAuth>{<ShiftGroup />}</RequireAuth>}
        />
        <Route
          path={ROUTE.ROUTE_SHIFT_LISTING}
          element={<RequireAuth>{<ShiftListing />}</RequireAuth>}
        />
        <Route
          path={ROUTE.ROUTE_EDIT_EMPLOYEES_NEW_GROUP}
          element={<RequireAuth>{<EditEmployeesNewGroup />}</RequireAuth>}
        />

        <Route path={"*"} element={<PageNotFound />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
