import { Card, Container, Primary, Secondary } from "@components";
import { useTranslation } from "react-i18next";

import React from "react";

const DashboardStats = () => {
  const { t } = useTranslation();
  const data = [
    { id: "1", name: "total" },
    {
      id: "2",
      name: "count",
    },
    {
      id: "3",
      name: "present",
    },
    { id: "1", name: "total" },
    {
      id: "2",
      name: "count",
    },
    {
      id: "3",
      name: "present",
    },
  ];

  return (
    <Container
      additionClass={"row"}
      justifyContent={"justify-content-around"}
      margin={"m-4"}
    >
      <Container>
        <h1>{"Dashboard Details"}</h1>
      </Container>
      {data.map((el) => {
        return (
          <Card
            additionClass="col-xl-3 col-md-3 "
            margin={"m-2"}
            children={
              <Container
                justifyContent={"justify-content-between"}
                alignItems={"align-content-center"}
                flexDirection={"column"}
              >
                <Container>
                  <div className="text-center h1 font-weight-300">{el.id}</div>
                  <div className="text-center h2">{el.name}</div>
                </Container>

                <Primary
                  additionClass={'btn-block'}
                  text={t("Tap to View")}
                  size={'btn-sm'}
                  onClick={() => console.log("clicked")}
                />
              </Container>
            }
          ></Card>
        );
      })}
      <Container margin={"mt-5"}>
        <Container>
          <h1>{"Departments"}</h1>
        </Container>
        
      </Container>
    </Container>
  );
};

export default DashboardStats;
