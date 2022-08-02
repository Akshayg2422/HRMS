import React from "react";
import "./rightcontent.css";

const RegisterWelcomeCard = () => {
  return (
    <div className="bg-image">
      <h1>
        {" "}
        Welcome to <br />
        zenylog{" "}
      </h1>
      <span>Your logs, our responsibility</span>
      <div>
        <li>Geo tagging</li>
        <li>Real-time statistics</li>
        <li>Salary calculations</li>
        <li>Payments and payslips</li>
        <li>And<span>much more!!!</span ></li>
      </div>
    </div>
  );
};
export default RegisterWelcomeCard;
