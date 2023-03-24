
import { Welcome, Login, Otp, Register, DeviceInfo, ManageEsslConfig, EsslConfig, ManageDevices } from './screen';

import {
  getDashboardDetails,
  getNatureOfBusiness,
  getTypeOfBusiness,
  loginOtp,
  registerAdmin,
  registerCompany,
  registerCompanyDocument,
  resendOtp,
  validateUser
} from './service'

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
  Welcome, Login, Otp, Register, DeviceInfo, EsslConfig, ManageEsslConfig, ManageDevices
}
