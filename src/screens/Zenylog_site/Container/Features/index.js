import React from "react";
import { Icons } from "@assets";

import { Card } from "../../components";

const Features = (props) => {
  return (
    <>
      <div id="OurFeatures" className="container-fluid">
        <div className="card container-fluid">
          <h1 class="card-header mt-4 text-website-primary  mr-4 ml-5 mb-5">
            Our <u>Features</u>
          </h1>
          <div className="row justify-content-around">
            <div className="col-sm-3">
              <Card
                image={Icons.Attendance}
                title={"Attendance Management"}
                text1={"Office checkin"}
                text2={" Remote checkin"}
                text3={""}
              />
            </div>
            <div className="col-sm-3">
              <Card
                image={Icons.ShiftManagement}
                title={"Shift Management"}
                text1={"Change Shift"}
                text2={"Allocate Multiple Shift"}
                text3={"Operate 24/7"}
              />
            </div>
            <div className="col-sm-3">
              <Card
                image={Icons.Dailystats}
                title={"Daily Stats"}
                text1={"Real Time"}
                text2={"Location wise"}
              />
            </div>
          </div>
          <div className="row justify-content-around">
            <div className="col-sm-3">
              <Card
                image={Icons.Leave}
                title={"Leave Management"}
                text1={"Applying for leaves"}
                text2={"Leave Record"}
                text3={"Approval/Rejection/Revoking of leaves"}
              />
            </div>
            <div className="col-sm-3">
              <Card
                image={Icons.Timesheets}
                title={"Time Sheets"}
                text1={"Daily"}
                text2={"Weekly"}
                text3={"Monthly"}
              />
            </div>
            <div className="col-sm-3">
              <Card
                image={Icons.EDocuments}
                title={"E- Documents"}
                text1={"Go Paperless"}
                text2={"Maintain All Records "}
                text3={"Easy Access"}
              />
            </div>
          </div>
          <div className="row justify-content-around">
            <div className="col-sm-3">
              <Card
                image={Icons.Notifications}
                title={"Notifications"}
                text1={"Create"}
                text2={"Schedule"}
                text3={"Share"}
                text4={""}
              />
            </div>
            <div className="col-sm-3">
              <Card
                image={Icons.SalaryCalculations}
                title={"Salary Calculations"}
                text1={"Real Time"}
                text2={"Over Time (OT)"}
                text3={"EBonus "}
                text4={"Incentives"}
              />
            </div>
            <div className="col-sm-3">
              <Card
                image={Icons.ReportWeb}
                title={"Generation of Reports"}
                text1={"Attendance Repor"}
                text2={"Log Report"}
                text3={"Leave Report "}
                text4={"Salary Report"}
              />
            </div>
          </div>
          <div className="row justify-content-around">
            <div className="col-sm-3">
              <Card
                image={Icons.Salarypayments}
                title={"Salary Payments"}
                text1={"Individual"}
                text2={"Bulk"}
                text3={"Instant (Within Minutes)"}
              />
            </div>
            <div className="col-sm-3">
              <Card
                image={Icons.Pettycash}
                title={"Petty Cash Payments"}
                text1={"Instant Transfer"}
                text2={"Individual Reports"}
                text3={"Monthly Statements"}
              />
            </div>
            <div className="col-sm-3">
              <Card
                image={Icons.PaySlips}
                title={"Pay Slips"}
                text1={"Auto generation"}
                text2={"Instant Availability "}
                text3={"Customisable"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Features;
