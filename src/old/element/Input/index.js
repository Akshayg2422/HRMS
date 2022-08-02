import React from "react";

export const INPUT_SIZE = { SMALL: "SMALL", MEDIUM: "MEDIUM", LARGE: "LARGE" };
export const INPUT_TYPES = {
  TEXT: "TEXT",
  EMAIL: "EMAIL",
  PHONE: "PHONE",
  PASSWORD: "PASSWORD",
  NUMBER: "NUMBER",
};
const Input = (props) => {
  let SIZE = props?.SIZE ? props.SIZE : INPUT_SIZE.MEDIUM;
  let TYPE=props?.TYPE ? props.TYPE : INPUT_TYPES.TEXT

  let SIZE_CLASS = SIZE === INPUT_SIZE.LARGE ? "lg" : SIZE === INPUT_SIZE.SMALL ? "sm" : "md";

  return (
    <div>
      <label>{lable}</label>
      <br />
      <input
        className={`form-control-${SIZE_CLASS} col-12`}
        type={inputType}
        placeholder={placeholder}
        id={`example-${id}-input`}
      />
    </div>
  );
};
export default Input;
