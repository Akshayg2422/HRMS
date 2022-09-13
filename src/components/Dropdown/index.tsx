import React from "react";
import { Container } from "@components";
import { ContainerProps } from "../Interface";

interface DropDownProps extends ContainerProps {
  label?: string;
  placeholder?: string;
  data?: Array<{ id?: string; name?: string; value?: string }>;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  name?:string
  value?:  string;
}

const DropDown = ({
  label,
  placeholder,
  data,
  error,
  col,
  additionClass,
  onChange,
  name,
  value,
  ...props
}: DropDownProps) => (
  
  <Container additionClass={`form-group ${additionClass}`} col={col}>
    {label && <label className="form-control-label">{label}</label>}
    <select value={value}  className="form-control"  {...props} onChange={onChange} name={name} >
      <option >{placeholder}</option>
      { data && data.map((item, index) => (
        <option className="dropdown-item" key={index} value={item.id}>
          {item.name}
        </option>
      ))}
    </select>
    {error && <code className="text-danger">{error}</code>}
  </Container>
);

export default DropDown;
