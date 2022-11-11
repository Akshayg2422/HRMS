import React,{useRef} from 'react';
import {ContainerProps} from '../Interface'


interface CheckBoxProps extends ContainerProps {
  text?: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void 
  checked?: boolean
}

const CheckBox = ({ text, onChange, checked }: CheckBoxProps) => {
  return (
    <div className="custom-control custom-checkbox custom-checkbox-primary">
      <input checked={checked} type="checkbox" className="custom-control-input" id="customCheck1"  onChange={onChange} />
      <label className="custom-control-label" htmlFor="customCheck1">{text}</label>
    </div>
  )
}


export default CheckBox;