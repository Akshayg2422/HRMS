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
  Firebase,
  AutoLogout,
  ModifyLogs,
  Reports,
  ELocker,
  ElockerUpload,
  WeeklyShiftSelection,
  ShiftGroup,
  ShiftListing,
  CreateShiftGroup,
  MyShiftDetails,
  EmployeeShifts,
  PayRoll,
  SalaryBreakDown,
  AllowanceGroup,
  DeductionGroupList,
  CreateGroup,
  MyBranches,
  Notifications,
  ManageRequest,
  ShiftRequest,
  EmployeeShiftRequest,
  CreateNewDesignationGroup,
  FaceApproval,
  AvailableLeaves,
  LeaveTypes,
  ManageLeaveTypes,
  DeviceInfo,
  BroadCast,
  ManageBroadCast,
  // DashBoardOtp
} from "@modules";
import { EventNotification } from "./modules/BroadCast";
import { Notification } from "./modules/dashboard/container/Notification";

import { ASYN_USER_AUTH, goTo, ROUTE, useNav } from "@utils";
import { Routes, Route, Navigate } from "react-router-dom";
// import {getToken} from "firebase/messaging"
import { ToastContainer } from "react-toastify";
import { AppLoader, PageNotFound, ScreenLoader } from "@components";
import FenceAdmin from "./modules/fenceAdmin";
import { ManageAssignLocation, } from "./modules/dashboard/screen";
import { PolicyScr, TermsOfUse, ZenylogSite } from "@screens";
import ViewEmployeeDetails from "./modules/employee/screen/ViewEmployeeDetails";
import { AppProvider } from "@contexts";


function App() {

  return (
    <>
      <AutoLogout />
      {/* <Firebase />
      <DeviceInfo /> */}
      <AppProvider >
        <AppLoader />
        <ScreenLoader />
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
          {/* <Route
          path={ROUTE.ROUTE_DASHBOARD_OTP}
          element={<RequireAuth>{<DashBoardOtp />}</RequireAuth>}
        /> */}
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
            element={<RequireAuth>{<ELocker />}</RequireAuth>}
          />
          <Route
            path={ROUTE.ROUTE_E_LOCKER_UPLOAD}
            element={<RequireAuth>{<ElockerUpload />}</RequireAuth>}
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
            path={ROUTE.ROUTE_CREATE_SHIFT_GROUP}
            element={<RequireAuth>{<CreateShiftGroup />}</RequireAuth>}
          />
          <Route
            path={ROUTE.ROUTE_MY_SHIFTS_DETAILS}
            element={<RequireAuth>{<MyShiftDetails />}</RequireAuth>}
          />
          <Route
            path={ROUTE.ROUTE_EMPLOYEES_SHIFTS}
            element={<RequireAuth>{<EmployeeShifts />}</RequireAuth>}
          />
          <Route
            path={ROUTE.ROUTE_PAYROLL}
            element={<RequireAuth>{<PayRoll />}</RequireAuth>}
          />
          <Route
            path={ROUTE.ROUTE_SALARY_BREAK_DOWN}
            element={<RequireAuth>{<SalaryBreakDown />}</RequireAuth>}
          />
          <Route
            path={ROUTE.ROUTE_ALLOWANCE_GROUP}
            element={<RequireAuth>{<AllowanceGroup />}</RequireAuth>}
          />
          <Route
            path={ROUTE.ROUTE_DEDUCTION_GROUP}
            element={<RequireAuth>{<DeductionGroupList />}</RequireAuth>}
          />
          <Route
            path={ROUTE.ROUTE_CREATE_GROUP}
            element={<RequireAuth>{<CreateGroup />}</RequireAuth>}
          />
          <Route
            path={ROUTE.ROUTE_MY_BRANCHES}
            element={<RequireAuth>{<MyBranches />}</RequireAuth>}
          />
          <Route
            path={ROUTE.ROUTE_NOTIFICATIONS}
            element={<RequireAuth>{<Notifications />}</RequireAuth>}
          />
          <Route
            path={ROUTE.ROUTE_MANAGE_REQUEST}
            element={<RequireAuth>{<ManageRequest />}</RequireAuth>}
          />
          <Route
            path={ROUTE.ROUTE_SHIFT_REQUEST}
            element={<RequireAuth>{<ShiftRequest />}</RequireAuth>}
          />
          <Route
            path={ROUTE.ROUTE_EMPLOYEE_SHIFT_REQUEST}
            element={<RequireAuth>{<EmployeeShiftRequest />}</RequireAuth>}
          />
          <Route
            path={ROUTE.ROUTE_SHIFT_SET}
            element={<RequireAuth>{<CreateNewDesignationGroup />}</RequireAuth>}
          />
          <Route
            path={ROUTE.ROUTE_FACE_APPROVAL}
            element={<RequireAuth>{<FaceApproval />}</RequireAuth>}
          />
          <Route
            path={ROUTE.ROUTE_AVAILABLE_LEAVES}
            element={<RequireAuth>{<AvailableLeaves />}</RequireAuth>}
          />
          <Route
            path={ROUTE.ROUTE_LEAVES_TYPES}
            element={<RequireAuth>{<LeaveTypes />}</RequireAuth>}
          />
          <Route
            path={ROUTE.ROUTE_MANAGE_LEAVE_TYPES}
            element={<RequireAuth>{<ManageLeaveTypes />}</RequireAuth>}
          />
          <Route
            path={ROUTE.ROUTE_BROADCAST}
            element={<RequireAuth>{<BroadCast />}</RequireAuth>}
          />
          <Route
            path={ROUTE.ROUTE_MANAGE_BROADCAST}
            element={<RequireAuth>{<ManageBroadCast />}</RequireAuth>}
          />
          <Route
            path={ROUTE.ROUTE_EVENT_NOTIFICATION}
            element={<RequireAuth>{<EventNotification />}</RequireAuth>}
          />
          <Route
            path={ROUTE.ROUTE_MY_NOTIFICATION}
            element={<RequireAuth>{<Notification />}</RequireAuth>}
          />

          <Route path={"*"} element={<PageNotFound />} />
        </Routes>
        <ToastContainer />
      </AppProvider>
    </>
  );
}

export default App;
