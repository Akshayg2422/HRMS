import React from "react";
import Flatpickr from "react-flatpickr";
import { DatePickerProps } from "../Interface";
import { ImageView } from "@components";

function DateTimePicker({ icon, iconPosition, ...props }: DatePickerProps) {
  return (
    <div className="form-group">
      <div className="input-group">
        {icon && iconPosition === "prepend" && (
          <div className="input-group-prepend">
            <span className="input-group-text">
              <ImageView icon={icon} />
            </span>
          </div>
        )}
        <Flatpickr
          onChange={() => {}}
          className="form-control bg-white pl-2"
          data-enable-time
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

export default DateTimePicker;
