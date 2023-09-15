import {
  WELCOME_CARD, WELCOME_NOTE, REQUEST_TYPE_SUBSET, getRequestType, GENDER_LIST, REQUEST_TYPE, EMPLOYEE_TYPE, BLOOD_GROUP_LIST, NAV_ITEM, ROUTE, HEADER_MENU, SORT_BUTTON, TABLE_ELEMENT_TEXT_BUTTON, EMPLOYEE_ADDITIONAL_DATA,
  TABLE_CONTENT_TYPE_REPORT, ASYN_USER_AUTH, TABLE_ELEMENT_TEXT_IMAGE, ENABLE_EMPLOYEE_DATA, LANGUAGE_LIST,
  MAX_LENGTH_MOBILE_NUMBER, MAX_LENGTH_AADHAR, LEAVE_STATUS_UPDATE, MY_PORTFOLIO_ITEM, LEAVES_TYPE,
  LEAVE_STATUS_REVERT, DOWNLOAD_RANGE, Today, ThisWeek, ThisMonth, LastMonth, LastWeek, WEEK_LIST, HFWS_ORGANISATION, EMPLOYEE_TYPE_HFWS,
  WEEK_DAY_LIST, REPORTS_TYPE, MAX_LENGTH_PAN_CARD, MARITAL_STATUS_LIST, GROUP_LIST, DOMAIN, HFWS_QUALIFICATIONS, HFWS_SPECLILISATION, OFFICE_TYPE,
  EMPLOYEE_ADDITIONAL_DATA_EDIT, ATTENDANCE_TYPE, DAY_STATUS_LATE, DAY_STATUS_LEAVE,
  DAY_STATUS_ABSENT, DAY_STATUS_ALERT, EMPLOYEES_SHIFT_DATA_EDIT, CHILD_PATH, COMMON_HEADER, INITIAL_PAGE, DAY_STATUS_WEEK_OFF, DAY_STATUS_PRESENT_MODIFIED, DAY_STATUS_NA, DAY_STATUS_HOLIDAYS
} from './constants'
import {
  validateMobileNumber, validateName,
  validateEmail,
  validatePincode,
  validateAadhar,
  validatePAN,
  validateGST,
  validateDOB,
  validateAddress,
  validateDefault,
  validateBasicSalary,
  validateReason,
  dropDownValueCheck,
  dropDownValueCheckByEvent
} from './validation'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import { REACT_APP_APP_URL } from '../helpers/api_helper'

import { useNavigate } from 'react-router-dom'
// import { hideLoader, showLoader } from '../store/app/actions';

const IMAGE_BASE_URL_DEV = REACT_APP_APP_URL;

const useNav = () => useNavigate()

const getImageUri = (imageUri: string) => {
  if (imageUri) {
    if (imageUri.substring(0, 5) === 'https') {
      return imageUri
    }
    else {
      return IMAGE_BASE_URL_DEV + imageUri
    }
  }
}

const getGenderByValue = (value: string) => {
  return GENDER_LIST.find(item => {
    return item.value === value
  })?.name
}

const goBack = (navigation: any) => {
  return navigation(-1)
}
function isExist(val: any) {
  return val ? val : ''
}

const getWeekAndWeekDaysById = (array: any, key: string, value: string) => {
  return array.find((item: any) => {
    return item[key] === value;
  });
};



const goTo = (navigate: any, path: string, isReplace: boolean = false) => {
  return navigate(path, { replace: isReplace })
}

const getMaxLengthForNumberInputs = (val: any, maxLength: number) => {

  if (val.length <= maxLength) {
    return val
  }
}

function paginationHandler(type: 'next' | 'prev' | 'current', position: number) {
  let page = type === 'next' ? position + 1 : type === 'prev' ? position - 1 : position;
  return page;
}

const showToast = (type: 'success' | 'error' | 'default' | 'info', message: string) => {

  const style: object = {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored"

  }

  let toastElement: any = null;
  switch (type) {
    case 'success':
      toastElement = toast.success(message, style)
      break;
    case 'error':
      toastElement = toast.error(message, style)
      break;
    case 'info':
      toastElement = toast.info(message, style)
      break;
    default:
      toastElement = toast(message, style)

      break;
  }

  return toastElement;
}


const showAdminModify = (type: number | undefined) => {
  let showModify = false
  switch (type) {
    // case DAY_STATUS_LATE:
    case DAY_STATUS_ABSENT:
    case DAY_STATUS_LEAVE:
    case DAY_STATUS_ALERT:
    case DAY_STATUS_NA:
      // case DAY_STATUS_WEEK_OFF:
      showModify = true
      break;
    default:
      showModify = false
      break;
  }
  return showModify;
}

const showApprovedBy = (type: number | undefined) => {
  let showApprover = false
  switch (type) {
    case DAY_STATUS_LEAVE:
    case DAY_STATUS_PRESENT_MODIFIED:
    case DAY_STATUS_HOLIDAYS:
      showApprover = true
      break;
    default:
      showApprover = false
      break;
  }
  return showApprover;
}




