import React, { useRef } from 'react';
import Flatpickr from "react-flatpickr";
import { DatePickerProps } from '../Interface'
import { ImageView } from '@components'



function TimePicker({ icon, iconPosition, onChange, value, defaultValue, ...props }: DatePickerProps) {

  const timePickerRef = useRef<any>(null);

  const openTimePicker = () => {
    if (timePickerRef.current) {
      timePickerRef.current.flatpickr.open();
      
    }
  }

  const handleChange = (dates: Date[], currentDateString: string, self: any, data?: any) => {
    if (onChange) {
      onChange(currentDateString)
    }
  }

  return (
    <div className="form-group">
      <div className="input-group">
        {icon && iconPosition === 'prepend' && <div className="input-group-prepend" onClick={() => openTimePicker()} style={{ cursor: 'pointer' }}>
          <span className="input-group-text"><ImageView icon={icon} /></span>
        </div>}
        <Flatpickr
          ref={timePickerRef}
          className="form-control bg-white pl-2"
          options={{
            enableTime: true,
            noCalendar: true,
            dateFormat: "H:i",
            time_24hr: true
          }}
          value={value}
          onChange={handleChange}
        />
        {icon && iconPosition === 'append' && <div className="input-group-append" onClick={() => openTimePicker()} style={{ cursor: 'pointer' }}>
          <span className="input-group-text"><ImageView icon={icon} /></span>
        </div>}

      </div>
    </div >

  )

}


export default TimePicker;