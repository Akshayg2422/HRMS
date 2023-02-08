import {
  Container,
  Event,
  CardTable,
  CardCalendar,
  LineCharts,
  Primary,
} from "@components";
import React, { useEffect } from "react";

import { fetchDashboardDetails, Navbar, Header, DashBoardCard } from "@modules";
import { useDashboard } from "@contexts";
import { goTo, ROUTE, useNav } from "@utils";
import { useDispatch } from "react-redux";
import { getDashboard, setBranchHierarchical } from "../../../../store/dashboard/actions";
import { useSelector } from "react-redux";import { useTranslation } from "react-i18next";


import {
  getAllBranchesList,
} from '../../../../store/location/actions';

import { LocationProps } from '../../../../components/Interface';
import { currentNavIndex } from "../../../../store/app/actions";
import { getAdminBranches } from "../../../../store/employee/actions";


function Dashboard() {
  const { t } = useTranslation();
  const navigation = useNav();
  const dispatch = useDispatch()


  const { dashboardDetails } = useSelector(
    (state: any) => state.DashboardReducer
  );

  

  useEffect(() => {
    dispatch(currentNavIndex(0))
    dispatch(getDashboard({}))
    // dispatch(getAdminBranches({}));
  }, []);
  

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
      dispatch(getAllBranchesList({
        params,
        onSuccess: (response: Array<LocationProps>) => {
          const childIds = getAllSubBranches(response, dashboardDetails.company_branch.id)
          dispatch(setBranchHierarchical({ids:{ branch_id: dashboardDetails.company_branch.id, child_ids: childIds, include_child: false }, name: dashboardDetails.company_branch.name}))
        },
        onError: () => {
        },
      }))
    }

  }, [dashboardDetails]);

  return (
    <>
      {dashboardDetails && dashboardDetails.user_details && <div className="mx--3 my--4"><Header /></div>}
      <div className='my-5'>
        <DashBoardCard />
      </div>
    </>
  );
}

export default Dashboard;