const getObjectFromArrayByKey = (array: any, key: string, value: string) => {
  return array.find((item: any) => {
    return item[key] === value;
  });
};

const getDropDownValueByID = (dropDownArray: any, id: string) => {
  return dropDownArray.find((item: any) => {
    return item.id === id;
  });
};

const getDropDownValueByName = (dropDownArray: any, id: string) => {
  if (id) {
    return dropDownArray.find((item: any) => {
      return item?.id === id
    });
  }
};

//department designation id
export function getArrayFromArrayOfObject(data: Array<any>, key: string) {
  let modifiedArr: any = [];
  if (data && data.length > 0) {
    data.forEach((el: any) => { modifiedArr = [...modifiedArr, el[key]]; });
  }
  return modifiedArr;
}

//moment

const getMomentObjFromServer = (date: any) => {
  return moment(date);
};

const getDisplayDateFromMoment = (momentObj: any) => {
  return momentObj.format('DD MMMM YYYY');
};

const getDisplayTimeFromMoment = (momentObj: any) => {
  return momentObj.format('hh:mm A');
};

const getDisplayTimeWithoutSuffixFromMoment = (momentObj: any) => {
  return momentObj.format('HH:mm');
};

const getDisplayDateTimeFromMoment = (momentObj: any) => {
  return momentObj.format('hh:mm A, DD MMMM YYYY');
};

const getServerDateFromMoment = (momentObj: any) => {
  return momentObj.format('YYYY-MM-DD');
};

const getStartTime = (startTime?: string | number) => {
  if (!startTime) {
    startTime = '10:00:00';
  }

  return new Date('Wed Jul 20 2022 ' + startTime + ' GMT+0530 (IST)');
};

const getEndTime = (endTime?: string | number) => {
  if (!endTime) {
    endTime = '18:00:00';
  }

  return new Date('Wed Jul 20 2022 ' + endTime + ' GMT+0530 (IST)');
};

const getDateFormat = (date: string) => {
  if (!date) {
    date = '18:00';
  }
  return new Date('Wed Jul 20 2022 ' + date + ':00 GMT+0530 (IST)');
};

function convertTo24Hour(s: any) {
  if (s !== undefined && s.length >= 7) { // Ensure the input has at least 7 characters
    let AMPM = s.slice(-2);
    let timeArr = s.slice(0, -2).split(":");
    let hours = parseInt(timeArr[0], 10); // Parse hours as an integer

    if (AMPM === "AM" && hours === 12) {
      hours = 0;
    } else if (AMPM === "PM") {
      hours = (hours % 12) + 12;
    }

    // Format hours to have leading zeros
    let formattedHours = hours.toString().padStart(2, '0');
    let formattedTime = `${formattedHours}:${timeArr[1]}`;

    return formattedTime;
  } else {
    return '';
  }
}


const convertToUpperCase = (data: string) => {
  if (data) {
    let toUpperCase = data?.charAt(0)?.toUpperCase() + data?.slice(1);
    return toUpperCase
  }
  else {
    return data
  }

}


const displayStringExists = (value: any) => value && value === 'Invalid date' ? value : "-";
const inputNumberMaxLength = (value: any, length: number) => value && value.slice(0, length);
const inputAadharLength = (value: any, length: number) => value && value.slice(0, length);
const inputTextMaxLength = (value: any, length: number) => value && value.slice(0, length);


export const HH_MM_SS = 'hh:mm:ss'
export const HH_MM = 'hh:mm'


export function toDate(dStr: any, format: string) {
  var now = new Date();
  if (format === HH_MM) {
    now.setHours(dStr.substr(0, dStr.indexOf(":")));
    now.setMinutes(dStr.substr(dStr.indexOf(":") + 1));
    now.setSeconds(0);
    return now;
  } else if (format === HH_MM_SS) {
    now.setHours(dStr.substr(0, dStr.indexOf(":")));
    now.setMinutes(dStr.substr(dStr.indexOf(":") + 1));
    now.setSeconds(0);
    return now;
  }
  else
    return "Invalid Format";
}


export const convertFrom24To12Format = (time24: any) => {
  const [sHours, minutes] = time24.match(/([0-9]{1,2}):([0-9]{2})/).slice(1);
  const period = +sHours < 12 ? 'AM' : 'PM';
  const hours = +sHours % 12 || 12;

  return `${hours}:${minutes} ${period}`
}


const downloadFile = ((response: any) => {
  let filename = response.headers['content-disposition'].split('filename=')[1];
  const blob = new Blob([response.data]);
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = JSON.parse(filename)
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
})

const base64ToImage = (base64: any) => {
  return 'data:image/png;base64,' + base64

}

const formatAMPM = (time: any) => {
  if (time) {
    let [hours, minutes, seconds] = time.split(':');
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  } else {
    return ''
  }
}

