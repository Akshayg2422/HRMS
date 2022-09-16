import { WELCOME_CARD, WELCOME_NOTE, GENDER_LIST,EMPLOYEE_TYPE,BLOOD_GROUP_LIST, NAV_ITEM, ROUTE, HEADER_MENU, SORT_BUTTON, TABLE_ELEMENT_TEXT_BUTTON, EMPLOYEE_ADDITIONAL_DATA, TABLE_CONTENT_TYPE_REPORT, ASYN_USER_AUTH,TABLE_ELEMENT_TEXT_IMAGE,ENABLE_EMPLOYEE_DATA, LANGUAGE_LIST } from './constants'
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
} from './validation'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import {REACT_APP_APP_URL} from '../helpers/api_helper'

import { useNavigate } from 'react-router-dom'

const IMAGE_BASE_URL_DEV = REACT_APP_APP_URL;

const useNav = () => useNavigate()

const getImageUri =(imageUri:string)=>{
  return IMAGE_BASE_URL_DEV + imageUri
}
const getGenderByValue=(value:string)=>{
  return GENDER_LIST.find(item=>{
    return item.value === value
  })?.name
}

const goBack = (navigation: any) => {
  return navigation(-1)
}
function isExist(val: any) {
  return val ? val : ''
}



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

const showToast = (type: 'success' | 'error' | 'default', message: string) => {

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
    default:
      toastElement = toast(message, style)
      break;
  }

  return toastElement;
}

const getObjectFromArrayByKey = (array: any, key: string, value: string) => {
  return array.find((item:any) => {
    return item[key] === value;
  });
};

const getDropDownValueByID = (dropDownArray: any, id: string) => {
  return dropDownArray.find((item:any) => {
    return item.id === id;
  });
};

//moment

 const getMomentObjFromServer = (date:any) => {
  return moment(date);
};

 const getDisplayDateFromMoment = (momentObj:any) => {
  return momentObj.format('DD MMMM YYYY');
};

 const getDisplayTimeFromMoment = (momentObj:any) => {
  return momentObj.format('hh:mm A');
};

 const getDisplayTimeWithoutSuffixFromMoment = (momentObj:any) => {
  return momentObj.format('HH:mm');
};

 const getDisplayDateTimeFromMoment = (momentObj:any) => {
  return momentObj.format('hh:mm A, DD MMMM YYYY');
};

 const getServerDateFromMoment = (momentObj:any) => {
  return momentObj.format('YYYY-MM-DD');
};

 const getStartTime = (startTime?:string | number) => {
  if (!startTime) {
    startTime = '10:00:00';
  }

  return new Date('Wed Jul 20 2022 ' + startTime + ' GMT+0530 (IST)');
};

 const getEndTime = (endTime?:string | number) => {
  if (!endTime) {
    endTime = '18:00:00';
  }

  return new Date('Wed Jul 20 2022 ' + endTime + ' GMT+0530 (IST)');
};

const displayStringExists = (value: any) => value && value === 'Invalid date' ? value : "-";


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
  TABLE_ELEMENT_TEXT_BUTTON,
  EMPLOYEE_ADDITIONAL_DATA,
  TABLE_CONTENT_TYPE_REPORT,
  TABLE_ELEMENT_TEXT_IMAGE,
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
  LANGUAGE_LIST
}