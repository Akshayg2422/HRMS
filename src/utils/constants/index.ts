import { Icons } from '@assets'
import moment from 'moment';

export const DOMAIN = 'DOMAIN';

const isHfws = localStorage.getItem(DOMAIN);



export const ROUTE = {
  ROUTE_DASHBOARD: '/dashboard',
  ROUTE_EMPLOYEE: '/employee',
  ROUTE_REGISTER: '/register',
  ROUTE_LOGIN: '/login',
  ROUTE_OTP: '/otp',
  ROUTE_LOCATION: '/location',
  ROUTE_CALENDAR: '/calendar',
  ROUTE_WELCOME: '/landing',
  ROUTE_MANAGE_EMPLOYEE: '/manage-employee',
  ROUTE_DASHBOARD_STATS: '/stats',
  ROUTE_DASHBOARD_ATTENDANCE: '/stats-attendance',
  ROUTE_EMPLOYEE_LOG: '/employee-log',
  ROUTE_MANAGE_BRANCHES: "/manage-branches",
  ROUTE_EMPLOYEE_WORK_BOOK: '/time-sheets',
  ROUTE_FENCE_ADMIN: '/fence-admin',
  ROUTE_ASSIGN_LOCATION: '/assign-location',
  ROUTE_PROFILE: '/profile',
  ROUTE_PORTFOLIO: '/portfolio',
  ROUTE_VIEW_EMPLOYEE_DETAILS: '/view-employee',
  ROUTE_INACTIVE_EMPLOYEE_LIST: '/inactive-employee-list',
  ROUTE_APPLY_LEAVE: '/apply-leave',
  ROUTE_LEAVE_REQUEST: '/leave-request',
  ROUTE_MANAGE_HOLIDAYS: '/manage-holidays',
  ROUTE_MANAGE_LEAVES: '/manage-leaves',
  ROUTE_MY_WORK_BOOK: '/my-work-book',
  ROUTE_MY_LOG: '/my-log',
  ROUTE_MY_LEAVES: '/my-leaves',
  ROUTE_MODIFY_LOGS: '/modify-logs',
  ROUTE_REPORTS: '/reports',
  ROUTE_E_LOCKER: '/E-Locker',
  ROUTE_E_LOCKER_UPLOAD: '/E-Locker-Upload',
  ROUTE_SHIFT_MANAGEMENT: '/shift-management',
  ROUTE_SHIFT_GROUP: '/shift-group',
  ROUTE_SHIFT_SET: '/shift-set',
  ROUTE_SHIFT_LISTING: '/shift-listing',
  ROUTE_CREATE_SHIFT_GROUP: '/create-shift-group',
  ROUTE_MY_SHIFTS_DETAILS_MONTHLY: '/my-shifts-details-monthly',
  ROUTE_MY_SHIFTS_DETAILS_DAILY: '/my-shifts-details-daily',
  ROUTE_EMPLOYEES_SHIFTS: '/employees-shifts',
  ROUTE_PAYROLL: '/payroll',
  ROUTE_SALARY_BREAK_DOWN: '/salary-break-down',
  ROUTE_ALLOWANCE_GROUP: '/allowance-group-List',
  ROUTE_DEDUCTION_GROUP: '/deduction-group-List',
  ROUTE_CREATE_GROUP: '/create-group',
  ROUTE_DASHBOARD_OTP: "/dashboard-otp",
  ROUTE_MY_BRANCHES: '/my-branches',
  ROUTE_NOTIFICATIONS: '/notifications',
  ROUTE_MANAGE_REQUEST: '/manage-request',
  ROUTE_SHIFT_REQUEST: '/shift-request',
  ROUTE_EMPLOYEE_SHIFT_REQUEST: '/employee-shift-request',
  ROUTE_LOG_APPROVAL: '/log-approval',
  ROUTE_AVAILABLE_LEAVES: '/available-leaves',
  ROUTE_LEAVES_TYPES: '/leaves-types',
  ROUTE_MANAGE_LEAVE_TYPES: '/manage-leave-types',
  ROUTE_BROADCAST: '/broadcast',
  ROUTE_EVENT_NOTIFICATION: '/event-notification',
  ROUTE_MANAGE_BROADCAST: '/manage-broadcast',
  ROUTE_MY_NOTIFICATION: '/my-notification',
  ROUTE_FACE_RE_REQUEST: '/face-re-request',
  ROUTE_FACE_RE_REGISTER_REQUEST: '/face-re-register-request',
  ROUTE_ESSI_CONFIG: '/essi-Config',
  ROUTE_MANAGE_ESSL_CONFIG: '/manage-essl-config',
  ROUTE_MANAGE_ESSL_DEVICES: '/manage-essl-devices',
  ROUTE_APPROVALS: '/approvals',
  ROUTE_ADD_DEDUCTION: '/add-deduction',
  ROUTE_VIEW_EMPLOYEE_SALARY_DEFINITION: '/view-employee-salary-definition',
  ROUTE_PAYSLIP: '/payslip',
  ROUTE_WEEKLY_CALENDER: '/weekly-calender',
  ROUTE_MANAGE_EMPLOYEES_LEAVES: '/manage-employee-leaves',
  ROUTE_OTHERS_PAY: '/others-pay',
  ROUTE_CREATE_OTHERS_PAY: '/create-others-pay',
  ROUTE_GENERIC_SHIFT: '/generic-shift',
  ROUTE_ESSL_DEVICES: '/essl-Devices',
}


