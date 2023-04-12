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
  showToast,
  Today,
} from "@utils";
import { Icons } from "@assets";
import { getListAllBranchesList } from "../../../../store/location/actions";
import { getDashboard, setBranchHierarchical } from "../../../../store/dashboard/actions";

const DashboardStats = () => {
  const { t } = useTranslation();
  const navigation = useNav();
  let dispatch = useDispatch();

  const { employeeattendancedatalog } = useSelector(
    (state: any) => state.EmployeeReducer
  );

  const { hierarchicalBranchIds, dashboardDetails } = useSelector(
    (state: any) => state.DashboardReducer
  );

  const { listBranchesList } = useSelector(
    (state: any) => state.LocationReducer
  );

  const [model, setModel] = useState(false);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState("");
  const [selectedDepartmentName, setSelectedDepartmentName] = useState("");
  const [attendanceConsolidatedCardsData, setAttendanceConsolidatedCardsData] =
    useState([]);

  const [selectedDate, setSelectedDate] = useState(
    getServerDateFromMoment(getMomentObjFromServer(new Date()))
  );

  const [initialCall, setInitialCall] = useState(false)

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
    if (dashboardDetails) {
      conditionalRendering(dashboardDetails)
    }
  }, [dashboardDetails]);


  const conditionalRendering = (dashboardResponse: any) => {
    if (listBranchesList.length === 0) {
      const params = {}
      dispatch(getListAllBranchesList({
        params,
        onSuccess: (response: any) => () => {
          const childIds = getAllSubBranches(response, dashboardResponse.company_branch.id)
          getStatsDetails({ branch_id: dashboardResponse.company_branch.id, child_ids: childIds, include_child: false })
          dispatch(setBranchHierarchical({ ids: { branch_id: dashboardResponse.company_branch.id, child_ids: childIds, include_child: false }, name: dashboardResponse.company_branch.name }))
        },
        onError: () => () => {
        },
      }))
    } else {
      getStatsDetails({ ...hierarchicalBranchIds })
    }
  }

  useEffect(() => {
    initialCall && getStatsDetails({ ...hierarchicalBranchIds })
  }, [selectedDate, hierarchicalBranchIds]);


  const getStatsDetails = (obj: object) => {
    const params = {
      ...obj,
      selected_date: selectedDate,
    };
    dispatch(getEmployeeAttendanceStats({
      params,
      onSuccess: (success: any) => () => {
        setInitialCall(true)
      },
      onError: (error: any) => () => {

      }
    }));
  }

  const getAllSubBranches = (branchList: any, parent_id: string) => {
    let branchListFiltered: any = [];
    const getChild = (branchList: any, parent_id: string) => {
      branchList
        .filter((it: any) => it.parent_id === parent_id)
        .map((it2: any) => {
          branchListFiltered.push(it2);
          getChild(branchList, it2.id);
          return it2;
        });
    };
    getChild(branchList, parent_id);

    branchListFiltered = branchListFiltered.map((it: any) => {
      return it.id;
    });
    return branchListFiltered;
  };

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
        showToast('error', error)
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
      <Card additionClass="mx-3">
        <Container additionClass="row">
          <Container additionClass="col-xl-3">
            <ChooseBranchFromHierarchical />
          </Container>
          <Container additionClass="col-xl-3 mt-xl-2">
            <DatePicker
              additionalClass="mt-xl-4"
              placeholder={"Select Date"}
              icon={Icons.Calendar}
              iconPosition={"prepend"}
              maxDate={Today}
              value={selectedDate}
              onChange={(date: string) => setSelectedDate(date)}
            />
          </Container>
        </Container>
      </Card>
      <Container>
        <div className="row align-items-center mb-4 m-0 ">
          <div className="col">
            <h3 className="mb-0">{t("dashboardDetails")}</h3>
          </div>
        </div>
        <Container additionClass={"row m-0"}>
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
        <div className="mx-3">
          <Container additionClass="">
            {employeeattendancedatalog &&
              employeeattendancedatalog.departments_types && (
                <CommonTable
                  title={t(t("departments"))}
                  displayDataSet={normalizedEmployeeAttendanceLog(
                    employeeattendancedatalog
                  )}
                  tableOnClick={(e, index, item) => {


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
        </div>
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
