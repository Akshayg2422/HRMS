import React, { useState } from "react";
import { InputProps } from "../../Interface";
import "./input.css";
import { Container } from "@components";
import { DropdownToggle } from "reactstrap";

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
  onKeyUp,
  defaultValue,
  showArrow = false,
  id
}: InputProps, ref: any) => {
  const [validStatus, setValidStatus] = useState({ status: true, error: "" });

  return (
    <div className={`form-group w-100  ${col}`}>
      {label && <small className="form-control-label text-black">{label}</small>}
      <Container additionClass="d-flex">
        <input
          className={`form-control mt-2 ${size} ${disabled && `bg-white`}  ${formCustomClass}`}
          type={type}
          id={id}
          onFocus={onFocus}
          value={value}
          min={min}
          max={max}
          defaultValue={defaultValue}
          name={name}
          ref={ref}
          onKeyUp={onKeyUp}
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
          // id="example-text-input"
        />
        {showArrow && <span className="mr-4" style={{ position: 'absolute', right: 0, top: '30%' }} ><i className="fa fa-angle-down" style={{ fontSize: '12px' }}></i></span>}
      </Container>
      {validStatus.error !== null && (
        <code className="text-danger">{validStatus.error}</code>
      )}
    </div>
  );
});

export default Input;