export const CHILD_PATH = [
  { path: "/manage-employee", parent: '/employee', name: 'ManageEmployee', showBack: true, showBreadCrums: true },
  { path: "/manage-branches", parent: '/location', name: "Manage Branches", showBack: true, showBreadCrums: true },
  { path: "/manage-holidays", parent: '/calendar', name: 'Manage Holidays', showBack: true, showBreadCrums: true },
  { path: "/my-branches", parent: '/location', name: 'My Branches', showBack: true, showBreadCrums: true },
  { path: "/leaves-types", parent: '/calendar', name: 'Leave Types', showBack: true, showBreadCrums: true },
  { path: "/manage-leave-types", parent: '/calendar', name: 'Manage Leave Types', showBack: true, showBreadCrums: true },
  { path: "/shift-set", parent: '/shift-group', name: 'Create Shift Group', showBack: true, showBreadCrums: true },
  { path: "/shift-listing", parent: '/shift-group', name: "Weekly Shifts", showBack: true, showBreadCrums: true },
  { path: "/shift-management", parent: '/shift-group', name: `Week's Shift Definition`, showBack: true, showBreadCrums: true },
  { path: "/create-shift-group", parent: '/shift-group', name: 'Manage Shift Group', showBack: true, showBreadCrums: true },
  { path: "/my-work-book", parent: '/portfolio', name: 'My Time Sheet', showBack: true, showBreadCrums: true },
  { path: "/my-log", parent: '/portfolio', name: 'My Log', showBack: true, showBreadCrums: true },
  { path: "/manage-leaves", parent: '/portfolio', name: 'Manage Leaves', showBack: true, showBreadCrums: true },
  { path: "/my-leaves", parent: '/portfolio', name: 'My Leaves', showBack: true, showBreadCrums: true },
  { path: "/E-Locker", parent: '/portfolio', name: 'E-locker', showBack: true, showBreadCrums: true },
  { path: "/my-shifts-details", parent: '/portfolio', name: 'My Shift Details', showBack: true, showBreadCrums: true },
  { path: "/employee-shift-request", parent: '/portfolio', name: 'Shift Request History', showBack: true, showBreadCrums: true },
  { path: "/available-leaves", parent: '/portfolio', name: 'Available Leaves', showBack: true, showBreadCrums: true },
  { path: "/apply-leave", parent: '/portfolio', name: 'Apply Leaves', showBack: true, showBreadCrums: true },
  { path: "/manage-broadcast", parent: '/broadcast', name: 'Manage BroadCast', showBack: true, showBreadCrums: true },
  { path: "/view-employee", parent: '/employee', name: 'View Employee', showBack: true, showBreadCrums: true },
  { path: "/inactive-employee-list", parent: '/employee', name: 'Deleted Employees', showBack: true, showBreadCrums: true },
  { path: "/my-notification", parent: '/notifications', name: 'BroadCast', showBack: true, showBreadCrums: true },

  { path: "/leave-request", parent: '/approvals', name: 'Employee Leaves', showBack: false, showBreadCrums: true },
  { path: "/modify-logs", parent: '/approvals', name: 'Modify Logs', showBack: false, showBreadCrums: true },
  { path: "/employees-shifts", parent: '/approvals', name: 'Employee Shifts', showBack: false, showBreadCrums: true },
  { path: "/shift-request", parent: '/approvals', name: 'Shift Request', showBack: false, showBreadCrums: true },
  { path: "/face-re-register-request", parent: '/approvals', name: 'Face Re-register Request', showBack: false, showBreadCrums: true },
  { path: "/log-approval", parent: '/approvals', name: 'Log Approval', showBack: false, showBreadCrums: true },
  { path: "/face-re-request", parent: '/approvals', name: 'Face Approval', showBack: false, showBreadCrums: true },

  { path: "/profile", parent: '/profile', name: 'Profile', showBack: true, showBreadCrums: true },
  { path: "/stats-attendance", parent: '/stats', name: 'Stats Attendance', showBack: true, showBreadCrums: true },
  { path: "/profile", parent: '/profile', name: 'Profile', showBack: true, showBreadCrums: false },
  { path: "/portfolio", parent: '/portfolio', name: 'My Portfolio', showBack: true, showBreadCrums: false },
  { path: "/my-work-book", parent: '/portfolio', name: 'My Time Sheet', showBack: true, showBreadCrums: true },
  { path: "/my-shifts-details-daily", parent: '/portfolio', name: 'My Shift', showBack: true, showBreadCrums: true },
  { path: "/my-shifts-details-monthly", parent: '/portfolio', name: 'Shift Detailed View', showBack: true, showBreadCrums: true },
  { path: "/my-notification", parent: '/my-notification', name: 'Broadcast', showBack: true, showBreadCrums: false },
  { path: "/notifications", parent: '/notifications', name: 'Notifications', showBack: true, showBreadCrums: false },
  { path: "/salary-break-down", parent: '/payroll', name: 'Salary BreakDown', showBack: true, showBreadCrums: true },
  { path: "/allowance-group-List", parent: '/payroll', name: 'Allowance Groups', showBack: true, showBreadCrums: true },
  { path: "/create-group", parent: '/payroll', name: 'Manage Groups', showBack: true, showBreadCrums: true },
  { path: "/deduction-group-List", parent: '/payroll', name: 'Deduction Groups', showBack: true, showBreadCrums: true },
  { path: "/add-deduction", parent: '/payroll', name: 'Manage Deduction', showBack: true, showBreadCrums: true },
  { path: "/view-employee-salary-definition", parent: '/payroll', name: 'Employee Salary Definition', showBack: true, showBreadCrums: true },
  { path: "/manage-employee-leaves", parent: '/approvals', name: 'ManageEmployeeLeaves', showBack: true, showBreadCrums: true },
  { path: "/others-pay", parent: '/payroll', name: 'Other Pay List', showBack: true, showBreadCrums: true },
  { path: "/create-others-pay", parent: '/payroll', name: 'Create Other Pay', showBack: true, showBreadCrums: true },


]

