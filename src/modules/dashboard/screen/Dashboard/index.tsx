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
import { getDashboard } from "../../../../store/dashboard/actions";
import { useSelector } from "react-redux";import { useTranslation } from "react-i18next";

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

  useEffect(() => {
    dispatch(getDashboard({}))
  }, []);

  return (
    <>
      <Navbar />
      <div className="main-content">
        {dashboardDetails && dashboardDetails.user_details && <Header />}
        <Container additionClass={"main-description"}>
          <Container additionClass={"container-fluid"}>
            <DashBoardCard />
              <Container additionClass={'container-fluid mt-3'}>
                <LineCharts
                  title={"Overview"}
                  datas={LineChartdata}
                  height={280}
                  themeColor={"#CBCBCB"}
                  width={"95%"}
                  linename1={"UV"}
                  linename2={"PV"}
                  lineDataKey1={"uv"}
                  lineDataKey2={"pv"}
                  StrokeLine2={"#82ca9d"}
                  StrokeLine1={"#8884d8"}
                  // yaxisLabel={"Amount"}
                  // xaxisLabel={"Page"}
                  dataKeyXaxis={"name"}
                  children={ChartRadioData.map((Item) => {
                    return (
                      <>
                        <label className={"mr-5"}>
                          <input type="radio" name="options" />
                          <span className="ml-2">{Item}</span>
                        </label>
                      </>
                    );
                  })}
                />
              </Container>
            <Container  additionClass={'container-fluid mt-3'}>
              <CardTable displayDataSet={dummyTable} title={t("table")} />
            </Container>
          </Container>
        </Container>
      </div>
    </>
  );
}

export default Dashboard;
