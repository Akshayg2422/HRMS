import React, { useState, useEffect } from "react";
import { Icons, Images } from "@assets";
import {
  ROUTE,
  goTo,
  useNav
} from '@utils';
import { Container, ScreenTitle, Primary, useKeyPress, Secondary } from '@components';
import { useDispatch, useSelector } from "react-redux";
import { launchActive, timerAction } from "../../../../store/app/actions";
import { OtpInput } from '../../../../modules/auth/container';
import './launchSecondary.css'


const LaunchScreenSecondary = () => {
  const navigate = useNav();
  const dispatch = useDispatch()
  const maxLength = 1
  const key = 1234567

  const [currentUserIndex, setCurrentUserIndex] = useState(-1)

  const { setLaunch, timer } = useSelector(
    (state) => state.AppReducer
  );

  const inputRef1 = React.createRef();
  const inputRef2 = React.createRef();
  const inputRef3 = React.createRef();
  const inputRef4 = React.createRef();
  const inputRef5 = React.createRef();
  const inputRef6 = React.createRef();
  const inputRef7 = React.createRef();


  let clockedIn = new Date();
  let clockedOut = new Date("2023-02-11 20:48:00");
  let timestamp = (clockedOut - clockedIn) / 1000

  const USER_LIST = [{ name: 'Ashutosh Bhandari', key: '9237778', timer: 40 },
  { name: 'Shikha Kumari', key: '9443692', timer: 30 }, { name: 'Anup Gangur', key: '8520740', timer: 20 },
  { name: 'Santhosh Shashidhara', key: '8776089', timer: 10 }]

  const [activeUser, setActiveUser] = useState(undefined)
  const [stopTimer, setStopTimer] = useState(timer)

  const [displaySeconds, setDisplaySeconds] = useState(0 > timer ? Math.floor(timestamp) : timer);

  const INTERVEL = 10

  const hours = Math.floor(displaySeconds / 3600);
  const minutes = Math.floor((displaySeconds % 3600) / 60);
  const secs = Math.floor(displaySeconds % 60);



  const [otp, setOtp] = useState({
    field1: '',
    field2: '',
    field3: '',
    field4: '',
    field5: '',
    field6: '',
    field7: '',
  });

  useEffect(() => {
    if (displaySeconds != 0) {
      const intervalId = setInterval(() => {
      //   // if (hours == 0 && minutes == 0) {
      //   //   if (stopTimer === secs) {
      //   //     const currentUser = USER_LIST.find(user => user.timer === secs)
      //   //     if (currentUser)
      //   //       setActiveUser(currentUser)
      //   //     clearInterval(intervalId);
      //   //   } else {
      //   //     setDisplaySeconds(displaySeconds - 1);
      //   //   }
      //   // }
      //   // else {
      //   //   setDisplaySeconds(displaySeconds - 1);
      //   // }
      setDisplaySeconds(displaySeconds - 1);
      }, 1000);
      return () => {
        clearInterval(intervalId);
      };
    } else {
    }
  }, [displaySeconds]);

  useEffect(()=>{
    if(currentUserIndex >3 && displaySeconds == 0)
    
    {goTo(navigate, ROUTE.ROUTE_LAUNCH_SUCCESS, true)
    dispatch(timerAction(40))
    dispatch(launchActive(true))
    }
  }, [currentUserIndex, displaySeconds])

  const onChangeHandler = (e) => {
    setOtp({ ...otp, [e.target.name]: e.target.value });
  };

  const changeInputFocus = () => {
    if (otp.field1 === '' && inputRef1.current) {
      inputRef1.current.focus();
    } else if (otp.field2 === '' && inputRef2.current) {
      inputRef2.current.focus();
    } else if (otp.field3 === '' && inputRef3.current) {
      inputRef3.current.focus();
    } else if (otp.field4 === '' && inputRef4.current) {
      inputRef4.current.focus();
    }
    else if (otp.field5 === '' && inputRef5.current) {
      inputRef5.current.focus();
    }
    else if (otp.field6 === '' && inputRef6.current) {
      inputRef6.current.focus();
    } else if (otp.field7 === '' && inputRef7.current) {
      inputRef7.current.focus();
    }
  };

  useEffect(() => {
    changeInputFocus()
  }, [otp.field1, otp.field2, otp.field3, otp.field4, otp.field5, otp.field6, otp.field7]);


  useEffect(() => {
    const otpConvertor = otp.field1 + otp.field2 + otp.field3 + otp.field4 + otp.field5 + otp.field6 + otp.field7
    if (otpConvertor.length === 7) {
      setCurrentUserIndex(currentUserIndex+1)

      // if(currentUserIndex < 3)
      // setCurrentUserIndex(currentUserIndex+1)
      // else
      // {

      // }
      // if (otpConvertor === (activeUser && activeUser.key))
       {
        setOtp({ ...otp, field1: '', field2: '', field3: '', field4: '', field5: '', field6: '', field7: '' })
        // setStopTimer(Math.floor(displaySeconds) - INTERVEL)
        // setDisplaySeconds(Math.floor(displaySeconds) - 1)
        // dispatch(timerAction(Math.floor(displaySeconds) - INTERVEL))
        // setActiveUser(currentUser)
        // setActiveUser(undefined)
      } 
    }
  }, [otp.field1, otp.field2, otp.field3, otp.field4, otp.field5, otp.field6, otp.field7])

  return (
    <div
      className="m-0 p-0 responsive-bg-element"
    >
      <div className="container-fluid ml-xl-6 mt-xl-5 mt-sm-0 mt-3 d-flex" style={{ position: 'absolute', justifyContent: 'flex-start', alignSelf: 'flex-start' }}>
        <img src={Images.LaunchLogo} height={"10%"} width={"10%"}></img>
        <div className={'text-right ml-xl-3  col-xl-10'}>
          <Secondary
            additionClass="bg-white"
            text={"Login"}
            onClick={() => {
              dispatch(launchActive(true))
              // goTo(navigate, '/login', true)
            }}
          />
        </div>
      </div>
      {currentUserIndex>=0 &&
        <div className="container-fluid ml-xl-5 ml-sm-0 ml-3">
          <div className="text-white h1 ml-1 fs-3 mt-sm-0 mt-9" >{currentUserIndex <=3 ? `Enter Launch Code by ${USER_LIST && USER_LIST[currentUserIndex].name}` : <><b>{"ZenyQ"}</b> {"launching in"}</>}</div>
          {/* // } : <><b>{"ZenyQ"}</b> {"launching in"}</>}</div> */}
          <div className="row col-xl ml--4 my-3">
            <div className="col-2 col-sm-0 col-3 col-xl-1 ">
              <h1 className="display-1 text-white ">{hours.toString().padStart(2, "0")}</h1>
              <h1 className='text-white fw-normal'>{'Hours'}</h1>
            </div>
            <div className="col-2 col-sm-0 col-4 col-xl-1 ml-xl-3">
              <h1 class="display-1 text-white col-2 col-sm-0 col-xl-1">{minutes.toString().padStart(2, "0")}</h1>
              <h1 className='text-white fw-normal'>{'Minutes'}</h1>
            </div>
            <div className="col-2 col-sm-0 col-3 col-xl-1  ml-xl-5">
              <h1 class="display-1 text-white col-2 col-sm-0 col-xl-1">{secs.toString().padStart(2, "0")}</h1>
              <h1 className='text-white fw-normal'>{'Seconds'}</h1>
            </div>
          </div>
          {(currentUserIndex>=0 && currentUserIndex<=3) && <> <div className="text-white h3 mt-5 fw-normal" >{"Enter your code here"}</div>
            <Container
              flexDirection={'row'}
              margin={'mt-2'}
              additionClass={''}
            >
              <OtpInput
                name='field1'
                value={otp.field1}
                ref={inputRef1}
                onChange={(event) => {
                  if (event.target.value.length <= maxLength) {
                    onChangeHandler(event);
                  }

                }}
              />
              <OtpInput
                name='field2'
                value={otp.field2}
                ref={inputRef2}
                onChange={(event) => {
                  if (event.target.value.length <= maxLength) {
                    onChangeHandler(event);
                  }

                }}
              />
              <OtpInput
                name='field3'
                value={otp.field3}
                ref={inputRef3}
                onChange={(event) => {
                  if (event.target.value.length <= maxLength) {
                    onChangeHandler(event);
                  }
                }}
              />
              <OtpInput
                name='field4'
                value={otp.field4}
                ref={inputRef4}
                onChange={(event) => {
                  if (event.target.value.length <= maxLength) {
                    onChangeHandler(event);
                  }
                }}
              />
              <OtpInput
                name='field5'
                value={otp.field5}
                ref={inputRef5}
                onChange={(event) => {
                  if (event.target.value.length <= maxLength) {
                    onChangeHandler(event);
                  }
                }}
              />
              <OtpInput
                name='field6'
                value={otp.field6}
                ref={inputRef6}
                onChange={(event) => {
                  if (event.target.value.length <= maxLength) {
                    onChangeHandler(event);
                  }
                }}
              />
              <OtpInput
                name='field7'
                value={otp.field7}
                ref={inputRef7}
                onChange={(event) => {
                  if (event.target.value.length <= maxLength) {
                    onChangeHandler(event);
                  }
                }}
              />
            </Container></>}
        </div>}
        {currentUserIndex == -1 &&
      <div className="row ml-xl-4">
        <div className={'ml-xl-3  col-xl-10'}>
          <Secondary
            additionClass="bg-white"
            text={"Click here"}
            onClick={() => {
              setDisplaySeconds(40)
              setCurrentUserIndex(0)

              // dispatch(launchActive(true))
              // goTo(navigate, '/login', true)
            }}
          />
        </div>
        <div className="text-white h1 ml-3 fs-3 mt-xl-2 mt-sm-0 mt-9" >{'to initiate Launch Sequence 🚀'}</div>
      </div>
}
    </div >
  );
};


export default LaunchScreenSecondary;
