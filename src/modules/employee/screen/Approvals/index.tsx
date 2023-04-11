import React from "react";
import { Icons } from "@assets";
import { Card, Container, ImageView } from "@components";
import { ROUTE, useNav } from "@utils";

function Approvals() {
  const navigate = useNav();

  const APPROVALS_ITEM = [
    {
      id: "1",
      name: "Employees Leaves",
      value: "MB",
      route: ROUTE.ROUTE_LEAVE_REQUEST,
      icon: Icons.EMPLOYEELEAVES,
    },
    {
      id: "2",
      name: "Modify logs",
      value: "ML",
      route: ROUTE.ROUTE_MODIFY_LOGS,
      icon: Icons.Modify_Logs,
    },

    {
      id: "3",
      name: "Employees shifts",
      value: "CA",
      route: ROUTE.ROUTE_EMPLOYEES_SHIFTS,
      icon: Icons.EMPLOYEESHIFTS,
    },
    {
      id: "4",
      name: "Shift Request",
      value: "CA",
      route: ROUTE.ROUTE_SHIFT_REQUEST,
      icon: Icons.ShiftRequest,
    },
    {
      id: "5",
      name: "Face Re-register",
      value: "ML",
      route: ROUTE.ROUTE_FACE_RE_REGISTER_REQUEST,
      icon: Icons.FaceRequest,
    },
    {
      id: "6",
      name: "Log Approval",
      value: "EL",
      route: ROUTE.ROUTE_LOG_APPROVAL,
      icon: Icons.FaceApproval,
    },
    {
      id: "7",
      name: "Face Approval",
      value: "MS",
      route: ROUTE.ROUTE_FACE_RE_REQUEST,
      icon: Icons.FaceRequest,
    },

  ];

  return (
    <div className="main-content">
      <Container flexDirection={"row"} margin={"mt-3"} style={{ cursor: 'pointer' }}>
        {APPROVALS_ITEM.map((it, index) => {
          return (
            <Container additionClass={"col-xl-3 col-md-6"}>
              {/* <Card
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
                    height={60}
                    width={60}
                  />
                </Container>
                <div className="col">
                  <h5 className="text-black h3 mb-0 mt-2 font-weight-bold">
                    {it.name}
                  </h5>
                  <Container
                    additionClass={`rounded px-2 ${index === 0 ? "bg-success" : "bg-white"
                      }`}
                  ></Container>
                </div>
              </Container>
            </Card> */}
              <Card
                additionClass={"d-flex"}
                onClick={() => navigate(it.route)}
              >
                <Container
                  additionClass={"d-flex py-3"}
                >
                  <ImageView icon={it?.icon} alt={it.name} height={50} width={50} />
                  <h4 className="text-black m-auto font-weight-bold">
                    {it.name}
                  </h4>
                </Container>
              </Card>
            </Container>
          );
        })}
      </Container>
    </div>
  );
}

export default Approvals;
