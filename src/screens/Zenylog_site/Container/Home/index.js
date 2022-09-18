import React from "react";
import { Icons } from "@assets";

const Home = (props) => {
  return (
    <>
      <div id="Home" className="row mt-3 mb-5 container-fluid">
        <div className="col-sm-4 row  align-items-center">
          <div class="display-2 ml-5">
            <div class="display-2 text-primary">DIGITALIZING</div>
            <div class="display-1 text-primary">HUMAN</div>
            <div className="display-2 text-website-primary">RESOURCES</div>
          </div>
        </div>
        <div className="col-sm-8">
          <img src={Icons.Group1} height={"100%"} width={"100%"}></img>
        </div>
      </div>
    </>
  );
};

export default Home;
