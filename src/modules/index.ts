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
  DeviceInfo,
  EsslConfig,
  ManageEsslConfig,
  ManageDevices
} from './auth';
import { Report, Employee, Dashboard, Calendar, Location, getEmployeeDetails, fetchDashboardDetails, Navbar, DashBoardCard, Header, Profile, DashBoardOtp } from './dashboard';


import {
  ManageEmployee, EmployeeLog, EmployeeWorkBook,
  Portfolio, InActiveEmployeeList, ApplyLeave, LeaveRequest,
  ManageHolidays, ManageLeaves, MyLog, MyWorkLog, MyLeaves, ModifyLogs,
  ELocker, ElockerUpload, ShiftMonthlyView, EmployeeShifts, MyBranches, EmployeeShiftRequest,
  AvailableLeaves, LeaveTypes, ManageLeaveTypes, FaceReRegisterRequest, ShiftDetailsPerDay, WeeklyCalendar,
   ManageEmployeeLeaves,GenericShift,EsslDevices
} from './employee';

import { ManageBranches } from './dashboard/screen/Location/screen';
import { DashboardStats, DashBoardAttendance } from './stats'
import RequireAuth from './RequireAuth'
import RequireAuthExist from './RequireAuthExist'


import { AutoLogout } from './SessionTimeout'

import { Reports } from "./Reports"

import fenceAdmin from './fenceAdmin'
import { WeeklyShiftSelection, ShiftGroup, ShiftListing, CreateShiftGroup, ShiftRequest, CreateNewDesignationGroup } from './ShiftManagement';
import { PayRoll, SalaryBreakDown, AllowanceGroup, DeductionGroupList, CreateGroup, Payslip, OthersPayGroupList, OtherPayCreate } from './Payroll'
import { FaceApproval } from './FaceApproval'
import { BroadCast, ManageBroadCast } from './BroadCast'
import { Notifications, ManageRequest } from './notifications'
import { FaceReRequest } from './FaceReRegister'

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
  CreateShiftGroup,
  ShiftMonthlyView,
  EmployeeShifts,
  PayRoll,
  SalaryBreakDown,
  AllowanceGroup,
  DeductionGroupList,
  CreateGroup,
  DashBoardOtp,
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
  FaceReRequest,
  EsslConfig,
  ManageEsslConfig,
  ManageDevices,
  FaceReRegisterRequest,
  ShiftDetailsPerDay,
  Payslip,
  WeeklyCalendar,
  ManageEmployeeLeaves,
  OthersPayGroupList,
  OtherPayCreate,
  GenericShift,
  EsslDevices
}


