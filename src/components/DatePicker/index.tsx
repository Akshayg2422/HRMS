import React from "react";
import Flatpickr from "react-flatpickr";
import { DatePickerProps } from "../Interface";
import { ImageView } from "@components";

function DatePicker({
  icon,
  iconPosition,
  onChange,
  value,
  placeholder,
  minDate,
  disabledDate,
  additionalClass,
  ...props
}: DatePickerProps) {

  const handleChange = (
    dates: Date[],
    currentDateString: string,
    self: any,
    data?: any
  ) => {
    if (onChange) {
      onChange(currentDateString);
    }
  };

  return (
    <div className={`form-group ${additionalClass}`}>
      <div className="input-group" onClick={()=>handleChange}>
        {icon && iconPosition === "prepend" && (
          <div className="input-group-prepend">
            <span className="input-group-text">
              <ImageView icon={icon} />
            </span>
          </div>
        )}
        <Flatpickr
          onChange={handleChange}
          options={
            disabledDate && {
              disable: disabledDate,
            }
          }
          className="form-control bg-white pl-2"
          value={value}
          placeholder={placeholder}
          
        />
        {icon && iconPosition === "append" && (
          <div className="input-group-append">
            <span className="input-group-text">
              <ImageView icon={icon} />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default DatePicker;
