import React, { useState } from "react";
import { InputProps } from "../../Interface";
import "./input.css";

const  Input = React.forwardRef(({
  label,
  size,
  value,
  onChange,
  placeholder,
  error,
  maxLength,
  type,
  min,
  max,
  divClass,
  formCustomClass,
  col,
  validator,
  name,
  disabled,
}: InputProps, ref: any )=> {
  const [validStatus, setValidStatus] = useState({ status: true, error: "" });

  return (
    <div className={`form-group w-100  ${col}`}>
      {label && <small className="form-control-label">{label}</small>}
      <input
        className={`form-control mt-2  ${formCustomClass}`}
        type={type}
        value={value}
        min={min}
        max={max}
        name={name}
        ref={ref}
        disabled={disabled}
        maxLength={maxLength}
      
        onChange={(it) => {
          if (validator) {
            setValidStatus(validator(it.target.value));
          }
          if (onChange) {
            onChange(it);
          }
        }}
        placeholder={placeholder}
        id="example-text-input"
      />
      {validStatus.error !== null && (
        <code className="text-danger">{validStatus.error}</code>
      )}
    </div>
  );
});

export default Input;
