import {
  Card,
  Container,
  Primary,
  ChooseBranchFromHierarchical,
  CommonTable,
  Modal,
  DatePicker,
  BackArrow,
  NoRecordFound,
} from "@components";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  getEmployeeAttendanceStats,
  getSelectedCardType,
  getSelectedDepartmentName,
  getSelectedDepartmentId,
  getAttendanceConsolidatedCards,
} from "../../../../store/employee/actions";
import React, { useEffect, useState } from "react";
import {
  goTo,
  ROUTE,
  useNav,
  getServerDateFromMoment,
  getMomentObjFromServer,
} from "@utils";
import { Icons } from "@assets";

const DashboardStats = () => {
  const { t } = useTranslation();
  const navigation = useNav();
  let dispatch = useDispatch();

  const { employeeattendancedatalog } = useSelector(
    (state: any) => state.EmployeeReducer
  );

  const { hierarchicalBranchName, hierarchicalBranchIds } = useSelector(
    (state: any) => state.DashboardReducer
  );

  const [model, setModel] = useState(false);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState("");
  const [selectedDepartmentName, setSelectedDepartmentName] = useState("");
  const [attendanceConsolidatedCardsData, setAttendanceConsolidatedCardsData] =
    useState([]);

  const [selectedDate, setSelectedDate] = useState(
    getServerDateFromMoment(getMomentObjFromServer(new Date()))
  );

  const normalizedEmployeeAttendanceLog = (data: any) => {
    return data?.departments_stats?.map((el: any) => {
      return {
        Name: el.name,
        Total: el.total,
        Present: el.present,
        Absent: el.absent,
        "To Start": el.to_start,
        "Alert": el.alert
      };
    });
  };

  useEffect(() => {
    const params = {
      ...hierarchicalBranchIds,
      selected_date: selectedDate,
    };

    dispatch(getEmployeeAttendanceStats({
      params,
      onSuccess: (success: any) => () => {

      },
      onError: (error: any) => () => {

      }
    }));
  }, [selectedDate, hierarchicalBranchIds]);

  const proceedNext = (
    attendanceType: number,
    departmentId: number | string
  ) => {
    const params = {
      attendanceType: attendanceType,
      departmentId: departmentId,
      selectedDate: selectedDate,
    };
    dispatch(getSelectedCardType({
      params,
      onSuccess: (success: any) => () => {

      },
      onError: (error: any) => () => {

      }
    }
    ));
    goTo(navigation, ROUTE.ROUTE_DASHBOARD_ATTENDANCE);
  };

  const getAttendanceConsolidatedData = (departmentId: string) => {
    const params = {
      ...hierarchicalBranchIds,
      selected_date: selectedDate,
      department_id: departmentId,
    };

    dispatch(
      getAttendanceConsolidatedCards({
        params,
        onSuccess: (response: any) => () => {
          if (response && response.cards?.length > 0) {
            setAttendanceConsolidatedCardsData(response.cards);
            setModel(!model);
          }
        },
        onError: (error: string) => () => { },
      })
    );
  };



  return (
    <>

      <Card additionClass={"row mx-2"}>
        <div className="row mt-3">
          <div className="col-lg-6 col-md-6">
            <ChooseBranchFromHierarchical />
          </div>
          <div className="col-lg-3 col-md-6 mt-xl-4">
            <DatePicker
              additionalClass="mt-xl-2"
              placeholder={"Select Date"}
              icon={Icons.Calendar}
              iconPosition={"prepend"}
              value={selectedDate}
              onChange={(date: string) => setSelectedDate(date)}
            />
          </div>
        </div>
      </Card>
      <Container
        additionClass={"row"}
        justifyContent={"justify-content-around"}
      >
        <div className="row align-items-center mb-4">
          <div className="col">
            <h3 className="mb-0">{t("dashboardDetails")}</h3>
          </div>
        </div>
        <Container additionClass={"row"}>
          {employeeattendancedatalog && employeeattendancedatalog?.cards?.length > 0 ? employeeattendancedatalog?.cards?.map((el: any) => {
            return (
              <Container additionClass={"col-xl-4 col-md-6"}>
                <Card>
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
                      onClick={() => proceedNext(el.type, -1)}
                    />
                  </Container>
                </Card>
              </Container>
            );
          }) : <NoRecordFound />}
        </Container>
        <Container margin={"mx-6"}>
          {employeeattendancedatalog &&
            employeeattendancedatalog.departments_types && (
              <CommonTable
                tableTitle={t(t("departments"))}
                displayDataSet={normalizedEmployeeAttendanceLog(
                  employeeattendancedatalog
                )}
                tableOnClick={(e, index, item) => {
                  // console.log(
                  //   employeeattendancedatalog.departments_stats[index]
                  //     .department_id + "====="
                  // );

                  setSelectedDepartmentName(
                    employeeattendancedatalog.departments_stats[index].name
                  );
                  setSelectedDepartmentId(
                    employeeattendancedatalog.departments_stats[index]
                      .department_id
                  );
                  getAttendanceConsolidatedData(
                    employeeattendancedatalog.departments_stats[index]
                      .department_id
                  );
                }}
              />
            )}
        </Container>
        <Modal
          title={selectedDepartmentName}
          showModel={model}
          toggle={() => setModel(!model)}
        >
          <Container additionClass={"row"}>
            {attendanceConsolidatedCardsData && attendanceConsolidatedCardsData.length > 0 ? attendanceConsolidatedCardsData.map((el: any, index: number) => {
              return (
                <Container additionClass={"col-xl-4 col-md-6"}>
                  <Card>
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
                        onClick={() => {
                          setModel(!model);
                          proceedNext(el.type, selectedDepartmentId);
                        }}
                      />
                    </Container>
                  </Card>
                </Container>
              );
            }) : <NoRecordFound />}
          </Container>
        </Modal>
      </Container>
    </>
  );
};

export default DashboardStats;
