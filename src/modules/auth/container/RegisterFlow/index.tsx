import React from "react";
import { Container } from "@components";
type RegisterFlowProps = {
  current: number;
};

const RegisterFlow = ({ current }: RegisterFlowProps) => {
  const FLOW_DATA = [
    { id: 1, heading: '1', title: "adminProfile" },
    { id: 3, heading: '2', title: "Company profile" },
    { id: 4, heading: '3', title: "Document Upload" },
  ];
  return (
    <Container
    additionClass={'container'}
      display={'d-flex'}
      alignItems={"align-items-center"}
      margin={"my-1"}
      >
      {FLOW_DATA.map((it, index) => {
        return (
          <>
            <span
              className={`badge badge-lg badge-circle  mr-3 ${current === it.id 
                  ? "badge-primary text-white"
                  : "bg-white text-light"
                }`}
            >
              {it.heading}
            </span>
            <small>{it.title}</small>
            {index !== FLOW_DATA.length - 1 && (
              <hr className="col-sm-1 ml-3 mr-3"></hr>
            )}
          </>
        );
      })}
    </Container>
  );
};
export default RegisterFlow;