export const COMMON_HEADER = [
  { id: '1', name: 'Profile', route: ROUTE.ROUTE_PROFILE },
  { id: '2', name: 'My Portfolio', route: ROUTE.ROUTE_PORTFOLIO },
  { id: '3', name: 'Broadcast', route: ROUTE.ROUTE_MY_NOTIFICATION },
  { id: '4', name: 'Notifications', route: ROUTE.ROUTE_NOTIFICATIONS },
]

export const WELCOME_NOTE = [{ key: '1', title: 'Geo tagging' }, { key: '2', title: 'Real-time statistics' }, { key: '3', title: 'Salary calculations' }, { key: '4', title: 'Payments and payslips' }, { key: '5', title: 'And much more!!!' }]
export const WELCOME_CARD = [{ key: 'admin', icon: Icons.Admin, title: 'Admin', goTo: ROUTE.ROUTE_LOGIN }, { key: 'employee', icon: Icons.Employee, title: 'Employee', goTo: ROUTE.ROUTE_LOGIN }, { key: 'register-company', icon: Icons.RegisterCompany, title: 'Register a new company', goTo: ROUTE.ROUTE_REGISTER },]

export const GENDER_LIST = [
  { id: 'M', name: 'Male', value: 'M' },
  { id: 'F', name: 'Female', value: 'F' },
  { id: 'O', name: 'Other', value: 'O' },
];

export const EMPLOYEE_TYPE = [
  { id: 'Regular', name: 'Regular', value: 'Regular' },
  { id: 'OutSourced', name: 'OutSourced', value: 'OutSourced' },
  { id: 'Contract', name: 'Contract', value: 'Contract' },
];

export const EMPLOYEE_TYPE_HFWS = [
  { id: 'Regular', name: 'Regular', value: 'Regular' },
  { id: 'Contractual InSource', name: 'Contractual InSource', value: 'Contractual InSource' },
];

export const REPORTS_TYPE = [
  { id: 'attendance', name: 'Attendance Report', value: 'attendance' },
  { id: 'leave', name: 'Leave Report', value: 'leave' },
  { id: 'log', name: 'Log Report', value: 'log' },
  { id: 'Register', name: 'Register Report', value: 'Register ' },
  // { id: 'shift', name: "Shift Report", value: "shift" },
  { id: 'salary_basic', name: "Salary Report", value: "salary_basic" },
  { id: 'salary_breakdown', name: "Detailed Salary Report", value: "salary_breakdown" }
];

export const LEAVES_TYPE = [
  { id: 'All', name: 'All', value: -2 },
  { id: 'Pending Leave', name: 'Pending Leave', value: -1, },
  { id: 'Approved Leave', name: 'Approved Leave', value: 1 },
  { id: 'Rejected Leave', name: 'Rejected Leave', value: 0 },
];


export const REQUEST_TYPE_SUBSET = [
  { id: 'All', name: 'All', value: -2 },
  { id: 'Pending', name: 'Pending', value: -1 },
  { id: 'Approved', name: 'Approved', value: 1 },
  { id: 'Rejected', name: 'Rejected', value: 0 },


];

export const getRequestType = (value: any) => {
  let type
  switch (value) {
    case 'All':
      type = -2
      break;
    case 'Pending':
      type = -1
      break;
    case 'Approved':
      type = 1
      break;
    case 'Rejected':
      type = 0
      break;

    default:
      type = -2
      break;
  }
  return type
}

export const REQUEST_TYPE = [
  { id: 1, name: 'All', value: -2 },
  { id: 2, name: 'Pending', value: -1 },
  { id: 3, name: 'Approved', value: 1 },
  { id: 4, name: 'Rejected', value: 0 },
];

