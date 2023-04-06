import {
  Container,
  Event,
  CardTable,
  CardCalendar,
  LineCharts,
  Primary,
} from "@components";
import React, { useEffect } from "react";

import { fetchDashboardDetails, Navbar, Header, DashBoardCard, DashboardStats } from "@modules";
import { useDashboard } from "@contexts";
import { goTo, ROUTE, showToast, useNav } from "@utils";
import { useDispatch } from "react-redux";
import { getDashboard, setBranchHierarchical } from "../../../../store/dashboard/actions";
import { useSelector } from "react-redux"; import { useTranslation } from "react-i18next";


import {
  getListAllBranchesList,
} from '../../../../store/location/actions';

import { LocationProps } from '../../../../components/Interface';
import { currentNavIndex } from "../../../../store/app/actions";
import { getAdminBranches } from "../../../../store/employee/actions";
import { isWebPushRegister, postAppConfig, webPushRegister } from "../../../../store/auth/actions";


function Dashboard() {
  const { t } = useTranslation();
  const navigation = useNav();
  const dispatch = useDispatch()


  const { dashboardDetails } = useSelector(
    (state: any) => state.DashboardReducer
  );

  const { appConfig, fcmToken, isWebPushRegisterController } = useSelector(
    (state: any) => state.AuthReducer
  );

  useEffect(() => {
      getPostAppConfig()
  }, [fcmToken])

  useEffect(() => {

    const params = {}
    dispatch(getDashboard({
      params,
      onSuccess: (success: any) => () => {

      },
      onError: (error: any) => () => {

      }
    }))
  }, [])
  // console.log("isWebPushRegisterController", isWebPushRegisterController);


  const getPostAppConfig = () => {
    const params = {
      device_model: appConfig?.model,
      device_platform: appConfig?.platform,
      device_brand: appConfig?.brand,
      device_token: fcmToken
    }
    console.log('params------------->', params);
    
    dispatch(postAppConfig({
      params,
      onSuccess: (response: any) => () => {
        console.log("web config success-->", response);
        const param = false
        dispatch(isWebPushRegister({
          param,
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

  useEffect(() => {
    if (dashboardDetails) {
      const params = {}
      dispatch(getListAllBranchesList({
        params,
        onSuccess: (response: Array<LocationProps>) => () => {
          const childIds = getAllSubBranches(response, dashboardDetails.company_branch.id)
          dispatch(setBranchHierarchical({ ids: { branch_id: dashboardDetails.company_branch.id, child_ids: childIds, include_child: false }, name: dashboardDetails.company_branch.name }))
        },
        onError: () => () => {
        },
      }))
    }

  }, []);

  return (
    <>
      <div className='my-5'>
        <DashboardStats />
      </div>
    </>
  );
}

export default Dashboard;
