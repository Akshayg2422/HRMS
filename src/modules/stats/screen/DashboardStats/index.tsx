import { Card, Container, Primary, Secondary, CommonTable,Modal } from "@components";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeAttendanceStats, getSelectedCardType,getSelectedDepartmentName,getSelectedDepartmentId, getAttendanceConsolidatedCards } from "../../../../store/employee/actions";
import React, { useEffect, useState} from "react";
import { goTo, ROUTE, useNav } from "@utils";

const DashboardStats = () => {
  const { t } = useTranslation();
  const navigation = useNav()
  let dispatch = useDispatch();

  const { employeeattendancedatalog, selectedDepartmentName,selectedDepartmentId,attendanceConsolidatedCardsData } = useSelector(
    (state: any) => state.EmployeeReducer
  );

  const [model, setModel] = useState(false)

  const normalizedEmployeeAttendanceLog = (data: any) => {

    return data?.departments_stats?.map((el: any) => {
      return {
        Name: el.name,
        Total: el.total,
        Present: el.present,
        Late: el.late,
        Absent: el.absent,
        "To Start": el.to_start
      };
    });
  };
console.log("response data",employeeattendancedatalog);

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

  const onSelected = (type: string | number) => {
    console.log("type-------->", type);
    dispatch(getSelectedCardType(type))
    goTo(navigation, ROUTE.ROUTE_DASHBOARD_ATTENDANCE)
  }


  const getAttendanceConsolidatedData = (selectedDepartment:string) => {
    
  const params={
     branch_id: "dd036ce7-53b4-4e5b-b36f-7c31344bef0d",
     child_ids: ["e7358196-f4f4-4764-aae1-dbf60b10160b",
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
      "373b4c06-b2e8-497d-9563-fee5d42feb55"], 
      department_id: "c23a2ce4-ec64-4bc7-8eba-2a662dba6640",
      include_child: false, 
      selected_date: "2022-09-13"
 }
  console.log("params--->",params);
  

  dispatch(getAttendanceConsolidatedCards({
    params,
     onSuccess: () => {
    setModel(!model)
   },
    onError: (error: string) => {

   },
}));
  }


  return (
    <Container
      additionClass={"row"}
      justifyContent={"justify-content-around"}
      margin={"m-4"}
    >
      <Container>
        <h1>{t("dashboardDetails")}</h1>
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
                  onClick={() => onSelected(el.type)}
                />
              </Container>
            }
          ></Card>
        );
      })}
      <Container margin={"mt-5"}>
        <Container>
          <h1>{t("departments")}</h1>
          {employeeattendancedatalog && employeeattendancedatalog.departments_types && (
            <CommonTable
              tableTitle={t("employeeLog")}
              tableDataSet={normalizedEmployeeAttendanceLog(employeeattendancedatalog)}
              tableOnClick={(e, index, item) =>{

                dispatch(getSelectedDepartmentName(employeeattendancedatalog.departments_stats[index].name))
                dispatch(getSelectedDepartmentId(employeeattendancedatalog.departments_stats[index].department_id))
                getAttendanceConsolidatedData(employeeattendancedatalog.departments_stats[index].department_id)
              }}
            />
          )}
        </Container>
      </Container>
      <Modal title={'All Registered Branches'} showModel={model} toggle={() => setModel(!model)}  >
                    {/* <div className='my-4'> */}
                    <Container additionClass={"row"}>
                        {
                            attendanceConsolidatedCardsData?.cards?.map((el:any, index: number) => {
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
                                        onClick={() => onSelected(el.type)}
                                      />
                                    </Container>
                                  }
                                ></Card>
                                );
                            })
                        }
                    {/* </div> */}
                    </Container>
                </Modal>
    </Container>
  );
};

export default DashboardStats;