export const DOWNLOAD_RANGE = [
  { id: 'SelectedDate', name: 'SelectedDate', value: 'SelectedDate' },
  { id: 'Today', name: 'Today', value: 'Today' },
  { id: 'This Week', name: 'This Week', value: 'This Week' },
  { id: 'Last Week', name: 'Last Week', value: 'Last Week' },
  { id: 'This Month', name: 'This Month', value: 'This Month' },
  { id: 'Last Month', name: 'Last Month', value: 'Last Month' },
  { id: 'Custom Range', name: 'Custom Range', value: 'Custom Range' },
];



export const BLOOD_GROUP_LIST = [
  { id: 'A+ve', name: 'A+ve', value: 'A+ve' },
  { id: 'B+ve', name: 'B+ve', value: 'B+ve' },
  { id: 'AB+ve', name: 'AB+ve', value: 'AB+ve' },
  { id: 'O+ve', name: 'O+ve', value: 'O+ve' },
  { id: 'A-ve', name: 'A-ve', value: 'A-ve' },
  { id: 'B-ve', name: 'B-ve', value: 'B-ve' },
  { id: 'AB-ve', name: 'AB-ve', value: 'AB-ve' },
  { id: 'O-ve', name: 'O-ve', value: 'O-ve' },
];
// single-copy-04

export const MARITAL_STATUS_LIST = [
  { id: 'Single', name: 'Single', value: 'Single' },
  { id: 'Married', name: 'Married', value: 'Married' },
];


export const GROUP_LIST = [
  { id: 'A', name: 'A', value: 'A' },
  { id: 'B', name: 'B', value: 'B' },
  { id: 'C', name: 'C', value: 'C' },
  { id: 'D', name: 'D', value: 'D' },
  { id: 'None of the above', name: 'None of the above', value: 'None of the above' },
];


export const HFWS_QUALIFICATIONS = [
  { id: 'MBBS', name: 'MBBS', value: 'MBBS' },
  { id: 'MD', name: 'MD', value: 'MD' },
  { id: 'MS', name: 'MS', value: 'MS' },
  { id: 'DIP', name: 'DIP', value: 'DIP' },
  { id: 'DM', name: 'DM', value: 'DM' },
  { id: 'M Ch', name: 'M Ch', value: 'M Ch' },
  { id: 'BDS', name: 'BDS', value: 'BDS' },
  { id: 'MDS', name: 'MDS', value: 'MDS' },
  { id: 'GNM', name: 'GNM', value: 'GNM' },
  { id: 'M Sc', name: 'M Sc', value: 'M Sc' },
  { id: 'B Sc', name: 'B Sc', value: 'B Sc' },
  { id: 'B Tech', name: 'B Tech', value: 'B Tech' },
  { id: 'B.Pharm', name: 'B.Pharm', value: 'B.Pharm' },
  { id: 'D.Pharm', name: 'D.Pharm', value: 'D.Pharm' },
  { id: 'Pharm.D', name: 'Pharm.D', value: 'Pharm.D' },
  { id: 'MPT', name: 'MPT', value: 'MPT' },
  { id: 'BPT', name: 'BPT', value: 'BPT' },
  { id: 'M.Optom', name: 'M.Optom', value: 'M.Optom' },
  { id: 'B.Optom', name: 'B.Optom', value: 'B.Optom' },
  { id: 'BAMS', name: 'BAMS', value: 'BAMS' },
  { id: 'MD Ayurveda', name: 'MD Ayurveda', value: 'MD Ayurveda' },
  { id: 'BHMS', name: 'BHMS', value: 'BHMS' },
  { id: 'MD Homeopathy', name: 'MD Homeopathy', value: 'MD Homeopathy' },
  { id: 'BUMS', name: 'BUMS', value: 'BUMS' },
  { id: 'MD Unani', name: 'MD Unani', value: 'MD Unani' },
  { id: 'BSMS', name: 'BSMS', value: 'BSMS' },
  { id: 'MD Siddha', name: 'MD Siddha', value: 'MD Siddha' },
  { id: 'BMLT', name: 'BMLT', value: 'BMLT' },
  { id: 'MMLT', name: 'MMLT', value: 'MMLT' },
  { id: 'DNB', name: 'DNB', value: 'DNB' },
  { id: 'B Com', name: 'B Com', value: 'B Com' },
  { id: 'M Com', name: 'M Com', value: 'M Com' },
  { id: 'BBA', name: 'BBA', value: 'BBA' },
  { id: 'MBA', name: 'MBA', value: 'MBA' },
  { id: 'None of the above', name: 'None of the above', value: 'None of the above' },
];



