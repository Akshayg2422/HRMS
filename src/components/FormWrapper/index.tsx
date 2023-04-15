import React from "react";
import { BackArrow, Primary } from "@components";

interface FormWrapperProps {
  title?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  hideFooter?: boolean;
  buttonTittle?: string;
  buttonDisable?: boolean;
  isTitle?:boolean
}

function index({
  title,
  children,
  onClick,
  buttonTittle,
  buttonDisable = false,
  hideFooter = false,
  isTitle = false
}: FormWrapperProps) {
  return (
    <div className="">
      <div className="">
        <div className="card">
          {!isTitle && (
            <>
              {/* <BackArrow additionClass={'mt-4 ml-4'} /> */}
              <div className="card-header">
                <h3 className="mb-0">{title} </h3>
              </div>
            </>
          )}
          <div className="card-body">
            <form id="create-form">
              <div className=" justify-content-left">
                <div className="">{children}</div>
              </div>
            </form>
            {!hideFooter && (
              <div className="  mt-4 mb-3 mr-2 float-right">
                <Primary
                  disabled={buttonDisable}
                  text={buttonTittle ? buttonTittle : "Submit"}
                  onClick={onClick}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
