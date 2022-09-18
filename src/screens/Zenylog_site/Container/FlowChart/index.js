import React from "react";
import { Images } from "@assets";

import { Card } from "../../components";

const Flowchart = (props) => {
  return (
    <>
      <div id="FLowChart" className="container-fluid">
        <div className="card container-fluid">
          <h1 class="card-header text-website-primary mt-4 mr-xl-4 ml-xl-5 mb-5">Flow <u>Chart</u></h1>
          <div  class="mx-xl-5  mb-5 p-xl-3 row justify-content-center">
            <img src={Images.FlowChart} />
          </div>
        </div>
      </div>
    </>
  );
};
export default Flowchart;
