import { CommonTable } from '@components';
import React,{useEffect} from 'react'
import { Button } from 'react-bootstrap';
import { useDispatch,useSelector } from 'react-redux'
import { getEmployeeTodayStatus,getCheckInDetailedLog } from "../../../../store/employee/actions";
import { useTranslation } from "react-i18next";


const DashBoardAtttendance=()=>{
const dispatch=useDispatch(); 
const { t } = useTranslation();

const getTodayStats = () =>{
const params={
    branch_id:"dd036ce7-53b4-4e5b-b36f-7c31344bef0d",
    child_ids:[
    "7fd94e6e-b72f-4854-a25b-69fdd49c709b",
    "ec4cb6a6-7540-46d5-be49-075ae1cdcb4c",
    "1e26f5ee-be2b-4a0f-a027-85b4c4802394",
    "d446a2cf-27a5-477b-b443-ee48da132433",
    "b28f3909-fc00-44fc-95af-5ce02657ed78",
    "1f0bd344-5a7b-40fe-bd8f-0fb671f479b4",
    "594abbdd-1f83-454c-856e-151ee1a089f8",
    "6367ef96-2b58-49ba-933f-590b084ce388",
    "0837bde6-71b6-41e2-a447-c781671084cf",
    "32834f8d-8aa1-4590-95fc-eaad8fb9743f",
    "373b4c06-b2e8-497d-9563-fee5d42feb55"
    ],
    include_child:true,
    department_id:"c23a2ce4-ec64-4bc7-8eba-2a662dba6640",
    attendance_type:"-1",
    page_number:1,
    selected_date:"2022-09-12"
    }

    dispatch(getEmployeeTodayStatus(params))
  }

useEffect(()=>{
  getTodayStats()
},[])

const { employeeStatusLog,checkinDetailedLog, cardType,selectedDepartmentId  } = useSelector(
    (state: any) => state.EmployeeReducer
  );

  const normalizedEmployee = (data:any) => {
    return data.map((el:any) => {
      return {
        name: el.name,
        in: el.per_day_details.start_time,
        out:  el.per_day_details.end_time,
        remark: el.per_day_details ? el.per_day_details.day_status : '-',
        Call: el.mobile_number,
      };
    });
  };

  console.log("status",employeeStatusLog)
    return (
        <>
           <h1>DashBoard Attendance</h1> 
           <Button onClick={()=>{dispatch(getCheckInDetailedLog())}}>Detailed Log</Button>
           {employeeStatusLog && employeeStatusLog && (
            <CommonTable
              tableTitle={t("employeeLog")}
              tableDataSet={normalizedEmployee(employeeStatusLog)}
              tableOnClick={(e, index, item) =>{}}
            />
          )}
        </>
    )
}

export default DashBoardAtttendance;