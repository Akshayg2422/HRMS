import React from "react";
import { Container } from "@components";
type RegisterFlowProps = {
  current: number;
};

const RegisterFlow = ({ current }: RegisterFlowProps) => {
  const FLOW_DATA = [
    { id: 1, heading: '1', title: "Admin Profile" },
    { id: 3, heading: '2', title: "Company profile" },
    { id: 4, heading: '3', title: "Document Upload" },
  ];
  return (
    <div className='container-fluid d-flex'>
      {FLOW_DATA.map((it, i) => {
        return (
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <div
              className={`badge badge-lg badge-circle col-xl-2 col-sm-0 col-2 ${current === it.id
                ? "badge-primary text-white"
                : "bg-white text-light"
                }`}
            >
              {it.heading}
            </div>
            <div className='col-xl-4'> <small>{it.title} </small></div>
            {i !== FLOW_DATA.length - 1 && (
              <hr className="col-sm-1  position-relative ml-xl-5 bg-primary"></hr>
            )}
          </div>
        );
      })}
    </div>
  );
};
export default RegisterFlow;
