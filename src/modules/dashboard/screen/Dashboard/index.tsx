import React, { useEffect, useRef, useState } from "react";
import { DashboardStats } from "@modules";
import { useDispatch, useSelector } from "react-redux";
import { isWebPushRegister, postAppConfig } from "../../../../store/auth/actions";
import { Card, ChooseBranchFromHierarchical, Container, ScreenContainer } from "@components";
import Charts from '../../container/Charts'
import { getEmployeeAttendanceStats } from "../../../../store/employee/actions";
import { useTranslation } from "react-i18next";
import { getMomentObjFromServer, getServerDateFromMoment, showToast, useNav } from "@utils";
import { getListAllBranchesList } from "../../../../store/location/actions";
import { getDashboard, setBranchHierarchical } from "../../../../store/dashboard/actions";


function Dashboard() {
  const { t } = useTranslation();
  const navigation = useNav();
  const dispatch = useDispatch()
  const { employeeattendancedatalog } = useSelector(
    (state: any) => state.EmployeeReducer
  );
  const { hierarchicalBranchIds, dashboardDetails } = useSelector(
    (state: any) => state.DashboardReducer
  );
  const { appConfig, fcmToken } = useSelector(
    (state: any) => state.AuthReducer
  );
  const { listBranchesList } = useSelector(
    (state: any) => state.LocationReducer
  );

  const [initialCall, setInitialCall] = useState(false)

  const [selectedDate, setSelectedDate] = useState(
    getServerDateFromMoment(getMomentObjFromServer(new Date()))
  );

  useEffect(() => {
    getPostAppConfig()
  }, [fcmToken])

  const getPostAppConfig = () => {
    const params = {
      device_model: appConfig?.model,
      device_platform: appConfig?.platform,
      device_brand: appConfig?.brand,
      device_token: fcmToken
    }

    if (fcmToken) {
      dispatch(postAppConfig({
        params,
        onSuccess: (response: any) => () => {
          dispatch(isWebPushRegister({
            params,
            onSuccess: (success: any) => () => {
            },
            onError: (error: any) => () => {
            }
          }))
        },
        onError: () => () => {
        },
      }))
    }
  }

  useEffect(() => {

    if (dashboardDetails) {
      conditionalRendering(dashboardDetails)
    }
  }, [hierarchicalBranchIds]);


  const conditionalRendering = (dashboardResponse: any) => {
    if (listBranchesList.length === 0) {
      if (!initialCall) {
        const params = {}
        dispatch(getListAllBranchesList({
          params,
          onSuccess: (response: any) => () => {
            const childIds = getAllSubBranches(response, dashboardResponse.company_branch.id)
            dispatch(setBranchHierarchical({ ids: { branch_id: dashboardResponse.company_branch.id, child_ids: childIds, include_child: false }, name: dashboardResponse.company_branch.name }))
            getStatsDetails({ branch_id: dashboardResponse.company_branch.id, child_ids: childIds, include_child: false })
            setInitialCall(true)
            getPostAppConfig()
          },
          onError: (error: any) => () => {
            showToast('error', error)
          },
        }))
      }
    } else {
      getStatsDetails({ ...hierarchicalBranchIds })
    }
  }

  const getStatsDetails = (obj: object) => {
    const params = {
      ...obj,
      selected_date: selectedDate,
    };
    dispatch(getEmployeeAttendanceStats({
      params,
      onSuccess: (response: any) => () => {
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

  return (
    <>
      <ScreenContainer>
        <Container additionClass={'d-flex justify-content-end mr-xl--3'}>
          <Container additionClass="col-xl-3">
            <ChooseBranchFromHierarchical />
          </Container>
        </Container>
        <Container>
          <Charts />
        </Container>
      </ScreenContainer>
    </>
  );
}

export default Dashboard;
