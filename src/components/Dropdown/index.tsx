import React, { useEffect, useRef } from "react";
import { Container } from "@components";
import { ContainerProps } from "../Interface";
import './styles.css';
import { ReactI18NextChild } from "react-i18next";


interface DropDownProps extends ContainerProps {
  label?: string;
  placeholder?: string;
  data?: Array<{ id?: string | number; name?: string; value?: string | number, title?: string, type?: string, group_name?: string }> | any;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  name?: string
  title?: string
  value?: any
  id?: string
  isDisabled?: boolean
  showArrow?: boolean
}

const DropDown = (({
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
  showArrow = true,
  ...props
}: DropDownProps) => {

  const selectRef = useRef(null);


  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    if (selectedValue === placeholder) {
      return " "
    }
    if (onChange)
      onChange(event);
  }


  return (
    <div className={`form-group`}>
      {label && <small className="form-control-label text-black ">{label}</small>}
      <select ref={selectRef} value={value} className={`form-control mt-2  ${showArrow && "form-select"}  ${isDisabled&&`bg-white`}`} {...props} onChange={handleSelectChange} name={name} disabled={isDisabled}
      >
        <option>{placeholder}</option>
        {data && data.length > 0 && data.map((item: { id: any; type: any; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | Iterable<ReactI18NextChild> | null | undefined; group_name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | Iterable<ReactI18NextChild> | null | undefined; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | Iterable<ReactI18NextChild> | null | undefined; }, index: React.Key | null | undefined) => (
          <>
            <option className="dropdown-item" key={index} value={item?.id || item?.type}>
              {item?.name ? item?.name : item?.group_name}  {item?.title}
            </option>
          </>
        ))}
      </select>
      {error && <code className="text-danger">{error}</code>}
    </div>
  )
});

export default DropDown;