const getTimelineRelativeTimeFormat = (date: Date | null | undefined): string => {
  if (!date) {
    return '';
  }
  const now = new Date();
  const dateString = date;
  const dates = new Date(dateString);
  const timestamp = dates.getTime();

  const diff = now.getTime() - timestamp

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);


  if (seconds < 60) {
    if (seconds <= 1) {
      return 'now'
    }
    else {
      return `${seconds} secs ago`;
    }
  } else if (minutes < 60) {
    return `${minutes} ${minutes > 1 ? 'mins' : 'min'} ago`;
  } else if (hours < 24) {
    return ` ${hours} ${hours > 1 ? 'hours' : 'hour'} ago`;
  } else if (days < 7) {
    return `${days} ${days > 1 ? 'days' : 'day'} ago`;
  } else if (weeks < 4) {
    return `${weeks} ${weeks > 1 ? 'weeks' : 'week'} ago`;
  } else if (months < 12) {
    return `${months} ${months > 1 ? 'months' : 'month'} ago`;
  } else {
    return `${years} ${years > 1 ? 'years' : 'year'} ago`;
  }
}


const mergeTimeSlots = (timeSlots: any) => {
  let formattedData = []
  if (timeSlots.length > 1) {
    formattedData = timeSlots.map((ele: any, index: number) => {
      const start_time = index === 0 ? ele?.start_time : timeSlots[index - 1]?.end_time
      const end_time = index === 0 ? timeSlots[timeSlots.length - 1].end_time : ele.start_time
      return {
        start_time,
        end_time
      }
    })
  } else {
    formattedData = timeSlots
  }
  return formattedData
}


const dateFormate = (date: string) => {
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return formattedDate
  // Output: "April 30, 2023"
}


// const HFSW_ID = "e87b92e6-8e3e-484f-9d79-d4bc24bd5fb5"
const HFSW_ID = "972da78a-e151-4e4c-9b04-b07b62d165e8"

const isHfwsBranch = (id: string) => {
  let status = false
  if (HFSW_ID === id) {
    status = true;
  }
  return status
}


const getDropDownFormatter = (data: any) => {
  return data && data?.map((item: any) => {
    return {
      text: item.name,
      id: item.id,
    }
  })
}



export {
  WELCOME_CARD, WELCOME_NOTE, isExist, GENDER_LIST, NAV_ITEM, ROUTE, useNav, HEADER_MENU, SORT_BUTTON, goTo, validateMobileNumber, validateName,
  validateEmail,
  validatePincode,
  validateAadhar,
  validatePAN,
  validateGST,
  validateDOB,
  validateAddress,
  validateDefault,
  validateReason,
  TABLE_ELEMENT_TEXT_BUTTON,
  EMPLOYEE_ADDITIONAL_DATA,
  TABLE_CONTENT_TYPE_REPORT,
  TABLE_ELEMENT_TEXT_IMAGE,
  LEAVE_STATUS_UPDATE,
  MY_PORTFOLIO_ITEM,
  LEAVES_TYPE,
  showToast,
  goBack,
  ASYN_USER_AUTH,
  getMaxLengthForNumberInputs,
  getObjectFromArrayByKey,
  getMomentObjFromServer,
  getDisplayDateFromMoment,
  getDisplayTimeFromMoment,
  getDisplayTimeWithoutSuffixFromMoment,
  getDisplayDateTimeFromMoment,
  getServerDateFromMoment,
  getStartTime,
  getEndTime,
  EMPLOYEE_TYPE,
  BLOOD_GROUP_LIST,
  getDropDownValueByID,
  paginationHandler,
  getImageUri,
  getGenderByValue,
  ENABLE_EMPLOYEE_DATA,
  displayStringExists,
  LANGUAGE_LIST,
  downloadFile,
  MAX_LENGTH_MOBILE_NUMBER,
  MAX_LENGTH_AADHAR,
  inputNumberMaxLength,
  inputAadharLength,
  inputTextMaxLength,
  LEAVE_STATUS_REVERT,
  DOWNLOAD_RANGE,
  Today,
  REPORTS_TYPE,
  ThisWeek, ThisMonth, LastMonth, LastWeek,
  WEEK_LIST,
  WEEK_DAY_LIST,
  getWeekAndWeekDaysById,
  formatAMPM,
  EMPLOYEE_ADDITIONAL_DATA_EDIT,
  validateBasicSalary,
  ATTENDANCE_TYPE,
  dropDownValueCheck,
  showAdminModify,
  REQUEST_TYPE,
  REQUEST_TYPE_SUBSET,
  getRequestType,
  dropDownValueCheckByEvent,
  getDropDownValueByName,
  EMPLOYEES_SHIFT_DATA_EDIT,
  getDateFormat,
  convertTo24Hour,
  base64ToImage,
  MAX_LENGTH_PAN_CARD,
  CHILD_PATH,
  getTimelineRelativeTimeFormat,
  convertToUpperCase,
  COMMON_HEADER,
  mergeTimeSlots,
  INITIAL_PAGE,
  dateFormate,
  showApprovedBy,
  isHfwsBranch,
  getDropDownFormatter,
  MARITAL_STATUS_LIST,
  GROUP_LIST,
  DOMAIN,
  HFWS_QUALIFICATIONS,
  HFWS_SPECLILISATION,
  OFFICE_TYPE,
  HFWS_ORGANISATION,
  EMPLOYEE_TYPE_HFWS
}
