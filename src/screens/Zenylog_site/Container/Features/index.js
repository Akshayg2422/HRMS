import React from 'react'
import Attendance from "../../../../assets/images/Attendance/Attendance.png";
import Dailystats from "../../../../assets/images/DailyStats/DailyStats.png";
import Leave from "../../../../assets/images/Leave/Leave.png";
import Timesheets from "../../../../assets/images/TimeSheets/TimeSheets.png";
import EDocuments from "../../../../assets/images/E Document/EDocument.png";
import Notifications from "../../../../assets/images/Notifications/Notifications.png";
import SalaryCal from "../../../../assets/images/SalaryCalculations/SalaryCalculations.png";
import Reports from "../../../../assets/images/GenerationReports/GenerationReports.png";
import SalaryPay from "../../../../assets/images/SalaryPayments/Salarypayments.png";
import Pettycash from "../../../../assets/images/PettyCash/PettyCash.png";
import Payslip from "../../../../assets/images/PaySlips/PaySlips.png";
import { Card} from '../../../../components';
const Features=(props)=>{
    

    return (
        <>
        <div className='container-fluid' >
        <div className="card container-fluid">
          <h1 class="card-header mt-4 mr-4 ml-5 mb-5">Our Features</h1>
          <div className="row justify-content-around">
            <div className="col-sm-3">
              <Card
                image={Attendance}
                title={"Attendance Management"}
                text1={"Office checkin"}
                text2={" Remote checkin"}
                text3={""}
              />
            </div>
            <div className="col-sm-3">
              <Card
                image={Attendance}
                title={"Shift Management"}
                text1={"Change Shift"}
                text2={"Allocate Multiple Shift"}
                text3={"Operate 24/7"}
              />
            </div>
            <div className="col-sm-3">
              <Card
                image={Dailystats}
                title={"Daily Stats"}
                text1={"Real Time"}
                text2={"Location wise"}
              />
            </div>
          </div>
          <div className="row justify-content-around">
            <div className="col-sm-3">
              <Card
                image={Leave}
                title={"Leave Management"}
                text1={"Applying for leaves"}
                text2={"Leave Record"}
                text3={"Approval/Rejection/Revoking of leaves"}
              />
            </div>
            <div className="col-sm-3">
              <Card
                image={Timesheets}
                title={"Time Sheets"}
                text1={"Daily"}
                text2={"Weekly"}
                text3={"Monthly"}
              />
            </div>
            <div className="col-sm-3">
              <Card
                image={EDocuments}
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
                image={Notifications}
                title={"Notifications"}
                text1={"Create"}
                text2={"Schedule"}
                text3={"Share"}
                text4={""}
              />
            </div>
            <div className="col-sm-3">
              <Card
                image={SalaryCal}
                title={"Salary Calculations"}
                text1={"Real Time"}
                text2={"Over Time (OT)"}
                text3={"EBonus "}
                text4={"Incentives"}
              />
            </div>
            <div className="col-sm-3">
              <Card
                image={Reports}
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
                image={SalaryPay}
                title={"Salary Payments"}
                text1={"Individual"}
                text2={"Bulk"}
                text3={"Instant (Within Minutes)"}
              />
            </div>
            <div className="col-sm-3">
              <Card
                image={Pettycash}
                title={"Petty Cash Payments"}
                text1={"Instant Transfer"}
                text2={"Individual Reports"}
                text3={"Monthly Statements"}
              />
            </div>
            <div className="col-sm-3">
              <Card
                image={Payslip}
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
    )
}
export default Features;
