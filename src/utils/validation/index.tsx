

const validateMobileNumber = (value: string | undefined) => {

  let val = value;

  if (value)
    val = value.slice(0, 10);
  let output = { status: false, error: '' }
  if (val && val.length >= 10) {
    output = { status: true, error: '' }
  } else {
    output = { status: false, error: 'Number Should be 10 digit' }
  }
  return output
};

const validateReason = (value: string | undefined) => {
  let val = value;
  if (value)
    val = value.slice(0, 150);
  let output = { status: false, error: '' }
  if (val && val.length < 150) {
    output = { status: true, error: '' }
  } else {
    output = { status: false, error: 'Reason Should Not Exists 150 characters' }
  }
  return output
};

const validateName = (value: string | undefined) => {
  let output = { status: false, error: '' };
  if (value && value.length >= 3) {
    output = { status: true, error: '' };
  } else {
    output = { status: false, error: 'Name should be minimum of 3 characters' };
  }
  return output;
};

const validateEmail = (value: string | undefined) => {
  let output = { status: false, error: '' };
  const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (value && !regex.test(value)) {
    output = { status: false, error: 'E-Mail id is not valid' };
  } else {
    output = { status: true, error: '' }
  }
  return output;
};

const validatePincode = (value: string | undefined) => {
  let output = { status: false, error: '' };
  if (value && value.length === 6) {
    output = { status: true, error: '' };
  } else if (value && value.length < 6) {
    output = { status: false, error: 'Pincode is not valid' };
  }
  return output;
};

const validateAadhar = (value: string | undefined) => {
  const a = /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/;
  let output = { status: false, error: '' };
  if (value && value.match(a)) {
    output = { status: true, error: '' };
  } else {
    output = { status: false, error: 'Aadhar is not valid' };
  }
  return output;
};
// validateAadhar('9195 8485 2529');

const validatePAN = (value: string | undefined) => {
  const a = /[a-zA-z]{5}\d{4}[a-zA-Z]{1}/;
  let output = { status: false, error: '' };

  if (value && value.match(a)) {
    output = { status: true, error: '' };
  } else {
    output = { status: false, error: 'PAN number is not valid' };
  }

  return output;
};
// validatePAN('ECNPA8694B');

const validateGST = (value: string | undefined) => {
  const a = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  let output = { status: false, error: '' };
  if (value && value.length === 15) {
    if (value.match(a)) {
      output = { status: true, error: '' };
    }
  } else {
    output = { status: false, error: 'GST number is not valid' };
  }
  return output;
};
// validateGST('06BZAHM6385P6Z2');

const validateDOB = (value: string | undefined) => {
  const a = /^([0-9]{2})-([0-9]{2})-([0-9]{4})$/;
  let output = { status: false, error: '' };
  if (value && value.match(a)) {
    output = { status: true, error: '' };
  } else {
    output = { status: false, error: 'DOB is not valid' };
  }
  return output;
};
// validateDOB('08-09-1999');

const validateAddress = (value: string | undefined) => {
  let output = { status: false, error: '' };
  if (value && value !== 'null' && value.length > 20) {
    output = { status: true, error: '' };
  } else {
    output = { status: false, error: 'Address is not valid' };
  }
  return output;
};

const validateDefault = (value: string | undefined) => {
  let output = { status: false, error: '' };
  if (value && value !== '') {
    output = { status: true, error: '' };
  } else {
    output = { status: false, error: '' };
  }
  return output;
};

const validateBasicSalary = (value: any | undefined) => {
  let halfOfTheAnnual = 50 / 100 * value
  let output = { status: false, error: '' };
  if (value && value >= halfOfTheAnnual) {
    output = { status: true, error: '' };
  } else {
    output = { status: false, error: 'Minimum 50% of CTC' };
  }
  return output;
};

const dropDownValueCheck = (value: any, placeHolder: string) => {
  if (value != placeHolder) {
    return value
  } else {
    return ''
  }
}

const dropDownValueCheckByEvent = (e: any, placeHolder: string | undefined) => {
  if (e.target.value != placeHolder) {
    return e
  } else {
    return ''
  }
}

export {
  validateMobileNumber,
  validateName,
  validateEmail,
  validatePincode,
  validateAadhar,
  validatePAN,
  validateGST,
  validateDOB,
  validateAddress,
  validateDefault,
  validateReason,
  validateBasicSalary,
  dropDownValueCheck,
  dropDownValueCheckByEvent
};
