import {
  Welcome, Login, Otp, Register, getDashboardDetails,
  getNatureOfBusiness,
  getTypeOfBusiness,
  loginOtp,
  registerAdmin,
  registerCompany,
  registerCompanyDocument,
  resendOtp,
  validateUser,
} from './auth';
import { Report, Employee, Dashboard, Calendar, Location, getEmployeeDetails, fetchDashboardDetails, Navbar, DashBoardCard, Header, Profile } from './dashboard';

import { ManageEmployee, EmployeeLog, EmployeeWorkBook,Portfolio,InActiveEmployeeList,ApplyLeave,LeaveRequest,ManageHolidays,ManageLeaves,MyLog,MyWorkLog,MyLeaves,ModifyLogs,ELocker,ElockerUpload } from './employee';

import { ManageBranches } from './dashboard/screen/Location/screen';
import { DashboardStats, DashBoardAttendance } from './stats'
import RequireAuth from './RequireAuth'
import RequireAuthExist from './RequireAuthExist'

import { AutoLogout } from './SessionTimeout'

import { Reports } from "./Reports"

import fenceAdmin from './fenceAdmin'
import { WeeklyShiftSelection } from './shiftManagement';
import { ShiftGroup } from './shiftManagement';
import { ShiftListing } from './shiftManagement';
import { CreateShiftGroup } from './shiftManagement';

export {
  getDashboardDetails,
  getNatureOfBusiness,
  getTypeOfBusiness,
  loginOtp,
  registerAdmin,
  registerCompany,
  registerCompanyDocument,
  resendOtp,
  validateUser,
  Welcome, Login, Otp, Register, Report, Employee, Dashboard, Calendar, Location,
  Portfolio,
  getEmployeeDetails,
  fetchDashboardDetails,
  Navbar,
  Header,
  DashBoardCard,
  ManageEmployee,
  DashboardStats,
  DashBoardAttendance,
  EmployeeLog,
  ManageBranches,
  EmployeeWorkBook,
  fenceAdmin,
  Profile,
  InActiveEmployeeList,
  RequireAuth,
  RequireAuthExist,
  ApplyLeave,
  LeaveRequest,
  ManageHolidays,
  ManageLeaves,
  MyLog, MyWorkLog,
  MyLeaves,
  AutoLogout,
  ModifyLogs,
  Reports,
  ELocker,
  ElockerUpload,
  WeeklyShiftSelection,
  ShiftGroup,
  ShiftListing,
  CreateShiftGroup
}