import React, {useContext, createContext, useState, useEffect} from "react";


type Document = {
  name: string;
  base64: string;
  filePath: string;
  param: string;
}

export const AuthContext = createContext<{
  mobileNumber?: string;
  setMobileNumber?: (text: string) => void;


  registerMobileNumber?: string;
  setRegisterMobileNumber?: (text: string) => void | undefined;
  e_mail?: string;
  setE_mail?: (text: string) => void | undefined;
  firstName?: string;
  setFirstName?: (text: string) => void;
  lastName?: string;
  setLastName?: (text: string) => void | undefined;
  designation?: string;
  setDesignation?: (text: string) => void | undefined;
  gender?: Object;
  setGender?: (text: Object) => void | undefined;
  pan?: string;
  setPan?: (text: string) => void | undefined;
  aadharNumber?: string;
  setAadharNumber?: (text: string) => void | undefined;


  businessName?: string;
  setBusinessName?: (text: string) => void | undefined;
  brandName?: string;
  setBrandName?: (text: string) => void | undefined;
  businesType?: any;
  setBusinesType?: (text: any) => void | undefined;
  businessNature?: any;
  setBusinessNature?: (text: any) => void | undefined;
 


  companyPan?: string;
  setCompanyPan?: (text: string) => void | undefined;
  companyGst?: string;
  setCompanyGst?: (text: string) => void | undefined;
  communicationAddress?: string;
  setCommunicationAddress?: (text: string) => void | undefined;
  pinCode?: string;
  setPinCode?: (text: string) => void | undefined;
  city?: string;
  setCity?: (text: string) => void | undefined;
  state?: string;
  setState?: (text: string) => void | undefined;
  refferalId?: string;
  setRefferalId?: (text: string) => void | undefined;

  otp1?: any;
  setOtp1?: (text: string) => void | undefined;
  otp2?: any;
  setOtp2?: (text: string) => void | undefined;
  otp3?: any;
  setOtp3?: (text: string) => void | undefined;
  otp4?: any;
  setOtp4?: (text: string) => void | undefined;
  userDetails?: object;
  setUserDetails?: (text: object) => void | undefined;
  showLoader?: boolean;
  setShowLoader?: (status: boolean) => void | undefined;

  fileUpload?: Array<Document>;
  SetFileUpload?: (text: Array<Document>) => void ;

}>({});

export const useAuth = () => useContext(AuthContext);

type AuthProviderProps = {
  children?: React.ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {

  const [showLoader, setShowLoader] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({});

  //***  user Details ***//
  const [registerMobileNumber, setRegisterMobileNumber] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [e_mail, setE_mail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState({});
  const [designation, setDesignation] = useState("");
  const [pan, setPan] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");

  //** company profile    **//
  const [businessName, setBusinessName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [businesType, setBusinesType] = useState("");
  const [businessNature, setBusinessNature] = useState("");
  const [companyPan, setCompanyPan] = useState("");
  const [companyGst, setCompanyGst] = useState("");
  const [communicationAddress, setCommunicationAddress] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [refferalId, setRefferalId] = useState("");



  //**OTP**//
  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");
  const [otp3, setOtp3] = useState("");
  const [otp4, setOtp4] = useState("");


  //**Documrnt**//



  const [fileUpload, SetFileUpload] = useState<Array<Document>>([
    {
      name: 'Company GST',
      base64: '',
      filePath: '',
      param: 'attachment_gst',
    },
    {
      name: 'ProfilePhoto',
      base64: '',
      filePath: '',
      param: 'attachment_profile',
    },
    {
      name: 'Company Logo',
      base64: '',
      filePath: '',
      param: 'attachment_logo'
    },
  ]);



  //
  useEffect(() => {
    const value = businesType;
    const jsonValue = JSON.stringify(value);
  }, [businesType]);

  return (
    <AuthContext.Provider
      value={{
        mobileNumber,
        setMobileNumber,
        registerMobileNumber,
        setRegisterMobileNumber,
        e_mail,
        setE_mail,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        designation,
        setDesignation,
        pan,
        setPan,
        aadharNumber,
        setAadharNumber,
        businessName,
        setBusinessName,
        brandName,
        setBrandName,
        businesType,
        setBusinesType,
        businessNature, 
        setBusinessNature,
        companyPan,
        setCompanyPan,
        companyGst,
        setCompanyGst,
        communicationAddress,
        setCommunicationAddress,
        pinCode,
        setPinCode,
        city,
        setCity,
        state,
        setState,
        refferalId,
        setRefferalId,
        gender,
        setGender,
        otp1,
        setOtp1,
        otp2,
        setOtp2,
        otp3,
        setOtp3,
        otp4,
        setOtp4,
        setShowLoader,
        showLoader,
        fileUpload,
        SetFileUpload
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
