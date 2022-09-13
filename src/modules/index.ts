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
import {Report, Employee, Dashboard, Calendar, Location, getEmployeeDetails, fetchDashboardDetails, Navbar, DashBoardCard, Header,Profile} from './dashboard';

import { ManageEmployee, EmployeeLog, EmployeeWorkBook,Portfolio } from './employee';

import { ManageBranches } from './dashboard/screen/Location/screen';
import {DashboardStats,DashBoardAtttendance} from './stats'


import fenceAdmin from './fenceAdmin'
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
  DashBoardAtttendance,
  EmployeeLog,
  ManageBranches,
  EmployeeWorkBook,
  fenceAdmin,
  Profile
}