import React from "react";
import { Icons } from "@assets";
import { Card, Container, ImageView } from "@components";
import { ROUTE, useNav } from "@utils";

function DashBoardCard() {
  const navigate = useNav();
  const NAV_ITEM = [
    // {id: '1', name: 'Dashboard', value: 'DA', icon: 'ni ni-chart-pie-35', route: ROUTE.ROUTE_DASHBOARD},
    {
      id: "2",
      name: "Employee Portfolio",
      value: "EP",
      icon: Icons.EmployeeSecondary,
      route: ROUTE.ROUTE_EMPLOYEE,
    },
    {
      id: "3",
      name: "Location Portfolio",
      value: "LP",
      icon: Icons.LocationSecondary
      ,
      route: ROUTE.ROUTE_LOCATION,
    },
    // {id: '4', name: 'Reports', value: 'RE', icon: 'ni ni-single-copy-04', route: ROUTE.ROUTE_REPORT},
    {
      id: "4",
      name: "Assign Location",
      value: "AL",
      icon: Icons.AssignLocation,
      route: ROUTE.ROUTE_ASSIGN_LOCATION,
    },
    {
      id: "5",
      name: "Manage Fence Admin",
      value: "FA",
      icon: Icons.Admin,
      route: ROUTE.ROUTE_FENCE_ADMIN,
    },
    {
      id: "6",
      name: "Employee Log",
      value: "EL",
      icon: Icons.Employee,
      route: ROUTE.ROUTE_EMPLOYEE_LOG,
    },
    {
      id: "7",
      name: "Work Book",
      value: "WB",
      icon: Icons.Department,
      route: ROUTE.ROUTE_EMPLOYEE_WORK_BOOK,
    },
    {
      id: "8",
      name: "Stats",
      value: "ST",
      icon: Icons.Statistics,
      route: ROUTE.ROUTE_DASHBOARD_STATS,
    },
    {
      id: "9",
      name: "My Portfolio",
      value: "MP",
      icon: Icons.Clients,
      route: ROUTE.ROUTE_PORTFOLIO,
    },
    {
      id: "10",
      name: "Calendar",
      value: "CA",
      icon: Icons.CalendarSecondary,
      route: ROUTE.ROUTE_CALENDAR,
    },
  ];

  return (
    <Container flexDirection={"row"} margin={"mt-3"}>
      {NAV_ITEM.map((it, index) => {
        return (
          <Container additionClass={"col-xl-3 col-md-6"}>
            <Card
              additionClass={"border"}
              style={{ border: "1px bg-gray" }}
              onClick={() => navigate(it.route)}
            >
              <Container
                additionClass={"row py-3"}
                justifyContent={"justify-content-center"}
              >
                <Container col={"col-auto"} alignItems={"align-items-center"}>
                  <ImageView additionClass={'m-0'} icon={it.icon} alt={it.name} height={50} width={50} />
                </Container>
                <div className="col">
                  <h5 className="text-black h3 mb-0 mt-2 font-weight-bold">
                    {it.name}
                  </h5>
                  {/* <h2 className="h2 font-weight-bold mb-0">{it.value}</h2> */}
                  <Container
                    additionClass={`rounded px-2 ${
                      index === 0 ? "bg-success" : "bg-white"
                    }`}
                  >
                    {/* <h5 className={`font-weight-light ${index === 0 ? 'text-gary' : 'text-white'}`}>{it?.alert}</h5> */}
                  </Container>
                </div>
              </Container>
            </Card>
          </Container>
        );
      })}
    </Container>
  );
}

export default DashBoardCard;
