import { Card, Container, Primary, Secondary, CommonTable } from "@components";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeAttendanceStats } from "../../../../store/employee/actions";
import React, { useEffect } from "react";
import { goTo,ROUTE, useNav } from "@utils";

const DashboardStats = () => {
  const { t } = useTranslation();
  const navigation=useNav()
  let dispatch = useDispatch();
  const data = [
    { id: "1", name: "total" },
    {
      id: "2",
      name: "count",
    },
    {
      id: "3",
      name: "present",
    },
    { id: "1", name: "total" },
    {
      id: "2",
      name: "count",
    },
    {
      id: "3",
      name: "present",
    },
  ];

  const { employeeattendancedatalog } = useSelector(
    (state: any) => state.EmployeeReducer
  );

  const normalizedEmployeeAttendanceLog = (data:any) => {
    
    return data?.departments_stats?.map((el: any) => {
      return {
        Name : el.name,
        Total : el.total,
        Present: el.present,
        Late: el.late,
        Absent:el.absent,
        "To Start":el.to_start
      };
    });
  };

  const params = {
    branch_id: "dd036ce7-53b4-4e5b-b36f-7c31344bef0d",
    child_ids: [
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
      "373b4c06-b2e8-497d-9563-fee5d42feb55",
    ],
    include_child: true,
    selected_date: "2022-09-12",
  };

  useEffect(() => {
    dispatch(getEmployeeAttendanceStats(params));
  }, []);


  return (
    <Container
      additionClass={"row"}
      justifyContent={"justify-content-around"}
      margin={"m-4"}
    >
      <Container>
        <h1>{"Dashboard Details"}</h1>
      </Container>
      {employeeattendancedatalog?.cards?.map((el: any) => {
        return (
          <Card
            additionClass="col-xl-3 col-md-3 "
            margin={"m-2"}
            children={
              <Container
                justifyContent={"justify-content-between"}
                alignItems={"align-content-center"}
                flexDirection={"column"}
              >
                <Container>
                  <div className="text-center h1 font-weight-300">
                    {el.count}
                  </div>
                  <div className="text-center h2">{el.title}</div>
                </Container>

                <Primary
                  additionClass={"btn-block"}
                  text={t("Tap to View")}
                  size={"btn-sm"}
                  onClick={() =>{goTo(navigation, ROUTE.ROUTE_DASHBOARD_ATTENDANCE)}}
                />
              </Container>
            }
          ></Card>
        );
      })}
      <Container margin={"mt-5"}>
        <Container>
          <h1>{"Departments"}</h1>
          {employeeattendancedatalog && employeeattendancedatalog.departments_types &&  (
            <CommonTable
              tableTitle={t("employeeLog")}
              tableDataSet={normalizedEmployeeAttendanceLog(employeeattendancedatalog)}
            />
          )}
        </Container>
      </Container>
    </Container>
  );
};

export default DashboardStats;
