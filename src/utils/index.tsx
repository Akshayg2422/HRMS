import {
  WELCOME_CARD, WELCOME_NOTE, REQUEST_TYPE_SUBSET, getRequestType, GENDER_LIST, REQUEST_TYPE, EMPLOYEE_TYPE, BLOOD_GROUP_LIST, NAV_ITEM, ROUTE, HEADER_MENU, SORT_BUTTON, TABLE_ELEMENT_TEXT_BUTTON, EMPLOYEE_ADDITIONAL_DATA,
  TABLE_CONTENT_TYPE_REPORT, ASYN_USER_AUTH, TABLE_ELEMENT_TEXT_IMAGE, ENABLE_EMPLOYEE_DATA, LANGUAGE_LIST,
  MAX_LENGTH_MOBILE_NUMBER, MAX_LENGTH_AADHAR, LEAVE_STATUS_UPDATE, MY_PORTFOLIO_ITEM, LEAVES_TYPE,
  LEAVE_STATUS_REVERT, DOWNLOAD_RANGE, Today, ThisWeek, ThisMonth, LastMonth, LastWeek, WEEK_LIST,
  WEEK_DAY_LIST, REPORTS_TYPE,MAX_LENGTH_PAN_CARD,
  EMPLOYEE_ADDITIONAL_DATA_EDIT, ATTENDANCE_TYPE, DAY_STATUS_LATE, DAY_STATUS_LEAVE,
  DAY_STATUS_ABSENT, DAY_STATUS_ALERT, EMPLOYEES_SHIFT_DATA_EDIT,CHILD_PATH
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
  return '' + imageUri
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

  let toastElement = null;
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
    case DAY_STATUS_LATE:
    case DAY_STATUS_ABSENT:
    case DAY_STATUS_LEAVE:
    case DAY_STATUS_ALERT:
      showModify = true
      break;
    default:
      showModify = false
      break;
  }
  return showModify;
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
  let AMPM = s.slice(-2);
  let formattedTime = s.slice(0, -2).split(":")[0].length === 1 ? "0" + s.slice(0, -2).split(":")[0] : s.slice(0, -2).split(":")[0]
  let timeArr = s.slice(0, -2).split(":");
  let convertedTime = [formattedTime, timeArr[1]]
  if (AMPM === "AM" && convertedTime[0] === "12") {
    convertedTime[0] = "00";
  } else if (AMPM === "PM") {
    convertedTime[0] = (convertedTime[0] % 12) + 12
  }
  return convertedTime.join(":");
}


const displayStringExists = (value: any) => value && value === 'Invalid date' ? value : "-";
const inputNumberMaxLength = (value: any, length: number) => value && value.slice(0, length);
const inputAadharLength = (value: any, length: number) => value && value.slice(0, length);
const inputTextMaxLength = (value: any, length: number) => value && value.slice(0, length);




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
  let [hours, minutes, seconds] = time.split(':');
  var ampm = hours >= 12 ? 'Pm' : 'Am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  let strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
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
  CHILD_PATH
}