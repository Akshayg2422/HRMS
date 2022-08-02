import React from "react";
import PropTypes from "prop-types";

export const BUTTON_SIZE = { SMALL: "SMALL", MEDIUM: "MEDIUM", LARGE: "LARGE" };
export const BUTTON_VARINAT = {
  PRIMARY: "PRIMARY",
  SECONDARY: "SECONDARY",
  DISABLED: "DISABLED",
};

const Container = (props) => {
  
    return (
    <div>
       {props.children}
    </div>
  );
};

export default Container;