export const OFFICE_TYPE = [
  { id: 'District Health Office', name: 'District Health Office', value: 'District Health Office' },
  { id: 'Taluk Head Office', name: 'Taluk Head Office', value: 'Taluk Head Office' },
  { id: 'District Leprosy Office', name: 'District Leprosy Office', value: 'District Leprosy Office' },
  { id: 'Reproductive and Child Health Office', name: 'Reproductive and Child Health Office', value: 'Reproductive and Child Health Office' },
  { id: 'Tuberculosis Office', name: 'Tuberculosis Office', value: 'Tuberculosis Office' },
  { id: 'District Surveillance Office', name: 'District Surveillance Office', value: 'District Surveillance Office' },
  { id: 'District Training Center Office', name: 'District Training Center Office', value: 'District Training Center Office' },
  { id: 'Auxiliary Nurse Midwife Training Center', name: 'Auxiliary Nurse Midwife Training Center', value: 'Auxiliary Nurse Midwife Training Center' },
  { id: 'District Hospital', name: 'District Hospital', value: 'District Hospital' },
  { id: 'Taluk Hospital / General Hospital', name: 'Taluk Hospital / General Hospital', value: 'Taluk Hospital / General Hospital' },
  { id: 'Community Health Centers', name: 'Community Health Centers', value: 'Community Health Centers' },
  { id: 'Primary Health Center / Urban PHC', name: 'Primary Health Center / Urban PHC', value: 'Primary Health Center / Urban PHC' },
  { id: 'Mother and Child Hospital', name: 'Mother and Child Hospital', value: 'Mother and Child Hospital' },
  { id: 'District Vector-borne Disease Control Office', name: 'District Vector-borne Disease Control Office', value: 'District Vector-borne Disease Control Office' },
  { id: 'District Malaria Office', name: 'District Malaria Office', value: 'District Malaria Office' },
  { id: 'Epidemic Diseases Hospital', name: 'Epidemic Diseases Hospital', value: 'Epidemic Diseases Hospital' },
  { id: 'Namma Clinic', name: 'Namma Clinic', value: 'Namma Clinic' },
  { id: 'HWC - Health And Wellness Center', name: 'HWC - Health And Wellness Center', value: 'HWC - Health And Wellness Center' },
  { id: 'UMC- Urban Maternity Center', name: 'UMC- Urban Maternity Center', value: 'UMC- Urban Maternity Center' },
  { id: 'KFD Field Station', name: 'KFD Field Station', value: 'KFD Field Station' },
  { id: 'FPA - Family Planning Association', name: 'FPA - Family Planning Association', value: 'FPA - Family Planning Association' },
  { id: 'DDW - Dist Drug Warehouse', name: 'DDW - Dist Drug Warehouse', value: 'DDW - Dist Drug Warehouse' },
  { id: 'RTC - Regional Training Center', name: 'RTC - Regional Training Center', value: 'RTC - Regional Training Center' },
  { id: 'DFWO', name: 'DFWO', value: 'DFWO' },
  { id: 'None of the above', name: 'None of the above', value: 'None of the above' },
];



export const HFWS_ORGANISATION = [
  { id: 'HFWS', name: 'HFWS', value: 'HFWS' },
  { id: 'NHM', name: 'NHM', value: 'NHM' }
]


export const HFWS_SPECLILISATION = [
  { "id": "Anesthesia", "name": "Anesthesia", "value": "Anesthesia" },
  { "id": "Medical Faculty", "name": "Medical Faculty", "value": "Medical Faculty" },
  { "id": "Paediatrics", "name": "Paediatrics", "value": "Paediatrics" },
  { "id": "DVL - Dermatology, Venereology & Leprosy", "name": "DVL - Dermatology, Venereology & Leprosy", "value": "DVL - Dermatology, Venereology & Leprosy" },
  { "id": "OBG - Obstetrics & Gynaecology", "name": "OBG - Obstetrics & Gynaecology", "value": "OBG - Obstetrics & Gynaecology" },
  { "id": "Oto-Rhino-Laryngol", "name": "Oto-Rhino-Laryngol", "value": "Oto-Rhino-Laryngol" },
  { "id": "Ophthalmology", "name": "Ophthalmology", "value": "Ophthalmology" },
  { "id": "Radio Diagnosis", "name": "Radio Diagnosis", "value": "Radio Diagnosis" },
  { "id": "Psychiatry", "name": "Psychiatry", "value": "Psychiatry" },
  { "id": "Psychological Medicine", "name": "Psychological Medicine", "value": "Psychological Medicine" },
  { "id": "Pathology", "name": "Pathology", "value": "Pathology" },
  { "id": "Microbiology", "name": "Microbiology", "value": "Microbiology" },
  { "id": "Community Medicine", "name": "Community Medicine", "value": "Community Medicine" },
  { "id": "General Medicine", "name": "General Medicine", "value": "General Medicine" },
  { "id": "Emergency Medicine", "name": "Emergency Medicine", "value": "Emergency Medicine" },
  { "id": "Forensic Medicine", "name": "Forensic Medicine", "value": "Forensic Medicine" },
  { "id": "Radiotherapy", "name": "Radiotherapy", "value": "Radiotherapy" },
  { "id": "TB & Respiratory Medicine", "name": "TB & Respiratory Medicine", "value": "TB & Respiratory Medicine" },
  { "id": "Respiratory Medicine", "name": "Respiratory Medicine", "value": "Respiratory Medicine" },
  { "id": "Orthopedics", "name": "Orthopedics", "value": "Orthopedics" },
  { "id": "Aerospace Medicine", "name": "Aerospace Medicine", "value": "Aerospace Medicine" },
  { "id": "Anatomy", "name": "Anatomy", "value": "Anatomy" },
  { "id": "Hospital Administration", "name": "Hospital Administration", "value": "Hospital Administration" },
  { "id": "Physical Medicine & Rehabilitation", "name": "Physical Medicine & Rehabilitation", "value": "Physical Medicine & Rehabilitation" },
  { "id": "General Surgery", "name": "General Surgery", "value": "General Surgery" },
  { "id": "Pharmacology", "name": "Pharmacology", "value": "Pharmacology" },
  { "id": "Physiology", "name": "Physiology", "value": "Physiology" },
  { "id": "Biochemistry", "name": "Biochemistry", "value": "Biochemistry" },
  { 'id': 'None of the above', 'name': 'None of the above', 'value': 'None of the above' },
];

