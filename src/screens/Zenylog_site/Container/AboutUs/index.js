import React from "react";
import { Icons } from "@assets";

const AboutUs = (props) => {
  return (
    <>
      <div id="AboutAs" className="row mt-5">
        <div className="col-sm-6 my-5">
          <img
            src={Icons.Group2}
            height={"100%"}
            width={"80%"}
            className="ml-xl-6 ml-sm-0 ml-4"
          ></img>
        </div>
        <div class="col-sm-6 row d-flex align-items-center justify-content-center ">
          <div class="col-lg-10">
            <h1 class="container-fluid text-website-primary mt-3 mt-sm-0">
              About <u>us</u>
            </h1>
            <p class="container-fluid mb-5">
              The idea of ZenyQ was constituted on the base line of filling the
              void and solving the problems faced by enterprises in day-to-day
              business in managing Human Resources. The life-altering pandemic
              has given rise to the demand to further modernise the cutting-edge
              technology we possess today. It was about time that we modernize
              the traditional form of tracking attendance, paying salary and
              computing the taxes that come along with it.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
