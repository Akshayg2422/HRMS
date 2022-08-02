// import {Dimensions} from 'react-native';

const suffixPx = (val?: string | number) => {
  if (typeof val === 'string') {
    return val;
  }

  return val + 'px';
};

const height = 300
//  Dimensions.get('window').height;
const width = 400
// Dimensions.get('window').width;

const SCREEN_DIM = {
  dividerWith: 1,
  buttonHeightDefault: 50,
  inputHeightDefault: 50,
  radiusDefault: 5,
  borderWidthDefault: 1,
  marginDefault: 30,
  roundedButtonDefault: 30,
  socialButtonDefault: 60,
  imageDefault: 25,
  checkBoxDefault: 16,
  paddingDefault: 20,
  screenPaddingDefault: 42,
  inputBottomMargin: 24,
  inputBottomMarginPX: 24,
  galleryContainerHeight: 175,
  inputHorizontalPadding: 22,
  rootPadding: 40,
};

const FONT = {
  default: 'Poppins-Regular',
  regular: 'Poppins-Regular',
  bold: 'Poppins-Bold',
  medium: 'Poppins-Medium',
  semiBold: 'Poppins-SemiBold',
  light: 'Poppins-Light',
  extraBold: 'Poppins-ExtraBold',
};

const FONT_SIZE = {
  fontMedium: 14,
  fontSmall: 12,
  fontExtraSmall: 10,
  fontLarge: 16,
  fontExtraLarge: 18,
  default: 17,
  title: 17,
  editText: 17,
  authenticationEditText: 17,
  screenTitle: 16,
  screenSubTitle: 14,
  authP: 12,
  button: 17,
  inputHeading: 14,
  inputText: 14,
  textDefault: 14,
  buttonTextDefault: 16,
  status: 60,
};

const IMAGE_SIZE = {
  profilePlaceHolder: {
    height: 83,
    width: 70,
  },
  dropdown: {
    height: 5,
    width: 10,
  },
};

const NAVIGATION_AUTH = {
  GoToSplash: 'Splash',
  GoToSelectCountry: 'SelectCountry',
  GoToLanding: 'Landing',
  GoToSignIn: 'SignIn',
  GoToRegister: 'Register',
  GoToPaymentStepper: 'PaymentStepper',
  GoToHome: 'Home',
};

export {
  suffixPx,
  height,
  width,
  SCREEN_DIM,
  FONT,
  FONT_SIZE,
  IMAGE_SIZE,
  NAVIGATION_AUTH,
};
