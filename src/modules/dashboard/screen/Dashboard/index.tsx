import {
  Container,
  Event,
  CardTable,
  CardCalendar,
  LineCharts,
  Primary,
  CommonDropdownMenu,
  Card,
} from "@components";
import React, { useEffect, useState } from "react";

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
import { isWebPushRegister, postAppConfig } from "../../../../store/auth/actions";
import { CardHeader, CardBody } from "reactstrap";
import { Bar } from "recharts";


function Dashboard() {
  const dispatch = useDispatch()

const [chartExample7 , setChartExample7] = useState<any>()
  const { appConfig, fcmToken } = useSelector(
    (state: any) => state.AuthReducer
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

    dispatch(postAppConfig({
      params,
      onSuccess: (response: any) => () => {
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

  return (
    <>
      <div className='my-5'>
        <DashboardStats />
        {/* <Card>
              <CardHeader>
                <h6 className="surtitle">Overview</h6>
                <h5 className="h3 mb-0">Product comparison</h5>
              </CardHeader>
              <CardBody>
                <div className="chart">
                  <Bar
                    data={chartExample7.data}
                    options={chartExample7.options}
                    className="chart-canvas"
                    id="chart-bar-stacked"
                  />
                </div>
              </CardBody>
            </Card> */}
      </div>
    </>
  );
}

export default Dashboard;
