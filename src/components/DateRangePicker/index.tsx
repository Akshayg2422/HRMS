import React from 'react';
import Flatpickr from "react-flatpickr";
import {DatePickerProps} from '../Interface'
import {ImageView, InputHeading} from '@components'
import {Icons} from '@assets'


function DateRangePicker({title, icon, iconPosition, ...props}: DatePickerProps) {
  return (
    <div className="form-group">
      {title && <InputHeading heading={title} />}
      <div className="input-group mt-2">
        {iconPosition === 'prepend' && <div className="input-group-prepend">
          <span className="input-group-text"><ImageView icon={Icons.Calendar} /></span>
        </div>}
        <Flatpickr
          onChange={() => { }}
          className="form-control bg-white pl-2"
          options={{mode: 'range'}}
        />
        {iconPosition === 'append' && <div className="input-group-append">
          <span className="input-group-text"><ImageView icon={Icons.Calendar} /></span>
        </div>}

      </div>
    </div >

  )

}


export default DateRangePicker;