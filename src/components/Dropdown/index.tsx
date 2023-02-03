import React from "react";
import { Container } from "@components";
import { ContainerProps } from "../Interface";

interface DropDownProps extends ContainerProps {
  label?: string;
  placeholder?: string;
  data?: Array<{ id?: string | number; name?: string; value?: string | number, title?: string, type?: string, group_name?: string }>;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  name?: string
  title?: string
  value?: any
  id?: string
  isDisabled?: boolean
  showArrow?:boolean
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
  title,
  id,
  isDisabled = false,
  showArrow=true,
  ...props
}: DropDownProps) => (

  <Container additionClass={`form-group ${additionClass}`} col={col} >
    {label && <label className="form-control-label">{label}</label>}
    <select value={value} className={`form-control ${showArrow && "form-select"}`} {...props} onChange={onChange} name={name} disabled={isDisabled}>
      <option>{placeholder}</option>
      {data && data.length > 0 && data.map((item, index) => (
        <option className="dropdown-item" key={index} value={item.id || item.type}>
          {item.name ? item.name : item.group_name}  {item.title}
        </option>
      ))}
    </select>
    {error && <code className="text-danger">{error}</code>}
  </Container>
);

export default DropDown;
