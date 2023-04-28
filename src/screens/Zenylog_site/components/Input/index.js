import React, { useState } from "react";

export const INPUT_SIZE = { SMALL: "SMALL", MEDIUM: "MEDIUM", LARGE: "LARGE" };
export const INPUT_TYPES = {
  TEXT: "TEXT",
  EMAIL: "EMAIL",
  PHONE: "PHONE",
  PASSWORD: "PASSWORD",
  NUMBER: "NUMBER",
};
export const Item = (props) => {

  let SIZE = props?.SIZE ? props.SIZE : INPUT_SIZE.MEDIUM;
  let TYPE = props?.TYPE ? props.TYPE : INPUT_TYPES.TEXT;

  let SIZE_CLASS =
    SIZE === INPUT_SIZE.LARGE ? "lg" : SIZE === INPUT_SIZE.SMALL ? "sm" : "lg";

  const [error, setError] = useState("");

  return (
    <div class="form-group">
      <label for="example-text-input" class="form-control-label">
        {props.label}
      </label>
      <input
        class="form-control"
        type="text"
        value={props.value}
        onChange={(it) => {
          // setError(props.validate(it.target.value));
          props.onChange(it.target.value);
        }}
        placeholder={`${props.placeholder}`}
        id="example-text-input"
      />
      {error && <code class="text-danger">{error}</code>}
    </div>
  );
};
