import {Icons} from '@assets'



export const ROUTE = {
  ROUTE_DASHBOARD: '/dashboard',
  ROUTE_EMPLOYEE: '/employee',
  ROUTE_REPORT: '/report',
  ROUTE_REGISTER: '/register',
  ROUTE_LOGIN: '/login',
  ROUTE_OTP: '/otp',
  ROUTE_LOCATION: '/location',
  ROUTE_CALENDAR: '/calendar',
  ROUTE_WELCOME: '/landing',
  ROUTE_MANAGE_EMPLOYEE:'/manage-employee',
  ROUTE_DASHBOARD_STATS:'/stats',
  ROUTE_DASHBOARD_ATTENDANCE:'/stats-attendance',
  ROUTE_EMPLOYEE_LOG:'/employee-log',
  ROUTE_MANAGE_BRANCHES: "/manage-branches",
  ROUTE_EMPLOYEE_WORK_BOOK:'/time-sheets',
  ROUTE_FENCE_ADMIN:'/fence-admin',
  ROUTE_ASSIGN_LOCATION : '/assign-location',
  ROUTE_PROFILE:'/profile',
  ROUTE_PORTFOLIO:'/portfolio',
  ROUTE_VIEW_EMPLOYEE_DETAILS:'/view-employee',
  ROUTE_INACTIVE_EMPLOYEE_LIST:'/inactive-employee-list',



}
export const WELCOME_NOTE = [{key: '1', title: 'Geo tagging'}, {key: '2', title: 'Real-time statistics'}, {key: '3', title: 'Salary calculations'}, {key: '4', title: 'Payments and payslips'}, {key: '5', title: 'And much more!!!'}]
export const WELCOME_CARD = [{key: 'admin', icon: Icons.Admin, title: 'Admin', goTo:ROUTE.ROUTE_LOGIN}, {key: 'employee', icon: Icons.Employee, title: 'Employee', goTo:ROUTE.ROUTE_LOGIN}, {key: 'register-company', icon: Icons.RegisterCompany, title: 'Register a new company', goTo:ROUTE.ROUTE_REGISTER},]
export const GENDER_LIST = [
  {id: 'M', name: 'Male', value: 'M'},
  {id: 'F', name: 'Female', value: 'F'},
  {id: 'O', name: 'Other', value: 'O'},
];

export const EMPLOYEE_TYPE = [
  {id: 'Regular', name: 'Regular', value: 'Regular'},
  {id: 'OutSourced', name: 'OutSourced', value: 'OutSourced'},
  {id: 'Guest', name: 'Guest', value: 'Guest'},
];

export const BLOOD_GROUP_LIST = [
  {id: 'A+ve', name: 'A+ve', value: 'A+ve'},
  {id: 'B+ve', name: 'B+ve', value: 'B+ve'},
  {id: 'AB+ve', name: 'AB+ve', value: 'AB+ve'},
  {id: 'O+ve', name: 'O+ve', value: 'O+ve'},
  {id: 'A-ve', name: 'A-ve', value: 'A-ve'},
  {id: 'B-ve', name: 'B-ve', value: 'B-ve'},
  {id: 'AB-ve', name: 'AB-ve', value: 'AB-ve'},
  {id: 'O-ve', name: 'O-ve', value: 'O-ve'},
];


export const NAV_ITEM = [
  {id: '1', name: 'Dashboard', value: 'DA', icon: 'ni ni-chart-pie-35', route: ROUTE.ROUTE_DASHBOARD},
  {id: '2', name: 'Employee Portfolio', value: 'EP', icon: 'ni ni-ungroup', route: ROUTE.ROUTE_EMPLOYEE},
  {id: '3', name: 'Location Portfolio', value: 'LP', icon: 'ni ni-pin-3', route: ROUTE.ROUTE_LOCATION},
  // {id: '3', name: 'Holiday Calendar', value: 'HC', icon: 'ni ni-calendar-grid-58', route: ROUTE.ROUTE_CALENDAR},
  // {id: '4', name: 'Reports', value: 'RE', icon: 'ni ni-single-copy-04', route: ROUTE.ROUTE_REPORT},
  {id: '4', name: 'Assign Location', value: 'AL', icon: 'ni ni-square-pin', route: ROUTE.ROUTE_ASSIGN_LOCATION},
  {id: '5', name: 'Manage Fence Admin', value: 'FA', icon: 'ni ni-archive-2', route: ROUTE.ROUTE_FENCE_ADMIN},
  {id: '6', name: 'Employee Log', value: 'EL', icon: 'ni ni-single-copy-04', route: ROUTE.ROUTE_EMPLOYEE_LOG},
  {id: '7', name: 'Work Book', value: 'WB', icon: 'ni ni-book-bookmark', route: ROUTE.ROUTE_EMPLOYEE_WORK_BOOK},
  {id: '8', name: 'Stats', value: 'ST', icon: 'ni ni-books', route: ROUTE.ROUTE_DASHBOARD_STATS},
  {id: '9', name: 'My Portfolio', value: 'MP', icon: 'ni ni-single-02', route: ROUTE.ROUTE_PORTFOLIO},

];


export const HEADER_MENU = [
  {id: '1', name: 'Profile', value: 'PF', icon: 'ni ni-single-02'},
  {id: '2', name: 'ChangeLanguage', value: 'CL', icon: 'ni ni-active-40'},
]




export const SORT_BUTTON = [{id: '1', name: 'Month', value: 'MH'},
{id: '2', name: 'Week', value: 'WK'},
{id: '3', name: 'Day', value: 'DY'}]

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

export const ENABLE_EMPLOYEE_DATA = [
  {
    elt: TABLE_ELEMENT_TEXT_BUTTON,
    elv: 'Enable',
    elh: 'Enable',
  }
]

export const ASYN_USER_AUTH = 'ZENYLOG::USER_AUTH';