const hfwsConditionSideNavChildren = (layout: any) => {
  if (isHfws === 'HFWS') {
    let filtered = layout.filter((el: any) => {
      return el.miniName !== 'ES' && el.miniName !== "SR"
    })
    return filtered
  } else {
    return layout
  }
}

const SIDE_NAV_SUB_LAYOUT = [
  {
    id: 1,
    path: ROUTE.ROUTE_LEAVE_REQUEST,
    name: "Employees Leaves",
    miniName: "EL",
    layout: "",
    // icon:'ni ni-album-2 ml-sm-4' 
  },
  {
    id: 2,
    path: ROUTE.ROUTE_MODIFY_LOGS,
    name: "Modify logs",
    miniName: "ML",
    layout: "",
    // icon:'ni ni-ruler-pencil ml-sm-4'

  },
  {
    id: 3,
    path: ROUTE.ROUTE_EMPLOYEES_SHIFTS,
    name: "Employees shifts",
    miniName: "ES",
    layout: "",
    // icon:'ni ni-time-alarm ml-sm-4'

  },
  {
    id: 4,
    path: ROUTE.ROUTE_SHIFT_REQUEST,
    name: "Shift Request",
    miniName: "SR",
    layout: "",
    // icon:'ni ni-bullet-list-67 ml-sm-4'

  },
  {
    id: 5,
    path: ROUTE.ROUTE_FACE_RE_REGISTER_REQUEST,
    name: "Face Re-register",
    miniName: "FR",
    layout: "",
    // icon: 'ni ni-badge ml-sm-4'

  },
  {
    id: 6,
    path: ROUTE.ROUTE_LOG_APPROVAL,
    name: "Log Approval",
    miniName: "LA",
    layout: "",
    // icon: 'ni ni-circle-08 ml-sm-4'

  },
  {
    id: 7,
    path: ROUTE.ROUTE_FACE_RE_REQUEST,
    name: "Face Approval",
    miniName: "FA",
    layout: "",
    // icon: 'ni ni-image ml-sm-4'

  },
]


