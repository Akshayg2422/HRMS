import { Icons } from '@assets'
import moment from 'moment';
import { Route } from 'react-router-dom';



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
  ROUTE_SHIFT_LISTING: '/shift-listing',
  ROUTE_CREATE_SHIFT_GROUP: '/create-shift-group',
  ROUTE_MY_SHIFTS_DETAILS: '/my-shifts-details',
  ROUTE_EMPLOYEES_SHIFTS: '/employees-shifts',
  ROUTE_PAYROLL: '/payroll',
  ROUTE_SALARY_BREAK_DOWN: '/salary-break-down',
  ROUTE_ALLOWANCE_GROUP: '/allowance-group-List',
  ROUTE_DEDUCTION_GROUP: '/deduction-group-List',
  ROUTE_CREATE_GROUP: '/create-group',
  ROUTE_DASHBOARD_OTP: "/dashboard-otp",
  ROUTE_MY_BRANCHES: '/my-branches'

}

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
  { id: 'Guest', name: 'Guest', value: 'Guest' },
];

export const REPORTS_TYPE = [
  { id: 'attendance', name: 'AttendanceReport', value: 'attendance' },
  { id: 'leave', name: 'LeaveReport', value: 'leave' },
  { id: 'log', name: 'LogReport', value: 'log' },
];

export const LEAVES_TYPE = [
  { id: 'All', name: 'All', value: 'All' },
  { id: 'Pending Leave', name: 'Pending Leave', value: 'Pending Leave' },
  { id: 'Approved Leave', name: 'Approved Leave', value: 'Approved Leave' },
  { id: 'Rejected Leave', name: 'Rejected Leave', value: 'Rejected Leave' },


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



export const NAV_ITEM = [
  { id: '1', name: 'Dashboard', value: 'DA', icon: 'ni ni-chart-pie-35', image: "", route: ROUTE.ROUTE_DASHBOARD },
  { id: '2', name: 'Employees Portfolio', value: 'EP', icon: 'ni ni-ungroup', image: Icons.EmployeeSecondary, route: ROUTE.ROUTE_EMPLOYEE },
  { id: '3', name: 'Location Portfolio', value: 'LP', icon: 'ni ni-pin-3', image: Icons.LocationSecondary, route: ROUTE.ROUTE_LOCATION },
  { id: '4', name: 'Assign Location', value: 'AL', icon: 'ni ni-square-pin', image: Icons.AssignLocation, route: ROUTE.ROUTE_ASSIGN_LOCATION },
  { id: '5', name: 'Manage Fence Admin', value: 'FA', icon: 'ni ni-archive-2', image: Icons.Admin, route: ROUTE.ROUTE_FENCE_ADMIN },
  { id: '6', name: 'Employee Logs', value: 'EL', icon: 'ni ni-book-bookmark', image: Icons.Employee, route: ROUTE.ROUTE_EMPLOYEE_LOG },
  { id: '7', name: 'Time Sheets', value: 'TS', icon: 'ni ni-single-copy-04', image: Icons.Department, route: ROUTE.ROUTE_EMPLOYEE_WORK_BOOK },
  { id: '8', name: 'Stats', value: 'ST', icon: 'ni ni-books', image: Icons.Statistics, route: ROUTE.ROUTE_DASHBOARD_STATS },
  { id: '9', name: 'Holiday Calendar', value: 'HC', icon: 'ni ni-calendar-grid-58', image: Icons.CalendarSecondary, route: ROUTE.ROUTE_CALENDAR },
  { id: '10', name: 'Employees Leaves', value: 'ES', icon: 'ni ni-album-2', image: Icons.EMPLOYEELEAVES, route: ROUTE.ROUTE_LEAVE_REQUEST },
  { id: '11', name: 'Modify Logs', value: 'ML', icon: 'ni ni-ruler-pencil', image: Icons.Modify_Logs, route: ROUTE.ROUTE_MODIFY_LOGS },
  { id: '12', name: 'My Portfolio', value: 'MP', icon: 'ni ni-single-02', image: Icons.Clients, route: ROUTE.ROUTE_PORTFOLIO },
  { id: '13', name: 'MIS Reports', value: 'RS', icon: 'ni ni-collection', image: Icons.MISREPORT, route: ROUTE.ROUTE_REPORTS },
  { id: '14', name: 'Shift Management', value: 'SM', icon: 'ni ni-watch-time', image: Icons.SHIFTMANAGEMENTPRIMARY, route: ROUTE.ROUTE_SHIFT_GROUP },
  // { id: '15', name: 'Employee Shifts', value: 'ESS', icon: 'ni ni-time-alarm', image: Icons.EMPLOYEESHIFTS, route: ROUTE.ROUTE_EMPLOYEES_SHIFTS },
  // { id: '16', name: 'Payroll', value: 'PR', icon: 'ni ni-money-coins', image: Icons.PAYROLL, route: ROUTE.ROUTE_PAYROLL },
  { id: '17', name: 'My Branches', value: 'MB', icon: 'ni ni-vector', image: Icons.MyBranches, route: ROUTE.ROUTE_MY_BRANCHES },
];


export const MY_PORTFOLIO_ITEM = [
  { id: '1', name: 'MY Work Book', value: 'MB', route: ROUTE.ROUTE_MY_WORK_BOOK },
  { id: '2', name: 'MY Log', value: 'ML', route: ROUTE.ROUTE_MY_LOG },
  { id: '3', name: 'Calendar', value: 'CA', route: ROUTE.ROUTE_MANAGE_LEAVES },
  { id: '4', name: 'My Shifts', value: 'MS', route: ROUTE.ROUTE_MY_SHIFTS_DETAILS }

]

export const HEADER_MENU = [
  { id: '1', name: 'Profile', value: 'PF', icon: 'ni ni-single-02' },
  { id: '2', name: 'ChangeLanguage', value: 'CL', icon: 'ni ni-active-40' },
  { id: '3', name: 'Logout', value: 'LG', icon: 'ni ni-button-power' },
]




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
  { type: 10, title: "Present (Modified)" },
  { type: 2, title: "Late" },
  { type: 4, title: "Exempted" },
  { type: 5, title: "Alert" },
  { type: 7, title: "Yet To Start" },
  { type: 6, title: "Absent" },
  { type: 9, title: "Leave" }
]

export const TABLE_ELEMENT_TEXT_BUTTON = 1
export const TABLE_ELEMENT_TEXT_STATUS = 2
export const TABLE_ELEMENT_TEXT_IMAGE = 3




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
  //   elt: TABLE_ELEMENT_TEXT_BUTTON,
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


export const EMPLOYEE_CHANGE_SHIFT = [
  {
    elt: TABLE_ELEMENT_TEXT_BUTTON,
    elv: 'Change Shift',
    elh: 'Change Shift',
  }
]


export const ASYN_USER_AUTH = 'ZENYLOG::USER_AUTH';


export const LANGUAGE_LIST = [
  { language: 'English', subtitle: '', key: 'en' },
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
export const MAX_LENGTH_PAN_CARD = 12;


