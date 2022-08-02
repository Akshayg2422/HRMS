import React from "react";
import { Button } from "../../../../components";

const LogoHeader = () => {
  return (
    <div class="row align-items-center py-5 col-12">
      <div class="col-lg-6 col-7">
      <Button className="col-4" normal text={"REGISTER"}/>
      </div>
      <div class="col-lg-6 col-5 text-right">
      <Button className="col-4" normal text={"REGISTER"}/>
      </div>
    </div>
  );
};
export default LogoHeader;
