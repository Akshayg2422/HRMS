import React, { useState, useEffect } from "react";
import { Icons, Images } from "@assets";

const LaunchSuccessScreen = () => {


  return (
    <div
      style={{
        backgroundImage:
          `url(${Images.LaunchSuccess})`,
        backgroundSize: "cover",
        backgroundPosition: "top center",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: 'center'
      }}
    >
      <div className="col col-xl-6">
        <div className="text-primary fs-1 text-center" ><b>{"Congratulations!!!"}</b></div>
        <div className="text-primary fs-3 text-center mt-3"> 
        <img src={Images.LaunchLogoSecondary} height={"25%"} width={"25%"}></img>
        <b>{" is now live in 192 countries and can be accessed across the globe."}</b></div>
      </div>
    </div >
  );
};


export default LaunchSuccessScreen;
