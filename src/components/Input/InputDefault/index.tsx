import React, { useState } from "react";
import { InputProps } from "../../Interface";
import "./input.css";

const Input = React.forwardRef(({
  label,
  size = 'md',
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
  onFocus,
  defaultValue
}: InputProps, ref: any) => {
  const [validStatus, setValidStatus] = useState({ status: true, error: "" });

  return (
    <div className={`form-group w-100  ${col}`}>
      {label && <small className="form-control-label text-black">{label}</small>}
      <input
        className={`form-control mt-2  ${formCustomClass}`}
        type={type}
        onFocus={onFocus}
        value={value}
        min={min}
        max={max}
        defaultValue={defaultValue}
        name={name}
        ref={ref}
        disabled={disabled}
        maxLength={maxLength}
        autoComplete={'off'}
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
