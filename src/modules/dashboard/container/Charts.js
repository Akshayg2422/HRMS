import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { useSelector } from "react-redux";
import {
  chartOptions,
  parseOptions,
  chartExample6,
  chartExample7
} from "./variables/charts";
import { Container, NoRecordFound } from "@components";

function Charts() {

  const { employeeattendancedatalog } = useSelector(
    (state) => state.EmployeeReducer
  );

  const { hierarchicalBranchIds } = useSelector(
    (state) => state.DashboardReducer
  );

  const [barChart, setBarChart] = useState()
  const [lineChart, setLineChart] = useState()


  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  useEffect(() => {
    barChartNormalizedData()
    lineChartNormalizedData()
  }, [employeeattendancedatalog]);

  const barChartNormalizedData = () => {
    const barChartDataSet = { labels: [], dataset: [] }
    employeeattendancedatalog && Object.keys(employeeattendancedatalog).length > 0 && employeeattendancedatalog?.cards.filter((el) => {
      if (el.title !== "Total") {
        if (el?.count > 0) {
          barChartDataSet.labels.push(el?.title)
          barChartDataSet.dataset.push(el?.count)
        }
      }
    })
    setBarChart(barChartDataSet)
  }

  function getChartColor(statusType) {
    let color = ''
    switch (statusType) {
      case "Present":
        color = '#05dd7f'
        break;
      case "Alert":
        color = '#FFA500'
        break;
      case "Exempted":
        color = '#ce338b'
        break;
      case "Yet To Start":
        color = '#b3b3b3'
        break;
      case "Absent":
        color = '#ff0f3f'
        break;
      case "Leave":
        color = '#de9b00'
        break;
      case "Holiday":
        color = '#5d00ff'
        break;
      case "Week Off":
        color = '#5d00ff'
        break;
      default:
        color = '#000000'
    }
    return color
  }
  const DynamicColor = (name) => {
    let color = []
    name && name.length > 0 && name.map((el) => {
      color = [...color, getChartColor(el)]
    })
    return color
  }


  const lineChartNormalizedData = () => {
    const lineChartDataSet = {
      labels: [], dataset: {
        present: [],
        absent: [],
        to_start: [],
        alert: []
      }
    }
    employeeattendancedatalog && Object.keys(employeeattendancedatalog).length > 0 && employeeattendancedatalog?.departments_stats.filter((el) => {
      lineChartDataSet.labels.push(el?.name)
      Object.keys(el).map((element) => {
        if (element === 'present') {
          lineChartDataSet.dataset.present.push(el.present ? el.present : 0)
        }
        else if (element === 'absent') {
          lineChartDataSet.dataset.absent.push(el.absent ? el.absent : 0)
        }
        else if (element === 'to_start') {
          lineChartDataSet.dataset.to_start.push(el.to_start ? el.to_start : 0)
        }
        else if (element === 'alert') {
          lineChartDataSet.dataset.alert.push(el.alert ? el.alert : 0)
        }

      })
    })
    setLineChart(lineChartDataSet)
  }

  const pieChartData = {
    data: {
      labels: barChart?.labels,
      datasets: [
        {
          data: barChart?.dataset,
          backgroundColor: DynamicColor(barChart?.labels),
          label: "Count"
        }
      ],
    }
  };


  const lineChartData = {
    data: {
      labels: lineChart?.labels,
      datasets: [
        {
          label: "Present",
          backgroundColor: getChartColor("Present"),
          data: lineChart?.dataset?.present,
          maxBarThickness: 10
        },
        {
          label: "Absent",
          backgroundColor: getChartColor("Absent"),
          data: lineChart?.dataset?.absent,
          maxBarThickness: 10
        },
        {
          label: "Yet To Start",
          backgroundColor: getChartColor("Yet To Start"),
          data: lineChart?.dataset?.to_start,
          maxBarThickness: 10
        },
        {
          label: "Alert",
          backgroundColor: getChartColor("Alert"),
          data: lineChart?.dataset?.alert,
          maxBarThickness: 10
        }
      ]
    },
  }

  function validateArrayData(arr) {
    const hasNonZeroElement = arr && arr.length > 0 && arr.some((element) => element !== 0);
    return hasNonZeroElement;
  }

  return (
    <>
      <Container className="mt-6">
        <Row>
          <Col xl="6">
            <Card>
              <CardHeader>
                <h6 className="surtitle">Overview</h6>
                <h5 className="h3 mb-0">All Employees</h5>
              </CardHeader>
              <CardBody>
                <div className="chart">
                  {validateArrayData(pieChartData?.data?.datasets[0]?.data) ? <Pie
                    data={pieChartData.data}
                    options={chartExample6.options}
                    className="chart-canvas"
                    id="chart-pie"
                  /> : <NoRecordFound />}
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="6">
            <Card>
              <CardHeader>
                <h6 className="surtitle">Overview</h6>
                <h5 className="h3 mb-0">Department</h5>
              </CardHeader>
              <CardBody style={{ overflowX: 'auto' }} className={'scroll-hidden'}>
                <div className="chart" style={{ width: '700px' }}>
                  <Bar
                    data={lineChartData.data}
                    options={chartExample7.options}
                    className="chart-canvas"
                    id="chart-bar-stacked"
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Charts;
