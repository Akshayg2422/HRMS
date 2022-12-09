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

const data = [
  {
    date: 12,
    month: "Mar",
    title: "Event Name",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting.",
  },
  {
    date: 12,
    month: "Mar",
    title: "Event Name",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting.",
  },
  {
    date: 12,
    month: "Mar",
    title: "Event Name",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting.",
  },
  {
    date: 12,
    month: "Mar",
    title: "Event Name",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting.",
  },
  {
    date: 12,
    month: "Mar",
    title: "Event Name",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting.",
  },
];

const ChartRadioData = ["All", "Present", "Absent", "Late"];
const LineChartdata = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const dummyTable = [
  {
    department: "Marketing",
    total: "20",
    present: "10",
    late: "99",
    absent: "10",
  },
  {
    department: "Software",
    total: "12",
    present: "08",
    late: "20",
    absent: "10",
  },
  {
    department: "Graphic",
    total: "12",
    present: "08",
    late: "20",
    absent: "10",
  },
  {
    department: "Customer Support",
    total: "12",
    present: "08",
    late: "20",
    absent: "10",
  },
];




function Dashboard() {
  const { t } = useTranslation();
  const navigation = useNav();
  const dispatch = useDispatch()


  const { dashboardDetails } = useSelector(
    (state: any) => state.DashboardReducer
  );

  console.log("dashboardDetails-->",JSON.stringify(dashboardDetails));
  

  useEffect(() => {
    dispatch(currentNavIndex(0))
    dispatch(getDashboard({}))
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
