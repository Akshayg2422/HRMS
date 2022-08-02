import React from "react";
import Group1 from "../../../../assets/images/Group1/Group1.png";
import Group2 from "../../../../assets/images/Group2/Group2.png";

const Home = (props) => {
  return (
    <>
      <div className="row mt-3 mb-5 container-fluid">
        <div className="col-sm-4 row justify-content-end align-items-center">
          <h1>
            DIGITALIZING <br /> HUMAN <br /> RESOURCES
          </h1>
        </div>
        <div className="col-sm-8">
          <img src={Group1} height={"100%"} width={"100%"}></img>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-sm-6 mt-5">
          <img src={Group2} height={"100%"} width={"80%"} align="right"></img>
        </div>
        <div class="col-sm-6 row d-flex align-items-center justify-content-center ">
          <div class="col-lg-7">
            <h1  class="container-fluid">About us</h1>
            <p class="container-fluid mb-5">
              The idea of Zenylog was constituted on the base line of filling
              the void and solving the problems faced by enterprises in
              day-to-day business in managing Human Resources. The life-altering
              pandemic has given rise to the demand to further modernise the
              cutting-edge technology we possess today. It was about time that
              we modernize the traditional form of tracking attendance, paying
              salary and computing the taxesthat come along with it.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
