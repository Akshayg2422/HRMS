import React from "react";
import { Icons } from "@assets";
import { Card, Container, ImageView } from "@components";
import { ROUTE, useNav } from "@utils";

function PortFolio() {
  const navigate = useNav();

  const MY_PORTFOLIO_ITEM = [
    {
      id: "1",
      name: "MY Work Book",
      value: "MB",
      route: ROUTE.ROUTE_MY_WORK_BOOK,
      icon: Icons.myLogBook,
    },
    {
      id: "2",
      name: "MY Log",
      value: "ML",
      route: ROUTE.ROUTE_MY_LOG,
      icon: Icons.MyLog,
    },

    {
      id: "3",
      name: "Calendar",
      value: "CA",
      route: ROUTE.ROUTE_MANAGE_LEAVES,
      icon: Icons.CalendarSecondary,
    },
    {
      id: "4",
      name: "My Leaves",
      value: "ML",
      route: ROUTE.ROUTE_MY_LEAVES,
      icon: Icons.myLeaves  ,
    },
    {
      id: "5",
      name: "E-Locker",
      value: "EL",
      route: ROUTE.ROUTE_E_LOCKER,
      icon: Icons.E_Locker  ,
    }
  ];

  return (
    <Container flexDirection={"row"} margin={"mt-3"}>
      {MY_PORTFOLIO_ITEM.map((it, index) => {
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
                  <ImageView
                    additionClass={"m-0"}
                    icon={it?.icon}
                    alt={it.name}
                    height={50}
                    width={50}
                  />
                </Container>
                <div className="col">
                  <h5 className="text-black h3 mb-0 mt-2 font-weight-bold">
                    {it.name}
                  </h5>
                  <Container
                    additionClass={`rounded px-2 ${
                      index === 0 ? "bg-success" : "bg-white"
                    }`}
                  ></Container>
                </div>
              </Container>
            </Card>
          </Container>
        );
      })}
    </Container>
  );
}

export default PortFolio;
