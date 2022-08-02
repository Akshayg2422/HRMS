import React from "react";
// import Rightcontent from "../../CommonComponent/Rightcontent/rightcontent";
// import Button from "../../element/button/ButtonPrimary";
// import Input from "../../element/Input";
// import "./login.css";
import {Button, Input } from '../../../../components'
const SignIn = () => {
  return (
    <div className="row fullcontent">
      {/* <Rightcontent /> */}
      <div className="col-6">

        <div class='row justify-content-center'>
        <div className="col-6">
        {/* <Input
              size={"lg"}
              inputType={"tel"}
              placeholder={"Enter your mobile number"}
              col={12}
              lable={"Mobile Number"}
            /> */}
            </div>
          <div className="col-12">
            <h2>Welcome</h2>
            {/* <Input
              size={"lg"}
              inputType={"tel"}
              placeholder={"Enter your mobile number"}
              col={12}
              lable={"Mobile Number"}
            /> */}
            <Button   text={"CONTINUE"} />
            <div className="socialmedia">
              <span>Or login with</span>
              </div>
              <div className="googlesignin">
              <Button className="contbutton col-4" normal text={"CONTINUE"} />
            <Button className="contbutton col-4" normal text={"CONTINUE"} />
            </div>
          </div>
          </div>
        </div>
      </div>
  );
};
export default SignIn;