export const NAV_ITEM = [
  { id: '1', name: 'Dashboard', value: 'DA', icon: 'ni ni-chart-pie-35', image: "", path: ROUTE.ROUTE_DASHBOARD, layout: '', },
  { id: '2', name: 'Employees Portfolio', value: 'EP', icon: 'ni ni-ungroup', image: Icons.EmployeeSecondary, path: ROUTE.ROUTE_EMPLOYEE, layout: '' },
  { id: '3', name: 'Location Portfolio', value: 'LP', icon: 'ni ni-pin-3', image: Icons.LocationSecondary, path: ROUTE.ROUTE_LOCATION, layout: '' },
  // { id: '4', name: 'Assign Location', value: 'AL', icon: 'ni ni-square-pin', image: Icons.AssignLocation, route: ROUTE.ROUTE_ASSIGN_LOCATION },
  // { id: '5', name: 'Manage Fence Admin', value: 'FA', icon: 'ni ni-archive-2', image: Icons.Admin, route: ROUTE.ROUTE_FENCE_ADMIN },
  { id: '6', name: 'Logs', value: 'EL', icon: 'ni ni-book-bookmark', image: Icons.Employee, path: ROUTE.ROUTE_EMPLOYEE_LOG, layout: '' },
  { id: '7', name: 'Time Sheets', value: 'TS', icon: 'ni ni-single-copy-04', image: Icons.Department, path: ROUTE.ROUTE_EMPLOYEE_WORK_BOOK, layout: '' },
  { id: '8', name: 'Stats', value: 'ST', icon: 'ni ni-books', image: Icons.Statistics, path: ROUTE.ROUTE_DASHBOARD_STATS, layout: '' },
  { id: '9', name: 'Calendar', value: 'HC', icon: 'ni ni-calendar-grid-58', image: Icons.CalendarSecondary, path: ROUTE.ROUTE_CALENDAR, layout: '' },
  {
    id: '23', name: 'Approvals', value: 'AP', icon: 'ni ni-folder-17', image: Icons.MyBranches, path: ROUTE.ROUTE_APPROVALS, is_admin: false, layout: '', collapse: true,
    views: hfwsConditionSideNavChildren(SIDE_NAV_SUB_LAYOUT)
  },
  // { id: '10', name: 'Employees Leaves', value: 'ES', icon: 'ni ni-album-2', image: Icons.EMPLOYEELEAVES, route: ROUTE.ROUTE_LEAVE_REQUEST },
  // { id: '11', name: 'Modify Logs', value: 'ML', icon: 'ni ni-ruler-pencil', image: Icons.Modify_Logs, route: ROUTE.ROUTE_MODIFY_LOGS },
  { id: '13', name: 'MIS Reports', value: 'RS', icon: 'ni ni-collection', image: Icons.MISREPORT, path: ROUTE.ROUTE_REPORTS, layout: '' },
  { id: '14', name: 'Shift Management', value: 'SM', icon: 'ni ni-watch-time', image: Icons.SHIFTMANAGEMENTPRIMARY, path: ROUTE.ROUTE_SHIFT_GROUP, layout: '' },
  // { id: '15', name: 'Employee Shifts', value: 'ESS', icon: 'ni ni-time-alarm', image: Icons.EMPLOYEESHIFTS, route: ROUTE.ROUTE_EMPLOYEES_SHIFTS },
  // { id: '16', name: 'Shift Request', value: 'MS', icon: 'ni ni-bullet-list-67', image: Icons.ShiftRequest, route: ROUTE.ROUTE_SHIFT_REQUEST },
  { id: '16', name: 'Payroll', value: 'PR', icon: 'ni ni-money-coins', image: Icons.PAYROLL, path: ROUTE.ROUTE_PAYROLL, layout: '' },
  // { id: '17', name: 'Face Re-Register', value: 'FR', icon: 'ni ni-badge', image: Icons.FaceRequest, route: ROUTE.ROUTE_FACE_RE_REGISTER_REQUEST },
  // { id: '18', name: 'Log Approval', value: 'LA', icon: 'ni ni-circle-08', image: Icons.FaceApproval, route: ROUTE.ROUTE_LOG_APPROVAL },
  { id: '19', name: 'Broadcast', value: 'BC', icon: 'ni ni-notification-70', image: Icons.BroadCast, path: ROUTE.ROUTE_BROADCAST, layout: '' },
  // { id: '20', name: 'Face Approval', value: 'FR', icon: 'ni ni-image', image: Icons.FaceRequest, route: ROUTE.ROUTE_FACE_RE_REQUEST },
  // { id: '19', name: 'Event Notification', value: 'EN', icon: 'ni ni-send', image: Icons.EventNotification, route: ROUTE.ROUTE_EVENT_NOTIFICATION },
  // { id: '20', name: 'My Branches', value: 'MB', icon: 'ni ni-vector', image: Icons.MyBranches, route: ROUTE.ROUTE_MY_BRANCHES, is_admin: false },
  // { id: '21', name: 'ESSL Config', value: 'EC', icon: 'ni ni-vector', image: Icons.MyBranches, route: ROUTE.ROUTE_ESSI_CONFIG, is_admin : true },
  // { id: '22', name: 'Notifications', value: 'NS', icon: 'ni ni-bell-55', image: Icons.MyBranches, route: ROUTE.ROUTE_NOTIFICATIONS, is_admin: false },
  { id: '20', name: 'Weekly Calendar', value: 'WC', icon: 'ni ni-album-2', image: '', path: ROUTE.ROUTE_WEEKLY_CALENDER, layout: '' },
  { id: '21', name: 'Generic Time', value: 'GT', icon: 'fas fa-th-list', image: '', path: ROUTE.ROUTE_GENERIC_SHIFT, layout: '' },
  { id: '22', name: 'Face Device', value: 'FD', icon: 'fas fa-tablet-alt', image: '', path: ROUTE.ROUTE_ESSL_DEVICES, layout: '' },
  // { id: '12', name: 'My Portfolio', value: 'MP', icon: 'ni ni-single-02', image: Icons.Clients, route: ROUTE.ROUTE_PORTFOLIO },

];


export const MY_PORTFOLIO_ITEM = [
  { id: '1', name: 'MY Work Book', value: 'MB', route: ROUTE.ROUTE_MY_WORK_BOOK },
  { id: '2', name: 'MY Log', value: 'ML', route: ROUTE.ROUTE_MY_LOG },
  { id: '3', name: 'Calendar', value: 'CA', route: ROUTE.ROUTE_MANAGE_LEAVES },
  { id: '4', name: 'My Shifts', value: 'MS', route: ROUTE.ROUTE_MY_SHIFTS_DETAILS_MONTHLY }
]

export const HEADER_MENU = [
  { id: '1', name: 'Profile', value: 'PF', icon: 'ni ni-single-02' },
  { id: '2', name: 'My portfolio', value: 'MP', icon: 'ni ni-badge' },
  { id: '3', name: 'My Active Branch', value: 'MA', icon: 'ni ni-building' },
  { id: '4', name: 'Select Language', value: 'CL', icon: 'fa fa-language' },
  { id: '5', name: 'Logout', value: 'LG', icon: 'ni ni-button-power' },
]


// ni ni-badge

export const SORT_BUTTON = [
  { id: '1', name: 'Month', value: 'MH' },
  { id: '2', name: 'Week', value: 'WK' },
  { id: '3', name: 'Day', value: 'DY' }]

export const WEEK_LIST = [
  { id: '1', name: 'Week 1' },
  { id: '2', name: 'Week 2' },
  { id: '3', name: 'Week 3' },
  { id: '4', name: 'Week 4' },
  { id: '5', name: 'Week 5' }]


