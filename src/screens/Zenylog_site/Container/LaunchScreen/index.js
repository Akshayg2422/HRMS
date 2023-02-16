import React, { useState, useEffect } from "react";
import { Icons, Images } from "@assets";
import {
  ROUTE,
  goTo,
  useNav
} from '@utils';

const LaunchScreen = () => {
  const navigate = useNav();
  let clockedIn = new Date();
  let clockedOut = new Date("2023-02-10 16:30:00");
  let timestamp = (clockedOut - clockedIn) / 1000
  const [seconds, setSeconds] = useState(timestamp);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(seconds - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [seconds]);

  useEffect(() => {
    if (timestamp < 0) {
      goTo(navigate, ROUTE.ROUTE_LAUNCH_SUCCESS)
    }
  })

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);



  return (
    <div
      style={{
        backgroundImage:
          `url(${Images.LaunchScreenBackGround})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        backgroundRepeat:"no-repeat"
      }}
    >
      <div className="ml-xl-6 mt-xl-5 m-sm-0" style={{ position: 'absolute', justifyContent: 'flex-start', alignSelf: 'flex-start'}}>
        <img src={Images.LaunchLogo} height={"100%"} width={"100%"}></img>
      </div>
      {timestamp > 0 &&
        <div className="container-fluid ml-xl-5 ml-sm-0 ml-3 mt-sm-0 mt-9">
          <div className="text-white h1 ml-1 fs-3" ><b>{"ZenyQ"}</b> {"launching in"}</div>
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
        </div>}
    </div >
  );
};


export default LaunchScreen;
