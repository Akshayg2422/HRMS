import { Line, Bar, Doughnut, Pie } from "react-chartjs-2";
import { Chart, ArcElement, CategoryScale, registerables } from 'chart.js'

import React, { useEffect, useRef } from "react";
import { DashboardStats } from "@modules";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { isWebPushRegister, postAppConfig } from "../../../../store/auth/actions";
import finalPropsSelectorFactory from "react-redux/es/connect/selectorFactory";
import { Card, Container, ScreenContainer } from "@components";
import { Row, Col, CardHeader, CardBody } from "reactstrap";

var colors = {

  theme: {
    present: '#05dd7f',
    alert: '#ff481f',
    yetToStart: '#808080',
    exempted: '#ce338b',
    absent: '#ff0f3f',
    leave: '#2445ff'
  },
};

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Dataset 1",
      backgroundColor: colors.theme["present"],
      data: [240, 2210, 2290, 2000, 2181, 2500, 2100],
      maxBarThickness: 10,
      stack: 'Stack 1',
    },
    {
      label: "Dataset 2",
      backgroundColor: colors.theme["absent"],
      data: [2400, 2210, 2290, 2000, 2181, 2500, 2100],
      maxBarThickness: 10,
      stack: 'Stack 1',
    },
    {
      label: "Dataset 3",
      backgroundColor: colors.theme["alert"],
      data: [2400, 2210, 2290, 2000, 2181, 2500, 2100],
      maxBarThickness: 10,
      stack: 'Stack 1',
    }
  ]
}


const options: any = {
  responsive: true,
  legend: {
    position: "center"
  },
  scales: {
    xAxes: [
      {
        stacked: true
      }
    ],
    yAxes: [
      {
        stacked: true
      }
    ]
  },

}

function Dashboard() {
  const { employeeattendancedatalog } = useSelector(
    (state: any) => state.EmployeeReducer
  );

  var mode = "light";
  var fonts = {
    base: "Open Sans"
  };

  Chart.register(ArcElement);
  Chart.register(...registerables);
  const dispatch = useDispatch()


  const { appConfig, fcmToken } = useSelector(
    (state: any) => state.AuthReducer
  );

  function parseOptions(parent: any, options: { [x: string]: any; }) {
    for (var item in options) {
      if (typeof options[item] !== "object") {
        parent[item] = options[item];
      } else {
        parseOptions(parent[item], options[item]);
      }
    }
  }


  // function chartOptions() {
  //   // Options
  //   var options = {
  //     defaults: {
  //       global: {
  //         responsive: true,
  //         maintainAspectRatio: false,
  //         defaultColor: mode === "dark" ? colors.gray[700] : colors.gray[600],
  //         defaultFontColor: mode === "dark" ? colors.gray[700] : colors.gray[600],
  //         defaultFontFamily: fonts.base,
  //         defaultFontSize: 13,
  //         layout: {
  //           padding: 0
  //         },
  //         legend: {
  //           display: false,
  //           position: "bottom",
  //           labels: {
  //             usePointStyle: true,
  //             padding: 16
  //           }
  //         },
  //         elements: {
  //           line: {
  //             tension: 0.4,
  //             borderWidth: 4,
  //             borderColor: colors.theme["primary"],
  //             backgroundColor: colors.transparent,
  //             borderCapStyle: "rounded"
  //           },
  //         },
  //         tooltips: {
  //           enabled: true,
  //           mode: "index",
  //           intersect: false
  //         }
  //       },
  //     }
  //   };

  //   // yAxes
  //   Chart.scaleService.updateScaleDefaults("linear", {
  //     gridLines: {
  //       borderDash: [2],
  //       borderDashOffset: [2],
  //       color: mode === "dark" ? colors.gray[900] : colors.gray[300],
  //       drawBorder: false,
  //       drawTicks: false,
  //       lineWidth: 1,
  //       zeroLineWidth: 1,
  //       zeroLineColor: mode === "dark" ? colors.gray[900] : colors.gray[300],
  //       zeroLineBorderDash: [2],
  //       zeroLineBorderDashOffset: [2]
  //     },
  //     ticks: {
  //       beginAtZero: true,
  //       padding: 10,
  //       callback: function (value) {
  //         if (!(value % 10)) {
  //           return value;
  //         }
  //       }
  //     }
  //   });

  //   // xAxes
  //   Chart.scaleService.updateScaleDefaults("category", {
  //     gridLines: {
  //       drawBorder: false,
  //       drawOnChartArea: false,
  //       drawTicks: false
  //     },
  //     ticks: {
  //       padding: 20
  //     }
  //   });

  //   return options;
  // }

  useEffect(() => {
    getPostAppConfig()
    // if (window.Chart) {
    //   parseOptions(Chart, chartOptions());
    // }
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

  const chartRef = useRef<any>(null);

  useEffect(() => {

  }, []);

  const chartExample6 = {
    data: {
      labels: ["Absent", "Alert", "Present", "Leave", "Yet To Start", 'Exempted'],
      datasets: [
        {
          data: [100, 10, 50, 40, 60],
          backgroundColor: [
            colors.theme["absent"],
            colors.theme["alert"],
            colors.theme["present"],
            colors.theme["leave"],
            colors.theme["yetToStart"],
            colors.theme["exempted"],
          ],
          label: "Dataset 1"
        }
      ]
    },
    options: {
      responsive: true,
      legend: {
        position: "top"
      },
      animation: {
        animateScale: true,
        animateRotate: true
      }
    }
  };


  return (
    <>
      <ScreenContainer>

      </ScreenContainer>
      <Row>
        <Col xl="6">
          <Card>
            <CardHeader>
              <h6 className="surtitle">Partners</h6>
              <h5 className="h3 mb-0">Affiliate traffic</h5>
            </CardHeader>
            <CardBody className="p-4">
              <Pie
                data={chartExample6.data}
                options={chartExample6.options}
                className="chart-canvas"
                id="chart-pie"
              />
            </CardBody>
          </Card>
        </Col>
        <Col xl="6">
          <Card>
            <CardHeader>
              <h6 className="surtitle">Overview</h6>
              <h5 className="h3 mb-0">Product comparison</h5>
            </CardHeader>
            <CardBody>
              <Bar
                data={data}
                options={options}
                className="chart-canvas"
                id="chart-bar-stacked"
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Dashboard;