export const WEEK_DAY_LIST = [
  { id: '1', name: 'Monday' },
  { id: '2', name: 'Tuesday' },
  { id: '3', name: 'Wednesday' },
  { id: '4', name: 'Thursday' },
  { id: '5', name: 'Friday' },
  { id: '6', name: 'Saturday' },
  { id: '7', name: 'Sunday' }]


export const ATTENDANCE_TYPE: any = [
  { type: -1, title: "All" },
  { type: 1, title: "Present" },
  { type: 4, title: "Exempted" },
  { type: 5, title: "Alert" },
  { type: 7, title: "Yet To Start" },
  { type: 6, title: "Absent" },
  { type: 9, title: "Leave" }
]

// export const ATTENDANCE_TYPE: any = [
//   { type: -1, title: "All" },
//   { type: 1, title: "Present" },
//   { type: 10, title: "Present (Modified)" },
//   { type: 2, title: "Late" },
//   { type: 4, title: "Exempted" },
//   { type: 5, title: "Alert" },
//   { type: 7, title: "Yet To Start" },
//   { type: 6, title: "Absent" },
//   { type: 9, title: "Leave" }
// ]

export const TABLE_ELEMENT_TEXT_BUTTON = 1
export const TABLE_ELEMENT_TEXT_STATUS = 2
export const TABLE_ELEMENT_TEXT_IMAGE = 3


export const DAY_STATUS_LATE = 2
export const DAY_STATUS_LEAVE = 9
export const DAY_STATUS_ABSENT = 6
export const DAY_STATUS_ALERT = 5
export const DAY_STATUS_WEEK_OFF = 11
export const DAY_STATUS_PRESENT_MODIFIED = 10
export const DAY_STATUS_NA = 13
export const DAY_STATUS_HOLIDAYS = 8







export const TABLE_CONTENT_TYPE_REPORT = 1


export const EMPLOYEE_ADDITIONAL_DATA = [
  {
    elt: TABLE_ELEMENT_TEXT_BUTTON,
    elv: 'Edit',
    elh: 'Edit',
  },
  {
    elt: TABLE_ELEMENT_TEXT_BUTTON,
    elv: 'Delete',
    elh: 'Delete',
  },

]

export const EMPLOYEE_ADDITIONAL_DATA_EDIT = [
  {
    elt: TABLE_ELEMENT_TEXT_BUTTON,
    elv: 'Edit',
    elh: 'Edit',
  },

  // {
  //   elt: TABLE_ELEMENT_TEXT_IMAGE,
  //   elv: 'Delete',
  //   elh: 'Delete',
  // },

]


export const EMPLOYEES_SHIFT_DATA_EDIT = [
  {
    elt: TABLE_ELEMENT_TEXT_BUTTON,
    elv: 'Manage Employee',
    elh: 'Manage Employee',
  },
  // {
  //   elt: TABLE_ELEMENT_TEXT_BUTTON,
  //   elv: 'Edit',
  //   elh: 'Edit',
  // },

  // {
  //   elt: TABLE_ELEMENT_TEXT_IMAGE,
  //   elv: 'Delete',
  //   elh: 'Delete',
  // },

]

export const ENABLE_EMPLOYEE_DATA = [
  {
    elt: TABLE_ELEMENT_TEXT_BUTTON,
    elv: 'Enable',
    elh: 'Enable',
  }
]

export const LEAVE_STATUS_UPDATE = [
  {
    elt: TABLE_ELEMENT_TEXT_BUTTON,
    elv: 'Approve',
    elh: 'Approve',

  },
  {
    elt: TABLE_ELEMENT_TEXT_BUTTON,
    elv: 'Reject',
    elh: 'Reject',
  }

]


export const LEAVE_STATUS_REVERT = [
  {
    elt: TABLE_ELEMENT_TEXT_BUTTON,
    elv: 'Revert',
    elh: 'Revert',
  }
]

export const INITIAL_PAGE = 1

export const ASYN_USER_AUTH = 'ZENYLOG::USER_AUTH';



export const LANGUAGE_LIST = [
  { language: 'English', subtitle: '', key: 'en-US' },
  { language: 'हिंदी', subtitle: 'Hindi', key: 'hi' },
  { language: 'ಕನ್ನಡ', subtitle: 'kannada', key: 'ka' },
  { language: 'தமிழ்', subtitle: 'Tamil', key: 'ta' },
];


export const Today = moment().format("YYYY-MM-DD");
export const ThisWeek = moment()
  .startOf("isoWeek")
  .add(0, "week")
  .format("YYYY-MM-DD");
export const ThisMonth = `${moment().format("Y")}-${moment().format("M")}-01`;


export const LastMonth = `${moment().format("Y")}-${moment()
  .add(-1, "month")
  .format("M")}-01`;


export const LastWeek = moment()
  .startOf("isoWeek")
  .add(-1, "week")
  .format("YYYY-MM-DD");


export const MAX_LENGTH_MOBILE_NUMBER = 10;
export const MAX_LENGTH_AADHAR = 12;
export const MAX_LENGTH_PAN_CARD = 10;
export const MAX_LENGTH_PIN_CODE = 6
