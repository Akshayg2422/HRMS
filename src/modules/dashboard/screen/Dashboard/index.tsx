import { Line, Bar, Doughnut, Pie } from "react-chartjs-2";
// import { Chart, ArcElement, CategoryScale, registerables, plugins } from 'chart.js'

import React, { useEffect, useRef, useState } from "react";
import { DashboardStats } from "@modules";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { isWebPushRegister, postAppConfig } from "../../../../store/auth/actions";
import { Card, Container, ScreenContainer } from "@components";
import { Row, Col, CardHeader, CardBody } from "reactstrap";
import Charts from '../../container/Charts'

var colors = {
  gray: {
    100: "#f6f9fc",
    200: "#e9ecef",
    300: "#dee2e6",
    400: "#ced4da",
    500: "#adb5bd",
    600: "#8898aa",
    700: "#525f7f",
    800: "#32325d",
    900: "#212529"
  },
  theme: {
    present: '#05dd7f',
    alert: '#ff481f',
    yetToStart: '#b3b3b3',
    exempted: '#ce338b',
    absent: '#ff0f3f',
    leave: '#2445ff'
  },
  black: "#12263F",
  white: "#FFFFFF",
  transparent: "transparent"
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
  const [barChart, setBarChart] = useState<any>()

  var mode = "light";
  var fonts = {
    base: "Open Sans"
  };

  // Chart.register(ArcElement);
  // Chart.register(...registerables);
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
  //             borderColor: colors.theme["leave"],
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
  //       callback: function (value: number) {
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
    barChartData()
  }, []);

  const barChartData = () => {
    const barChartDataSet: any = { labels: [], dataset: [] }
    employeeattendancedatalog && Object.keys(employeeattendancedatalog).length > 0 && employeeattendancedatalog?.cards.filter((el: any) => {
      if (el.title !== "Total") {
        barChartDataSet.labels.push(el?.title)
        barChartDataSet.dataset.push(el?.count)
      }
    })
    setBarChart(barChartDataSet)
  }

  function getChartColor(statusType: any) {
    let color = ''
    switch (statusType) {
      case "Present":
        color = colors.theme["present"]
        break;
      case "Alert":
        color = colors.theme["alert"]
        break;
      case "Exempted":
        color = colors.theme["exempted"]
        break;
      case "Yet To Start":
        color = colors.theme["yetToStart"]
        break;
      case "Absent":
        color = colors.theme["absent"]
        break;
      case "Leave":
        color = colors.theme["leave"]
        break;
      default:
        color = '#000000'
    }
    return color
  }
  const DynamicColor = (name: any) => {
    let color: any = []
    name && name.length > 0 && name.map((el: any) => {
      color = [...color, getChartColor(el)]
    })
    return color
  }

  const chartExample6: any = {
    data: {
      labels: barChart?.labels,
      datasets: [
        {
          data: barChart?.dataset,
          backgroundColor: DynamicColor(barChart?.labels),
          label: "Count"
        }
      ]
    }
  };



  return (
    <>
      <ScreenContainer>
       {/* <Charts/> */}
      </ScreenContainer>

    </>
  );
}

export default Dashboard;
